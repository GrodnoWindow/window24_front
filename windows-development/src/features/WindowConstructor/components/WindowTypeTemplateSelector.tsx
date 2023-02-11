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
    name: "1 створчатые",
    preview_image: "/images/template-preview/1stvr.svg",
    children: [
      {
        id: "1STVR_FIRST",
        name: "1 створчатые - 1",
        preview_image: "/images/template-preview/1stvr_1.svg",
      },
      {
        id: "1STVR_SECOND",
        name: "1 створчатые - 2",
        preview_image: "/images/template-preview/1stvr_2.svg",
      },
    ],
  },
  {
    id: "0",
    name: "Хрущевка",
    preview_image: "/images/template-preview/hrushevka.svg",
    children: [
      {
        id: "HRUSCHEVKA_FIRST",
        name: "Хрущевка - 1",
        preview_image: "/images/template-preview/hrushevka_1.svg",
      },
      {
        id: "HRUSCHEVKA_SECOND",
        name: "Хрущевка - 2",
        preview_image: "/images/template-preview/hrushevka_2.svg",
      },
      {
        id: "HRUSCHEVKA_THIRD",
        name: "Хрущевка - 3",
        preview_image: "/images/template-preview/hrushevka_3.svg",
      },
      {
        id: "HRUSCHEVKA_FOURTH",
        name: "Хрущевка - 4",
        preview_image: "/images/template-preview/hrushevka_4.svg",
      },
    ],
  },
  {
    id: "0",
    name: "Брежневка",
    preview_image: "/images/template-preview/breshnewka.svg",
    children: [
      {
        id: "BRESHNEWKA_FIRST",
        name: "Брежневка - 1",
        preview_image: "/images/template-preview/breshnewka_1.svg",
      },
    ],
  },
];

export const WindowTypeTemplateSelector = () => {
  return (
    <TypeSelector
      data={generalWindowTypes}
      text="Часто используемые конструкции"
    />
  );
};
