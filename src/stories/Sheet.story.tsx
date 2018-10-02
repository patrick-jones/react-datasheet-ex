import React, {ReactNode} from 'react';
import ReactDatasheet from 'react-datasheet';
import {Store} from '@dump247/storybook-state';

import {Sheet, Row} from '../';
import {ExampleCellType, ExampleModel} from './store/interfaces';
import {SheetActionCreators} from './store/actions';
import bindDispatch from './store/dispatcher';
import OverflowSelector from './OverflowSelector';


type Props = {
  store: Store<ExampleModel>
};


export default function SheetStory(props: Props): ReactNode {
  const {store} = props;
  const actions = bindDispatch(store, SheetActionCreators);

  const {rows, headers, selected, overflow} = store.state;
  const data: ExampleCellType[][] = rows.map(r => r.data);

  return (
    <div className='data-grid-story w100'>

      <OverflowSelector
        overflow={store.state.overflow}
        onOverflowChanged={actions.overflowChanged}
      />

      <ReactDatasheet
        data={data}
        sheetRenderer={props => <Sheet {...props} headers={headers} overflow={overflow} />}
        rowRenderer={props => <Row {...props} />}
        valueRenderer={(cell: ExampleCellType) => cell.value}
        onCellsChanged={actions.cellsChanged}
        onSelect={actions.selectionChanged}
        selected={selected}
      />
    </div>
  );
}
