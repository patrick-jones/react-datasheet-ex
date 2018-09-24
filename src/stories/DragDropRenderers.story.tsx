import React, {ReactNode} from 'react';
import ReactDatasheet from 'react-datasheet';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import {Store} from '@dump247/storybook-state';
import {ExampleCellType, ExampleModel} from './store/interfaces';
import {SheetActionCreators} from './store/actions';
import bindDispatch from './store/dispatcher';


import {SheetRenderer} from '../';
import {DragDropRowRenderer, DragDropHeaderRenderer} from '../drag-drop';

type Props = {
  store: Store<ExampleModel>
};


export default function DNDProvidersStory(props: Props): ReactNode {
  const {store} = props;
  const actions = bindDispatch(store, SheetActionCreators);

  const {rows, headers, selected} = store.state;
  const data: ExampleCellType[][] = rows.map(r => r.data);


  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <ReactDatasheet
        data={data}
        sheetRenderer={props => (
          <SheetRenderer
            {...props}
            headers={headers}
            headerRenderer={hrProps =>
              <DragDropHeaderRenderer onHeaderDropped={actions.headerDropped} {...hrProps} />
            }
          />
        )}
        rowRenderer={props => <DragDropRowRenderer onRowDropped={actions.rowDropped} {...props} />}
        valueRenderer={(cell: ExampleCellType) => cell.value}
        onCellsChanged={actions.cellsChanged}
        onSelect={actions.selectionChanged}
        selected={selected}
      />
    </DragDropContextProvider>
  );
}
