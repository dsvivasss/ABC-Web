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

const TestcardItem = ({ index, description, options }) => {

  return (
    <ul role="list" className="divide-y divide-gray-100">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-5 text-gray-900">
            {index}. {description}
          </p>
          {options.map((option) => (
            <p className="mt-1 text-xs leading-5 text-gray-500">
              - {option.description}
            </p>
          ))
          }
        </div>
      </div>
    </ul>
  );
};

export default TestcardItem;
