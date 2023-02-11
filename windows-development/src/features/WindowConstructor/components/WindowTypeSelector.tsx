import { useEffect } from "react";
import { useWindowConstructor } from "../hooks/useWindowConstructor";
import { TypeSelector } from "./TypeSelector";
import { TWindowsState } from "../context/window-constructor.context";

const generalWindowTypes: Array<{
  id: string;
  name: string;
  preview_image: string;
  children: Array<{
    id: TWindowsState;
    name: string;
    preview_image: string;
  }>;
}> = [
  {
    id: "0",
    name: "Обычное окно",
    preview_image:
      "/images/window-select-previews/default-window-single-preview.svg",
    children: [
      {
        id: "DEFAULT_WINDOW_SINGLE",
        name: "Одностворчатое окно",
        preview_image:
          "/images/window-select-previews/default-window-single-preview.svg",
      },
      {
        id: "DEFAULT_WINDOW_DOUBLE",
        name: "Двустворчатое окно",
        preview_image:
          "/images/window-select-previews/default-window-double-preview.svg",
      },
      {
        id: "DEFAULT_WINDOW_TRIPLE",
        name: "Трехстворчатое окно",
        preview_image:
          "/images/window-select-previews/default-window-triple-preview.svg",
      },
      {
        id: "DEFAULT_WINDOW_FOUR",
        name: "Четырехстворчатое окно",
        preview_image:
          "/images/window-select-previews/default-window-four-preview.svg",
      },
    ],
  },
  {
    id: "1",
    name: "Дверь",
    preview_image: "/images/window-select-previews/door-preview.svg",
    children: [
      {
        id: "DOOR",
        name: "Балконная дверь",
        preview_image: "/images/window-select-previews/door-preview.svg",
      },
    ],
  },
  {
    id: "2",
    name: "Дверь с окном слева",
    preview_image:
      "/images/window-select-previews/door-window-left-preview.svg",

    children: [
      {
        id: "DOOR_WINDOW_LEFT",
        name: "Дверь с  окном слева",
        preview_image:
          "/images/window-select-previews/door-window-left-preview.svg",
      },
      {
        id: "DOOR_WINDOW_LEFT_DOUBLE",
        name: "Дверь с 2 окнами слева",
        preview_image:
          "/images/window-select-previews/door-window-left-2-previewsvg.svg",
      },
      {
        id: "DOOR_WINDOW_LEFT_TRIPLE",
        name: "Дверь с 3 окнами слева",
        preview_image:
          "/images/window-select-previews/door-window-left-3-preview.svg",
      },
    ],
  },
  {
    id: "3",
    name: "Дверь с окном справа",
    preview_image:
      "/images/window-select-previews/door-window-right-preview.svg",
    children: [
      {
        id: "DOOR_WINDOW_RIGHT",
        name: "Дверь с окном справа",
        preview_image:
          "/images/window-select-previews/door-window-right-preview.svg",
      },
      {
        id: "DOOR_WINDOW_RIGHT_DOUBLE",
        name: "Дверь с 2 окнами справа",
        preview_image:
          "/images/window-select-previews/door-window-right-2-preview.svg",
      },
      {
        id: "DOOR_WINDOW_RIGHT_TRIPLE",

        name: "Дверь с 3 окнами слева",
        preview_image:
          "/images/window-select-previews/door-window-right-3-preview.svg",
      },
    ],
  },
  {
    id: "4",
    name: "Дверь с окнами",
    preview_image:
      "/images/window-select-previews/door-window-multi-preview.svg",
    children: [
      {
        id: "DOOR-MULTI",
        name: "Дверь с окнами",
        preview_image:
          "/images/window-select-previews/door-window-multi-preview.svg",
      },
    ],
  },
];

export const WindowTypeSelector = () => {
  const { setSelectedWindow } = useWindowConstructor();

  useEffect(() => {
    setSelectedWindow({
      type: generalWindowTypes[0].children[0].id,
      name: generalWindowTypes[0].name,
    });
  }, []);

  return <TypeSelector data={generalWindowTypes} text="Тип окна" />;
};
