import React from 'react';
import {shallow} from 'enzyme';
import DefaultHeaderContentRenderer from './DefaultHeaderContentRenderer';
import {ColumnHeader} from './interfaces';

describe('DefaultHeaderContentRenderer', () => {
  const header: ColumnHeader = {
    id: 'foo',
    title: 'AA',
  };

  it('Renders text as expected', () => {
    const wrapper = shallow(<DefaultHeaderContentRenderer col={0} header={header} />);
    expect(wrapper.text()).toBe(header.title);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<DefaultHeaderContentRenderer col={0} header={header} />);
    expect(wrapper).toMatchSnapshot();
  });

});
