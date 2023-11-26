"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import styles from "../../page.module.css";
import Link from "next/link";

function page({ params, searchParams }) {
  const [projects, setProjects] = useState([]);
  var company_id = null;
  useEffect(() => {
    company_id = localStorage.getItem("company_id");
    console.log({ company_id });
    ListProject();
  }, []);

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

  const { id: test_id } = params;
  const { user_id } = searchParams;
  const router = useRouter();

  const project_data = JSON.parse(localStorage.getItem("project_selected"));

  const [tests, setTests] = useState([]);
  const [questions, setQuestions] = useState([]);

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

    const testsFiltered = response.filter(
      (test) => test.type === "technical" && String(test.id) === String(test_id)
    );
    await setTests(testsFiltered);
    testsFiltered[0].questions.forEach((question) => {
      question.selected = null;
    });
    await setQuestions(testsFiltered[0].questions);
  };

  const handleSubmit = async () => {
    const newQuestions = [...questions];
    let result = newQuestions.reduce((acc, question) => {
      const correct_question = question.options.find(
        (option) => option.correct_answer === true
      );

      if (question.selected === String(correct_question.id)) {
        acc++;
      }
      return acc;
    }, 0);

    result = (result / newQuestions.length) * 100;

    const obj = {
      score: String(result),
      project_id: String(project_data.id),
      test_id: test_id,
      user_id: user_id,
    };

    const request = await fetch(
      `https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/submissions/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }
    );

    if (request.status === 409) {
      toast("Ya ha realizado este test previamente", {
        position: "bottom-left",
        theme: "dark",
      });
      return;
    }

    if (request.status === 201) {
      toast.success("Test realizado correctamente");
      setTimeout(() => {
        router.push("/project_user_detail");
      }, 2000);
    }
  };

  useEffect(() => {
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
                    Prueba
                  </h1>
                  <p>
                    A continuación encontrarás el cuestionario con las
                    diferentes opciones de respuesta.
                  </p>

                  <div>
                    {tests.map((test) => (
                      <div key={test.id}>
                        <h1 className="animate-fade-up text-2xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                          {test.title}
                        </h1>
                        <p>Tipo de prueba: {test.type}</p>
                        <p>Nivel de dificultad: {test.difficulty_level}</p>
                      </div>
                    ))}

                    {questions.map((question, index) => (
                      <div key={question.id} className="pt-2">
                        <h1 className="animate-fade-up text-1xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                          {index + 1}. {question.description}
                        </h1>
                        {question.options.map((option) => (
                          <p key={option.id} className="px-2">
                            <input
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              type="radio"
                              id={option.id}
                              name={question.id}
                              value={option.id}
                              onChange={(e) => {
                                const newQuestions = [...questions];
                                newQuestions[index].selected = e.target.value;
                                setQuestions(newQuestions);
                              }}
                            />
                            <label htmlFor={option.id} className="px-2">
                              {option.description}
                            </label>
                          </p>
                        ))}
                      </div>
                    ))}

                    {questions.length > 0 && (
                      <span className="sm:ml-3 py-2 pt-5">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => handleSubmit()}
                        >
                          Finalizar prueba
                        </button>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default page;
