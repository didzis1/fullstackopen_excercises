const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'THIS_IS_A_VERY_SECRET_KEY'

const MONGODB_URI = 'removed_for_security_reasons'

console.log('Connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(() => {
    console.log('error connecting to MongoDB', error.message)
  })

const typeDefs = gql`

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book!]!
      allAuthors: [Author!]!
      allUsers: [User!]!
      me: User
  }

  type Book {
      title: String!
      published: Int!
      author: Author!
      genres: [String!]!
      id: ID!
      me: User
  }

  type Author {
      name: String!
      born: Int
      id: ID!
      bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Mutation {
      addBook(
          title: String!
          published: Int
          author: String!
          genres: [String!]!
      ): Book

      editAuthor(
          name: String!
          setBornTo: Int!
      ): Author
      
      createUser(
        username: String!
        favoriteGenre: String!
      ): User

      login(
        username: String!
        password: String!
      ): Token
  }
  
`

const resolvers = {
  Query: {
      me: (root, args, context) => {
        return context.currentUser
      },
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allUsers: async (root, args) => {
        return await User.find({})
      },
      allBooks: async (root, args) => {

        // PARAMETRILLISET VERSIOT:
        //   if (!args.author && !args.genre) {
        //       return books
        //   }
        //   // If returned true, no specific items are filtered through books array
        //   const selectedGenre = !args.genre ? () => true : book => book.genres.includes(args.genre)
        //   const selectedAuthor = !args.author ? () => true : book => book.author === args.author
        // //   console.log('Genre:' ,selectedGenre)
        // //   console.log('Author:' ,selectedAuthor)
        // //   console.log('filtered', books.filter(selectedGenre))
        //   return books.filter(selectedGenre).filter(selectedAuthor)

        if (!args.author && !args.genre) {
          return await Book.find({}).populate('author')
        }

        const findByGenre = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
        // console.log(findByGenre)
        return findByGenre

      },
      allAuthors: (root, args) => {
          return Author.find({})
      }
  },
  Author: {
      bookCount: async (root) => {
          const numOfBooks = await Book.find({ author: { $in: root.id } })
          return numOfBooks.length
      }
  },
  Mutation: {
      addBook: async (root, args, { currentUser }) => {
          if (!currentUser) {
            throw new AuthenticationError("Not authenticated")
          }
          let realAuthor = await Author.findOne({ name: args.author })
          // If author doesn't exist, create one
          if (!realAuthor) {
            try {
              realAuthor = new Author({ name: args.author })
              await realAuthor.save()
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args
              })
            }
          }

          const book = new Book({
            title: args.title,
            published: args.published,
            author: realAuthor,
            genres: args.genres
          })

          try {
            await book.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args
            })
          }
          return book
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError("Not authenticated")
        }
        const authorToEdit = await Author.findOne({ name: args.name })
        authorToEdit.born = args.setBornTo
        try {
          await authorToEdit.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        return authorToEdit
      },
      createUser: async (root, args) => {
        const newUser = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

        try {
          return await newUser.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== '12345') {
          throw new UserInputError("Wrong credentials, try again.")
        }

        const userForToken = {
          username: user.username,
          id: user._id,
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})