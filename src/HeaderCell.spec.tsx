import React from 'react';
import 'jest';
import {mount, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {ColumnHeader} from './interfaces';
import HeaderCell from './HeaderCell';
import {HEADER_CELL, HEADER_CELL_CENTER, HEADER_CELL_LEFT, HEADER_CELL_RIGHT} from './ClassNames';


describe('HeaderCell', () => {
  const header: ColumnHeader = {
    id: 'foo',
    title: 'AA',
  };

  it('Renders text as expected', () => {
    const wrapper = mount(
      <table>
        <thead>
          <tr>
            <HeaderCell col={0} header={header}>{header.id}</HeaderCell>
          </tr>
        </thead>
      </table>
    );
    expect(wrapper.find('th.rdx-header-cell').text()).toBe(header.id);
  });

  it('Renders style as needed', () => {
    const wrapper = shallow(
      <HeaderCell col={0} header={header}>{header.id}</HeaderCell>
    );
    expect(wrapper.find('th.rdx-header-cell').prop('style')).toBeUndefined();

    const styled = shallow(
      <HeaderCell col={0} header={{...header, width: 100}}>
        {header.id}
      </HeaderCell>
    );
    expect(styled.find('th.rdx-header-cell').prop('style'))
      .toEqual({width: '100px'});
  });

  it('Should render with alignment options', () => {
    const center = mount(
      <table>
        <thead>
          <tr>
            <HeaderCell col={0} header={{...header, width: 100}}>
              {header.id}
            </HeaderCell>
          </tr>
        </thead>
      </table>
    ).find(`th.${HEADER_CELL}.${HEADER_CELL_CENTER}`);

    expect(center.length).toBe(1);

    const left = mount(
      <table>
        <thead>
        <tr>
          <HeaderCell col={0} header={{...header, width: 100, align: 'left'}}>
            {header.id}
          </HeaderCell>
        </tr>
        </thead>
      </table>
    ).find(`th.${HEADER_CELL}.${HEADER_CELL_LEFT}`);

    expect(left.length).toBe(1);

    const right = mount(
      <table>
        <thead>
        <tr>
          <HeaderCell col={0} header={{...header, width: 100, align: 'right'}}>
            {header.id}
          </HeaderCell>
        </tr>
        </thead>
      </table>
    ).find(`th.${HEADER_CELL}.${HEADER_CELL_LEFT}`);
    
    expect(left.length).toBe(1);
  });


  it('matches snapshot', () => {
    const wrapper = shallow(
      <HeaderCell col={0} header={header}>{header.id}</HeaderCell>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
