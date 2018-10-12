import { model } from './model';
import { ExampleModel } from './interfaces';
import { Actions, SheetActionCreators } from './actions';
export { model };
export declare function preprocess(model: ExampleModel, ...actions: Actions<SheetActionCreators>[]): ExampleModel;
