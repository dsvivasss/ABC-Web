"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import "./i18n";
import { useTranslation, Trans } from "react-i18next";
import i18next from "i18next";
import LanguageFlag from "./components/LanguageFlag";

const language = [
  {
    id: "es",
    name: "Español",
  },

  {
    id: "en",
    name: "Inglés",
  },
];
const paises = [
  {
    id: 1,
    name: "Colombia",
  },

  {
    id: 2,
    name: "Mexico",
  },

  {
    id: 3,
    name: "Peru",
  },
];

const skills = [
  {
    id: 1,
    name: "python",
  },
  {
    id: 2,
    name: "javascript",
  },
  {
    id: 3,
    name: "java",
  },
  {
    id: 4,
    name: "oop",
  },
  {
    id: 5,
    name: "product_management",
  },
];

const lngs = {
  es: { nativeName: "Español" },
  en: { nativeName: "English" },
};

// istanbul ignore next
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [selected, setSelected] = useState(language[0]);
  const [pais, setPais] = useState(paises[0]);
  const [skillsSelected, setSkillsSelected] = useState([]);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  // TODO: Add validation
  // istanbul ignore next
  function register(e) {
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      language: selected.id,
      country: pais.name,
      phone: +e.target.phone.value,
      skills: skillsSelected.map((el) => el.name),
      personality: e.target.personality.value.split(" "),
    };

    e.preventDefault();
    fetch("https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/users/", {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        toast("Aspirante creado!", { position: "bottom-left", theme: "dark" });
        //router.push('/dashboard', { scroll: false })
      });
  }

  // istanbul ignore next
  function handleSelectSkill(value) {
    if (!isSelected(value)) {
      const selectedSkillsUpdated = [
        ...skillsSelected,
        skills.find((el) => el === value),
      ];
      setSkillsSelected(selectedSkillsUpdated);
    } else {
      handleDeselect(value);
    }
  }

  // istanbul ignore next
  function isSelected(value) {
    return skillsSelected.find((el) => el === value) ? true : false;
  }

  // istanbul ignore next
  function handleDeselect(value) {
    const selectedSkillsUpdated = skillsSelected.filter((el) => el !== value);
    setSkillsSelected(selectedSkillsUpdated);
  }

  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <h1
          className="animate-fade-up from-black bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          {t("registrationTitle")}
        </h1>
      </div>

      <div
        className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0 pb-6"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <a
          className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
          href="/"
          rel="noopener noreferrer"
        >
          <p>Accede como aspirante</p>
        </a>
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
          href="/company"
          rel="noopener noreferrer"
        >
          <p>
            <span className="hidden sm:inline-block">Accede como empresa</span>
          </p>
        </a>
      </div>

      <div className={styles.card}>
        <div>
          <h2>Conectamos profesionales de TI</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={register}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  placeholder="  Mi nombre"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@domain.com"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="********"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Telefono Celular
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  autoComplete="phone"
                  placeholder="+571112223333"
                  required
                  maxLength="10"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    Idioma
                  </Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">
                          {selected.name}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center pr-2 pt-2">
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
                        {language.map((person) => (
                          // istanbul ignore next
                          <Listbox.Option
                            key={person.id}
                            className={
                              // istanbul ignore next
                              ({ active }) =>
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
                                      active ? "text-white" : "text-indigo-600",
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

            <Listbox value={pais} onChange={setPais}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    Pais
                  </Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">{pais.name}</span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center pr-2 pt-2">
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
                        {paises.map((option) => (
                          <Listbox.Option
                            key={option.id}
                            className={
                              // istanbul ignore next
                              ({ active }) =>
                                classNames(
                                  active
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                            }
                            value={option}
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
                                    {option.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
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

            <Listbox
              value={skillsSelected}
              onChange={
                // istanbul ignore next
                (value) => handleSelectSkill(value)
              }
            >
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                    Habilidad
                  </Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">
                          {skillsSelected
                            .map(
                              // istanbul ignore next
                              (el) => el.name
                            )
                            .join(", ")}
                        </span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-2 flex items-center pr-2 pt-2">
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
                        {skills.map((option) => (
                          <Listbox.Option
                            key={option.id}
                            className={
                              // istanbul ignore next
                              ({ active }) =>
                                classNames(
                                  active
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-900",
                                  "relative cursor-default select-none py-2 pl-3 pr-9"
                                )
                            }
                            value={option}
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
                                    {option.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
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

            <div>
              <label
                htmlFor="personality"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Personalidad
              </label>
              <div className="mt-2 pb-2">
                <input
                  id="personality"
                  name="personality"
                  type="personality"
                  autoComplete="personality"
                  placeholder="  Selecciona tu personalidad"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="pb-1">
              <button
                type="submit"
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 pt-4">
            ¿Ya tienes una cuenta?{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
      <LanguageFlag></LanguageFlag>
    </main>
  );
}
