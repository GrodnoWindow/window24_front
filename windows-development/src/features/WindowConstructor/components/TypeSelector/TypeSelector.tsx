import { TypeSelectorItem } from "./TypeSelectorItem";
import { TWindowsState } from "../../context/window-constructor.context";
import { WindowConstructorSubHeader } from "../WindowConstructorSubHeader";

type Props = {
  text: string;
  data: Array<{
    id: string;
    name: string;
    preview_image: string;
    children: Array<{
      id: TWindowsState;
      name: string;
      preview_image: string;
    }>;
  }>;
};

export const TypeSelector = (props: Props) => {
  const { data, text } = props;
  return (
    <>
      <WindowConstructorSubHeader text={text} />
      <div>
        <ul className="grid list-inside grid-cols-4 gap-x-4 gap-y-7 pr-10">
          {data.map((item) => (
            <TypeSelectorItem
              {...item}
              children={item.children}
              key={item.id}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
