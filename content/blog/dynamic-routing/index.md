---
weight: 50
title: Dynamic Pages in React Router
lastmod: "2020-07-03T05:35:07.322Z"
images: []
draft: false
description: If you've ever visited a site with a bunch of different users with different content from each user such as a blogging site or social media, you've probably noticed that each page of a particular user has a route. Let's see how that's done in react
date: "2020-07-03T05:35:07.322Z"
---

Hey there!

If you've ever visited a site with a bunch of different users with different content from each user such as a blogging site, social media or even [dev.to](http://dev.to), you've probably noticed that each page of a particular user has a route along the lines of `/username` or if you visit a particular article of the user on the site then a route like `/username/article`. You'll even notice that while all the pages have similar structure, their content is different.

This is what's known as dynamic pages and routes.

Let's see how we can implement this is React. We'll be using the Star Wars API to get a list of users and we'll generate separate pages and routes for all of them.

Keep in mind that this tutorial focusses on dynamic routing in React with React Router. For achieving the same results in Gatsby or Next.js the procedure will be different and will rely on their custom routing APIs.

## Get Started

With that out of the way let's get started. Create a new React project using `create-react-app`. Also install React Router by running `yarn add/npm i react-router-dom`. The `react-router-dom` module brings over the core functionality of the React Router to browser based applications.

Now open up your `App.js` and remove the default code and add the following import statements.

```jsx
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route} from "react-router-dom";

const App = () => {
  return (
    <>
      
    </>
  );
};

export default App;
```

For this tutorial we'll be using React Hooks to make our code simpler. In the same `App.js` file let's add another component called `HomePage` . Like the name suggests this will be our homepage from where we'll call the Star Wars API to get person data. We'll also define a route for this component.

```jsx
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route} from "react-router-dom";

const HomePage = () => {

  return (
    <>
			Home Page
    </>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
      </Router>
    </>
  );
};

export default App;
```

Great! So now if you run `yarn start/npm start` and visit `[localhost:3000/](http://localhost:3000/)` in your browser you should see "Home Page" written on your screen. Now let's go ahead and add in our API call.

```jsx
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://swapi.dev/api/people/", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {!isLoading &&
        data.map((person, index) => {
          return <h5 key={index}>{person.name}</h5>;
        })}
    </>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
      </Router>
    </>
  );
};

export default App;
```

Now that's a lot of new code. Let's break down what we wrote.

We have two states, `isLoading` which is a boolean which tells us whether we have received data from our API or not and `data` which contains the JSON that we'll receive from the API call.

We use a `useEffect` hook to fetch data when the `HomePage` component loads. When we get data from the API we set the value of `isLoading` to false and `data` to whatever JSON we get.

Now, if you look at the `jsx` inside the `HomePage` component you'll see that we check the value of `isLoading` and if it's false, we map through `data` to render the names of the Star Wars characters.

If you run your app now you should see the names pop up one after the other.

You can check out the Swapi documentation [here](https://swapi.dev/documentation).

## Making a dynamic component

But, we don't want a list of people, we also want separate pages at dynamic routes for each of them!

So let's create another component called `PersonPage` which will fetch data from an API getting the details of each person.

```jsx
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

const PersonPage = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${personId}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(`https://swapi.dev/api/people/${personId}`)
      })
      .catch((error) => console.log(error));
  }, [personId]);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Name: {data.name}</h1>
          <h2>Height: {data.height}</h2>
          <h2>Mass: {data.mass}</h2>
          <h2>Hair Color: {data.hair_color}</h2>
          <h2>Skin Color: {data.skin_color}</h2>
          <h2>Eye Color: {data.eye_color}</h2>
          <h2>Birth Year: {data.birth_year}</h2>
          <h2>Gender: {data.gender}</h2>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
  );
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://swapi.dev/api/people/", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {!isLoading &&
        data.map((person, index) => {
           return (
            <h5 key={index}>
              <Link to={`/person/${index + 1}`}>{person.name}'s Page</Link>
            </h5>
          );
        })}
    </>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/person/:personId" component={PersonPage} />
      </Router>
    </>
  );
};

export default App;
```

Again that's a lot of changes to our code.

We have defined a `PersonPage` component which lists details about each person by getting data from the API in the same fashion as `HomePage`. We have also defined a new route for this component i.e, `person/:personId`. This is a bit different compared to our regular routes. Here we pass a parameter `personId` through the route. That way a single component at that route can be dynamic based on that parameter.

`HomePage` has also changed and now returns links to this dynamic route with `index` as the route parameter.

If you observe `PersonPage` closely, you'll realise that the while the structure of it stays the same, all the content on the page is dependent on `personId` i.e, the component is fully dynamic. But `PersonPage` hasn't accessed this parameter yet. This is where we'll use a little bit of React Router magic.

## React Router magic

React Router passes two props to all of its routed components:

- `match` props
- `location` props

You can log them out in the console if you want to see them in their entirety. We'll be using the `match` prop to access the route parameters from the `PersonPage` component. The `match` prop has a property called `params` which will have the `personId` parameter. Let's modify our code!

```jsx
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

const PersonPage = ({ match }) => {
  const {
    params: { personId },
  } = match;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${personId}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(`https://swapi.dev/api/people/${personId}`);
      })
      .catch((error) => console.log(error));
  }, [personId]);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Name: {data.name}</h1>
          <h2>Height: {data.height}</h2>
          <h2>Mass: {data.mass}</h2>
          <h2>Hair Color: {data.hair_color}</h2>
          <h2>Skin Color: {data.skin_color}</h2>
          <h2>Eye Color: {data.eye_color}</h2>
          <h2>Birth Year: {data.birth_year}</h2>
          <h2>Gender: {data.gender}</h2>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
  );
};

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://swapi.dev/api/people/", {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {!isLoading &&
        data.map((person, index) => {
          return (
            <h5 key={index}>
              <Link to={`/person/${index + 1}`}>{person.name}'s Page</Link>
            </h5>
          );
        })}
    </>
  );
};

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route path="/person/:personId" component={PersonPage} />
      </Router>
    </>
  );
};

export default App;
```

There you go!

`PersonPage` now accesses the `personId` parameter via ES6 destructuring and uses it for the API call. Run your React app and you'll see `HomePage` populate itself with links and clicking on any person's link will lead you to a dynamic page consisting of all the details of that person. The route will also be dynamic in the form of `/person/{number}`.

## Conclusion

If you'd like to dig deeper into React Router and discover all the cool stuff you can do with it, read the official docs,

[React Router Docs](https://reactrouter.com/web/guides/quick-start)

For any queries reach out to my [socials](https://twitter.com/saswatamcode) or [GitHub](https://github.com/saswatamcode)!
