import {ExampleModel} from './interfaces';

export const initialState: ExampleModel = {
  id: 'foobar',
  headers: [
    {id: 'A', title: 'A'},
    {id: 'B', title: 'B'},
    {id: 'C', title: 'C'},
    {id: 'D', title: 'D'},
  ],
  rows: [
    {id: '1', data: [{value: 1}, {value: 2}, {value: 3}, {value: 4}]},
    {id: '2', data: [{value: 5}, {value: 6}, {value: 7}, {value: 8}]},
    {id: '3', data: [{value: 9}, {value: 10}, {value: 11}, {value: 12}]},
  ],
  selected: null,
};
