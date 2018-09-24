import React from 'react';
import {shallow} from 'enzyme';

import SheetRenderer from './SheetRenderer';
import {DragDropHeaderRenderer} from './drag-drop';
import {initialState} from './stories/store';
import {ExampleCellType} from './stories/store/interfaces';


describe('SheetRenderer basic rendering', () => {
  const {rows, headers} = initialState;
  const data: ExampleCellType[][] = rows.map(r => r.data);

  it('Should render', () => {
    const wrapper = shallow(
      <SheetRenderer
        data={data}
        className='foobar'
        headers={headers}
      >
        <tr>
          <td colSpan={4}>shallow</td>
        </tr>
      </SheetRenderer>
    );
    // console.log(wrapper.debug());
    expect(wrapper.find('thead tr').length).toBe(1);
    expect(wrapper.find('th').length).toBe(1);
    expect(wrapper.find('DefaultHeaderRenderer').length).toBe(4);
    expect(wrapper.find('DefaultHeaderContentRenderer').length).toBe(4);
    expect(wrapper.find('tbody tr td').text()).toBe('shallow');
  });

  it('Matches the snapshot', () => {
    const wrapper = shallow(
      <SheetRenderer
        data={data}
        className='foobar'
        headers={headers}
      >
        <tr>
          <td colSpan={4}>shallow</td>
        </tr>
      </SheetRenderer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Correctly renders optional properties', () => {
    const wrapper = shallow(
      <SheetRenderer
        data={data}
        className='foobar'
        style={{width: '100%'}}
        headers={headers}
        headerRenderer={hrProps => (
          <DragDropHeaderRenderer {...hrProps} onHeaderDropped={(...args) => {}} />
        )}
        headerContentRenderer={hcrProps => (<span>{hcrProps.header.id}</span>)}
      >
        <tr>
          <td colSpan={4}>shallow</td>
        </tr>
      </SheetRenderer>
    );
    // console.log(wrapper.debug());
    expect(wrapper.find('thead tr').length).toBe(1);
    expect(wrapper.find('th').length).toBe(1);
    expect(wrapper.find('headerRenderer').length).toBe(4);
    expect(wrapper.find('headerContentRenderer').length).toBe(4);
    expect(wrapper.find('tbody tr td').text()).toBe('shallow');
    expect(wrapper.prop('style')).toEqual({width: '100%'});
  });
});
