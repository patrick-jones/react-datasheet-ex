import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import RowRenderer from './RowRenderer';
import {ExampleCellType} from './stories/store/interfaces';

const cells: ExampleCellType[] = [
  {value: 'cell'},
];

describe('RowRenderer basic rendering', () => {
  it('Should render', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <RowRenderer row={0} cells={cells}>
            <td className='cell'>cell</td>
          </RowRenderer>
        </tbody>
      </table>
    );

    const td = wrapper.find('td.cell');
    expect(td.length).toBe(2);
    expect(td.find('td.rdr-sheet-renderer__action-cell').length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render custom action content', () => {
    const wrapper = mount(
      <table>
        <tbody>
        <RowRenderer
          row={0}
          cells={cells}
          actionContentRenderer={() => (<span className='abcd-puppy'>Action</span>)}
        >
          <td className='cell'>cell</td>
        </RowRenderer>
        </tbody>
      </table>
    );

    expect(wrapper.find('td.rdr-sheet-renderer__action-cell span.abcd-puppy').text())
      .toBe('Action');
  });
});
