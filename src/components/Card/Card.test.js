import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Card from './Card';

let cardComponent;
beforeEach(() => {
    cardComponent = shallow(<Card />);
});

afterEach(() => {
    cardComponent.unmount();
});

it('renders without crashing', () => {
    expect(cardComponent.length).toBe(1);
});
