# SeaJS

## Overview

**SeaJS** is a lightweight, frontend JavaScript framework designed for building web applications with minimal overhead. It offers a simple API for component-based development, state management, and signal handling. SeaJS focuses on performance and bundle size efficiency, making it ideal for projects where every kilobyte matters.

## Key Features

- **Component-Based Architecture**: Create and manage UI components easily.
- **State Management**: Efficiently manage and update application state.
- **Signal System**: Handle events and communication between different parts of the application.
- **Minimal Bundle Size**: Designed to be compact and performant.

## Installation

To use SeaJS, you need to include the built JavaScript file in your project. The framework is published on npm, so you can install it using:

```sh
npm install sea-js
```

```sh
As of 6th August 00:37 (IST) the framework isnt published on npm yet. That would be happening before 14th. Until then just fork and clone the repo, and hit npm i to install the dev dependencies and then use npm link to try it out.
```

## Basic Usage

### **Creating a Component**

You can create components using the `createComponent` function. Here’s a basic example:

```javascript
import { createComponent } from "sea-js";

function CounterComponent(state, setState) {
  function increment() {
    setState({ count: state.count + 1 });
  }
  function decrement() {
    setState({ count: state.count - 1 });
  }
  function notifySignal() {
    signals.emit('countUpdated', { count: state.count });
  }

  // Expose functions to the global scope
  window.increment = increment;
  window.decrement = decrement;
  window.notifySignal = notifySignal;

  // Subscribe to signal
  signals.subscribe('countUpdated', (data) => {
    console.log('Count updated to:', data.count);
  });

  return `
    <div>
      <h1>Welcome to SeaJS!</h1>
      <h6>A lightweight frontend framework made with love.</h6>
      <h2>Count: ${state.count}</h2>
      <button onclick="increment()">Increment</button>
      <button onclick="decrement()">Decrement</button>
      <button onclick="notifySignal()">Notify Signal</button>
    </div>
  `;
}

createComponent(CounterComponent, { count: 0 });
```
## Core Features

### 1. **Signal Handling**

SeaJS includes a simple signal system for managing events and communication:

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

### 2. **State Management**

SeaJS provides a basic store for managing application state:

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

window.store = new Store();
```

### 3. **The Create Components Function**

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

## Codebase Overview

- **`src/framework.js`**: Contains the core functionality of SeaJS, including the component system, state management, and signal system.
- **`dist/`**: Contains the compiled and minified versions of SeaJS. This is what gets published to npm and used in projects.
- **`rollup.config.js`**: Configuration for Rollup, used to bundle and optimize the code for production.
- **`.babelrc`**: Babel configuration for transpiling JavaScript code.
- **`public/style.css`**: Boilerplate CSS
- **`app.js`**: The boilerplate counter app
- **`tests`**: Contains all of the testing code (as of now just unit tests on `framework.js`)

## Contribution

Feel free to contribute to the development of SeaJS by submitting issues or pull requests. For detailed guidelines, please refer to the [CONTRIBUTING.md](#contributing.md) file.

## License

This project is licensed under the MIT License. See the [LICENSE](#license) file for details.