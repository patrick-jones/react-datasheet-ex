import { PureComponent, ReactNode } from 'react';
export interface ScrollPanelProps {
    width?: number;
    height?: number;
}
export default class ScrollPanel extends PureComponent<ScrollPanelProps> {
    render(): ReactNode;
}
