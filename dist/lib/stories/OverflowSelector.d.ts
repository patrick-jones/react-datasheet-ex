import React, { Component, ReactNode } from 'react';
import { Overflow } from '../interfaces';
export interface Props {
    overflow: Overflow;
    onOverflowChanged: (overflow: Overflow) => void;
}
declare class OverflowSelector extends Component<Props> {
    handleOverflowChanged: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    render(): ReactNode;
}
export default OverflowSelector;
