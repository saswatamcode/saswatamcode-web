---
weight: 50
title: 'Build a chat app with GraphQL and TypeScript: Part 2'
lastmod: "2021-02-28T05:36:07.322Z"
images:
    - cover.jpg
draft: false
description: In this part, we'll be adding our subscription to our GraphQL API.
date: "2021-02-28T05:36:07.322Z"
---

In this part, we'll be adding our subscription to our GraphQL API.

## What are subscriptions?

> Subscriptions are long-lasting GraphQL read operations that can update their result whenever a particular server-side event occurs. Most commonly, updated results are pushed from the server to subscribing clients. For example, a chat application's server might use a subscription to push newly received messages to all clients in a particular chat room.

That's according to the official [Apollo Server documentation](https://www.apollographql.com/docs/apollo-server/data/subscriptions/). Essentially, it allows us to update our clients based on any server-side events. And since subscription updates are usually pushed by the server, they usually use the [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) protocol instead of HTTP.

Now that our GraphQL resolvers are working, we can send chats through our mutation and view all the chats which are presently there through our query! However, we also want to be alerted when a new chat arrives and that too in real-time(the exact moment the chat arrived! This is why we need a subscription operation as well!

So let's go ahead and add one! First, we need to set up our server, so that it can handle subscriptions since subscriptions use a completely different protocol from http! Apollo Server makes this setup relatively easy by allowing us to have a completely different endpoint only for our subscriptions.

## Setting up our server to handle subscriptions

Open up `index.ts` and make the following changes

```tsx
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ChatResolver } from "./resolvers/chat";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const main = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ChatResolver],
      validate: false,
    }),
    subscriptions: {
      path: "/subscriptions",
      onConnect: () => {
        console.log("Client connected for subscriptions");
      },
      onDisconnect: () => {
        console.log("Client disconnected from subscriptions");
      },
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(process.env.PORT, () => {
    console.log(
      `Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
```

That's a ton of changes, so let's understand why we made them!

Firstly, we need to pass in a `subscriptions` object to our `apolloServer` instance with the endpoint path we want to reserve only for subscriptions as well as functions `onConnect` and `onDisconnect`, which will fire every time a client connects and disconnects from the endpoint we specified. And since we're using a middleware integration with Apollo Server and Express, we need to call the `installSubscriptionHandlers()` method defined by our `apolloServer` instance.

This leads to a limitation since we can only pass in an instance of `http.Server` to our `installSubscriptionHandlers()` method. We can't pass in an instance of `express.Application` or `app` as defined here. Thus, we need to define our own `httpServer` using the baked-in `http` Node library instead of using the one created for us by Express.

So we import the `http` module and create a http server based on our express application, i.e, `app` using the `http.createServer(app)` method. We call the `installSubscriptionHandlers()` method and pass in our `httpServer`.

Finally, instead of using `app.listen()` we use `httpServer.listen()`. Both of these methods achieve the exact same thing and return the same type(`http.Server`), but `httpServer` now has the required code to handle subscriptions, so we use that instead of `app`.

On saving and restarting the server, you should see your subscription url get logged in your console, i.e, `ws://localhost:9000/subscription`. Here `ws` signifies that the endpoint uses the WebSocket protocol!

Now, that our server can handle subscriptions let's actually add one!

## Adding our subscription

Subscription resolvers are similar to queries and mutations but are slightly more complex. We'll be creating a class method as we did previously but with the `@Subscription()` decorator.

```tsx
import { Mutation, Query, Subscription, Resolver, Arg } from "type-graphql";
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
	@Subscription({ topics: "CHAT_CHANNEL" })
  messageSent(): Chat {}
}
```

We just created a `messageSent()` method in our `ChatResolver` class with a `@Subscription()` decorator. Thus our new method is now marked as a GraphQL subscription resolver. We have to pass in the name of the topic we wish to subscribe to, in our decorator as well. This can be a single topic, an array of topics, or even a dynamic topic. Since we will only be maintaining one chat channel in our app, we passed in the `CHAT_CHANNEL` string as our topic.

## Triggering subscriptions and receiving payloads

Let's now add in the logic for triggering our subscription topic.

```tsx
import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Root,
  PubSub,
  PubSubEngine,
  Subscription,
} from "type-graphql";
import { Chat } from "../entities/Chat";

const chats: Chat[] = [];
const channel = "CHAT_CHANNEL";

@Resolver()
export class ChatResolver {
  @Query(() => [Chat])
  getChats(): Chat[] {
    return chats;
  }

  @Mutation(() => Chat)
  async createChat(
    @PubSub() pubSub: PubSubEngine,
    @Arg("name") name: string,
    @Arg("message") message: string
  ): Promise<Chat> {
    const chat = { id: chats.length + 1, name, message };
    chats.push(chat);
    const payload = chat;
    await pubSub.publish(channel, payload);
    return chat;
  }

  @Subscription({ topics: channel })
  messageSent(@Root() { id, name, message }: Chat): Chat {
    return { id, name, message };
  }
}
```

Again, that's a lot of new code to breakdown!

First, let's try to understand what `PubSub` is exactly. Apollo Server uses a publish-subscribe (pub/sub) model to track events that update subscriptions. The [graphql-subscriptions](https://github.com/apollographql/graphql-subscriptions) library included in all `apollo-server` packages (including middleware integrations) provides a `PubSub` class as a basic in-memory event bus.

However, do keep in mind that this isn't suitable for production, since it only supports a single server instance. TypeGraphQL uses this `PubSub` system to define the `@PubSub()` decorator. For production, other implementations of such a pubsub system are [recommended](https://github.com/apollographql/graphql-subscriptions#pubsub-implementations).

In this case, we want to trigger our `CHAT_CHANNEL` topic whenever a new chat is created, i.e, in our `createChat()` mutation. So we use the `@PubSub()` decorator to pass in `pubSub` as a method parameter, which is of type `PubSubEngine`. We can now use this to send a payload to all subscribers of the `CHAT_CHANNEL` topic.

Thus, we use `pubSub.publish(channel, chat)` method to publish the payload in our topic, in the pubsub system, by passing in our topic name ( `channel` now has the `CHAT_CHANNEL` string), and the `chat` object as arguments.

Since this returns a `Promise`, we need to use `await`. This also results in `createChat()` being an `async` method which now returns a `Promise` of type `Chat`.

Finally, in our subscription method, `messageSent()`, we use the `@Root()` decorator to receive the payload from the triggered topic in our pubsub system. For convenience, we made sure the payload is of type `Chat` which is again returned from our subscription method.

## Run your subscription in GraphQL Playground

And that's pretty much it! We now have a complete GraphQL API, with a query, mutation, and a subscription! Let's test this out by heading over to our Playground at `localhost:9000/graphql` and try running the following.

```graphql
subscription {
  messageSent {
    id
    name
    message
  }
}
```

While this is running, i.e the play button switches to red and you can see "Listening..." below, switch over to your `createChat()` mutation tab and create a new chat. You should be able to see the new chat pop up in the window where you left your subscriptions running!

Woohoo! Our subscription works!

Now that our backend is complete, we'll explore how to use all these GraphQL operations in the frontend using React. See you in the next part!

## Conclusion

Visit the next post of this series to use your GraphQL server in React!

If you'd like to dig deeper into GraphQL, Apollo Server and TypeGraphQL and discover all the cool things you can make with it, read the official docs,

[Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)

[TypeGraphQL Docs](https://typegraphql.com/docs/introduction.html)

[GraphQL Docs](https://graphql.org/learn/)

Also, here's an [awesome list of resources](https://github.com/chentsulin/awesome-graphql) to learn further!

If you get stuck here's the [repo](https://github.com/saswatamcode/graphQLChat) with all the code! Visit the `part-2` branch to get all the code covered in this post.

For any queries reach out to my [socials](https://twitter.com/saswatamcode) or [GitHub](https://github.com/saswatamcode)!
