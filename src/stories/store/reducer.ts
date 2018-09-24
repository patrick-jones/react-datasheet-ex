import RDS from 'react-datasheet';
import {ExampleCellValue, ExampleModel, ExampleRow} from './interfaces';
import {Actions, ActionTypes, SheetActionCreators} from './actions';

/**
 * Redux-like reducer function for mutating state via actions
 * @param state ExampleModel
 * @param action Action to process
 */
export default function reducer(
  state: ExampleModel, action: Actions<SheetActionCreators>): Partial<ExampleModel> {

  switch (action.type) {
    case ActionTypes.CELLS_CHANGED:
      return handleCellsChanged(state, action);
    case ActionTypes.SELECTION_CHANGED:
      return isDifferent(action.payload.selected, state.selected) ? action.payload : state;
    case ActionTypes.HEADER_DROPPED:
      return handleColumnDropped(state, action.payload.source, action.payload.target);
    case ActionTypes.ROW_DROPPED:
      return handleRowDropped(state, action.payload.source, action.payload.target);
    default:
      return state;
  }
}

function isDifferent(nextSel: RDS.Selection, prevSel?: RDS.Selection | null) {
  if (prevSel) {
    return (
      prevSel.start.i !== nextSel.start.i ||
      prevSel.start.j !== nextSel.start.j ||
      prevSel.end.i !== nextSel.end.i ||
      prevSel.end.j !== nextSel.end.j
    );
  }
  return true;
}

function handleCellsChanged(
  state: ExampleModel, {payload}: ReturnType<SheetActionCreators['cellsChanged']>)
  : Partial<ExampleModel> {

  const {rows, headers} = state;
  const {changes, additions = []} = payload;
  const newRows = [...rows];

  const changed = new Set<number>();

  // in this implementation we only care about added rows, not added columns
  const addedRows = additions.filter(a => a.col < headers.length);

  addedRows.forEach(addition => {
    while (newRows.length <= addition.row) {
      changed.add(newRows.length);
      newRows.push(emptyRow(newRows.length, headers));
    }
  });

  changes.forEach(change => updateRow(newRows, change, changed));
  addedRows.forEach(addition => updateRow(newRows, addition, changed));

  return {
    rows: newRows,
  };
}

function updateRow(
  newRows: ExampleRow[],
  change: {row: number; col: number; value: ExampleCellValue},
  changed: Set<number>
) {
  // avoid unnecessary copying
  newRows[change.row] = changed.has(change.row) ? newRows[change.row] : {...newRows[change.row]};
  newRows[change.row].data = changed.has(change.row)
    ? newRows[change.row].data : [...newRows[change.row].data];

  newRows[change.row].data[change.col] = {
    ...newRows[change.row].data[change.col],
    value: change.value || '',
  };
  changed.add(change.row);
}

function emptyRow(id: number, dummy: any[]) {
  return {
    id: id.toFixed(),
    data: dummy.map(() => ({value: ''})),
  };
}

function swap<T>(l: T[], target: number, source: number): T[] {
  const reply = [...l];
  reply.splice(target, 0, reply.splice(source, 1)[0]);
  return reply;
}

function handleColumnDropped(
  state: ExampleModel, source: number, target: number): Partial<ExampleModel> {
  if (source === target) {
    return state;
  }

  const rows = state.rows.map(r => ({
    ...r,
    data: swap(r.data, target, source),
  }));

  return {
    headers: swap(state.headers, target, source),
    rows,
  };
}

function handleRowDropped(
  state: ExampleModel, source: number, target: number): Partial<ExampleModel> {
  if (source === target) {
    return state;
  }

  return {
    rows: swap(state.rows, target, source),
  };
}
