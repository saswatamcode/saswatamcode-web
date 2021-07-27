---
title: "Build a chat app with GraphQL and TypeScript: Part 1"
description: "If you're a little familiar with [GraphQL](https://graphql.org/), you've probably heard of subscriptions and how useful they are in building real-time applications. In this series of blogs, we're going to build a simple chat application using Node.js and React with GraphQL."
date: 2021-02-28T05:35:07.322Z
lastmod: 2021-02-28T05:35:07.322Z
draft: false
weight: 50
images: []
contributors: ["saswatamcode"]
---

Hey there!

If you're a little familiar with [GraphQL](https://graphql.org/), you've probably heard of subscriptions and how useful they are in building real-time applications. In this series of blogs, we're going to build a simple chat application using Node.js and React with GraphQL. We'll use TypeScript throughout this series and will be following a code-first approach!

## Installing dependencies

We'll be using [Apollo Server](https://www.apollographql.com/docs/apollo-server/), [Express](https://expressjs.com/) and [TypeGraphQL](https://typegraphql.com/docs/introduction.html) for this server. 

Developing a GraphQL API in Node.js with TypeScript is always a bit of a pain since you'd have to manually create all your types, a lot of which will lead to redundancies later on, but TypeGraphQL really makes it easy using classes and decorator.

Let's start by running `npm init -y` in a fresh new directory to generate our `package.json` and install the required dependencies.

```bash
yarn add apollo-server-express class-validator cors dotenv express graphql reflect-metadata type-graphql
yarn add -D @types/cors @types/express @types/node typescript
```

We're basically using Express as a middleware integration for Apollo Server using the [apollo-server-express](https://github.com/apollographql/apollo-server) package. Once all your dependencies are installed, create a `src` folder. This is where all our TS files will exist. That'll help us easily manage compilation. 

