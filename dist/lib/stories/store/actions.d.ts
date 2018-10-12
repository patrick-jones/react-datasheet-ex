import RDS from 'react-datasheet';
import { ExampleCellType } from './interfaces';
/**
 * Some quick redux-like interfaces
 */
/**
 * A redux-like action
 */
export declare type Action<P = any> = {
    readonly type: string;
    readonly payload: P;
};
/**
 * Abstract type for a function that creates an action
 */
export declare type ActionCreator = (...args: any[]) => Action;
/**
 * Abstract type for a mapping of keys are ActionCreator functions
 */
export declare type ActionsCreators = {
    [key: string]: ActionCreator;
};
/**
 * Abstract type for the Action objects returned by an ActionCreators mapping
 */
export declare type Actions<A extends ActionsCreators> = ReturnType<A[keyof A]>;
/**
 * Type for actions once they are run through the dispatch function
 */
export declare type DispatchedActionCreator<AC extends ActionCreator> = (...args: any[]) => void;
/**
 * Converts `actions` object from functions that return an Action to
 * functions with the same arguments that return void.
 */
export declare type DispatchedActions<TAC> = {
    [K in keyof TAC]: TAC[K] extends ((...args: infer A) => Action) ? (...args: A) => void : undefined;
};
/**
 * Our specific actions
 */
export declare enum ActionTypes {
    CELLS_CHANGED = "rds-ex__cells-changed",
    SELECTION_CHANGED = "rds-ex__selection-changed",
    OVERFLOW_CHANGED = "rds-ex__overflow-changed",
    HEADER_DROPPED = "rds-ex__header-dropped",
    ROW_DROPPED = "rds-ex__row-dropped",
    ROW_SELECTION_CHANGED = "rds-ex__row-selection-changed",
    COLUMN_HIDDEN_CHANGED = "rds-ex__column-hidden-changed",
    HEADER_RESIZING = "rds-ex__header-resizing",
    HEADER_RESIZE_END = "rds-ex__header-resize-end"
}
export declare const SheetActionCreators: {
    cellsChanged: (changes: {
        cell: ExampleCellType | null;
        row: number;
        col: number;
        value: string | null;
    }[], additions?: {
        row: number;
        col: number;
        value: string | null;
    }[] | undefined) => {
        type: ActionTypes.CELLS_CHANGED;
        payload: {
            changes: {
                cell: ExampleCellType | null;
                row: number;
                col: number;
                value: string | null;
            }[];
            additions: {
                row: number;
                col: number;
                value: string | null;
            }[] | undefined;
        };
    };
    selectionChanged: (selected: RDS.Selection) => {
        type: ActionTypes.SELECTION_CHANGED;
        payload: {
            selected: RDS.Selection;
        };
    };
    overflowChanged: (overflow: "wrap" | "nowrap" | "clip" | undefined) => {
        type: ActionTypes.OVERFLOW_CHANGED;
        payload: {
            overflow: "wrap" | "nowrap" | "clip" | undefined;
        };
    };
    headerDropped: (source: number, target: number) => {
        type: ActionTypes.HEADER_DROPPED;
        payload: {
            source: number;
            target: number;
        };
    };
    rowDropped: (source: number, target: number) => {
        type: ActionTypes.ROW_DROPPED;
        payload: {
            source: number;
            target: number;
        };
    };
    rowSelectionChanged: (row: number, selected: boolean) => {
        type: ActionTypes.ROW_SELECTION_CHANGED;
        payload: {
            row: number;
            selected: boolean;
        };
    };
    columnHiddenChanged: (id: string, hidden: boolean) => {
        type: ActionTypes.COLUMN_HIDDEN_CHANGED;
        payload: {
            id: string;
            hidden: boolean;
        };
    };
    headerResizing: (source: number, requestedSize: number) => {
        type: ActionTypes.HEADER_RESIZING;
        payload: {
            source: number;
            requestedSize: number;
        };
    };
    headerResizeEnd: (source: number, requestedSize: number) => {
        type: ActionTypes.HEADER_RESIZE_END;
        payload: {
            source: number;
            requestedSize: number;
        };
    };
};
export declare type SheetActionCreators = typeof SheetActionCreators;
