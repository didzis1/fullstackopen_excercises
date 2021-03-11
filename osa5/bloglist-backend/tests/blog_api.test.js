const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')

const initialBlogs = [
    { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 },
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
    { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
    { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
    { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]


// Alustetaan tietokantaa ennen testejä
beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('testing blog functionality', () => {
    test('six blogs are returned as JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('unique identifier is named id', async () => {
        const blogs = await api.get('/api/blogs')
        // Testataan, onko ensimmäisellä blogilla olemassa ID
        expect(blogs.body[0].id).toBeDefined()
    })

    test('create a blog with jwt token', async () => {

        const loginUser = {
            username: 'didzis1',
            password: 'salainen'
        }

        const loginResult = await api
            .post('/api/login')
            .send(loginUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const token = loginResult.body.token

        const newBlog = {
            title: 'Testi',
            author: 'Didzis Zvaigzne',
            url: 'didzis.net',
            likes: 100
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(blog => blog.title)

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(contents).toContain('Testi')
    })

    test('check if all blogs have likes', async () => {

        const loginUser = {
            username: 'didzis1',
            password: 'salainen'
        }

        const loginResult = await api
            .post('/api/login')
            .send(loginUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const token = loginResult.body.token

        // Luodaan uusi blogi ilman 'likes' kenttää
        const newBlog = {
            title: 'Testi',
            author: 'Didzis Zvaigzne',
            url: 'didzis.net'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/ )


        const response = await api.get('/api/blogs')
        // Tarkistetaan, että onko jokaisella blogilla tietokannassa 'likes' kenttä
        response.body.forEach(blog => expect(blog).toHaveProperty('likes'))
    })

    test('missing title and url responds with 400', async () => {
        const loginUser = {
            username: 'didzis1',
            password: 'salainen'
        }

        const loginResult = await api
            .post('/api/login')
            .send(loginUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const token = loginResult.body.token

        const newBlog = {
            author: 'Didzis Zvaigzne',
            likes: 50
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(400)

    })

    test('blog is deleted successfully', async () => {
        // Ensin lisätään blogi, jonka omistaa tietty käyttäjä
        const loginUser = {
            username: 'didzis1',
            password: 'salainen'
        }

        const loginResult = await api
            .post('/api/login')
            .send(loginUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const token = loginResult.body.token

        const newBlog = {
            title: 'ThisWillBeRemoved',
            author: 'Blog Remover',
            url: 'removingtest.fi',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsBeforeDelete = await api.get('/api/blogs')
        const blogToDelete = blogsBeforeDelete.body[blogsBeforeDelete.body.length - 1] // viimeinen eli äsken lisätty blogi

        // Poistetaan blogi
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        const blogsAfterDelete = await api.get('/api/blogs')

        // Tarkistetaan, onko tietokannan blogien määrä yksi vähemmän alkuperäisestä
        expect(blogsAfterDelete.body)
            .toHaveLength(blogsBeforeDelete.body.length - 1)

        // Poistetun blogin ei pitäisi löytyä tietokannasta
        expect(blogsAfterDelete).not.toContain(blogToDelete)

    })


    test('blog is updated successfully', async () => {
        const allBlogs = await api.get('/api/blogs')
        const newBlog = {
            likes: 150
        }

        await api
            .put(`/api/blogs/${allBlogs.body[0].id}`)
            .send(newBlog)
            .expect(200)

    })
})


describe('testing user functionality', () => {
    test('cannot create user with an existing username', async () => {
        const usersInDb = await User.find({})

        const newUser = {
            username: 'didzis1', // On jo olemassa tietokannassa
            name: 'Didzis Zvaigzne',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        // Virheviestissä ilmoitetaan, että käyttäjätunnuksen pitää olla uniikki
        expect(result.body.error).toContain('expected `username` to be unique')

        const endResult = await api.get('/api/users')

        // Tietokannan pituus on sama testin jälkeen
        expect(endResult.body).toHaveLength(usersInDb.length)
    })

    test('cannot create user with missing password', async () => {
        const usersInDb = await User.find({})

        const userWithoutPassword = {
            username: 'geralt',
            name: 'Geralt of Rivia'
        }

        const result = await api
            .post('/api/users')
            .send(userWithoutPassword)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password is too short or missing')

        const endResult = await api.get('/api/users')
        expect(endResult.body).toHaveLength(usersInDb.length)

    })

    test('cannot create user with too short username', async () => {
        const usersInDb = await User.find({})

        const newUser = {
            username: 'x',
            name: 'Too short username',
            password: 'secret'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Username is too short')

        const endResult = await api.get('/api/users')
        expect(endResult.body).toHaveLength(usersInDb.length)
    })

    test('cannot create user with too short password', async () => {
        const usersInDb = await User.find({})

        const newUser = {
            username: 'testi',
            name: 'Too short password',
            password: '12'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password is too short or missing')

        const endResult = await api.get('/api/users')
        expect(endResult.body).toHaveLength(usersInDb.length)
    })
})


afterAll(() => {
    mongoose.connection.close()
})