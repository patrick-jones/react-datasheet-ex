import React from 'react';
import 'jest';
import {shallow} from 'enzyme';
import HeaderTitle from './HeaderTitle';
import {ColumnHeader} from './interfaces';
import {HEADER_CELL_TITLE} from './ClassNames';
import toJson from 'enzyme-to-json';


describe('HeaderTitle', () => {
  const header: ColumnHeader = {
    id: 'abcd-puppy',
    title: 'AA',
  };

  it('Renders text as expected', () => {
    const wrapper = shallow(<HeaderTitle col={0} header={header} />);
    expect(wrapper.text()).toBe(header.title);
  });

  it('Renders custom text as expected', () => {
    const wrapper = shallow(<HeaderTitle col={0} header={header}>{header.id}</HeaderTitle>);
    expect(wrapper.text()).toBe(header.id);
  });

  it('renders overflow as expected', () => {
    const clip = shallow(<HeaderTitle col={0} header={header} />);
    expect(clip.find(`.${HEADER_CELL_TITLE}`).length).toBe(1);
    expect(clip.find(`.${HEADER_CELL_TITLE}--clip`).length).toBe(1);

    const wrap = shallow(<HeaderTitle col={0} header={header} overflow='wrap' />);
    expect(wrap.find(`.${HEADER_CELL_TITLE}`).length).toBe(1);
    expect(wrap.find(`.${HEADER_CELL_TITLE}--wrap`).length).toBe(1);
  });

  it('renders options correctly', () => {
    const className = 'foo-bar';
    const style = {background: 'blue'};
    const wrapper = shallow(
      <HeaderTitle col={0} header={header} className={className} style={style}>
        {header.id}
      </HeaderTitle>
    );

    expect(wrapper.hasClass(className)).toBe(true);
    expect(wrapper.prop('style')).toEqual(style);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<HeaderTitle col={0} header={header} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
