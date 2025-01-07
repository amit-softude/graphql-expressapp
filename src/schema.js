const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    game: Game!
  }

  type Query {
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
    author(id: ID!): Author
    reviews: [Review]
    review(id: ID!): Review
  }

  type Mutation {
    addGame(title: String!, platform: [String!]!): Game
    addAuthor(name: String!, verified: Boolean): Author
    addReview(rating: Int!, content: String!, authorId: ID!, gameId: ID!): Review
    deleteGame(id: ID!): Boolean
    deleteAuthor(id: ID!): Boolean
    deleteReview(id: ID!): Boolean
  }
`;

module.exports = typeDefs; 