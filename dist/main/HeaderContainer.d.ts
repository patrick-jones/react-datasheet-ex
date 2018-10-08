import { Component, CSSProperties, ReactNode } from 'react';
export default class HeaderContainer extends Component<{
    className?: string;
    style?: CSSProperties;
}> {
    static defaultProps: {
        className: string;
    };
    render(): ReactNode;
}
