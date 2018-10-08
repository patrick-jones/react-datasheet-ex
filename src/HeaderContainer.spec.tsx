import React from 'react';
import 'jest';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {HeaderContainer} from './index';
import {HEADER_CELL_CONTAINER} from './ClassNames';


describe('HeaderContainer', () => {

  it('Should render defaults properly', () => {
    const wrapper = shallow(<HeaderContainer>content</HeaderContainer>);
    expect(wrapper.prop('className')).toEqual(HEADER_CELL_CONTAINER);
    expect(wrapper.prop('style')).toBeUndefined();
  });

  it('Should render options properly', () => {
    const className = 'foo-bar';
    const style = {background: 'blue'};
    const wrapper = shallow(
      <HeaderContainer className={className} style={style}>content</HeaderContainer>
    );

    expect(wrapper.prop('className')).toEqual(`${HEADER_CELL_CONTAINER} ${className}`);
    expect(wrapper.prop('style')).toEqual(style);
  });

  it('matches snapshot', () => {
    const className = 'foo-bar';
    const style = {background: 'blue'};
    const wrapper = shallow(
      <HeaderContainer className={className} style={style}>content</HeaderContainer>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
