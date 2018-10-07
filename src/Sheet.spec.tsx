import React from 'react';
import {shallow} from 'enzyme';

import Sheet from './Sheet';
import {DragDropHeader} from './drag-drop';
import {model} from './stories/store';
import {ExampleCellType} from './stories/store/interfaces';


describe('Sheet basic rendering', () => {
  const {rows, headers} = model;
  const data: ExampleCellType[][] = rows.map(r => r.data);

  it('Should render', () => {
    const wrapper = shallow(
      <Sheet
        data={data}
        className='foobar'
        headers={headers}
      >
        <tr>
          <td colSpan={4}>shallow</td>
        </tr>
      </Sheet>
    );
    // console.log(wrapper.debug());
    expect(wrapper.find('thead tr').length).toBe(1);
    expect(wrapper.find('th').length).toBe(1);
    expect(wrapper.find('HeaderCell').length).toBe(4);
    expect(wrapper.find('HeaderTitle').length).toBe(4);
    expect(wrapper.find('tbody tr td').text()).toBe('shallow');
  });

  it('Matches the snapshot', () => {
    const wrapper = shallow(
      <Sheet
        data={data}
        className='foobar'
        headers={headers}
      >
        <tr>
          <td colSpan={4}>shallow</td>
        </tr>
      </Sheet>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Correctly renders optional properties', () => {
    const wrapper = shallow(
      <Sheet
        data={data}
        className='foobar'
        style={{width: '100%'}}
        headers={headers}
        headerRenderer={hrProps => (
          <DragDropHeader
            {...hrProps}
            onHeaderDropped={(...args) => {}}
          >
            {hrProps.header.id}
          </DragDropHeader>
        )}
        headerCellRenderer={hrProps => (
          <th>{hrProps.children}</th>
        )}
      >
        <tr>
          <td colSpan={4}>shallow</td>
        </tr>
      </Sheet>
    );
    // console.log(wrapper.debug());
    expect(wrapper.find('thead tr').length).toBe(1);
    expect(wrapper.find('th').length).toBe(1);
    expect(wrapper.find('headerCellRenderer').length).toBe(4);
    expect(wrapper.find('headerRenderer').length).toBe(4);
    expect(wrapper.find('tbody tr td').text()).toBe('shallow');
    expect(wrapper.prop('style')).toEqual({width: '100%'});
  });

});
