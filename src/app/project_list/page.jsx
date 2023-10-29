"use client";
import Image from "next/image";
import styles from "../page.module.css";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useCallback, useEffect } from "react";
import axios from "axios";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";

import ProjectcardItem from "../components/ProjectcardItem";

const proyectosEjemplo = [
  {
    nombre: "Proyecto A",
    descripcion: "Descripción del Proyecto A",
    roles: ["Gerente de Proyecto", "Desarrollador Frontend", "Diseñador UX"],
    habilidades: [
      "Comunicación efectiva",
      "Trabajo en equipo",
      "Resolución de problemas",
    ],
  },
  {
    nombre: "Proyecto B",
    descripcion: "Descripción del Proyecto B",
    roles: [
      "Director de Marketing",
      "Desarrollador Backend",
      "Especialista en SEO",
    ],
    habilidades: [
      "Marketing digital",
      "Programación en Python",
      "Optimización de motores de búsqueda",
    ],
  },
  {
    nombre: "Proyecto C",
    descripcion: "Descripción del Proyecto C",
    roles: ["CEO", "Analista de Datos", "Especialista en Finanzas"],
    habilidades: [
      "Gestión estratégica",
      "Análisis de datos",
      "Planificación financiera",
    ],
  },
];

const navigation = [{ name: "Dashboard", href: "#", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => ListProject(), []);

  function ListProject() {
    fetch(
      "https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/projects/companies/2",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())

      .then((data) => setProjects(data.projects));
  }

  // {projects=data.projects}

  return (
    <>
      <div class="">
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
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Cerrar sesión
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
      <div class="flex">
        <div class="bg-neutral-50 w-1/6">
          <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-neutral-50 text-gray-800">
            <div class="flex flex-col top-0 left-0 bg-neutral-50 h-full border-r">
              <div class="overflow-y-auto overflow-x-hidden flex-grow">
                <ul class="flex flex-col py-4 space-y-1">
                  <li class="px-5">
                    <div class="flex flex-row items-center h-8">
                      <div class="text-sm font-light tracking-wide text-gray-500">
                        Menu
                      </div>
                    </div>
                  </li>

                  <li>
                    <a
                      href="#"
                      class="flex items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    >
                      <span class="inline-flex justify-center items-center ml-4">
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          ></path>
                        </svg>
                      </span>
                      <span class="ml-2 text-sm tracking-wide truncate">
                        Proyectos
                      </span>
                      <span class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
                        3
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="w-5/6 p-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1 pl-6 pb-4">
              <h2 className="animate-fade-up from-black bg-clip-text text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight py-2">
                Mis proyectos
              </h2>
              <p>
                A continuación podrás ver el listado de tus proyectos en curso.
              </p>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
              <span className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <CheckIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Crear nuevo proyecto
                </button>
              </span>

              {/* Dropdown */}
              <Menu as="div" className="relative ml-3 sm:hidden">
                <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                  More
                  <ChevronDownIcon
                    className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Editar
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
                          Ver
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <div>
            {projects.map((project, index) => (
              <ProjectcardItem
                company_id={index}
                title={project.title}
                description={project.description}
                soft_skills={project.soft_skills}
                hard_skills={project.hard_skills}
                roles={project.roles}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
