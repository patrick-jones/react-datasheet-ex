import React, {Component, Fragment, ReactNode} from 'react';
import memoize from 'memoize-one';

import {ExampleCellType, ExampleHeader, ExampleModel, ExampleRow} from './store/interfaces';
import {DispatchedActions, SheetActionCreators} from './store/actions';
import ReactDatasheet from 'react-datasheet';
import Sheet from '../Sheet';
import Row from '../Row';
import {
  HeaderRendererProps,
  RowRendererProps,
  SheetRendererProps,
} from '../interfaces';
import HeaderTitle from '../HeaderTitle';


export interface Props {
  model: ExampleModel;
  actions: DispatchedActions<SheetActionCreators>;
}

export default class HeaderComponentsSheet extends Component<Props> {

  getHeaders = memoize((headers: ExampleHeader[]) => {
    return headers.filter(header => !header.hidden);
  });

  getHidden = memoize((headers: ExampleHeader[]) => {
    return headers.filter(header => !!header.hidden);
  });

  getData = memoize((rows: ExampleRow[], headers: ExampleHeader[]) => {
    return rows.map(r => r.data.filter((cell, index) => !headers[index].hidden));
  });

  sheetRenderer = (props: SheetRendererProps<ExampleCellType>) => {
    const {model: {headers, overflow}} = this.props;
    return (
      <Sheet
        {...props}
        headers={this.getHeaders(headers)}
        overflow={overflow}
        headerRenderer={this.headerRenderer}
      />
    );
  };

  headerRenderer = (props: HeaderRendererProps<ExampleHeader>) => {
    const {actions} = this.props;
    return (
      <HeaderChip
        {...props}
        onHiddenChanged={actions.columnHiddenChanged}
      />
    );
  };

  rowRenderer = (props: RowRendererProps<ExampleCellType>) => (
    <Row {...props} />
  );

  render(): ReactNode {

    const {actions, model: {rows, headers, selected}} = this.props;
    const data = this.getData(rows, headers);
    const hidden = this.getHidden(headers);

    return(
      <Fragment>
        {
          hidden.length ?
            <HiddenColumns headers={hidden} onHiddenChanged={actions.columnHiddenChanged} /> :
              null
        }

        <ReactDatasheet
          data={data}
          sheetRenderer={this.sheetRenderer}
          rowRenderer={this.rowRenderer}
          valueRenderer={(cell: ExampleCellType) => cell.value}
          onCellsChanged={actions.cellsChanged}
          onSelect={actions.selectionChanged}
          selected={selected}
        />
      </Fragment>
    );
  }
}

const HiddenColumns = (
  {headers, onHiddenChanged}:
    {headers: ExampleHeader[], onHiddenChanged: (id: string, hidden: boolean) => void}
  ) => (
  <div className='hidden-columns'>
    {headers.map((header, index) => (
      <span key={header.id} className='hidden-column-chip'>
        <HeaderChip col={index} header={header} onHiddenChanged={onHiddenChanged} />
      </span>
    ))}
  </div>
);

interface ChipProps extends HeaderRendererProps<ExampleHeader> {
  onHiddenChanged: (id: string, hidden: boolean) => void;
}

const HeaderChip = (props: ChipProps) => (
    <div className='header-chip'>
      <HeaderTitle header={props.header} col={props.col} overflow={props.overflow} />
      <div
        className='header-chip__x'
        onClick={() => props.onHiddenChanged(props.header.id, !props.header.hidden)}
      >
        <CloseIcon />
      </div>
    </div>
);

/* tslint:disable:max-line-length */
const CloseIcon = () => (
  <img width='16' height='16' src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/><path d='M0 0h24v24H0z' fill='none'/></svg>" />
);
/* tslint:enable:max-line-length */
