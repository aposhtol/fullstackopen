const { GraphQLError } = require('graphql')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      bookCount: async () => Book.collection.countDocuments(),
      authorCount: async () => Author.collection.countDocuments(),
      //allBooks: (root, args) => !args.author ? books : books.filter(b => b.author === args.author),
      /*allBooks: (root, args) => {
        let sbooks
  
        if (args.genre && args.author) {
          sbooks = books.filter(b => b.genres.includes(args.genre))
          return sbooks.filter(b => b.author === args.author)
        }
  
        if (args.genre) {
          return books.filter(b => b.genres.includes(args.genre))
        }
    
        if (args.author) {
          return books.filter(b => b.author === args.author)
        }
  
        else return books
      },*/
      allBooks: async (root, args) => {
        const books = await Book.find({}).populate('author', { name: 1 })

        if (args.genre) {
            return books.filter(book => book.genres.includes(args.genre))
        }

        return books
    },
      /*{
        //const author = new Author({ name: args.author })
        const books = Book.find({})
        //books = {...books, author: author.name}
        return books
      }*/
  
      allAuthors: async () => {
        const authors = await Author.find({})
        const books = await Book.find({})

        return authors.map(author => {
            return {
            name: author.name,
            born: author.born,
            id: author._id,
            bookCount: books.filter(book => book.author.toString() === author._id.toString()).length
        }
        })
      },
      me: (root, args, context) => context.currentUser
    },
  
  
    /*Author: {
      bookCount: async (root) => {
        const books = await Book.find({}).populate('author', { name: 1 })
        let count = 0
  
        for (let i = 0; i < books.length; i++) {
          const obj = books[i]
  
          if (root.name === obj.author.name) {
            count++
          }
        }
        console.log('bookCount')
        return count
      }
        
      },*/
  
    Mutation: {
      addAuthor: async (root, args) => {
  
        /*const author = {...args, id: uuid()}
        authors = authors.concat(author)
        return author*/
      
        const author = new Author({...args})
      
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
            
      },
      addBook: async (root, args, context) => {
        
        /*if (!authors.find(author => author.name === args.author)) {
          addAuthorFn(null,{name: args.author})
        }
        
        const book = {...args, id: uuid()}
        books = books.concat(book)
        return book*/
        const currentUser = context.currentUser
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })
        }
  
        const author = await Author.findOne({name: args.author})
  
        if (!author) {
          const author = new Author({ name: args.author })
          await author.save()
          const book = new Book({...args, author: author})
  
          try {
            await book.save()
          } catch (error) {
            throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
            })
          }
        }
  
          const book = new Book({...args, author: author})
  
          try{
            await book.save()
          } catch (error) {
            throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
            })
          }
        
          pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return book
        
        //const author = new Author({ name: args.author })
      
      },
      editAuthor: async (root, args, context) => {
        /*const author = authors.find(author => author.name === args.name)
        author ? author.born = args.setBornTo : null
        return author*/
        const currentUser = context.currentUser
        const author = await Author.findOne({ name: args.name })
  
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          }
          )
        }
  
        author.born = args.setBornTo
  
        return author.save()
      },
      createUser: async (root, args) => {
          const user = new User({...args})
  
          return user.save()
          .catch (error => {
            throw new GraphQLError('Creating user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
          })
          }
          )
      },
      login: async (root, args) => {
        const user = await User.findOne({username: args.username})
  
        if ( !user || args.password !== 'secret') {
          throw new GraphQLError('Wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT',
              error
            }
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id
        }
  
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }   
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
      },
}

module.exports = resolvers