"use client";
import Image from "next/image";
import styles from "../../page.module.css";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestcardItem from "../../components/TestcardItem";
import { Container } from "postcss";
import TableComponent from "../../components/TableComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CandidateItem({ params }) {

  const router = useRouter();

  const user_id = params.id;
  const project_data = JSON.parse(localStorage.getItem("project_selected"))

  const [user, setUser] = useState({
    users: []
  });
  const [isUserInTest, setIsUserInTest] = useState(false);

  const [tests, setTests] = useState([]);

  //istambul ignore next
  const getCandidateDetail = async () => {
    const request = await fetch(`https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/users/findmany`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "ids": [
            user_id
          ]
        })
      })

    const response = await request.json()

    await setUser(response)
  }

  const getTests = async () => {
    const request = await fetch(`https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/tests/projects/${project_data.id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

    const response = await request.json()

    const isUserWithinTest = response[0]?.users?.some((user) => String(user.id) === String(user_id))

    if (isUserWithinTest) {
      await setIsUserInTest(true)
      await setTests(response)
    }

  }

  const handleSelectCandidate = async () => {

    const request = await fetch(`https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/projects/${project_data.id}/selectcandidates/${user_id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

    const response = await request.json()

    toast.success(response.message);
    router.push("/project_detail");
  }

  useEffect(() => {
    getCandidateDetail()
    getTests()
  }, []);

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
                      href="http://localhost:3000/project_list"
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
          <div className={styles.center2}>
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
          </div>

          <div className={styles.center2}>
            <div className={styles.grid3}>
              <div className={styles.card}>
                {
                  user.users.length > 0 ? (

                    <div>
                      <h1 className="animate-fade-up text-2xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight pb-2">
                        {user.users[0].name}
                      </h1>
                      <p className="pb-2">
                        {user.users[0].name} es un candidato con experiencia en {
                          user.users[0].skills.map((skill) => (
                            <span >
                              {skill},
                            </span>
                          ))

                        } y con habilidades blandas en {
                          user.users[0].personality.map((skill) => (
                            <span >
                              {skill},
                            </span>
                          ))

                        }
                        que vive en {user.users[0].country} y tiene ganas de iniciar laboralmente en este proyecto.
                      </p>
                      <h2 className="animate-fade-up text-xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight pt-1">
                        Habilidades Blandas
                      </h2>
                      {
                        user.users[0].personality.map((skill) => (
                          <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                            {skill}
                          </span>
                        ))
                      }

                      <h2 className="animate-fade-up text-xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight pt-1">
                        Habilidades Duras
                      </h2>
                      {
                        user.users[0].skills.map((skill) => (
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            {skill}
                          </span>
                        ))
                      }

                      <h2 className="animate-fade-up text-xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight pt-1">
                        País
                      </h2>

                      <p>
                        {user.users[0].country}
                      </p>

                      <h2 className="animate-fade-up text-xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight pt-1">
                        Teléfono
                      </h2>

                      <p className="pb-2">
                        {user.users[0].phone}
                      </p>

                    </div>
                  ) : null
                }

                {
                  !isUserInTest ? (
                    <button
                      // type="submit"
                      onClick={() => handleSelectCandidate()}
                      className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Seleccionar candidato
                      {/* <Link href="/project_detail">Seleccionar candidato</Link> */}
                    </button>
                  ) : null
                }
              </div>
              <div className={styles.card}>
                <h1 className="animate-fade-up text-2xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                  Pruebas de selección
                </h1>

                {
                  isUserInTest ? (
                    <p>
                      Este es un resumen de las pruebas que ha realizado el
                      candidato.
                    </p>
                  ) : (
                    <p>
                      Este candidato aún no ha sido seleccionado para realizar
                      pruebas.
                    </p>
                  )
                }

                {isUserInTest ? (
                  <table className="table-auto divide-y divide-gray-300 py-3">
                    <thead className="">
                      <tr>
                        <th className="text-lg from-black font-bold leading-2 text-gray-900 sm:truncate sm:tracking-tight py-1">
                          Prueba
                        </th>
                        <th className="text-lg from-black font-bold leading-2 text-gray-900 sm:truncate sm:tracking-tight py-1">
                          Resultado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 py-2">
                      {
                        tests.map((test) => (
                          <tr>
                            <td className="text-sm font-medium leading-6 text-gray-700 sm:px-3 py-1">
                              {test.type === "technical" ? test.title : test.type}
                            </td>
                            <td className="pl-5">
                              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                50%
                              </span>
                            </td>
                            <td>
                              <button
                                className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              //onClick={() =>
                              //console.log(`Detalles de ${row.original.rol}`)
                              //}
                              >
                                Modificar
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                ) : null}

              </div>
              <div className={styles.card}>
                <h1 className="animate-fade-up text-2xl from-black bg-clip-text  font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight py-2">
                  Entrevistas
                </h1>
                {
                  isUserInTest ? (
                    <p>
                      Este es un resumen de las entrevistas del candidato.
                    </p>
                  ) : (
                    <p>
                      Este candidato aún no ha sido seleccionado para realizar
                      pruebas.
                    </p>
                  )
                }
                {
                  isUserInTest ? (
                    <table className="table-auto divide-y divide-gray-300 py-3">
                      <thead className="">
                        <tr>
                          <th className="text-lg from-black font-bold leading-2 text-gray-900 sm:truncate sm:tracking-tight py-1">
                            Fecha y hora
                          </th>
                          <th className="text-lg from-black font-bold leading-2 text-gray-900 sm:truncate sm:tracking-tight py-1">
                            Resultado
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-300 py-2">
                        <tr>
                          <td className="text-sm font-medium leading-6 text-gray-700 sm:px-3 py-1">
                            10 de Oct 2023
                          </td>
                          <td className="pl-5">
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              50%
                            </span>
                          </td>
                          <td>
                            <button
                              className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            //onClick={() =>
                            //console.log(`Detalles de ${row.original.rol}`)
                            //}
                            >
                              Modificar
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm font-medium leading-6 text-gray-700 sm:px-3 py-1">
                            20 de Oct 2023
                          </td>
                          <td className="pl-5">
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              90%
                            </span>
                          </td>
                          <td>
                            <button
                              className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            //onClick={() =>
                            //console.log(`Detalles de ${row.original.rol}`)
                            //}
                            >
                              Modificar
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm font-medium leading-6 text-gray-700 sm:px-3 py-1">
                            3 de Ago 2022
                          </td>
                          <td className="pl-5">
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              80%
                            </span>
                          </td>
                          <td>
                            <button
                              className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            //onClick={() =>
                            //console.log(`Detalles de ${row.original.rol}`)
                            //}
                            >
                              Modificar
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-sm font-medium leading-6 text-gray-700 sm:px-3 py-1">
                            1 Feb de 2023
                          </td>
                          <td className="pl-5">
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                              20%
                            </span>
                          </td>
                          <td>
                            <button
                              className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            //onClick={() =>
                            //console.log(`Detalles de ${row.original.rol}`)
                            //}
                            >
                              Modificar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
