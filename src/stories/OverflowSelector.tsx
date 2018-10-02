import React, {ChangeEvent, Component, ReactNode} from 'react';
import {Overflow} from '../interfaces';

export interface Props {
  overflow: Overflow;
  onOverflowChanged: (overflow: Overflow) => void;
}

const options: Overflow[] = [
  'clip',
  'nowrap',
  'wrap',
];

class OverflowSelector extends Component<Props> {

  handleOverflowChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    this.props.onOverflowChanged(e.target.value as Overflow);
  }

  render(): ReactNode {
    const {overflow} = this.props;
    return (
      <form className='m-v'>
        <label>
          Header Overflow: &nbsp;
          <select
            value={overflow}
            onChange={this.handleOverflowChanged}
          >
            {options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </form>
    );
  }
}

export default OverflowSelector;
