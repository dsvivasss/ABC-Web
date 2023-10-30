import React from 'react';
import { render } from '@testing-library/react';
import Project from '../src/app/project_list/page';
import '@testing-library/jest-dom';
// jest-fetch-mock
import fetchMock from 'jest-fetch-mock'

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

describe('Project page', () => {
    it('Project page renders correctly', () => {
        const { container } = render(<Project />)
        expect(container).toMatchSnapshot()
    });
})