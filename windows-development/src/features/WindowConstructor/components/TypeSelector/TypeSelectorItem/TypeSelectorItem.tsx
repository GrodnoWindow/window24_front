import { Fragment, useEffect, useState } from "react";
import { useWindowConstructor } from "../../../hooks/useWindowConstructor";
import clsx from "clsx";
import { Popover, Transition } from "@headlessui/react";
import { PopoverPanel } from "./PopoverPanel";
import { usePopper } from "react-popper";
import { TWindowsState } from "../../../context/window-constructor.context";

type Props = {
  name: string;
  preview_image: string;
  children: Array<{
    id: TWindowsState;
    name: string;
    preview_image: string;
  }>;
};

export const TypeSelectorItem = (props: Props) => {
  const { name, children, preview_image } = props;

  const [selected, setSelected] = useState(false);
  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  let { styles, attributes } = usePopper(referenceElement, popperElement);
  const { selectedWindow } = useWindowConstructor();

  useEffect(() => {
    setSelected(
      children.find((item) => item.id === selectedWindow?.type) !== undefined
    );
  }, [selectedWindow]);

  return (
    <li className="group relative ">
      <span
        className={clsx(
          "absolute -top-6 left-0 text-[11.5px] font-semibold text-primary transition-opacity duration-500 ease-in-out ",
          selected ? "opacity-1" : "opacity-0"
        )}
      >
        {name}
      </span>
      <Popover>
        <Popover.Button
          style={{ outline: "none" }}
          className={clsx(
            "divide flex h-full w-full cursor-pointer items-center justify-center rounded-md border-2 border-slate-100 px-4 py-1 hover:border-transparent hover:bg-slate-50",
            selected && "border-accent hover:border-accent"
          )}
          ref={setReferenceElement}
        >
          <img src={preview_image} alt={name} className="block" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-350"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-250"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
            className="z-10 w-full items-center"
          >
            <PopoverPanel items={children} />
          </Popover.Panel>
        </Transition>
      </Popover>
    </li>
  );
};
