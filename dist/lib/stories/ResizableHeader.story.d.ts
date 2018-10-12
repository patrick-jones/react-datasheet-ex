import { ReactNode } from 'react';
import { Store } from '@dump247/storybook-state';
import { ExampleModel } from './store/interfaces';
interface Props {
    store: Store<ExampleModel>;
}
export default function ResizableHeaderStory(props: Props): ReactNode;
export {};
