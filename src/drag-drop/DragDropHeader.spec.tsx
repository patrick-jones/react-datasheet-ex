import React from 'react';
import {mount} from 'enzyme';

import {DragDropContext} from 'react-dnd';
import Backend, {TestBackend} from 'react-dnd-test-backend';
import toJson from 'enzyme-to-json';

import DragDropHeader from './DragDropHeader';
import DragDropHeaderProvider from './DragDropHeaderProvider';


function testableComponent(spyA: jest.Mock, spyB: jest.Mock) {
  return DragDropContext(Backend)(

    class TestContainer extends React.Component {
      render() {
        return (
          <table>
            <thead>
              <tr>
                <td>
                  <DragDropHeader
                    col={0}
                    header={{id: 'A', title: 'A'}}
                    onHeaderDropped={spyA}
                  >
                    A
                  </DragDropHeader>
                </td>
                <td>
                  <DragDropHeader
                    col={1}
                    header={{id: 'B', title: 'B'}}
                    onHeaderDropped={spyB}
                  >
                    B
                  </DragDropHeader>
                </td>
              </tr>
            </thead>
          </table>
        );
      }
    }
  );
}


describe('DragDropHeader', () => {
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

    const hp = wrapper.find(DragDropHeaderProvider);

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
