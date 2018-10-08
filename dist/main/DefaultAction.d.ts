import { ActionRendererProps } from './interfaces';
import { Component } from 'react';
import RDS from 'react-datasheet';
export default class DefaultAction<T extends RDS.Cell<T, V>, V = string> extends Component<ActionRendererProps<T, V>> {
    render(): null;
}
