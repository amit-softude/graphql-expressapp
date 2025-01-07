const Book = require('./models/Book');

const resolvers = {
  Query: {
    books: async () => {
      return await Book.find();
    },
    book: async (_, { id }) => {
      return await Book.findById(id);
    }
  },
  Mutation: {
    addBook: async (_, { title, author, publishedYear }) => {
      const book = new Book({ title, author, publishedYear });
      return await book.save();
    },
    updateBook: async (_, { id, title, author, publishedYear }) => {
      return await Book.findByIdAndUpdate(
        id,
        { title, author, publishedYear },
        { new: true }
      );
    },
    deleteBook: async (_, { id }) => {
      await Book.findByIdAndDelete(id);
      return true;
    }
  }
};

module.exports = resolvers; 