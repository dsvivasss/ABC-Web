import React from 'react';
import { render } from '@testing-library/react';
import Home from '../src/app/page';
import '@testing-library/jest-dom';

it('Dummy test', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
});