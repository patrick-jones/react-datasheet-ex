import { Store } from '@dump247/storybook-state';
import { ExampleModel } from './interfaces';
import { ActionsCreators, DispatchedActions } from './actions';
export default function bindDispatch<AC extends ActionsCreators>(store: Store<ExampleModel>, actionCreators: AC): DispatchedActions<AC>;
