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