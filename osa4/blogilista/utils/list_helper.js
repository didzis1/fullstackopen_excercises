const User = require('../models/user')

const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max )
}

const mostBlogs = (blogs) => {
    let authors = []
    blogs.forEach((blog) => {
        const uniqueAuthor = { author: blog.author, blogs: 1 }
        // Haetaan kirjalijan authors listalta
        const indexOfAuthor = authors.findIndex((item) => item.author === blog.author)
        // Jos kirjailija on jo olemassa listalla, kasvatetaan yhdellä sen blogimäärää
        indexOfAuthor === -1 ? authors.push(uniqueAuthor) : authors[indexOfAuthor].blogs += 1
    })
    // Haetaan blogArray listalta kirjailija, jonka blogimäärä on suurin
    return authors.reduce((max, item) => item.blogs > max.blogs ? item : max)
}

// mostLikes toimii melkein samanlailla kuin mostBlogs funktio
const mostLikes = (blogs) => {
    let authors = []
    blogs.forEach((blog) => {
        const uniqueAuthor = { author: blog.author, likes: blog.likes }
        // Haetaan kirjalijan authors listalta
        const indexOfAuthor = authors.findIndex((item) => item.author === blog.author)
        // Jos kirjailija on jo olemassa listalla, tehdään yhteenlasku tykkäyksistä
        indexOfAuthor === -1 ? authors.push(uniqueAuthor) : authors[indexOfAuthor].likes += blog.likes
    })

    return authors.reduce((max, item) => item.likes > max.likes ? item : max)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}