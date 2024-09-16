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