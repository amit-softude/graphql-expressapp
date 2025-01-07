const Game = require('./models/Game');
const Author = require('./models/Author');
const Review = require('./models/Review');

const resolvers = {
  Query: {
    games: async () => await Game.find(),
    game: async (_, { id }) => await Game.findById(id),
    authors: async () => await Author.find(),
    author: async (_, { id }) => await Author.findById(id),
    reviews: async () => await Review.find().populate(['author', 'game']),
    review: async (_, { id }) => await Review.findById(id).populate(['author', 'game'])
  },
  Mutation: {
    addGame: async (_, { title, platform }) => {
      const game = new Game({ title, platform });
      return await game.save();
    },
    addAuthor: async (_, { name, verified }) => {
      const author = new Author({ name, verified });
      return await author.save();
    },
    addReview: async (_, { rating, content, authorId, gameId }) => {
      const review = new Review({
        rating,
        content,
        author: authorId,
        game: gameId
      });
      
      const savedReview = await review.save();
      
      // Update the references in Game and Author
      await Game.findByIdAndUpdate(gameId, {
        $push: { reviews: savedReview._id }
      });
      await Author.findByIdAndUpdate(authorId, {
        $push: { reviews: savedReview._id }
      });
      
      return await savedReview.populate(['author', 'game']);
    },
    deleteGame: async (_, { id }) => {
      await Game.findByIdAndDelete(id);
      await Review.deleteMany({ game: id });
      return true;
    },
    deleteAuthor: async (_, { id }) => {
      await Author.findByIdAndDelete(id);
      await Review.deleteMany({ author: id });
      return true;
    },
    deleteReview: async (_, { id }) => {
      const review = await Review.findById(id);
      if (review) {
        await Game.findByIdAndUpdate(review.game, {
          $pull: { reviews: id }
        });
        await Author.findByIdAndUpdate(review.author, {
          $pull: { reviews: id }
        });
        await Review.findByIdAndDelete(id);
      }
      return true;
    }
  }
};

module.exports = resolvers; 