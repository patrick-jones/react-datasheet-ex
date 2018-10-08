import { ExampleModel } from './store/interfaces';
import { DispatchedActions, SheetActionCreators } from './store/actions';
export interface ExampleProps {
    model: ExampleModel;
    actions: DispatchedActions<SheetActionCreators>;
}
