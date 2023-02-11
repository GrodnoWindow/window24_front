import { useWindowConstructor } from "../../../../hooks/useWindowConstructor";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { TWindowsState } from "../../../../context/window-constructor.context";

type Props = {
  id: TWindowsState;
  preview_image: string;
  name: string;
};

export const PopoverItem = (props: Props) => {
  const { id, preview_image, name } = props;

  const { selectedWindow, setSelectedWindow } = useWindowConstructor();

  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (id === selectedWindow.type) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedWindow]);

  const handleClick = () => {
    setSelectedWindow({
      type: id,
      name,
    });
  };

  return (
    <li
      className={clsx(
        "w-full cursor-pointer rounded-md border-2 transition-all duration-500 hover:border-teal-600 hover:bg-slate-50",
        selected ? "border-accent" : "border-transparent"
      )}
      onClick={handleClick}
    >
      <div className="flex w-full items-center justify-center p-1">
        <img src={preview_image} alt={name} className="block" />
      </div>
    </li>
  );
};
