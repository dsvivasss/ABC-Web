import React from 'react';
import { render } from '@testing-library/react';
import Project_create from '../src/app/project_create/page';
import '@testing-library/jest-dom';

describe('Home page', () => {
    it('Home page renders correctly', () => {
        const { container } = render(<Project_create />)
        expect(container).toMatchSnapshot()
    });
})