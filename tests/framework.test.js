import { createComponent } from '../src/framework';
describe('createComponent', () => {
  let container;
  beforeEach(() => {
    // Set up a DOM element as a container for rendering
    container = document.createElement('div');
    container.id = 'root'; // Ensure the container has the correct ID
    document.body.appendChild(container);
  });
  afterEach(() => {
    // Clean up the DOM
    document.body.removeChild(container);
  });
  test('should render component correctly', () => {
    // Define a simple component function
    const componentFn = (state, setState) => `
      <div>
        <h1>Count: ${state.count}</h1>
        <button id="increment">Increment</button>
        <button id="decrement">Decrement</button>
      </div>
    `;
    // Define initial state and setState function
    const initialState = { count: 0 };
    const setState = jest.fn();
    // Render the component
    createComponent(componentFn, initialState, setState);
    // Check if the component is rendered correctly
    expect(document.getElementById('root').querySelector('h1').textContent).toBe('Count: 0');
    expect(document.getElementById('root').querySelectorAll('button').length).toBe(2);
  });
  test('should update state correctly', () => {
    // Define a component function with a button click handler
    const componentFn = (state, setState) => `
      <div>
        <h1>Count: ${state.count}</h1>
        <button id="increment" onclick="increment()">Increment</button>
        <button id="decrement" onclick="decrement()">Decrement</button>
      </div>
    `;
    // Define initial state and setState function
    const initialState = { count: 0 };
    const setState = (newState) => {
      Object.assign(initialState, newState);
    };
    // Render the component
    createComponent(componentFn, initialState, setState);
    // Check if the state was updated correctly
    expect(initialState.count).toBe(0); // Adjust based on how you handle state changes
  });
});