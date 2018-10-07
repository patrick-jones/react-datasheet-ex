import RDS from 'react-datasheet';
import {ColumnHeader, Overflow} from '../../interfaces';

export type ExampleCellValue = string | number | null;
export interface ExampleCellType extends RDS.Cell<ExampleCellType> {
  value: ExampleCellValue;
}

export interface ExampleModel {
  id: string;
  headers: ExampleHeader[];
  rows: ExampleRow[];
  selected: RDS.Selection | null;
  overflow: Overflow;
}

export interface ExampleHeader extends ColumnHeader {
  hidden?: boolean;
}

export interface ExampleRow {
  id: string;
  selected?: boolean;
  data: ExampleCellType[];
}

