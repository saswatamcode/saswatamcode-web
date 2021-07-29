---
weight: 50
title: 'Build a chat app with GraphQL and TypeScript: Part 3'
lastmod: "2021-02-28T05:37:07.322Z"
images:
    - cover.jpg
draft: false
description: Now that our server's ready let's start making our frontend! We won't be adding any CSS in this article, but you can definitely style it later on!
date: "2021-02-28T05:37:07.322Z"
---

Now that our server's ready let's start making our frontend! We won't be adding any CSS in this article, but you can definitely style it later on!

## Initializing your frontend

At the root of your project run the following. We'll be using TypeScript here as well.

```bash
npx create-react-app chat-client --template typescript
```

Once that's done, add the dependencies we'll need. We'll be using [Apollo Client](https://www.apollographql.com/docs/react/) for this tutorial, so run,

```bash
yarn add @apollo/client graphql subscriptions-transport-ws
```

As Apollo Client subscriptions communicate over the [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) protocol, we use the [subscription-transport-ws](https://github.com/apollographql/subscriptions-transport-ws) library.

## Apollo Client setup

Now let's add in our initial setup! Open up `App.tsx` and add the following,

```tsx
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { useState } from "react";

const client = new ApolloClient({
	uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [name, setName] = useState<string>("");
  const [entered, setEntered] = useState<boolean>(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {!entered && (
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button onClick={() => setEntered(true)}>Enter chat</button>
          </div>
        )}

        {name !== "" && entered && (
          <div>
	       Chats
          </div>
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
```

Alright, let's breakdown what we wrote!

First, we initialized an `ApolloClient` instance, `client`, with our GraphQL server endpoint and the `InMemoryCache()` class provided by apollo. We then connect our `client` to React, by passing it as a prop to `ApolloProvider`. This will wrap our React app and place our client in context which means that we can access our `client` from anywhere in our component tree and execute GraphQL operations.

Now, we would want a name from our user, so that the user can send chats in our chat app. So we declare a `name` state to store our user's name and an `entered` state so that we can figure when to show the chats and when to show an "enter chat" screen which would let the user enter their name. We use pretty simple conditional rendering to do this.

If the user hasn't entered the chat or provided their name, i.e, if `entered` is false, we show an input field to set the `name` state and an "Enter chat" button which sets `entered` to true. If `entered` is true and `name` isn't an empty string, we show chats (we'll be adding components for this soon). Also, we'll be using `name` as a local state and threading it through our components for now.

This is great up till now, but if you remember, our GraphQL API has a query, mutation, and a subscription. The query and mutation are resolved via our HTTP endpoint, but the subscription requires a separate WebSocket endpoint, which we haven't provided to our client yet. So let's go ahead and add that!

```tsx
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { useState } from "react";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:9000/subscriptions",
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: "http://localhost:9000/graphql",
  credentials: "include",
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = () => {
  const [name, setName] = useState<string>("");
  const [entered, setEntered] = useState<boolean>(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {!entered && (
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button onClick={() => setEntered(true)}>Enter chat</button>
          </div>
        )}

        {name !== "" && entered && (
          <div>
            Chats 
          </div>
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
```

Alright, so our `client` changed up quite a bit!

First, we initialize a `WebSocketLink` instance with our GraphQL API's subsciption endpoint. We also initialize a `HttpLink` instance with our GraphQL API's HTTP endpoint.

Now, since queries and mutations don't require a long-lasting real-time connection, http would be much more efficient for them. Thus, we could like to split our communication on the basis of the GraphQL operation required, i.e, we want to use `HttpLink` if it's a query or a mutation, but would switch over to `WebSocketLink` if it's a subscription.

We achieve this by using the `split()` function which assigns `link` based on a boolean check. It takes in three parameters, a function that's called for each operation to execute, a link if the function returns a "truthy" value, and a link if the function returns a "falsy" value. Here, we use the `getMainDefinition()` function to check if the operation in a subscription. If that returns true we use `wsLink` otherwise we use `httpLink`. `link` is later passed into our `client`.

## Executing a mutation

Now that that's out of the way, let's figure out how to send a message in our chat app. We'll be using our `createChat` mutation in this case. Create a new file, `SendMessage.tsx` in the `src` directory and type the following,

```tsx
import { useState, FC } from "react";
import { gql, useMutation } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation createChat($name: String!, $message: String!) {
    createChat(name: $name, message: $message) {
      id
      name
      message
    }
  }
`;

interface SendMessageProps {
  name: string;
}

const SendMessage: FC<SendMessageProps> = ({ name }) => {
  const [input, setInput] = useState<string>("");
  const [sendMessage, { data }] = useMutation(SEND_MESSAGE);

  const handleSend = () => {
    sendMessage({ variables: { name: name, message: input } })
      .then((data) => {
        console.log(data);
        setInput("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        type="text"
        id="message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <button onClick={handleSend}>Send message</button>
    </div>
  );
};

export default SendMessage;
```

Alright, we have a really simple component this time, with one input field to fill out the message the user wants to send, which is stored in our `input` state and a button that calls the `handleSend()` function when it's clicked. It also takes in the name of the user as a prop. The most important thing to note here is our mutation.

We use the `useMutation` hook from Apollo to call our mutation. We've defined our mutation query as a GraphQL string, `SEND_MESSAGE` which we pass into our hook. The `useMutation` hook in turn returns a tuple that has a mutate function (`sendMessage()` here) which we can call to execute the mutation and an object with fields that represent the current status of the mutation. We won't be using that object here for now.

We call the `sendMessage()` mutate function inside our `handleSend` method. Since our mutation has input variables, namely, `name` and `message`, we pass those in as the `variables` object, with values from our props and state. The mutate function returns a `Promise` so we use `then()` here to wait for the mutation to execute. Once the mutation is done we clear out the `input` state so that the user can type and send the next message. You can test this out now and view the messages you send in the console!

## Executing a query

Now, we also need to be able to show our previous chats and update that whenever a new chat is sent. So let's define a new `Chats.tsx` component with the following code to accomplish this,

```tsx
import { gql, useQuery } from "@apollo/client";

const ALL_CHATS = gql`
  query allChats {
    getChats {
      id
      name
      message
    }
  }
`;

const Chats = () => {
  const { loading, error, data } = useQuery(ALL_CHATS);

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      {data.getChats.map((chat: any) => (
        <div key={chat.id}>
          <p>
            {chat.name}: {chat.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Chats;
```

Alright, let's understand what we wrote. We used the `useQuery` hook by Apollo, to execute our `allChats` query, which is defined as a GraphQL string, `ALL_CHATS`. When our component renders, the `useQuery` hook returns an object with `loading`, `error`, and `data` which we then use to render our UI.

When there's no error, and the data is done loading, we loop through our chats and display the name of the sender and the message. Keep in mind that Apollo Client automatically caches our query results locally, to make subsequent query results faster.

## Use subscription to update query result

There's no real-time aspect in the `Chat` component yet. So sending in new chats won't update our UI unless we refresh. Let's fix this by adding in our subscription.

```tsx
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

const ALL_CHATS = gql`
  query allChats {
    getChats {
      id
      name
      message
    }
  }
`;

const CHATS_SUBSCRIPTION = gql`
  subscription OnNewChat {
    messageSent {
      id
      name
      message
    }
  }
`;

const Chats = () => {
  const { loading, error, data, subscribeToMore } = useQuery(ALL_CHATS);

  useEffect(() => {
    subscribeToMore({
      document: CHATS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newChat = subscriptionData.data.messageSent;

        return {
          getChats: [...prev.getChats, newChat],
        };
      },
    });
  }, []);

  if (loading) return <p>"Loading...";</p>;
  if (error) return <p>`Error! ${error.message}`</p>;

  return (
    <div>
      {data.getChats.map((chat: any) => (
        <div key={chat.id}>
          <p>
            {chat.name}: {chat.message}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Chats;
```

We just changed a bunch of stuff so let's figure out what we did.

If you look closely, our UI logic hasn't changed one bit. However, our data fetching logic has.

The `useQuery` hook returns another function, `subscribeToMore()`. We can use this function to execute a followup GraphQL subscription that can push updates to our query's, i.e `allChats`, original results.

Now, we use the `subscribeToMore()` function inside a `useEffect` hook which has an empty dependency array, i.e, it fires when the component is mounted. We pass in two options to the `subscribeToMore()` function, `document` which indicates which subscription needs to be executed, and `updateQuery` which is a function that tells Apollo Client how to combine the query's currently cached result (`prev` here) with the `subscriptionData` that's pushed by our GraphQL subscription. The return value of this function completely replaces the current cached result for the query.

Thus, for `document` we pass in our subscription `CHATS_SUBSCRIPTION` defined as a GraphQL string, and for `updateQuery`, we pass in a function that appends the `newChat` received from our subscription to our previous chat data and returns that as an object that our UI can iterate over. The object is of the same type as the results of our `allChats` query but now has the latest chat at the last index of the `getChats` field array. Since this is a subscription, our cached chats will now get updated the moment a new chat arrives!

You might be wondering why we don't just execute the subscription using a `useSubscription` hook, eliminating the query altogether. We could, but this would result in the user getting only the messages after the user has entered the chat. We want to show previous chats as well which is why we chose this approach.

## Test it out

Finally, let's use the `Chats` and `SendMessage` component in our `App.tsx`

```tsx
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import Chats from "./Chats";
import SendMessage from "./SendMessage";
import { useState } from "react";

const wsLink = new WebSocketLink({
  uri: "ws://localhost:9000/subscriptions",
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: "http://localhost:9000/graphql",
  credentials: "include",
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const App = () => {
  const [name, setName] = useState<string>("");
  const [entered, setEntered] = useState<boolean>(false);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {!entered && (
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
            <button onClick={() => setEntered(true)}>Enter chat</button>
          </div>
        )}

        {name !== "" && entered && (
          <div>
            <Chats />
            <SendMessage name={name} />
          </div>
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
```

After saving, run `yarn start` and visit [localhost:3000](http://localhost:3000), enter the chat from 2 or 3 different browser tabs, and see the chats you send appear instantaneously in all tabs.

And voilà! We've successfully managed to make a full-stack chat application using GraphQL and TypeScript! You can now build on this even further and add in styles, a database, and even an authentication mechanism!

## Conclusion

If you'd like to dig deeper into GraphQL, Apollo Client/Server, and TypeGraphQL and discover all the cool things you can make with it, read the official docs,

[Apollo Client Docs](https://www.apollographql.com/docs/react/)

[Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)

[TypeGraphQL Docs](https://typegraphql.com/docs/introduction.html)

[GraphQL Docs](https://graphql.org/learn/)

Also, here's an [awesome list of resources](https://github.com/chentsulin/awesome-graphql) to learn further!

If you get stuck here's the [repo](https://github.com/saswatamcode/graphQLChat) with all the code!

For any queries reach out to my [socials](https://twitter.com/saswatamcode) or [GitHub](https://github.com/saswatamcode)!
