import RDS from 'react-datasheet';
import {ColumnHeader} from '../../interfaces';

export type ExampleCellValue = string | number | null;
export interface ExampleCellType extends RDS.Cell<ExampleCellType> {
  value: ExampleCellValue;
}

export type ExampleModel = {
  id: string;
  headers: ColumnHeader[];
  rows: ExampleRow[];
  selected: RDS.Selection | null;
};

export type ExampleRow = {
  id: string;
  selected?: boolean;
  data: ExampleCellType[];
};

export type Grid = ExampleCellType[][];
