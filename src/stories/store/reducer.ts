import RDS from 'react-datasheet';
import {ExampleCellValue, ExampleModel, ExampleRow} from './interfaces';
import {Actions, ActionTypes, SheetActionCreators} from './actions';


/**
 * Redux-like reducer function for mutating state via actions. If you are
 * using this as inspiration as your own code please note that this is good enough for
 * the demo, but it's not tested and has at least a couple of bugs that I know about.
 *
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
    case ActionTypes.OVERFLOW_CHANGED:
      return action.payload;
    case ActionTypes.HEADER_DROPPED:
      return handleColumnDropped(state, action.payload.source, action.payload.target);
    case ActionTypes.ROW_DROPPED:
      return handleRowDropped(state, action.payload.source, action.payload.target);
    case ActionTypes.ROW_SELECTION_CHANGED:
      return handleRowSelectionChanged(state, action.payload.row, action.payload.selected);
    case ActionTypes.COLUMN_HIDDEN_CHANGED:
      return handleColumnHiddenChanged(state, action.payload.id, action.payload.hidden);
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
      // FIXME: using length is not actually good enough for real-world app;
      // with row additions/deletions/reordering you would eventually get a collision.
      // Better to generate new, collision-proof ids in the action creator
      // and pass them in as part of the payload.
      newRows.push(emptyRow(newRows.length.toFixed(), headers));
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

function emptyRow(id: string, dummy: any[]) {
  return {
    id,
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

  // FIXME: Need to adjust indices to account for hidden columns

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


function handleRowSelectionChanged(state: ExampleModel, row: number, selected: boolean) {
  if (state.rows[row].selected === selected) {
    return state;
  }

  const rows = [...state.rows];

  rows[row] = {
    ...(rows[row]),
    selected,
  };

  return {
    rows,
  };
}

function handleColumnHiddenChanged(state: ExampleModel, id: string, hidden: boolean) {
  const index = state.headers.findIndex(h => h.id === id);
  if ((index < 0) || !!state.headers[index].hidden === hidden) {
    return state;
  }

  const headers = [...state.headers];
  headers[index] = {
    ...headers[index],
    hidden,
  };

  return {
    headers,
  };
}
