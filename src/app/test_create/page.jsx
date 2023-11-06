"use client";
import Image from "next/image";
import styles from "../page.module.css";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestcardItem from "../components/TestcardItem";
import Link from "next/link";

const skills_soft = [
  {
    id: 1,
    name: "Comunicación estratégica",
  },

  {
    id: 2,
    name: "Pensamiento sistémico",
  },

  {
    id: 3,
    name: "Creatividad",
  },
];

const type = [
  {
    id: 'technical',
    name: "Tecnica",
  },

  {
    id: 'psychology',
    name: "Pisicolgia",
  }
];

const dificultad = [
  {
    id: 'hard',
    name: "Alta",
  },

  {
    id: 'medium',
    name: "Media",
  },

  {
    id: 'basic',
    name: "Baja",
  },
];

const testData = [
    {
      pregunta: '1. ¿Qué es Python y cuál es su principal ventaja como lenguaje de programación?',
      opcion1: 'a) Python es un lenguaje de programación de alto rendimiento.',
      opcion2: 'b) Python es un lenguaje de programación interpretado con una sintaxis clara y legible.',
      opcion3: 'c) Python es un lenguaje de programación diseñado exclusivamente para aplicaciones web.',
    },
    {
        pregunta: '2. ¿Cuál es la diferencia entre Python 2 y Python 3? ¿Cuál se recomienda usar actualmente?',
        opcion1: 'a) Python es un lenguaje de programación de alto rendimiento.',
        opcion2: 'b) Python es un lenguaje de programación de alto rendimiento.',
        opcion3: 'c) Python es un lenguaje de programación de alto rendimiento.',
    },
    {
        pregunta: '3. ¿Qué es Python y cuál es su principal ventaja como lenguaje de programación?',
        opcion1: 'a) Python es un lenguaje de programación de alto rendimiento.',
        opcion2: 'b) Python es un lenguaje de programación de alto rendimiento.',
        opcion3: 'c) Python es un lenguaje de programación de alto rendimiento.',
    },
    {
        pregunta: '4. ¿Qué es Python y cuál es su principal ventaja como lenguaje de programación?',
        opcion1: 'a) Python es un lenguaje de programación de alto rendimiento.',
        opcion2: 'b) Python es un lenguaje de programación de alto rendimiento.',
        opcion3: 'c) Python es un lenguaje de programación de alto rendimiento.',
    },

  ]

const navigation = [{ name: "Dashboard", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Project_create() {
  const [selected, setSelected] = useState(skills_soft[0]);
  const [selected2, setSelected2] = useState(type[0]);
  const [selected3, setSelected3] = useState(dificultad[0]);
  var company_id = null
  var project_data = null

  function register(e) {
    const company = 1;
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const soft_skills = selected.name.split(" ");
    const hard_skills = selected2.name.split(" ");
    const roles = selected3.name.split(" ");
    const body = {
      company_id: +company_id,
      project_id: project_data.id,
      title: formJson.test_title,
      type: selected2.id,
      difficulty_level: selected3.id
    };
    fetch(
      "https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/test/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    ).then((response) => response.json())
    .then(data => {
      console.log(data)
      toast("Prueba creada!", { position: "bottom-left", theme: "dark" });
    });
  }

  useEffect(() => {
    company_id = localStorage.getItem("company_id")
    project_data = JSON.parse(localStorage.getItem("project_selected"));
  })

  return (
    <>
      <div className="">
        <Disclosure as="nav" className="bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-1 sm:px-1 lg:px-1">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex flex-shrink-0 items-center"></div>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Ver notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Mi perfil
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Configuración
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <Link href="/company_login">Cerrar sesión</Link>
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
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
                      href="/project_list"
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
                        Proyectos
                      </span>
                      <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
                        3
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-5/6 p-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1 pl-6 pb-4">
              <h2 className="animate-fade-up from-black bg-clip-text text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight py-2">
                Crea un nuevo test para los aspirantes
              </h2>
              <p>
                Estas a muy pocos pasos de crear algo que cambiará el mundo.
              </p>
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.card}>
              <div className="lg:flex lg:items-center lg:justify-between pb-2">
                <div className="min-w-0 flex-1">
                  <form className="space-y-6" onSubmit={register}>
                    <div>
                      <label
                        htmlFor="test_title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Título de la prueba
                      </label>
                      <div className="mt-2">
                        <input
                          id="test_title"
                          name="test_title"
                          type="test_title"
                          autoComplete="name"
                          placeholder="  Python for senior software engineers"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <Listbox value={selected2} onChange={setSelected2}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium leading-0 text-gray-900">
                            Temática a evaluar
                          </Listbox.Label>
                          <div className="relative mt-0">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-1">
                              <span className="flex items-center">
                                <span className="ml-1 block truncate">
                                  {selected2.name}
                                </span>
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center pr-1.5 pt-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-900"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {type.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "bg-indigo-600 text-white"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "ml-3 block truncate"
                                            )}
                                          >
                                            {person.name}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>

                    <Listbox value={selected3} onChange={setSelected3}>
                      {({ open }) => (
                        <>
                          <Listbox.Label className="block text-sm font-medium leading-0 text-gray-900">
                            Dificultad de la prueba
                          </Listbox.Label>
                          <div className="relative mt-0">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-1">
                              <span className="flex items-center">
                                <span className="ml-1 block truncate">
                                  {selected3.name}
                                </span>
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center pr-1.5 pt-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-900"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {dificultad.map((person) => (
                                  <Listbox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "bg-indigo-600 text-white"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={person}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "ml-3 block truncate"
                                            )}
                                          >
                                            {person.name}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>

                    <div className="pb-1 pt-2">
                      <span className="hidden sm:block pr-5">
                        <button
                          type="button"  
                          className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-indigo-800 leading-6"
                        >
                          <Link href="/project_detail">Cancelar</Link>
                        </button>
                      </span>
                      <button
                        type="submit"
                        className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Crear test
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h3 className="animate-fade-up from-black bg-clip-text text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight py-2">
                Vista previa del test
              </h3>

              <div>
                
                  <TestcardItem />
              </div>

              <div>
            {testData.map((test) => (
              <TestcardItem
                pregunta={test.pregunta}
                opcion1={test.opcion1}
                opcion2={test.opcion2}
                opcion3={test.opcion3}
              />
            ))}
          </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
