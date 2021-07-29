---
weight: 50
title: Write your first API with Deno
lastmod: "2020-05-19T05:35:07.322Z"
images:
    - cover.jpg
draft: false
description: ICYMI, Deno v1.0 has been released! Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust. Let's build a really simple REST API which lets us perform CRUD operations on a database of dogs!
date: "2020-05-19T05:35:07.322Z"
---

ICYMI, Deno v1.0 has been released!

## But what is Deno?

> Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.

That's according to the official [website](https://deno.land/).

​Ryan Dahl the original creator of Node.js (the popular server-side JavaScript runtime) announced Deno at JSConf EU 2018 in [his talk](https://youtu.be/M3BM9TB-8yA) "10 Things I Regret About Node.js". Deno is pretty similar to Node. Except that it's improved in many ways, since it was created to be a better implementation of Node.js. It has a ton of great features like security by default, TypeScript by default, ES modules and Golang-like package management.

If you're on twitter, you're probably already seen the influx of "x years of Deno experience" and "node, deno, oden, done..." jokes.

## Getting Started

Alright, enough said, let's get playing with Deno.

We're going to be building a really simple REST API which lets us perform CRUD operations on a database of dogs!

Make sure you've [installed](https://deno.land/manual/getting_started/installation) deno correctly.

We're going to be using the [Abc](https://deno.land/x/abc) deno web framework along with [MongoDB](https://deno.land/x/mongo). We'll also be using [Denv](https://deno.land/x/denv) to manage our environment variables. Keep in mind, that there are a ton of other web frameworks like [alosaur](https://github.com/alosaur/alosaur), [oak](https://github.com/oakserver/oak), [deno-express](https://github.com/NMathar/deno-express), [pogo](https://github.com/sholladay/pogo), [servest](https://github.com/keroxp/servest) that we can use but since deno is pretty new and I don't really have much of a preference yet, I'm using this one.

Make a new directory and create a file named `server.ts`. This will be our main file which will contain our router. We'll also import Denv and Abc and initialise an application.

```tsx
import { Application, Context } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import "https://deno.land/x/denv/mod.ts";

const app = new Application();

app
  .get("/hello", (c: Context) => {
    return "Hello, Abc!";
  })
  .start({ port: 8000 });
```

Now, if you've worked with node before, this'll look pretty familiar. Initially, we're importing `Application` and `Context` from the Abc module. We are basically initialising a new Abc application and then we're defining a route `/hello` with a callback function which will return "Hello, Abc!". The `start` method directs the application to start listening for requests at port 8000. Instead of request and response we have single argument `c` which is of type `Context` . Let's see this in action. To run our file we need to use the command `deno run server.ts` but if you run the file you're gonna get a bunch of errors. That's because deno is secure by default. It won't allow the application to access your system in any way. To allow it we need to add the `--allow-read` flag to allow Denv to read our `.env` file and `--allow-net` flag to give Abc access to our ports. Hence the command would be:

```bash
deno run --allow-read --allow-net server.ts
```

Now if you visit, [localhost:8000](http://localhost:8000) you should see "Hello, Abc!" printed on your screen.

Great! So let's add our database next.

## Database(MongoDB)

We're going to be getting our database url and name from environment variables. So in your `.env` file add the following.

```bash
DB_NAME=deno_dogs
DB_HOST_URL=mongodb://localhost:27017
```

Now add the following in your `config/db.ts` file

```tsx
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

// Initialize the plugin
await init();

class Database {
  public client: MongoClient;
  constructor(public dbName: string, public url: string) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;
  }
  connect() {
    const client = new MongoClient();
    client.connectWithUri(this.url);
    this.client = client;
  }
  get getDatabase() {
    return this.client.database(this.dbName);
  }
}

const dbName = Deno.env.get("DB_NAME") || "deno_dogs";
const dbHostUrl = Deno.env.get("DB_HOST_URL") || "mongodb://localhost:27017";
const db = new Database(dbName, dbHostUrl);
db.connect();

export default db;
```

Let's break down what we wrote. Fortunately deno works with mongoDB and thus we can import that module. This will download a mongoDB plugin. The `init()` method initialises the plugin and we define our `Database` class. The class has a constructor which takes in the url and name of the db. The `connect()` method connects to the mongoDB instance and the `getDatabase()` method is a getter function. At the bottom of the file we define an instance of the class, `db`, and initialise it with the dbName and dbHostUrl which we fetch from the `.env` file. We also call the `connect()` method and export `db`.

Cool! Now let's write the controllers which will let us perform CRUD operations on our db.

## Controllers

Inside the `controllers/dogs.ts` file add the following.

```tsx
import {
  HandlerFunc,
  Context,
} from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import db from "../config/db.ts";

// DB collection made
const database = db.getDatabase;
const dogs = database.collection("dogs");

// Dog type defined
interface Dog {
  _id: {
    $oid: string;
  };
  name: string;
  breed: string;
  age: string;
}

export const createDog: HandlerFunc = async (c: Context) => {
  try {
    const body = await (c.body());
    if (!Object.keys(body).length) {
      return c.string("Request can't be empty", 400);
    }
    const { name, breed, age } = body;

    const insertedDog = await dogs.insertOne({
      name,
      breed,
      age,
    });

    return c.json(insertedDog, 201);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const fetchAllDogs: HandlerFunc = async (c: Context) => {
  try {
    const fetchedDogs: Dog[] = await dogs.find();

    if (fetchedDogs) {
      const fetchedDogsList = fetchedDogs.length
        ? fetchedDogs.map((dog) => {
          const { _id: { $oid }, name, breed, age } = dog;
          return { id: $oid, name, breed, age };
        })
        : [];
      return c.json(fetchedDogsList, 200);
    }
  } catch (error) {
    return c.json(error, 500);
  }
};

export const fetchOneDog: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };

    const fetchedDog = await dogs.findOne({ _id: { "$oid": id } });

    if (fetchedDog) {
      const { _id: { $oid }, name, breed, age } = fetchedDog;
      return c.json({ id: $oid, name, breed, age }, 200);
    }
    return c.string("Dog not found", 404);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const updateDog: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };

    const body = await (c.body()) as {
      name?: string;
      breed?: string;
      age?: string;
    };

    if (!Object.keys(body).length) {
      return c.string("Request can't be empty", 400);
    }

    const fetchedDog = await dogs.findOne({ _id: { "$oid": id } });

    if (fetchedDog) {
      const { matchedCount } = await dogs.updateOne(
        { _id: { "$oid": id } },
        { $set: body },
      );
      if (matchedCount) {
        return c.string("Dog updated successfully!", 204);
      }
      return c.string("Unable to update dog");
    }

    return c.string("Dog not found", 404);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const deleteDog: HandlerFunc = async (c: Context) => {
  try {
    const { id } = c.params as { id: string };

    const fetchedDog = await dogs.findOne({ _id: { "$oid": id } });

    if (fetchedDog) {
      const deleteCount = await dogs.deleteOne({ _id: { "$oid": id } });

      if (deleteCount) {
        return c.string("Dog deleted successfully!", 204);
      }
      return c.string("Unable to delete dog");
    }

    return c.string("Dog not found", 404);
  } catch (error) {
    return c.json(error, 500);
  }
};
```

Alright so there's a lot happening here. First we're importing `HandlerFunc` and `Context` from the Abc module and `db` from our `config/db.ts` file. Then we call `getDatabase()` to get our "deno_dogs" db and define a collection "dogs" inside it. Next we define an interface `Dog` which has the properties of name, breed and age. With all that out of the way, let's move on to the functions.

Each function has a type of `HandlerFunc` and argument `c` which is of type `Context` . This lets us use this function as a callback for our routes. All the functions are almost similar so there isn't much to explain. We use `c.body()` to access our request body in case of `createDog` and `updateDog`. We return a json object or string via `c.json()` or `c.string()` along with HTTP codes in our return statements in all the above methods. We access url parameters via `c.params` in case of `fetchOneDog, updateDog` and `deleteDog`.

We also use the `dogs` object in our functions to manipulate our collection via methods like `.insertOne({}), .find({}), .findOne({}), .updateOne({})` and `deleteOne({})`. All of these methods are wrapped in try-catch blocks for error handling.

Now with our controllers defined we can proceed to defining our routes.

## Routes

In your `server.ts` file write the following.

```tsx
import { Application } from "https://deno.land/x/abc@v1.0.0-rc2/mod.ts";
import "https://deno.land/x/denv/mod.ts";
import {
  createDog,
  fetchAllDogs,
  fetchOneDog,
  updateDog,
  deleteDog,
} from "./controllers/dogs.ts";

const app = new Application();

app
  .get("/dogs", fetchAllDogs)
  .post("/dogs", createDog)
  .get("/dogs/:id", fetchOneDog)
  .put("/dogs/:id", updateDog)
  .delete("/dogs/:id", deleteDog)
  .start({ port: 8000 });
```

As you can see, we've imported all our controller functions and assigned each of them a route and an HTTP method. Plain and simple.

We are done writing our REST API. All that's left is to run it! To do that type in the following into your terminal:

```bash
deno run --allow-write --allow-read --allow-plugin --allow-net --allow-env --unstable server.ts
```

We have a few new flags this time. The `--allow-read/write` flags are for Denv and mongoDB, as they need read/write access to your filesystem. The `--allow-plugin` flag allows the use of the mongoDB plugin and the `--allow-env` is for allowing usage of environment variables.

A lot of Deno APIs are not stable yet so some of them are marked as unstable. To use these "unstable" APIs we need to add the `--unstable` flag.

Use a tool like [Postman](https://www.postman.com/) and send a POST request to [localhost:8000/dogs](http://localhost:8000/dogs) with the body as

```tsx
{
  "name": "Cheddar",
  "breed": "Corgi",
  "age": 11
}
```

Send a GET request to the same url to see your dogs! Similarly try out all the other routes.

So there you go! Now you know how to write a REST API with Deno.

Here's the [GitHub](https://github.com/saswatamcode/deno_dogs_api) repo of the code.

## Conclusion

Since there are a few bugs and also no explicit Code of Conduct for the project yet, I don't recommend using it for production just now. A CoC is an essential part of any open source project. However development is moving forward pretty quickly and this is one project to definitely keep an eye on!

For any queries reach out to my [socials](https://twitter.com/saswatamcode) or [GitHub](https://github.com/saswatamcode)!
