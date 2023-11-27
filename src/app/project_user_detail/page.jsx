"use client";
import styles from "../page.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableComponent from "../components/TableComponent";
import Link from "next/link";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Project_create() {
  const [projects, setProjects] = useState([]);
  var company_id = null;
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      company_id = localStorage.getItem("company_id");
    }
    console.log({ company_id });
    ListProject();
  }, []);

  // istanbul ignore next
  function ListProject() {
    fetch(
      `https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/projects/users/${company_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProjects(data.projects);
      });
  }

  let project_data = { soft_skills: [], hard_skills: [], roles: [] };
  const user_id = localStorage.getItem("company_id");
  if (typeof window !== "undefined") {
    // Perform localStorage action
    project_data = JSON.parse(localStorage.getItem("project_selected"));
  }

  const router = useRouter();

  const [selectedCandidate, setSelectedCandidate] = useState({
    users: [],
  });
  const [assignedCandidate, setAssignedCandidate] = useState({
    users: [],
  });
  const [tests, setTests] = useState([]);

  // istanbul ignore next
  async function obtainSelectedCandidates() {
    const response = await fetch(
      `https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/projects/${project_data.id}/selectedcandidates`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      return;
    }

    await setSelectedCandidate(data);
  }

  // istanbul ignore next
  async function obtainAssignedCandidates() {
    const response = await fetch(
      `https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/projects/${project_data.id}/assignedcandidates`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      return;
    }

    await setAssignedCandidate(data);
  }

  // istanbul ignore next
  const getTests = async () => {
    const request = await fetch(
      `https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/tests/projects/${project_data.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await request.json();

    const testsFiltered = response.filter((test) => test.type === "technical");
    await setTests(testsFiltered);
  };

  // istanbul ignore next
  const handleAssignCandidate = async (candidate_id) => {
    const request = await fetch(
      `https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/projects/${project_data.id}/assigncandidates/${candidate_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const response = await request.json();

    toast.success(response.message);
    obtainSelectedCandidates();
    obtainAssignedCandidates();
  };

  useEffect(() => {
    obtainSelectedCandidates();
    obtainAssignedCandidates();
    getTests();
  }, []);

  return (
    <>
      <Header></Header>
      <div className="flex">
        <div className="bg-neutral-50 w-1/6">
          <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-neutral-50 text-gray-800">
            <div className="flex flex-col top-0 left-0 bg-neutral-50 h-full border-r">
              <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-4 space-y-1">
                  <li className="px-5">
                    <div className="flex flex-row items-center h-8">
                      <div className="text-sm font-light tracking-wide text-gray-500">
                        Menu
                      </div>
                    </div>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    >
                      <span className="inline-flex justify-center items-center ml-4">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          ></path>
                        </svg>
                      </span>
                      <span className="ml-2 text-sm tracking-wide truncate">
                        <Link href="/candidate_home">Proyectos</Link>
                      </span>
                      <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
                        {projects.length}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-5/6 p-4">
          <div className={styles.center2}>
            <div className={styles.grid3}>
              <div>
                <div className={styles.card}>
                  <h1 className="animate-fade-up text-2xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                    {project_data.title}
                  </h1>
                  <h1 className="animate-fade-up text-xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                    Descripción
                  </h1>
                  <p>{project_data.description}</p>
                  <h1 className="animate-fade-up text-xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                    Soft skills necesarias
                  </h1>
                  {project_data.soft_skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10"
                    >
                      {skill}
                    </span>
                  ))}
                  <h1 className="animate-fade-up text-xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                    Hard skills necesarias
                  </h1>
                  {project_data.hard_skills.map((hard) => (
                    <span
                      key={hard}
                      className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >
                      {hard}
                    </span>
                  ))}
                  <h1 className="animate-fade-up text-xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                    Roles necesarios
                  </h1>
                  <div>
                    <dl className="divide-y divide-gray-100">
                      {project_data.roles.map((role) => (
                        <div
                          key={role}
                          className="px-4 py-2 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-0"
                        >
                          <dd className="text-sm font-medium leading-6 text-gray-700 sm:px-0">
                            {role}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>

              <div className={styles.card}>
                <h1 className="animate-fade-up text-2xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                  Pruebas programadas
                </h1>
                <p className="pb-1">
                  Conoce el listado de pruebas que debes realizar para aplicar
                  al proyecto
                </p>

                {tests.length > 0 ? (
                  <table className="table-auto divide-y divide-gray-300 py-3">
                    <thead className="">
                      <tr>
                        <th className="text-lg from-black font-bold leading-2 text-gray-900 sm:truncate sm:tracking-tight py-1">
                          Nombre
                        </th>
                        <th className="text-lg from-black font-bold leading-2 text-gray-900 sm:truncate sm:tracking-tight py-1">
                          Tema
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 py-2">
                      {tests.map((test) => (
                        <tr
                          style={{ cursor: "pointer" }}
                          key={test.id}
                          onClick={() =>
                            router.push(`/test/${test.id}/?user_id=${user_id}`)
                          }
                        >
                          <td className="text-sm font-medium leading-6 text-gray-700 sm:px-3 py-1">
                            {test.type === "technical" ? test.title : test.type}
                          </td>
                          <td className="text-sm font-medium leading-6 text-gray-700 sm:px-3 py-1">
                            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {test.hard_skills}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
