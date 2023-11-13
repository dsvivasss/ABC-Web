import React from "react";
import styles from "../page.module.css";
import { Fragment, useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
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

const TimePicker = ({ index, description, options }) => {
  return (
    <div>
      <div className="relative mt-2 rounded-md">
        <input
          type="text"
          name="hour"
          id="hour"
          className="block w-78 rounded-md border-0 py-1.5 pl-7 pr-28 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-100 items-center">
          <select
            id="hours"
            name="hours"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-10 pr-15 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
            <option>09</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
        </div>
        <div className="absolute inset-y-0 right-80 flex items-center">
          <select
            id="minutes"
            name="minutes"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-20 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option>00</option>
            <option>15</option>
            <option>30</option>
            <option>45</option>
          </select>
        </div>
        <div className="absolute inset-y-0 right-60 flex items-center">
          <select
            id="est"
            name="est"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-15 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
