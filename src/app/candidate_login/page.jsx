'use client';
import Image from 'next/image'
import styles from '../page.module.css'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'

// istanbul ignore next
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CandidateSignIn() {

  const router = useRouter()

  // istanbul ignore next
  async function login(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const body = {
      email: formJson.email,
      password: formJson.password,
    }
    const request = await fetch('https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/users/auth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

    if (request.status == 404) {
      toast("Usuario no encontrado", { position: "bottom-left", theme: "dark" })
      return
    }

    if (request.status == 401) {
      toast("Contraseña incorrecta", { position: "bottom-left", theme: "dark" })
      return
    }

    const response = await request.json()
    console.log({ request, response })

    toast("Login exitoso!", { position: "bottom-left", theme: "dark" })
    localStorage.setItem("company_id", response.id)
    router.refresh()
    router.push("/candidate_home/")

  }

  return (
    <main className={styles.main}>

      <div className={styles.center}>
        <h1
          className="animate-fade-up from-black bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
          Inicia sesión
        </h1>
      </div>

      <div
        className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0 pb-6"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <a
          className="group flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
          href="/candidate_login"
          rel="noopener noreferrer"
        >
          <p>Accede como aspirante</p>
        </a>
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
          href="/company_login"
          rel="noopener noreferrer"
        >
          <p>
            <span className="hidden sm:inline-block">Accede como empresa</span>
          </p>
        </a>
      </div>

      <div className={styles.card}>
        <div>
          <h2>
            Conectamos profesionales de TI
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={login}>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Correo del candidato
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
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
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

            <div className="pb-1">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500 pt-4">
            ¿Aún no tienes cuenta?{' '}
            <a href="http://localhost:3000/" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Regístrate
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </main>
  )
}

