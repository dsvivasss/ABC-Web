import React from 'react';
import { render } from '@testing-library/react';
import Home from '../src/app/page';
import ProjectcardItem from '../src/app/components/ProjectcardItem';
import Header from '../src/app/components/Header';
import SideBar from '../src/app/components/SideBar';
import TestcardItem from '../src/app/components/TestcardItem';
import '@testing-library/jest-dom';
import fetch from "node-fetch";

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

  it('ProjectcardItem renders correctly', () => {
    const obj = {
      "soft_skills": [
        "Trabajo en equipo",
        "Buena comunicación"
      ],
      "hard_skills": [
        "Python",
        "SQL"
      ],
      "roles": [
        "Product manager",
        "Junior Programmer"
      ],
      "users_selected": null,
      "users_assigned": null,
      "id": 2,
      "company_id": 2,
      "title": "Segundo proyecto",
      "description": "Descripcion basica de mi primer proyecto",
      "createdAt": "2023-10-31T19:38:01.709Z",
      "updatedAt": "2023-10-31T19:38:01.709Z"
    }

    const { container } = render(<ProjectcardItem project_data={obj} />)
    expect(container).toMatchSnapshot()
  });

  it('Header renders correctly', () => {
    const { container } = render(<Header />)
    expect(container).toMatchSnapshot()
  });

  it('SideBar renders correctly', () => {
    const { container } = render(<SideBar />)
    expect(container).toMatchSnapshot()
  });

  it('TestcardItem renders correctly', () => {
    const obj = {
      "index": 0,
      "description": "Descripcion basica de mi primer proyecto",
      "options": [
        {
          description: "Opcion 1",
        },
        {
          description: "Opcion 2",
        }
      ]
    }
    const { container } = render(<TestcardItem {...obj} />)
    expect(container).toMatchSnapshot()
  });
})