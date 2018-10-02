import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

import {ACTION_CELL} from './ClassNames';
import Row from './Row';
import {ExampleCellType} from './stories/store/interfaces';

const cells: ExampleCellType[] = [
  {value: 'cell'},
];

describe('Row basic rendering', () => {
  it('Should render', () => {
    const wrapper = mount(
      <table>
        <tbody>
          <Row row={0} cells={cells}>
            <td className='cell'>cell</td>
          </Row>
        </tbody>
      </table>
    );

    const td = wrapper.find('td.cell');
    expect(td.length).toBe(2);
    expect(td.find(`td.${ACTION_CELL}`).length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render custom action content', () => {
    const wrapper = mount(
      <table>
        <tbody>
        <Row
          row={0}
          cells={cells}
          actionRenderer={() => (<span className='abcd-puppy'>Action</span>)}
        >
          <td className='cell'>cell</td>
        </Row>
        </tbody>
      </table>
    );

    expect(wrapper.find(`td.${ACTION_CELL} span.abcd-puppy`).text())
      .toBe('Action');
  });
});
