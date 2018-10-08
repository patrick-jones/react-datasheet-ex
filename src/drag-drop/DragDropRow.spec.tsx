import React from 'react';
import 'jest';
import {mount} from 'enzyme';

import {DragDropContext} from 'react-dnd';
import Backend, {TestBackend} from 'react-dnd-test-backend';
import toJson from 'enzyme-to-json';

import DragDropRow from './DragDropRow';
import DragDropRowProvider from './DragDropRowProvider';
import {ExampleCellType} from '../stories/store/interfaces';

const rows: ExampleCellType[][] = [
  [{value: 'Row 0'}],
  [{value: 'Row 1'}],
];

function testableComponent(spyA: jest.Mock, spyB: jest.Mock) {
  return DragDropContext(Backend)(
    class TestContainer extends React.Component {
      render() {
        return (
          <table>
            <tbody>
            <DragDropRow row={0} cells={rows[0]} onRowDropped={spyA}>
              <td>Row 0</td>
            </DragDropRow>
            <DragDropRow row={1} cells={rows[1]} onRowDropped={spyB}>
              <td>Row 1</td>
            </DragDropRow>
            </tbody>
          </table>
        );
      }
    }
  );
}


describe('DragDropRowRenderer', () => {
  it('matches snapshot', () => {
    const spyA = jest.fn();
    const spyB = jest.fn();
    const Container = testableComponent(spyA, spyB);

    const wrapper = mount(<Container />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Calls onHeaderDropped', () => {
    const spyA = jest.fn();
    const spyB = jest.fn();
    const Container = testableComponent(spyA, spyB);

    const wrapper = mount(<Container />);
    // console.log(wrapper.debug());
    // @ts-ignore
    const backend: TestBackend = wrapper.instance().getManager().getBackend();

    const hp = wrapper.find(DragDropRowProvider);

    // @ts-ignore
    const dragSource = hp.at(1).childAt(0).instance().getHandlerId();
    // @ts-ignore
    const dropTarget = hp.at(0).instance().getHandlerId();

    backend.simulateBeginDrag([dragSource]);
    backend.simulateHover([dropTarget]);
    backend.simulateDrop();
    backend.simulateEndDrag();

    expect(spyA.mock.calls.length).toBe(1);
    expect(spyB.mock.calls.length).toBe(0);

    expect(spyA.mock.calls[0][0]).toBe(1);
    expect(spyA.mock.calls[0][1]).toBe(0);
  });
});
