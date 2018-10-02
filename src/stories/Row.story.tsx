import React, {ReactNode} from 'react';
import {Store} from '@dump247/storybook-state';

import {ExampleModel} from './store/interfaces';
import {SheetActionCreators} from './store/actions';
import bindDispatch from './store/dispatcher';
import RowExample from './RowExample';


type Props = {
  store: Store<ExampleModel>
};


export default function RowStory(props: Props): ReactNode {
  const {store} = props;
  const actions = bindDispatch(store, SheetActionCreators);

  const selected = store.state.rows.reduce(
    (accumulator, current, index) => {
      if (current.selected) {
        accumulator.push(index);
      }
      return accumulator;
    },
    [] as number[]
  ).join(', ');

  return (
    <div className='data-grid-story w100'>

      <div>
        <p><b>Selected rows:</b> {selected || '[none]'}</p>
      </div>

      <RowExample model={store.state} actions={actions}/>
    </div>
  );
}
