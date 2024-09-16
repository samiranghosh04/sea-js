# SeaJS - The 235 Byte FE Framework

## Overview

**SeaJS** is a compact and straightforward frontend JavaScript framework designed to build web applications with minimal overhead. It provides a simple API for DOM manipulation, state management, and signal handling. While SeaJS utilizes the Real DOM, its primary strength lies in its minimalistic approach and exceptionally small bundle size of just 235 bytes. This makes it well-suited for projects where efficiency and a lightweight footprint are crucial. SeaJS aims to deliver a balance between simplicity and functionality, catering to scenarios where performance can be optimized through concise and effective code.

The primary motivation behind Sea JS was to create a simple, efficient, and easy-to-understand framework for managing state and rendering components. I wanted something that could handle basic UI tasks without the overhead of larger frameworks like React or Vue. By focusing on core functionalities, I aimed to keep the codebase minimal and maintainable.

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
  - **[Changes in the Codebase Regarding Signals and State Management](#changes-in-the-codebase-regarding-signals-and-state-management)**
- **[Codebase Overview](#codebase-overview)**
- **[Contribution](#contribution)**
- **[License](#license)**

## Key Features

- **State Management**: Efficiently manage and update application state using a robust store mechanism that integrates with RxJS-based signals for reactive state management.
- **Minimal Bundle Size**: Designed to be compact and performant. With a bundle size of just ***under 235 B***, SeaJS is the world's smallest frontend framework!

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
```

### 2. **The Create Components Function**

The `createComponent` function initializes a component with a given initial state and renders it:

```javascript
export function createComponent(componentFn, initialState) {
  window.store.setState(initialState);

  function render() {
    const state = window.store.getState();
    const html = componentFn(state, window.store.setState.bind(window.store));
    document.getElementById('root').innerHTML = html;
  }

  render();
  window.store.subscribe(render);
}
```

If the `createComponent` function has not been refined recently or if there hasn't been a specific update to it, you might want to remove or revise that point in the "What's New" section. If you have specific details about any recent changes to `createComponent`, please let me know so I can include accurate information.

If the function was not specifically updated but improvements were made in other areas, here’s a revised version:

## What's New

### Recent Updates

- **RxJS Integration for State Management**: The framework now incorporates RxJS-based signals for more dynamic and reactive state management. This integration enhances the ability to handle state changes and updates with greater flexibility and responsiveness.

- **Bundle Size Optimization:** SeaJS has achieved significant reductions in bundle size through continuous optimization. The bundle size has decreased from 1037 bytes to 288 bytes, then to 245 bytes, and most recently to an impressive 235 bytes. This progression highlights our commitment to maximizing performance and efficiency. We have reduced the bundle size by a whopping **77.338%!**.

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

### Changes in the Codebase Regarding Signals and State Management

As part of our recent updates, several significant changes have been made to the codebase to improve the handling of signals and state management. The primary modifications focusing on state management and signals handling. The transition to RxJS simplifies the state management logic and enhances the framework's efficiency. Below is a detailed overview of these changes:

**1. Original `window.signals` and `Store` Class**

- **Original `window.signals`**: The initial implementation of `window.signals` was designed to manage reactive signals within the framework. However, it faced issues with unpredictability and inefficient re-renders, which impacted overall performance and usability.

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

- **Original `Store` Class**: The original `Store` class was implemented to manage application state but was tightly coupled with `window.signals`. This setup led to challenges with state updates and reactivity, contributing to performance inefficiencies.

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

**2. New Implementation Using RxJS**

- **New State Management with RxJS**: The new implementation utilizes RxJS’s `BehaviorSubject` for state management. This approach provides a more robust and efficient solution for handling state updates and subscriptions. The integration of RxJS enhances the reactivity and reliability of the framework. The `Store` class has been updated to work with RxJS. This class now leverages `BehaviorSubject` to manage state changes, improving overall performance and predictability.

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


**3. Removal of `window.signals`**: The `window.signals` object has been removed from the codebase. RxJS’s `BehaviorSubject` now handles state updates and subscriptions, addressing the issues previously encountered with the custom signals implementation. For a temporary period of 5 days we relied on the unchanged, old implementation of `Store` to handle state management.
 

**5. Updated Documentation and Examples**: The documentation has been revised to include details on the new RxJS-based implementation and updated examples demonstrating the use of the new `Store` class.

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