We'll also need a `tsconfig.json` file to setup TypeScript to our liking. There's an awesome utility by [Ben Awad](https://twitter.com/benawad) which can automatically generate this for you. Run `npx tsconfig.json` and select `node`. Now we're all set to code up our GraphQL API!

We'll be following the file structure described below!

```
├── server
│		├── src
│		│   ├── entities
│		|   |   ├── Chat.ts
│		│   ├── resolvers
│		|   |   ├── chat.ts
│		│   ├── index.ts
│		├── package.json
│		├── tsconfig.json
│		├── .env
```

## Building our server

Create an `index.ts` file and initialize our server using the code below,

```tsx
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const app = express();

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ChatResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(process.env.PORT, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
```

Let's breakdown what we just wrote. We initialized our server inside an async `main()` function, just in case we need to `await` anything, and declared an express application, `app`. We also allowed cors from `localhost:3000`, which is where we'll run our React app later on. Also, do keep in mind to import the `reflect-metadata` shim package before importing `type-graphql` or any of your resolvers.

We then made a new instance of `ApolloServer` and applied our express middleware to that. Finally, we started our server, using `app.listen()`. We're also using `dotenv` to load env variables, namely `PORT`, from our `.env` file. For this example, we'll consider `PORT=9000`.

But as you've probably noticed by now, this won't run, since we don't have a `ChatResolver` yet. In fact, we don't have any resolvers for our GraphQL API yet, so let's go ahead and make a resolver. 

But before that, we need to define our entity. Think of this as the universal type on which you'll write your GraphQL resolvers, i.e queries, mutations, and subscriptions as well as your database operations. This is exactly where TypeGraphQL comes in handy. We won't be using a database here, since our chat system will be ephemeral, but you get the idea!

## Defining our entity

So create the `entities/Chat.ts` file and define our `Chat` entity using the following code!

```tsx
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Chat {
  @Field()
  id: number;

  @Field()
  message: string;

  @Field()
  name: string;
}
```

Alright, let's understand what we just wrote! We defined an exported TypeScript class `Chat` with multiple decorators. The class has three property members, `id`, `message`, and `name`, each with their own types. This is pretty straightforward, but let's understand what those decorators accomplish. 

The main idea behind using TypeGraphQL decorators is to automatically create GraphQL schema definitions from TypeScript classes in SDL(schema definition language). This eliminates the need to make schema definition files and their equivalent interfaces in TypeScript.

Here, the first thing we did was decorate the `Chat` class with the `@ObjectType` decorator. It marks the class as `type` from the GraphQL SDL or `GraphQLObjectType` from `graphql-js`. Then we declared class properties that need to be mapped to the GraphQL fields. To do this, we use the `@Field` decorator, which is also used to collect metadata from the TypeScript type reflection system. By default all the fields in our entity here are non-nullable!

This entity will result in the generation of the following part of the GraphQL schema in the SDL.

```tsx
type Chat {
  id: Float!
  message: String!
  name: String!
}
```

As you can see all fields are required(`!`) here, i.e non-nullable! 

We've now successfully defined a GraphQL schema and its types for each of our chats! Now let's define a GraphQL resolver on our `Chat` entity.

## Queries and Mutations

Create a `resolvers/chat.ts` file and type in the following,

```tsx
import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { Chat } from "../entities/Chat";

const chats: Chat[] = [];

@Resolver()
export class ChatResolver {
  @Query(() => [Chat])
  getChats(): Chat[] {
    return chats;
  }

  @Mutation(() => Chat)
  createChat(
    @Arg("name") name: string,
    @Arg("message") message: string
  ): Chat {
    const chat = { id: chats.length + 1, name, message };
    chats.push(chat);
    return chat;
  }
}
```

That's a lot of new code so let's understand what we're doing here. Aside from GraphQL object types, TypeGraphQL also allows us to create GraphQL queries, mutations, and subscriptions in a REST controller type fashion.

First, we define an array based on the `Chat` entity which will basically act as our database. Then we define an exported class `ChatResolver` with the methods, `getChat()`, which returns our entire chat array and `createChat()`, which appends a new chat object to the end of our array by taking the arguments, `name` and `message`. Now that we understand the normal functionality of this class, let's understand what those decorators add in.

The first decorator, `@Resolver()`, makes the class behave like a classic REST controller. Thus, the methods inside this class can now act like GraphQL query, mutation, and subscription handlers.

This brings us to the next decorators, which are `@Query(() => [Chat])` and `@Mutation(() => Chat)`, which lets us mark our resolver class methods as a GraphQL query or mutation resolver. We also need to explicitly declare the type that those methods resolve to, i.e, their return type, which here is an array of `Chat` objects for `getChats()` and a single object for `createChat()`. 

Finally, there's the inline `@Arg()` decorator, which lets us specify the arguments for a particular GraphQL query/mutation. We pass in the name of those arguments in this decorator.

Woohoo! Our resolver is now workable! Let's go ahead and try to run our server! But first, import the `ChatResolver` in `index.ts` and add the following scripts into `package.json`

```json
"scripts": {
    "watch": "tsc -w",
    "dev": "nodemon dist/index.js",
    "build": "tsc",
    "start": "node dist/index.js"
},
```

Finally, fire up your terminal and run `yarn watch` in one and `yarn dev` in another! The watch command basically allows you to make changes in your TS files, which immediately get compiled into JS files inside a `dist/` directory. Then we use `nodemon`, to run our compiled JS files and also restart on any changes. This results in a pretty near to prod dev environment!

Visit `localhost:9000/graphql` to view your GraphQL playground where you can run your queries!

## Running GraphQL operations in GraphQL Playground

Now, visit `localhost:9000/graphql` to view your GraphQL Playground, and let's execute our queries and mutations.

To add a new chat, you'll run the following mutation:

```graphql
mutation {
  createChat(name: "John", message: "first chat") {
    id
    name
    message
  }
}
```

and to get all chats, you'll run the following query

```graphql
query {
  getChats {
    id
    name
    message
  }
}
```

As you can see, our class methods have turned into actual GraphQL operations which take in arguments and return `Chat` object fields! Do keep in mind that since we're storing our chats in an in-memory array, all your chats will disappear the moment you restart your server.

In the next part, we'll explore how to add a subscription to our new GraphQL API!

## Conclusion

Visit the next post of this series to learn about GraphQL subscriptions and how to add them!

If you'd like to dig deeper into GraphQL, Apollo Server and TypeGraphQL and discover all the cool things you can make with it, read the official docs,

[Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)

[TypeGraphQL Docs](https://typegraphql.com/docs/introduction.html)

[GraphQL Docs](https://graphql.org/learn/)

Also, here's an [awesome list of resources](https://github.com/chentsulin/awesome-graphql) to learn further!

If you get stuck here's the [repo](https://github.com/saswatamcode/graphQLChat) with all the code! Visit the `part-1` branch to get the code covered in this post.

For any queries reach out to my [socials](https://twitter.com/saswatamcode) or [GitHub](https://github.com/saswatamcode)!
