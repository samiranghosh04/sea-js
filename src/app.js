import { createComponent } from "./framework.js";
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
  window.increment = increment;
  window.decrement = decrement;
  window.notifySignal = notifySignal;
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

  