import React, {ReactNode} from 'react';
import ReactDatasheet from 'react-datasheet';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'

import {Store} from '@dump247/storybook-state';
import {ExampleCellType, ExampleModel} from './store/interfaces';
import {SheetActionCreators} from './store/actions';
import bindDispatch from './store/dispatcher';


import {SheetRenderer} from '../';
import {DragDropRowProvider, DragDropHeaderProvider} from '../drag-drop';

type Props = {
  store: Store<ExampleModel>
}


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
              <DragDropHeaderProvider col={hrProps.col} onHeaderDropped={actions.headerDropped}>
                {({connectDragSource, connectDropTarget, isDropOver}) => {
                  const {header, children} = hrProps;

                  const dt = isDropOver ? 'rdr-sheet-renderer__header-cell--drop-target' : '';
                  const className = `cell read-only rdr-sheet-renderer__header-cell rdr-sheet-renderer__header-cell--drag-source ${dt}`;

                  return connectDropTarget(connectDragSource(
                    <th title={header.title} className={className}>
                      {children}
                    </th>
                  ));

                }}
              </DragDropHeaderProvider>
            }
          />
        )}
        rowRenderer={props =>
          <DragDropRowProvider row={props.row} onRowDropped={actions.rowDropped}>
            {({connectDragSource, connectDragPreview, connectDropTarget, isDropOver}) => {
              const dt = isDropOver ? 'rdr-sheet-renderer__row--drop-target' : '';
              const className = `rdr-sheet-renderer__row ${dt}`;
              return connectDropTarget(connectDragPreview(
                <tr key={`$row-${props.row}`} className={className}>
                  { connectDragSource(<td key='$$actionCell' className='cell read-only rdr-sheet-renderer__action-cell' />) }
                  {props.children}
                </tr>
              ));
            }}
          </DragDropRowProvider>
        }
        valueRenderer={(cell: ExampleCellType) => cell.value}
        onCellsChanged={actions.cellsChanged}
        onSelect={actions.selectionChanged}
        selected={selected}
      />
    </DragDropContextProvider>
  );
}