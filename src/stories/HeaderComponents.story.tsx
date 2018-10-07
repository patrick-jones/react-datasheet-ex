import React, {ReactNode} from 'react';
import {Store} from '@dump247/storybook-state';
import {ExampleModel} from './store/interfaces';
import OverflowSelector from './OverflowSelector';
import bindDispatch from './store/dispatcher';
import {SheetActionCreators} from './store/actions';

import HeaderComponentsSheet from './HeaderComponentsSheet';

type Props = {
  store: Store<ExampleModel>
};


export default function story(props: Props): ReactNode {
  const {store} = props;
  const actions = bindDispatch(store, SheetActionCreators);

  return (
    <div className='data-grid-story w100'>

      <OverflowSelector
        overflow={store.state.overflow}
        onOverflowChanged={actions.overflowChanged}
      />

      <HeaderComponentsSheet model={store.state} actions={actions} />
    </div>
  );
}
