import { useWindowConstructor } from "../../hooks/useWindowConstructor";
import { memo, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import {
  MAX_DOOR_WIDTH,
  MAX_WINDOW_HEIGHT,
  MAX_WINDOW_WIDTH,
  MIN_DOOR_WIDTH,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  TRenderWindowState,
} from "../../context/window-constructor.context";
import { useDebounce } from "../../../../hooks/useDebounce";

type Props = {
  image: string;
  imposted: boolean;
  windowNumber: number;
  window: TRenderWindowState;
};

export const RenderWindow = memo((props: Props) => {
  const { image, windowNumber, imposted, window } = props;

  const {
    switchWindowRenderState,
    setWindowWidth,
    setWindowHeight,
    removeImpost,
    windowColor,
    selectedWindow,
  } = useWindowConstructor();

  const { height, width } = window;

  const handleRemoveImpostClick = () => {
    removeImpost(window.id);
  };

  const [changedWidth, setChangedWidth] = useState(width);
  const debouncedWidth = useDebounce(changedWidth, 1000);

  const [changedHeight, setChangedHeight] = useState(height);
  const debouncedHeight = useDebounce(changedHeight, 1000);

  useEffect(() => {
    setWindowWidth(window.id, debouncedWidth);
  }, [debouncedWidth]);
  useEffect(() => {
    setWindowHeight(window.id, debouncedHeight);
  }, [debouncedHeight]);

  useEffect(() => {});

  const windowPixelWidth = `${Math.floor(width / 4.2)}px`;
  const windowPixelHeight = `${Math.floor(height / 4.2)}px`;

  const doorPixelHeight = `${Math.floor(height / 2.9)}px`;

  const [isDragging, setIsDragging] = useState(false);

  const isDoor = window.originalType.toLowerCase().includes("door");

  return (
    <Reorder.Item
      className="relative flex cursor-pointer flex-col justify-between py-4"
      value={window}
      id={window.id}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
    >
      {imposted && (
        <button
          type="button"
          className="absolute -top-7 left-[50%] translate-x-[-50%] cursor-pointer justify-center whitespace-nowrap rounded-[5px] border bg-gradient-to-r from-[#BADFDB] to-[#87CED7] py-[2px] px-1 text-center text-xs font-semibold text-white "
          onClick={handleRemoveImpostClick}
        >
          Убрать импост
        </button>
      )}

      <div
        className="hover:opacity-80"
        style={{
          backgroundColor: windowColor,
          width: windowPixelWidth,
          height: windowPixelHeight,
        }}
      >
        {isDoor && (
          <div className="w-ful absolute left-0 -top-9 z-50">
            <input
              type="number"
              value={changedHeight}
              min={MIN_WINDOW_HEIGHT}
              max={MAX_WINDOW_HEIGHT}
              onChange={(e) => setChangedHeight(parseInt(e.target.value))}
              className="mx-auto block w-2/3 border border-black px-2 py-1 text-center"
            />
          </div>
        )}
        <img
          src={image}
          alt="window-renderer"
          className="h-full w-full"
          draggable={false}
          onClick={isDragging ? null : () => switchWindowRenderState(window.id)}
        />
      </div>
      <span className="absolute top-2 right-2 flex h-[32px] w-[32px] items-center justify-center rounded-md bg-gray-700 text-sm font-bold text-white">
        {windowNumber}
      </span>
      <div className="absolute left-0 -bottom-9 w-full">
        <input
          type="number"
          className="mx-auto block w-2/3 border border-black px-2 py-1 text-center"
          value={changedWidth}
          onChange={(e) => setChangedWidth(+e.target.value)}
          min={isDoor ? MIN_DOOR_WIDTH : MIN_WINDOW_WIDTH}
          max={isDoor ? MAX_DOOR_WIDTH : MAX_WINDOW_WIDTH}
        />
      </div>
    </Reorder.Item>
  );
});
