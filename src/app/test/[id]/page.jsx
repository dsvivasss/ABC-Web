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
        <SideBar></SideBar>
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
