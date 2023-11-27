import React from 'react';
import { render } from '@testing-library/react';
import Project_create from '../src/app/project_create/page';
import '@testing-library/jest-dom';

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

describe('Project_create page', () => {
    it('Project_create page renders correctly', () => {
        const { container } = render(<Project_create />)
        expect(container).toMatchSnapshot()
    });
})