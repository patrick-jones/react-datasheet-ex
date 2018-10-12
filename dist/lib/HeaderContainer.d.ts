import { PureComponent, ReactNode } from 'react';
import { Styleable } from './interfaces';
/**
 * A component that lays out child elements from top to bottom.
 * This helps keep header titles top-aligned.
 */
export default class HeaderContainer extends PureComponent<Styleable> {
    static defaultProps: {
        className: string;
    };
    render(): ReactNode;
}
