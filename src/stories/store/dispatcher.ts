import {Store} from '@dump247/storybook-state';
import {ExampleModel} from './interfaces';
import {Actions, ActionsCreators, DispatchedActionCreator, DispatchedActions} from './actions';
import reducer from './reducer';
import {action} from '@storybook/addon-actions';

function dispatch<AC extends ActionsCreators>(store: Store<ExampleModel>, a: Actions<AC>) {
  action(a.type)(a.payload);
  const nextState = reducer(store.state, a);
  if (nextState && nextState !== store.state) {
    store.set(nextState);
  }
}

export default function bindDispatch<AC extends ActionsCreators>(
  store: Store<ExampleModel>,
  actionCreators: AC
): DispatchedActions<AC> {
  const bound = {} as any;
  Object.keys(actionCreators).forEach(key => {
    const orig = actionCreators[key];
    const ds: DispatchedActionCreator<typeof orig> = (...args) =>
      dispatch(store, actionCreators[key](...args));
    bound[key] = ds;
  });
  return bound as DispatchedActions<AC>;
}
