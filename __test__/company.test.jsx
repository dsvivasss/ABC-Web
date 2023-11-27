import React from 'react';
import { render } from '@testing-library/react';
import Company from '../src/app/company/page';
import '@testing-library/jest-dom';

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

describe('Company page', () => {
    it('Company page renders correctly', () => {
        const { container } = render(<Company />)
        expect(container).toMatchSnapshot()
    });
})