---
title: 'React Context+Hooks API => Ideal State Management'
excerpt: "Hey there! React is pretty great with a ton of stuff. But sometimes we need global states, such as a UI theme or locale preferences. Learm how to tackle global state with context and hooks!"
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2020-05-07T05:35:07.322Z'
author:
  name: Saswata Mukherjee
  picture: '/assets/blog/authors/saswatamcode.jpeg'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
---

Hey there! React is pretty great with a ton of stuff. But sometimes we need global states, such as a UI theme or locale preferences. Now ordinarily, to pass states down to child components what we do is pass down props. But with global states, we have to pass down props several times down the component tree or the roots of a potato if you've seen [Women Of React 2020](https://www.youtube.com/watch?v=K8MF3aDg-bM). This creates a cumbersome phenomenon known as "prop drilling". This means that we are passing down the props from grandparent to parent to child and so on.

Now to solve this issue, you can use something like Redux, which is a completely fine solution, but restructures your entire code and necessitates a ton of boilerplate code. This makes it unsuitable for lightweight implementations. Keep in mind though that it doesn't affect performance.

## So what do we do?

Enter React Context API.

> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

That's the official React docs intro. It was introduced in React 16.3. It solves the global state management problem. Context is often touted as a lightweight alternative to Redux and provides much cleaner and simpler code. So let's get started with it!

So let's make a simple React app. Use `create-react-app` to generate one. And write the following in `App.js`

```jsx
function App() {
  return (
    <div className="App">
      <AppBar theme="white" />
    </div>
  );
}

function AppBar({theme}) {
  return(
    <div className="AppBar">
      <ThemedButton theme={theme}/>
    </div>
  );
}

function ThemedButton({theme}) {
  return(
    <div>
      <button style={{backgroundColor: theme}} />
    </div>
  )
}   
export default App;
```

Well, as you can see above, we have to thread the theme property through all the components, so that we can apply it to child elements. This is great for three components maybe, but imagine a full dynamic website, where the component tree might be huge and deep.

Let's try the same thing with React Context then. Now before you use Context you should keep in mind that this isn't meant for small number of props for a small number of components. For that, simple prop threading and component composition would be much simpler. So use it wisely.

```jsx
const ThemeContext = React.createContext('white');

function App() {
  return (
    <div className="App">
      <ThemeContext.Provider value={"black"}>
        <AppBar />
      </ThemeContext.Provider>
    </div>
  );
}

function AppBar() {
  return(
    <div className="AppBar">
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  return(
    <div>
      <ThemeContext.Consumer>
        {value => <button style={{backgroundColor: value}} />}
      </ThemeContext.Consumer>
    </div>
  )
}   
export default App;
```

Okay, that's a lot of new code and if you look closely you'll see that our props in the `AppBar` and `ThemedButton` component have disappeared. So what happened? Let's break it all down .

So notice at the top of the code snippet I have the line,

```jsx
const ThemeContext = React.createContext('white');
```

This is what creates the React Context object. Now, every Context object comes with a Provider and a consumer. Again if you refer to the above code you'll see them.

## Provider and Consumer

```jsx
//Provider
      <ThemeContext.Provider value={"black"}>
      </ThemeContext.Provider>
//Consumer
      <ThemeContext.Consumer>
      </ThemeContext.Consumer>
```

The Provider component allows consuming components to subscribe to context changes.

It accepts a `value` prop to be passed to consuming components that are descendants of this Provider. Thus, one Provider can be connected to many consumers. Providers can even be nested to override values deeper within the component tree.

All consumers that are descendants of a Provider will re-render whenever the Provider’s `value` prop changes. 

The Consumer component is the component which subscribes to the context changes. The Consumer component however requires a function as a child like [render props](https://reactjs.org/docs/render-props.html). The function receives the current context value and returns a React node. 

 The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. Thus, in the code above I have used the value to colour the button,

```jsx
      <ThemeContext.Consumer>
        {value => <button style={{backgroundColor: value}} />}
      </ThemeContext.Consumer>
```

## Get the value of the Context

So you know how to use the Context API now. But if you look at the Provider and think about the use cases, you'll quickly realise that it's a bit difficult to extract the context from our JSX code for implementing other functionality. Sure, there are workarounds but that isn't really ideal. You may see this somewhere, but it is usually legacy.

Now if `ThemedButton` was a class component we would be able to extract the context with contextType.

The `contextType property` on a class can be assigned a Context object. This lets you consume the nearest current value of that Context type using `this.context`. You can reference this in any of the lifecycle methods including the render function. So we could implement it like this.

```jsx
static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
```

However, we are using lightweight functional components and Hooks! So let's refactor our existing code a bit,

```jsx
import React, { useContext } from 'react';

const ThemeContext = React.createContext('white');

function App() {
  return (
    <div className="App">
      <ThemeContext.Provider value={"black"}>
        <AppBar />
      </ThemeContext.Provider>
    </div>
  );
}

function AppBar() {
  return(
    <div className="AppBar">
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext)
  return(
    <div>
        <button style={{backgroundColor: theme}} />
    </div>
  )
}   
export default App;
```

Over here, we've used the `useContext` hook which is the functional component equivalent  `contextType` . With `useContext` we can do away with the provider, and get the current context value outside of our JSX code.

## Updating Our Context

Updating our Context is as simple as updating a state. With functional components, we can use the `useState` hook to achieve this by passing down a function which will update out context,

```jsx
import React, { useState, useContext } from "react";

const ThemeContext = React.createContext({ theme: "white", toggler: () => {} });

function App() {
  const [color, setColor] = useState("white");
  const toPass = {
    theme: color,
    toggler: () => {
      return color === "white" ? setColor("black") : setColor("white");
    },
  };
  return (
    <div className="App">
      <ThemeContext.Provider value={toPass}>
        <AppBar />
      </ThemeContext.Provider>
    </div>
  );
}

function AppBar() {
  return (
    <div className="AppBar">
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const context = useContext(ThemeContext);
  return (
    <div>
      <button
        style={{ backgroundColor: context.theme }}
        onClick={context.toggler}
      />
    </div>
  );
}
export default App;
```

As you see above the `color` state is manipulated by a toggle function which we passed down via our Context. The toggle function from the global Context is then called by the button in a child component, which thus updates the global Context.

So there you go! You now know how to use Context and Hooks to maintain a global state throughout your component tree.

If you'd like to dig deeper into Context, read the official docs,

[Context - React](https://reactjs.org/docs/context.html)

For any queries reach out to my socials or GitHub!