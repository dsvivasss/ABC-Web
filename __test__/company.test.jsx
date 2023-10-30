import React from 'react';
import { render } from '@testing-library/react';
import Company from '../src/app/company/page';
import '@testing-library/jest-dom';

describe('Home page', () => {
    it('Home page renders correctly', () => {
        const { container } = render(<Company />)
        expect(container).toMatchSnapshot()
    });
})