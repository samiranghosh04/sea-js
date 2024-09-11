import { createComponent } from "./framework.js";
function CounterComponent(state, setState) {
  function increment() {
    setState({ count: state.count + 1 });
    console.log(state.count + 1)
  }
  function decrement() {
    setState({ count: state.count - 1 });
    console.log(state.count - 1)
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