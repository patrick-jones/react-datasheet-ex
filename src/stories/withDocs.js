import React from 'react';
import {withDocs as wd} from 'storybook-readme';

const PreviewComponent = props => (
  <div style={{marginTop: '20px', marginBottom: '20px'}}>
    {props.children}
  </div>
);

const withDocs = wd({
  PreviewComponent,
});

export {
  withDocs,
}
