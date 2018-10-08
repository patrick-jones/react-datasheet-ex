import { ExampleModel } from './interfaces';
import { Actions, SheetActionCreators } from './actions';
/**
 * Redux-like reducer function for mutating state via actions. If you are
 * using this as inspiration as your own code please note that this is good enough for
 * the demo, but it's not tested and has at least a couple of bugs that I know about.
 *
 * @param state ExampleModel
 * @param action Action to process
 */
export default function reducer(state: ExampleModel, action: Actions<SheetActionCreators>): Partial<ExampleModel>;
