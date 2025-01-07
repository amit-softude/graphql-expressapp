const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  // Apply middleware
  app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server)
  );

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Connected to MongoDB');

  const PORT = process.env.PORT || 4000;
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
}

startServer().catch(error => {
  console.error('Error starting server:', error);
}); 