import React from 'react';
import { render } from '@testing-library/react';
import Home from '../src/app/page';
import '@testing-library/jest-dom';

jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

describe('Home page', () => {
    it('Home page renders correctly', () => {
        const { container } = render(<Home />)
        expect(container).toMatchSnapshot()
    });
})