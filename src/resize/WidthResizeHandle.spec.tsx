import React from 'react';
import 'jest';
import {mount, ReactWrapper} from 'enzyme';
import toJson from 'enzyme-to-json';
import WidthResizeHandle, {header} from './WidthResizeHandle';
import {WIDTH_RESIZE_HANDLE} from '../ClassNames';


describe('WidthResizeHandle', () => {
  const start = jest.fn();
  const during = jest.fn();
  const end = jest.fn();
  let wrapper: ReactWrapper<HTMLElement>;
  let map: {[key: string]: (...args: any[]) => void} = {};
  let ael = window.addEventListener;

  beforeEach(() => {
    start.mockClear();
    during.mockClear();
    end.mockClear();
    wrapper = mount(
      <table>
        <thead>
        <tr>
          <th>
            <WidthResizeHandle
              index={0}
              minSize={20}
              onResizeStart={start}
              onResizing={during}
              onResizeEnd={end}
            />
          </th>
        </tr>
        </thead>
      </table>
    );

    // got to fake the funk since jsdom doesn't really do layout
    const th = wrapper.find('th').first().getDOMNode();
    Object.defineProperty(th, 'clientWidth', {value: 100, writable: false});

    // got to fake document events because enzyme won't do it for you
    // https://github.com/airbnb/enzyme/issues/426#issuecomment-228601631
    ael = window.addEventListener;
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
  });

  afterEach(() => {
    wrapper.unmount();
    window.addEventListener = ael;
    map = {};
  });

  it('Should render', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should handle interaction', () => {
    wrapper.find(`.${WIDTH_RESIZE_HANDLE}`).simulate('mouseDown', {pageX: 198});

    map.mousemove({pageX: 148});
    map.mousemove({pageX: 118});
    map.mousemove({pageX: 48}); // skipped, < minSize
    map.mouseup({pageX: 158});

    expect(start.mock.calls.length).toBe(1);
    expect(start.mock.calls[0][0]).toBe(0);
    expect(start.mock.calls[0][1]).toBe(100);

    expect(during.mock.calls.length).toBe(2);
    expect(during.mock.calls[0][0]).toBe(0);
    expect(during.mock.calls[0][1]).toBe(50);
    expect(during.mock.calls[1][1]).toBe(20); // minSize

    expect(end.mock.calls.length).toBe(1);
    expect(end.mock.calls[0][0]).toBe(0);
    expect(end.mock.calls[0][1]).toBe(60);
  });

  it('Should return `originalWidth` of zero if no parent is found', () => {
    const handler = jest.fn();
    const wrapper = mount(
      <table>
        <thead>
        <tr>
          <th>
            <WidthResizeHandle
              index={0}
              onResizeStart={handler}
              onResizing={handler}
              onResizeEnd={handler}
              cellTag='P'
            />
          </th>
        </tr>
        </thead>
      </table>
    );

    const th = wrapper.find('th').first().getDOMNode();
    Object.defineProperty(th, 'clientWidth', {value: 100, writable: false});

    const inst = wrapper.find('WidthResizeHandle').instance() as WidthResizeHandle;
    expect(inst.originalWidth()).toBe(0);
  });

});

describe('WidthResizeHandle.closest', () => {

  let inner: string;
  let th: HTMLElement;
  let span: HTMLElement;

  beforeEach(() => {
    inner = document.body.innerHTML;
    document.body.innerHTML =
      `<table><thead><th id='p'><div><span id='c'>X</span></div></th></thead></table>`;

    th = document.getElementById('p')!;
    span = document.getElementById('c')!;
    Object.defineProperty(span, 'closest', {value: undefined, writable: false});
  });

  afterEach(() => {
    document.body.innerHTML = inner;
  });

  it('Should find the parent `th` event if `closest` is not available (curse you IE)', () => {
    const parent = header(span, 'th');
    expect(parent).toBe(th);
  });

  it('Should return a null if the selector is not found', () => {
    const parent = header(span, 'P');
    expect(parent).toBeNull();
  });

  it('Should return null if passed a null element', () => {
    const parent = header(null, 'TH');
    expect(parent).toBeNull();
  });
});
