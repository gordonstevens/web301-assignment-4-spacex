import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import HeadBanner from './HeadBanner';

let headBannerComponent;
beforeEach(() => {
    headBannerComponent = shallow(<HeadBanner />);
});

afterEach(() => {
    headBannerComponent.unmount();
});

it('renders without crashing', () => {
    expect(headBannerComponent.length).toBe(1);
});
