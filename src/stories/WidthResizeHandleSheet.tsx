import React, {Component, ReactNode} from 'react';
import ReactDatasheet from 'react-datasheet';
import memoize from 'memoize-one';

import {
  HeaderContainer,
  HeaderTitle,
  Sheet,
  Row,
  HeaderRendererProps,
  RowRendererProps,
  SheetRendererProps,
} from '../';
import {ScrollPanel, WidthResizeHandle} from '../resize';
import {DATA_GRID_RESIZABLE} from '../ClassNames';

import {ExampleCellType} from './store/interfaces';
import {renderValue, rowsToData} from './store/model';
import {ExampleProps} from './ExampleProps';


export default class WidthResizeHandleSheet extends Component<ExampleProps> {

  getData = memoize(rowsToData);

  sheetRenderer = (props: SheetRendererProps<ExampleCellType>) => {
    const {model: {headers, overflow}} = this.props;

    return (
      <Sheet
        {...props}
        overflow={overflow}
        headers={headers}
        headerRenderer={this.headerRenderer}
      />
    );
  };

  headerRenderer = (props: HeaderRendererProps) => (
    <HeaderContainer>
      <HeaderTitle {...props} />
      <WidthResizeHandle
        index={props.col}
        onResizing={this.props.actions.headerResizing}
        onResizeEnd={this.props.actions.headerResizeEnd}
      />
    </HeaderContainer>
  );

  rowRenderer = (props: RowRendererProps<ExampleCellType>) => (
    <Row {...props} />
  );

  render(): ReactNode {

    const {actions, model: {rows, selected}} = this.props;
    const data = this.getData(rows);

    return (
      <ScrollPanel height={120} width={450}>
        <ReactDatasheet
          className={DATA_GRID_RESIZABLE}
          data={data}
          sheetRenderer={this.sheetRenderer}
          rowRenderer={this.rowRenderer}
          valueRenderer={renderValue}
          onCellsChanged={actions.cellsChanged}
          onSelect={actions.selectionChanged}
          selected={selected}
        />
      </ScrollPanel>
    );
  }
}
