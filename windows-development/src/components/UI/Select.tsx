import { Listbox } from "@headlessui/react";
import { forwardRef, memo, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
// import
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
  value?: TOption;
  placeholder?: string;
};

export const Select = memo(
  forwardRef<HTMLButtonElement, Props>((props, ref) => {
    const { options, onChange, value, name, defaultValue, placeholder } = props;

    useEffect(() => {
      if (!value && defaultValue) {
        onChange(defaultValue);
      }
    }, [value]);

    return (
      <Listbox value={value} onChange={onChange} name={name}>
        {({ open }) => (
          <div className="relative rounded-md border border-gray-300 transition-all hover:border-black">
            <Listbox.Button
              ref={ref}
              className="relative w-full py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:ring focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span className="block truncate pl-[5px]  font-light text-[#9C9C9C]">
                {value?.label || placeholder || "Выберите значение"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                {open ? (
                  <ChevronUpIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-3 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white shadow-sm focus:outline-none">
              {options.map((option, optionId) => (
                <Listbox.Option
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
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        )}
      </Listbox>
    );
  })
);
