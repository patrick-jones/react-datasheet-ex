import React, {ReactNode} from 'react';

import {Store} from '@dump247/storybook-state';
import {ExampleModel} from './store/interfaces';
import {SheetActionCreators} from './store/actions';
import bindDispatch from './store/dispatcher';


import OverflowSelector from './OverflowSelector';
import ResizableHeaderContainerSheet from './ResizableHeaderContainerSheet';


interface Props {
  store: Store<ExampleModel>;
}


export default function ResizableHeaderContainerStory(props: Props): ReactNode {
  const {store} = props;
  const actions = bindDispatch(store, SheetActionCreators);

  return (
    <div className='data-grid-story w100'>

      <OverflowSelector
        overflow={store.state.overflow}
        onOverflowChanged={actions.overflowChanged}
      />

      <ResizableHeaderContainerSheet model={store.state} actions={actions}/>
    </div>
  );
}
