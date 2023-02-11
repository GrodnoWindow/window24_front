import { useWindowConstructor } from "../../hooks/useWindowConstructor";
import windowRenders from "../../../../data/window-renders.json";
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import {
  MAX_WINDOW_HEIGHT,
  MIN_WINDOW_HEIGHT,
  TRenderWindowState,
} from "../../context/window-constructor.context";
import { Reorder } from "framer-motion";
import { RenderWindow } from "./RenderWindow";
import { useDebounce } from "../../../../hooks/useDebounce";
import { clearParseAndGenerateServicesCalls } from "@typescript-eslint/typescript-estree/dist/parser";
type Props = {
  window: TRenderWindowState;
};
export const WindowRenderer = (props: Props) => {
  const { selectedWindow, windows, setWindows, setMassHeight } =
    useWindowConstructor();

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    divRef.current?.focus();
  }, [selectedWindow]);

  const keyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    const parsedKey = parseInt(event.key);
    // if (!isNaN(parsedKey)) {
    //   switchWindowRenderState(windows[parsedKey - 1].id);
    // }
  };
  const getRenderWindow = (
    window: TRenderWindowState,
    index: number
  ): ReactNode => {
    const render = windowRenders.find((item) => item.type === window.type)!;

    return (
      <RenderWindow
        window={window}
        windowNumber={index + 1}
        imposted={render.imposted}
        image={render.image}
        key={window.id}
      />
    );
  };
  const [changedHeight, setChangedHeight] = useState(MIN_WINDOW_HEIGHT);

  useEffect(() => {
    setChangedHeight(MIN_WINDOW_HEIGHT);
  }, [selectedWindow]);

  const debouncedHeight = useDebounce(changedHeight, 1000);

  useEffect(() => {
    setMassHeight(debouncedHeight);
  }, [debouncedHeight]);
  return (
    <div
      onKeyDown={keyPressHandler}
      tabIndex={0}
      ref={divRef}
      className="focus:outline-none"
    >
      <h3 className="text-center text-2xl font-semibold">
        {selectedWindow?.name}
      </h3>
      <h4 className="mt-8 mb-14 text-center text-lg text-accent">
        Задайте параметры
      </h4>
      <div className="relative mx-auto flex w-fit items-center">
        <Reorder.Group
          className="relative flex w-full justify-center"
          axis="x"
          onReorder={setWindows}
          values={windows}
        >
          {windows.map((window, index) => getRenderWindow(window, index))}
        </Reorder.Group>

        {/*{!isDoor && (*/}
        <input
          type="number"
          // defaultValue={changedHeight}
          value={changedHeight}
          min={MIN_WINDOW_HEIGHT}
          max={MAX_WINDOW_HEIGHT}
          onChange={(e) => setChangedHeight(parseInt(e.target.value))}
          className="absolute right-[-7.5rem] block h-7 w-24 border border-black px-2 py-1 text-center"
        />
        {/*)}*/}
      </div>
    </div>
  );
};
