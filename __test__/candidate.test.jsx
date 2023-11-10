import React from 'react';
import { render } from '@testing-library/react';
import CandidateItem from '../src/app/candidate_detail/page';
import '@testing-library/jest-dom';

// Mock useRouter:
jest.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));

describe('Candidate page', () => {
    it('Candidate Item page renders correctly', () => {
        const { container } = render(<CandidateItem />)
        expect(container).toMatchSnapshot()
    });
})