import React from 'react';
import {shallow} from 'enzyme';
import DefaultHeaderRenderer from './DefaultHeaderRenderer';
import {ColumnHeader} from './interfaces';

describe('DefaultHeaderRenderer', () => {
  const header: ColumnHeader = {
    id: 'foo',
    title: 'AA',
  };

  it('Renders text as expected', () => {
    const wrapper = shallow(
      <DefaultHeaderRenderer col={0} header={header}>{header.id}</DefaultHeaderRenderer>
    );
    expect(wrapper.find('th.rdr-sheet-renderer__header-cell').text()).toBe(header.id);
  });

  it('Renders style as needed', () => {
    const wrapper = shallow(
      <DefaultHeaderRenderer col={0} header={header}>{header.id}</DefaultHeaderRenderer>
    );
    expect(wrapper.find('th.rdr-sheet-renderer__header-cell').prop('style')).toEqual({});

    const styled = shallow(
      <DefaultHeaderRenderer col={0} header={{...header, width: 100}}>
        {header.id}
      </DefaultHeaderRenderer>
    );
    expect(styled.find('th.rdr-sheet-renderer__header-cell').prop('style'))
      .toEqual({width: '100px'});
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <DefaultHeaderRenderer col={0} header={header}>{header.id}</DefaultHeaderRenderer>
    );
    expect(wrapper).toMatchSnapshot();
  });

});
