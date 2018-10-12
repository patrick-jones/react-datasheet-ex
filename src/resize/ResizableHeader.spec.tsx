import React from 'react';
import 'jest';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import ResizableHeader from './ResizableHeader';


describe('ResizableHeader', () => {
  it('Should render', () => {
    const end = jest.fn();
    const wrapper = mount(
      <table>
        <thead>
          <tr>
            <th>
              <ResizableHeader onResizeEnd={end} index={0} col={0} header={{id: 'A', title: 'A'}}>
                Custom
              </ResizableHeader>
            </th>
            <th>
              <ResizableHeader onResizeEnd={end} index={0} col={0} header={{id: 'B', title: 'B'}} />
            </th>
          </tr>
        </thead>
      </table>
    );

    expect(wrapper.find(ResizableHeader).first().text()).toBe('Custom');
    expect(wrapper.find(ResizableHeader).last().text()).toBe('B');

    expect(toJson(wrapper)).toMatchSnapshot();

    wrapper.unmount();
  });
});
