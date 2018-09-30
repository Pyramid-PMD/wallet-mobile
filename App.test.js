import React from 'react';
import RootContainer from './App/Containers/RootContainer';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<RootContainer />).toJSON();
  expect(rendered).toBeTruthy();
});
