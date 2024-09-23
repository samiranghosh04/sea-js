import { BehaviorSubject } from 'rxjs';
const Store = (initialState = {}) => {const state = new BehaviorSubject(initialState);
  return{getState: () => state.getValue(),
    setState: newState => state.next({...state.getValue() || {}, ...newState}),
    subscribe: listener => state.subscribe(listener),};};
window.store = Store();
export const createComponent = (fn, init) => {store.setState(init);
  const render = () => document.getElementById('root').innerHTML = fn(store.getState(), store.setState);
  render(); store.subscribe(render);};