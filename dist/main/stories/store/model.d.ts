import { ExampleCellType, ExampleModel, ExampleRow } from './interfaces';
export declare const model: ExampleModel;
export declare function rowsToData(rows: ExampleRow[]): ExampleCellType[][];
export declare function renderValue(cell: ExampleCellType): string | number | null;
