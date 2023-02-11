import { PopoverItem } from "./PopoverItem";
import { TWindowsState } from "../../../../context/window-constructor.context";

type Props = {
  items: Array<{
    id: TWindowsState;
    name: string;
    preview_image: string;
  }>;
};

export const PopoverPanel = (props: Props) => {
  const { items } = props;

  return (
    <ul className="mt-20 flex min-w-full list-inside flex-col gap-3 rounded-md bg-slate-100">
      {items.length > 0 ? (
        items.map((item) => <PopoverItem {...item} key={item.id} />)
      ) : (
        <span className="block text-center text-sm">Нет доступных окон</span>
      )}
    </ul>
  );
};
