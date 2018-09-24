import React, {ReactNode} from 'react';
import ReactDatasheet from 'react-datasheet';

import {Store} from '@dump247/storybook-state';
import {SheetRenderer, RowRenderer} from '../';
import {ExampleCellType, ExampleModel} from './store/interfaces';
import {SheetActionCreators} from './store/actions';
import bindDispatch from './store/dispatcher';


type Props = {
  store: Store<ExampleModel>
}


export default function SheetRendererStory(props: Props): ReactNode {
  const {store} = props;
  const actions = bindDispatch(store, SheetActionCreators);

  const {rows, headers, selected} = store.state;
  const data: ExampleCellType[][] = rows.map(r => r.data);

  return (
    <ReactDatasheet
      data={data}
      sheetRenderer={props => <SheetRenderer {...props} headers={headers} />}
      rowRenderer={props => <RowRenderer {...props} />}
      valueRenderer={(cell: ExampleCellType) => cell.value}
      onCellsChanged={actions.cellsChanged}
      onSelect={actions.selectionChanged}
      selected={selected}
    />
  );
}
