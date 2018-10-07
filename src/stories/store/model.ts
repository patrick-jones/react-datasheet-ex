import {ExampleCellType, ExampleModel, ExampleRow} from './interfaces';

export const model: ExampleModel = {
  id: 'foobar',
  headers: [
    {id: 'A', title: 'Left', align: 'left', width: 80},
    {id: 'B', title: 'Right', align: 'right'},
    {id: 'C', title: 'Center'},
    {id: 'D', title: 'Long Title that Might Overflow'},
  ],
  rows: [
    {id: '1', selected: false, data: [{value: 1}, {value: 2}, {value: 3}, {value: 4}]},
    {id: '2', selected: true, data: [{value: 5}, {value: 6}, {value: 7}, {value: 8}]},
    {id: '3', selected: false, data: [{value: 9}, {value: 10}, {value: 11}, {value: 12}]},
  ],
  selected: null,
  overflow: 'clip',
};

export function rowsToData(rows: ExampleRow[]) {
  return rows.map(r => r.data);
}

export function renderValue(cell: ExampleCellType) {
  return cell.value;
}
