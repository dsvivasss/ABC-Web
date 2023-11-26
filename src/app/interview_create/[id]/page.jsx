"use client";
import styles from "../../page.module.css";
import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Datepicker from "react-tailwindcss-datepicker";
import TimePicker from "../../components/TimePicker";
import { useRouter } from "next/navigation";
import SideBar from "../../components/SideBar";

// istanbul ignore next
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Interview_create({ params }) {
  const user_id = params.id;
  const router = useRouter();

  var company_id = null;
  var project_data = null;

  const [date, setDate] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  const [time, setTime] = useState();

  const handleValueChange = (newValue) => {
    setDate(newValue);
  };

  // istanbul ignore next
  function handleCeateInterview(e) {
    e.preventDefault();
    const interviewDateString = `${date.startDate}T${time}`;

    const body = {
      company_id: +company_id,
      project_id: project_data.id,
      title: "Entrevista",
      type: "interview",
      difficulty_level: interviewDateString,
      hard_skills: [user_id],
      questions: [],
    };

    // istanbul ignore next
    fetch("https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/tests/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        toast("Entrevista creada!", { position: "top-right" });
        router.push(`/candidate_detail/${user_id}`);
      });
  }

  useEffect(() => {
    company_id = localStorage.getItem("company_id");
    project_data = JSON.parse(localStorage.getItem("project_selected"));
  });

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
        <SideBar></SideBar>

        <div className="w-5/6 p-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1 pl-6 pb-4">
              <h2 className="animate-fade-up from-black bg-clip-text text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight py-2">
                Programa una nueva entrevista a su candidato seleccionado
              </h2>
              <p>Estas a muy pocos pasos de conocer a tu candidato</p>
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.card}>
              <div className="lg:flex lg:items-center lg:justify-between pb-2">
                <div className="min-w-0 flex-1">
                  <form className="space-y-6" onSubmit={handleCeateInterview}>
                    <div>
                      <label
                        htmlFor="test_title"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fecha
                      </label>
                      <div className="mt-2">
                        <div>
                          <Datepicker
                            value={date}
                            onChange={handleValueChange}
                            asSingle={true}
                            useRange={false}
                            primaryColor={"indigo"}
                          />
                        </div>
                      </div>
                      <label
                        htmlFor="test_title"
                        className="block text-sm font-medium leading-6 text-gray-900 pt-2"
                      >
                        Hora
                      </label>
                      <div>
                        <TimePicker
                          value={time}
                          onChange={(time) => setTime(time)}
                        />
                      </div>
                    </div>

                    <div className="pb-1 pt-2">
                      <span className="hidden sm:block pr-5">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-indigo-800 leading-6"
                        >
                          <Link href={`/candidate_detail/${user_id}`}>
                            Cancelar
                          </Link>
                        </button>
                      </span>
                      <button
                        onClick={(e) => handleCeateInterview(e)}
                        className="justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Citar entrevista
                      </button>
                    </div>
                  </form>
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
