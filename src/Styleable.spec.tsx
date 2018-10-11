import React from 'react';
import 'jest';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {HeaderContainer, HeaderTitle} from './index';
import {
  HEADER_CELL_CONTAINER,
  HEADER_CELL_TITLE,
  WIDTH_RESIZE_HANDLE,
} from './ClassNames';
import {Styleable} from './interfaces';
import {WidthResizeHandle} from './resize';


function suite(
  name: string, Component: React.ComponentClass<Styleable>, CLASS_NAME: string, extraProps: any) {

  it('Should render defaults properly', () => {
    const wrapper = shallow(<Component {...extraProps}>content</Component>);
    expect(wrapper.prop('className')).toEqual(CLASS_NAME);
    expect(wrapper.prop('style')).toBeUndefined();
  });

  it('Should render options properly', () => {
    const className = 'foo-bar';
    const style = {background: 'blue'};
    const wrapper = shallow(
      <Component className={className} style={style} {...extraProps}>content</Component>
    );

    expect(wrapper.prop('className')).toEqual(`${CLASS_NAME} ${className}`);
    expect(wrapper.prop('style')).toEqual(style);
  });

  it('matches snapshot', () => {
    const className = 'foo-bar';
    const style = {background: 'blue'};
    const wrapper = shallow(
      <Component className={className} style={style} {...extraProps}>content</Component>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

}


describe('Styleable', () => {
  describe.each([
    ['HeaderContainer', HeaderContainer, HEADER_CELL_CONTAINER, {}],
    [
      'HeaderTitle',
      HeaderTitle,
      `${HEADER_CELL_TITLE} ${HEADER_CELL_TITLE}--clip`,
      {col: 0, header: {id: 'abcd-puppy', title: 'ABCD'}},
    ],
    ['WidthResizeHandle', WidthResizeHandle, WIDTH_RESIZE_HANDLE, {}],
  ])('%s', suite);
});
