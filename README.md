# SeaJS - The 209 Byte UI Framework

## Overview

**SeaJS** is a compact and straightforward frontend JavaScript framework designed to build web applications with minimal overhead. It provides a simple API for DOM manipulation, state management, and signal handling. While SeaJS utilizes the Real DOM, its primary strength lies in its minimalistic approach and exceptionally small bundle size of just 209 bytes. This makes it well-suited for projects where efficiency and a lightweight footprint are crucial. SeaJS aims to deliver a balance between simplicity and functionality, catering to scenarios where performance can be optimized through concise and effective code.

The primary motivation behind Sea JS was to create a simple, efficient, and easy-to-understand framework for managing state and rendering components. I wanted something that could handle basic UI tasks without the overhead of larger frameworks like React or Vue. By focusing on core functionalities, I aimed to keep the codebase minimal and maintainable, while prioritizing the absolutely smallest achievable bundle size.
Here is an updated **Table of Contents** for your SeaJS documentation based on the latest changes:

---

## Table of Contents

- **[Overview](#overview)**
- **[Key Features](#key-features)**
- **[Installation and Setup](#installation-and-setup)**
  - **[Installation via the Brand New CLI](#installation-via-the-brand-new-cli)**
    - **[Using `npx`](#using-npx)**
    - **[Global Installation](#global-installation)**
    - **[Usage](#usage)**
  - **[Installation and Setup in the Traditional Way](#installation-and-setup-in-the-traditional-way)**
    - **[Initialize a Node.js Project](#initialize-a-nodejs-project)**
    - **[Install the Framework](#install-the-framework)**
    - **[Setup a Module Bundler](#setup-a-module-bundler)**
    - **[Create an `index.html` File](#create-an-indexhtml-file)**
    - **[Create the `src/` Folder and `app.js`](#create-the-src-folder-and-appjs)**
    - **[Make Sure That `app.js` is Properly Linked to `index.html`](#make-sure-that-appjs-is-properly-linked-to-indexhtml)**
    - **[Start the Development Server](#start-the-development-server)**
- **[Basic Usage](#basic-usage)**
  - **[Creating a Component](#creating-a-component)**
- **[Core Features](#core-features)**
  - **[State Management](#state-management)**
  - **[The Create Components Function](#the-create-components-function)**
- **[What's New](#whats-new)**
  - **[Recent Updates](#recent-updates)**
  - **[Why We Removed Our Implementation of Signals and Switched to RxJS](#why-we-removed-our-implementation-of-signals-and-switched-to-rxjs)**
  - **[Why We Switched to a Function-Based `Store` and Refactored `createComponent`](#why-we-switched-to-a-function-based-store-and-refactored-createcomponent)**
  - **[Changes in the Codebase Regarding Signals and State Management](#changes-in-the-codebase-regarding-signals-and-state-management)**
- **[Codebase Overview](#codebase-overview)**
- **[Contribution](#contribution)**
- **[License](#license)**

---

## Key Features

- **State Management**: Efficiently manage and update application state using a robust store mechanism that integrates with RxJS-based signals for reactive state management.
- **Minimal Bundle Size**: Designed to be compact and performant. With a bundle size of just ***under 209 B***, SeaJS is the world's smallest frontend framework!

## Installation and Setup

### Installation via the brand new CLI

Sea JS now comes with a new basic CLI called the `create-sea-app`. You can check it out here on [GitHub](https://github.com/samiranghosh04/create-sea-app) or [npm](https://www.npmjs.com/package/create-sea-app). This is recommended for people new to web dev, people who want a quick starter app and general users. You can use it either via npx or globally install it -

#### Using `npx`

You can use the CLI without installing it globally by running:

```bash
npx create-sea-app <project-name>
```

#### Global Installation

To install the CLI globally:

```bash
npm install -g create-sea-app
```

#### Usage

After installation, you can use the CLI to create a new project:

```bash
create-sea-app <project-name>
```

Replace `<project-name>` with  the name of your project.

### Installation and Setup in the Traditional Way

If however, you want to setup a new project with a custom configuration and any other module bundlers such as Webpack, Parcel, ES Build, or something else you can follow these steps.

#### 1. Initialize a Node.js Project

First, you need to set up a Node.js project. In your terminal, navigate to the folder where you want to create the project and run:

```bash
npm init -y
```

This will create a `package.json` file in your project folder, initializing the Node.js project.

#### 2. Install the Framework

Once your project is initialized, install the framework from npm:

```bash
npm i sea-js-ui-core
```

This will add the framework to your project dependencies.

#### 3. Setup a Module Bundler

To bundle your application, you’ll need to set up a module bundler. We recommend using **Vite** for fast builds and hot reloading. You can install and configure Vite by running the following commands:

```bash
npm i vite --save-dev
```

Update the `package.json` under the `"scripts"` section. Here is how you do it if you use `Vite`:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
```

#### 4. Create an `index.html` File

In the root of your project folder, create an `index.html` file that will serve as the entry point for your application. Add the following basic HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sea JS</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="src/app.js"></script>
</body>
</html>
```

#### 5. Create the `src/` Folder and `app.js`

Next, create a folder called `src` in the root of your project. Inside the `src` folder, create a file called `app.js` where you will write your main application logic.

Here’s an example of what your `app.js` file might look like:

```javascript
import { createComponent } from "sea-js-ui-core";

function CounterComponent(state, setState) {
  function increment() {
    setState({ count: state.count + 1 });
    console.log(state.count + 1);
  }
  function decrement() {
    setState({ count: state.count - 1 });
    console.log(state.count - 1);
  }
  window.increment = increment;
  window.decrement = decrement;
  return `
    <div>
      <h1>Welcome to SeaJS!</h1>
      <h6>A lightweight frontend framework made with love.</h6>
      <h2>Count: ${state.count}</h2>
      <button onclick="increment()">Increment</button>
      <button onclick="decrement()">Decrement</button>
    </div>
  `;
}

createComponent(CounterComponent, { count: 0 });
```

#### 6. Make sure that `app.js` is properly linked to `index.html`

Make sure the `<script>` tag in `index.html` correctly links to your `app.js` file. The structure provided above already does this with:

```html
<script type="module" src="/src/app.js"></script>
```

#### 7. Start the Development Server

Now you can run the development server using Vite. Simply run:

```bash
npm start
```

That's it! You now have a basic setup with your framework, ready for development.

## Basic Usage

### **Creating a Component**

You can create components using the `createComponent` function. Here’s a basic example:

```javascript
import { createComponent } from "sea-js";

function CounterComponent(state, setState) {
  function increment() {
    setState({ count: state.count + 1 });
    console.log(state.count + 1);
  }
  function decrement() {
    setState({ count: state.count - 1 });
    console.log(state.count - 1);
  }

  // Expose functions to the global scope
  window.increment = increment;
  window.decrement = decrement;

  return `
    <div>
      <h1>Welcome to SeaJS!</h1>
      <h6>A lightweight frontend framework made with love.</h6>
      <h2>Count: ${state.count}</h2>
      <button onclick="increment()">Increment</button>
      <button onclick="decrement()">Decrement</button>
    </div>
  `;
}

createComponent(CounterComponent, { count: 0 });
```

## Core Features

### 1. **State Management**

SeaJS now provides a RxJS based store for managing application state:

```javascript
  import { BehaviorSubject } from 'rxjs';

  const Store = (initialState = {}) => {
    const state = new BehaviorSubject(initialState);

    return{
      getState: () => state.getValue(),
      setState: newState => state.next({...state.getValue() || {}, ...newState}),
      subscribe: listener => state.subscribe(listener),
    };
  };

  window.store = Store();
```

### 2. **The Create Components Function**

The `createComponent` function initializes a component with a given initial state and renders it:

```javascript
export const createComponent = (fn, init) => {
  store.setState(init);
  const render = () => document.getElementById('root').innerHTML = fn(store.getState(), store.setState);

  render();
  store.subscribe(render);
};
```

## What's New

### Recent Updates

- **RxJS Integration for State Management**: The framework now incorporates RxJS-based signals for more dynamic and reactive state management. This integration enhances the ability to handle state changes and updates with greater flexibility and responsiveness.

- **Function-Based Store Implementation:** The `Store` class has been further refactored into a more streamlined and functional approach. This change simplifies state management, helped us reduce the bundle size and it improves overall performance, while still leveraging RxJS's powerful reactivity.

- **`createComponent` Function Refactor**: The `createComponent` function has been refactored to integrate seamlessly with the new RxJS-based `Store` implementation. This refactor allows for automatic re-rendering upon state changes and simplifies how components are initialized and updated. The updated function ensures better synchronization between state management and UI rendering, enhancing both developer experience and application performance. It is also now simpler to facilitate even smaller bundle size.

- **Bundle Size Optimization:** SeaJS has achieved significant reductions in bundle size through continuous optimization. The bundle size has decreased from 1037 bytes to 288 bytes, then to 245 bytes, and finally to an impressive 235 bytes. This was further improved by switching to a function based `Store` from the class based implementation, and a more aggressive setup for Rollup and Terser leading to another whopping 11.064% reduction in bundle size making it just under 209 bytes. This progression highlights our commitment to maximizing performance and efficiency. We have reduced the bundle size by a whopping **79.85%** from the original v0.0.1.

- **Streamlined CLI**: The new `create-sea-app` CLI tool has been introduced to simplify project setup. This CLI offers a quick and easy way to generate new SeaJS projects with a single command, streamlining the development workflow.

- **Updated Documentation**: The documentation has been enhanced to include detailed examples and usage instructions for the latest features. This update aims to provide clearer guidance and support for both new and existing users.

- **Bug Fixes and Performance Enhancements**: Various minor bugs have been addressed, and performance optimizations have been made to ensure a smoother development experience and more efficient runtime performance.



### Why We Removed Our Implementation of Signals and Switched to RxJS

Recently, we made significant changes to our state management approach by removing our custom implementation of signals and adopting RxJS-based signals. Here’s an overview of the reasons behind these decisions:

**1. Technical Challenges with Custom Signals Implementation**: Our initial implementation of signals faced several technical challenges and limitations. These included compatibility concerns, performance inconsistencies, and integration difficulties with other parts of the framework. 

**2. Issues with `window.signals`**: The original `window.signals` implementation was found to be unpredictable under certain circumstances. It often resulted in more re-renders than necessary due to its inefficient handling of state updates. This behavior led to performance issues and inconsistencies in the UI, prompting us to seek a more reliable solution.

**3. Use of a Store Without Dedicated `window.signals`**: For the past five days, we utilized a store-based approach without a dedicated `window.signals` object. This interim solution was implemented to simplify state management and to ensure basic functionalities remained intact while we worked on transitioning to a more reliable system. While it addressed some immediate concerns, it still lacked the reactivity and efficiency we needed.

**4. Adoption of RxJS for Enhanced Reactivity**: After evaluating various options, we chose RxJS due to its mature and well-established ecosystem for reactive programming. RxJS provides a powerful set of tools for managing asynchronous data streams and handling state changes efficiently. Its extensive community support and proven track record made it a suitable replacement for our custom signals.

**5. Improved Performance and Reliability**: RxJS offers advanced features and optimizations that enhance overall performance and reliability. By leveraging RxJS-based signals, we can provide a more consistent and responsive experience for developers and users alike, with better control over re-renders and state management.

**6. Streamlined Development and Maintenance**: Adopting RxJS allows us to benefit from a widely-used library with ongoing support and updates. This shift not only simplifies our development process but also reduces the maintenance burden associated with managing and updating a custom implementation.

In summary, the switch from our custom signals to RxJS and the interim use of a store-based approach without `window.signals` reflect our commitment to delivering a more reliable, efficient, and maintainable framework. These changes align with our goal of providing an optimal development experience while ensuring the robustness of SeaJS.


### Why We Switched to a Function-Based `Store` and Refactored `createComponent`

As part of our continuous effort to optimize the framework, we transitioned from a class-based `Store` implementation to a function-based one. Alongside this change, the `createComponent` function was also refactored. These updates were driven by the need for a more lightweight, efficient, and flexible state management system, as well as performance optimizations. Here’s why we made this switch:

**1. Bundle Size Reduction**: The switch from a class-based `Store` to a functional approach led to a significant reduction in bundle size. The function-based `Store` is more compact and allowed us to eliminate unnecessary code. This optimization, coupled with additional changes to make Rollup and Terser more aggressive, cut down the bundle size by an impressive **11.064%**, contributing to SeaJS's ongoing goal of maximizing efficiency.

**2. Simplification of State Management**: The function-based `Store` provides a simpler, more declarative way of handling state updates and subscriptions. This streamlined approach makes the code easier to maintain, reduces the cognitive load on developers, and enhances the clarity of state management logic.

**3. Performance Optimizations**: Functional components are generally more performant, as they eliminate the need for class instantiation and can be more easily optimized by JavaScript engines. The function-based `Store` integrates seamlessly with RxJS and allows for more efficient handling of state changes and reactivity, further boosting performance.

**4. Flexibility and Extensibility**: By switching to a function-based architecture, the `Store` and `createComponent` functions become more flexible and easier to extend. This allows developers to customize their state management logic with less effort and ensures that the framework can adapt to different use cases without being tied to a rigid class structure.

**5. Better Integration with Functional Programming Paradigms**: The function-based `Store` aligns with modern JavaScript development practices, which favor functional programming paradigms. This update makes it easier to integrate SeaJS with other libraries and tools that follow a similar approach, resulting in a more cohesive and flexible development experience.

**6. `createComponent` Refactor**: The `createComponent` function was refactored to complement the new function-based `Store`. This update not only simplifies how components are created and rendered but also optimizes re-rendering on state changes, ensuring smoother updates and reducing unnecessary performance overhead.

In summary, these changes reflect our commitment to building a more efficient, lightweight, and maintainable framework while delivering optimal performance and modern development practices.

---

### Changes in the Codebase Regarding Signals and State Management

As part of our recent updates, several significant changes have been made to the codebase to improve the handling of signals and state management. The primary modifications focus on simplifying state management and enhancing framework efficiency through the adoption of RxJS. Below is a detailed overview of these changes:

**1. Original `window.signals` and `Store` Class**

- **Original `window.signals`**: The initial implementation was designed to manage reactive signals but faced issues with unpredictability and inefficient re-renders.

   ```javascript
   window.signals = {
       listeners: {},
       subscribe(signalName, callback) {
           if (!this.listeners[signalName]) {
               this.listeners[signalName] = [];
           }
           this.listeners[signalName].push(callback);
       },
       emit(signalName, data) {
           if (this.listeners[signalName]) {
               this.listeners[signalName].forEach(callback => callback(data));
           }
       }
   };
   ```

- **Original `Store` Class**: The previous implementation of the `Store` class was tightly coupled with `window.signals`, leading to performance inefficiencies.

   ```javascript
   class Store {
       constructor(initialState = {}) {
           this.state = initialState;
           this.listeners = [];
       }
       getState() {
           return this.state;
       }
       setState(newState) {
           this.state = { ...this.state, ...newState };
           this.notify();
       }
       subscribe(listener) {
           this.listeners.push(listener);
       }
       notify() {
           this.listeners.forEach(listener => listener(this.state));
       }
   }
   ```

**2. Refactored RxJS-Based Version**

To address the limitations of the original implementation, we refactored the `Store` class to leverage RxJS. This class-based version utilizes `BehaviorSubject` for state management, providing a more robust and efficient solution:

   ```javascript
   import { BehaviorSubject } from 'rxjs';

   class Store {
       constructor(initialState = {}) {
           this.state = new BehaviorSubject(initialState);
       }
       getState() {
           return this.state.getValue();
       }
       setState(newState) {
           const currentState = this.state.getValue();
           const updatedState = { ...currentState, ...newState };
           this.state.next(updatedState);
       }
       subscribe(listener) {
           return this.state.subscribe(listener);
       }
   }

   window.store = new Store();
   ```

**3. New Functional Implementation**

We have since transitioned to a more streamlined functional approach for the `Store`, simplifying the API and enhancing performance:

   ```javascript
   import { BehaviorSubject } from 'rxjs';

   const Store = (initialState = {}) => {
       const state = new BehaviorSubject(initialState);
       return {
           getState: () => state.getValue(),
           setState: newState => state.next({ ...state.getValue() || {}, ...newState }),
           subscribe: listener => state.subscribe(listener),
       };
   };

   window.store = Store();
   ```

**4. Component Creation**: The `createComponent` function has also been updated to work with the new `Store` structure, facilitating easier reactivity and rendering:

   ```javascript
   export const createComponent = (fn, init) => {
       store.setState(init);
       const render = () => {
           document.getElementById('root').innerHTML = fn(store.getState(), store.setState);
       };
       render();
       store.subscribe(render);
   };
   ```

**5. Removal of `window.signals`**: The `window.signals` object has been removed from the codebase. RxJS’s `BehaviorSubject` now handles state updates and subscriptions, effectively addressing previous issues with the custom signals implementation.

**6. Bundle Size Optimization**: With additional changes made to make Rollup and Terser more aggressive, the bundle size has been further optimized, achieving a reduction of **11.064%** between v0.0.7 and 0.0.8. This contributes to the overall performance enhancements of SeaJS.

**7. Updated Documentation and Examples**: The documentation has been revised to include details on the new RxJS-based implementation and updated examples demonstrating the use of the new `Store` class.

These changes aim to improve the reliability, performance, and maintainability of SeaJS by leveraging RxJS for more advanced and efficient state management.

These changes are aimed at improving the reliability, performance, and maintainability of SeaJS by leveraging RxJS for more advanced and efficient state management.

## Codebase Overview

- **`src/framework.js`**: Contains the core functionality of SeaJS, including the createComponent function and a RxJS based store.
- **`dist/`**: Contains the compiled and minified versions of SeaJS. This is what gets published to npm and used in projects.
- **`rollup.config.js`**: Configuration for Rollup, used to bundle and optimize the code for production.
- **`.babelrc`**: Babel configuration for transpiling JavaScript code.
- **`public/style.css`**: Boilerplate CSS
- **`app.js`**: The boilerplate counter app used for testing.
- **`tests`**: Contains all of the testing code (as of now just unit tests on `framework.js`)

## Contribution

Feel free to contribute to the development of SeaJS by submitting issues or pull requests. For detailed guidelines, please refer to the [CONTRIBUTING.md](#contributing.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](#license) file for details.