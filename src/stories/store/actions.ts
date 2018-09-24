import RDS from 'react-datasheet';
import {ExampleCellType} from './interfaces';

/**
 * Some quick redux-like interfaces
 */

/**
 * A redux-like action
 */
export type Action<P = any> = {
  readonly type: string;
  readonly payload: P;
};

/**
 * Abstract type for a function that creates an action
 */
export type ActionCreator = (...args: any[]) => Action;

/**
 * Abstract type for a mapping of keys are ActionCreator functions
 */
export type ActionsCreators = {
  [key: string]: ActionCreator;
};

/**
 * Abstract type for the Action objects returned by an ActionCreators mapping
 */
export type Actions<A extends ActionsCreators> = ReturnType<A[keyof A]>;

/**
 * Type for actions once they are run through the dispatch function
 */
export type DispatchedActionCreator<AC extends ActionCreator> = (...args: any[]) => void;

/**
 * Converts `actions` object from functions that return an Action to
 * functions with the same arguments that return void.
 */
export type DispatchedActions<TAC> = {
  [K in keyof TAC]: TAC[K] extends ((...args: infer A) => Action) ? (...args: A) => void : undefined
};

const createAction = <T extends string, P>(type: T, payload: P) => ({type, payload});

/**
 * Our specific actions
 */
export enum ActionTypes {
  CELLS_CHANGED = 'rds-ex__cells-changed',
  SELECTION_CHANGED = 'rds-ex__selection-changed',
  HEADER_DROPPED = 'rds-ex__header-dropped',
  ROW_DROPPED = 'rds-ex__row-dropped',
}

export const SheetActionCreators = {
  cellsChanged:
    (changes: RDS.CellsChangedArgs<ExampleCellType>, additions?: RDS.CellAdditionsArgs<string>) =>
      createAction(ActionTypes.CELLS_CHANGED, {changes, additions}),
  selectionChanged: (selected: RDS.Selection) =>
    createAction(ActionTypes.SELECTION_CHANGED, {selected}),
  headerDropped: (source: number, target: number) =>
    createAction(ActionTypes.HEADER_DROPPED, {source, target}),
  rowDropped: (source: number, target: number) =>
    createAction(ActionTypes.ROW_DROPPED, {source, target}),
};

export type SheetActionCreators = typeof SheetActionCreators;
