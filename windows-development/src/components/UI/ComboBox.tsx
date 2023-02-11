import { Combobox, Transition } from "@headlessui/react";
import { forwardRef, Fragment, memo, useEffect, useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

type TOption = {
  label: string;
  value: any;
  renderElement?: JSX.Element;
  [key: string]: any;
};
type Props = {
  options: Array<TOption>;
  onChange: (value: TOption) => void;
  name?: string;
  defaultValue?: TOption;
  value: TOption;
  placeholder?: string;
};

export const ComboBox = memo(
  forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { options, onChange, value, name, defaultValue, placeholder } = props;
    const [query, setQuery] = useState("");

    const filteredOptions =
      query === ""
        ? options
        : options.filter((option) =>
            option.label.toString().toLowerCase().includes(query.toLowerCase())
          );

    useEffect(() => {
      if (!value && defaultValue) {
        onChange(defaultValue);
      }
    }, [value]);

    return (
      <Combobox value={value} onChange={onChange} name={name}>
        <div className="relative rounded-md border border-gray-300 transition-all hover:border-black">
          <Combobox.Input
            ref={ref}
            displayValue={(value: TOption) => value?.label}
            placeholder={placeholder}
            onChange={(event) => setQuery(event.target.value)}
            className="relative w-full truncate rounded-md py-2 pl-4 pr-10 text-left font-light text-[#9C9C9C] focus:border-black focus:outline-none"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-10 mt-3 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-sm focus:outline-none">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Ничего не найдено.
                </div>
              ) : (
                filteredOptions.map((option, optionId) => (
                  <Combobox.Option
                    key={optionId}
                    className={({ active, selected }) =>
                      `relative cursor-pointer border-l-4 border-transparent ${
                        active || selected
                          ? "border-l-accent bg-slate-50 text-white"
                          : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate p-2 ${
                            selected ? "bg-accent text-white" : "text-gray-900"
                          }`}
                        >
                          {option.renderElement
                            ? option.renderElement
                            : option.label}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    );
  })
);
