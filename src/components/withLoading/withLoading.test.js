import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import withLoading from './withLoading';

let withLoadingComponent;
beforeEach(() => {
    withLoadingComponent = shallow(<withLoading />);
});

afterEach(() => {
    withLoadingComponent.unmount();
});

it('renders without crashing', () => {
    expect(withLoadingComponent.length).toBe(1);
});
