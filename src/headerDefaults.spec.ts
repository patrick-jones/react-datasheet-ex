import 'jest';
import headerDefaults from './headerDefaults';


describe('headerDefaults', () => {
  it('should correctly calculate defaults', () => {
    expect(headerDefaults({id: 'foo', title: 'bar'})).toEqual({
      id: 'foo',
      title: 'bar',
      overflow: 'clip',
      align: 'center',
      className: '',
    });
  });

  it('should correctly calculate defaults when sheet-level option is undefined', () => {
    expect(headerDefaults({id: 'foo', title: 'bar'}, {overflow: undefined})).toEqual({
      id: 'foo',
      title: 'bar',
      overflow: 'clip',
      align: 'center',
      className: '',
    });
  });

  it('should correctly handle sheet-level options', () => {
    expect(headerDefaults({id: 'foo', title: 'bar'}, {overflow: 'wrap'})).toEqual({
      id: 'foo',
      title: 'bar',
      overflow: 'wrap',
      align: 'center',
      className: '',
    });
  });

  it('should correctly handle header-level overrides', () => {
    expect(headerDefaults({id: 'foo', title: 'bar', overflow: 'nowrap'}, {overflow: 'wrap'}))
      .toEqual({
        id: 'foo',
        title: 'bar',
        overflow: 'nowrap',
        align: 'center',
        className: '',
      }
    );
  });

});
