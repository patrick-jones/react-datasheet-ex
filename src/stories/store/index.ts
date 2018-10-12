import {model} from './model';
import {ExampleModel} from './interfaces';
import {Actions, SheetActionCreators} from './actions';
import reducer from './reducer';

export {model};

export function preprocess(model: ExampleModel, ...actions: Actions<SheetActionCreators>[]) {
  return actions.reduce(
    (reply, action) => {
      const nextState = reducer(reply, action);
      return Object.assign({}, reply, nextState);
    },
    model
  );
}
