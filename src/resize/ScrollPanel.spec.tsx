import React from 'react';
import 'jest';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

import ScrollPanel from './ScrollPanel';
import {SCROLL_PANEL} from '../ClassNames';

describe('ScrollPanel', () => {
  it('Should render', () => {
    const wrapper = shallow(<ScrollPanel/>);
    expect(wrapper.prop('style')).toEqual({});
    expect(wrapper.hasClass(SCROLL_PANEL)).toBe(true);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render optional styles', () => {
    const wrapper = shallow(<ScrollPanel height={200} width={450} />);
    expect(wrapper.prop('style')).toEqual({height: '200px', width: '450px'});
    expect(wrapper.hasClass(SCROLL_PANEL)).toBe(true);
  });
});
