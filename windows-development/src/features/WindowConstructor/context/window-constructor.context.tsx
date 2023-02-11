import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

type TWindowConstructorContext = {
  selectedWindow: TSelectedWindow | undefined;
  setSelectedWindow: (type: TSelectedWindow) => void;
  switchWindowRenderState: (id: string) => void;
  addImpost: (id: string, impostType: TImpost) => void;
  removeImpost: (id: string) => void;
  windows: Array<TRenderWindowState>;
  mainFormState: TMainFormState;
  handleMainFormStateChange: (values: Partial<TMainFormState>) => void;
  windowColor: string;
  setWindowColor: (color: string) => void;
  setWindows: (windows: Array<TRenderWindowState>) => void;
  setWindowWidth: (id: string, width: number) => void;
  setWindowHeight: (id: string, height: number) => void;
  setMassHeight: (height: number) => void;
};

type TWindowConstructorContextProvider = {
  children: ReactNode;
};

export type TImpost = "HORIZONTAL" | "VERTICAL";

export type TSelectedWindow = {
  name: string;
  type: TWindowsState;
};

//Сюда типы оконной формы
export type TWindowsState =
  | "DEFAULT_WINDOW_SINGLE"
  | "DEFAULT_WINDOW_DOUBLE"
  | "DEFAULT_WINDOW_TRIPLE"
  | "DEFAULT_WINDOW_FOUR"
  | "DOOR-MULTI"
  | "DOOR"
  | "DOOR_WINDOW_LEFT_DOUBLE"
  | "DOOR_WINDOW_RIGHT_DOUBLE"
  | "DOOR_WINDOW_RIGHT_TRIPLE"
  | "DOOR_WINDOW_RIGHT"
  | "DOOR_WINDOW_LEFT_TRIPLE"
  | "DOOR_WINDOW_LEFT"
  | "HRUSCHEVKA_FIRST"
  | "HRUSCHEVKA_SECOND"
  | "HRUSCHEVKA_THIRD"
  | "HRUSCHEVKA_FOURTH"
  | "BRESHNEWKA_FIRST"
  | "1STVR_FIRST"
  | "1STVR_SECOND";

type TSingleWindowRender =
  | "SINGLE-EMPTY"
  | "SINGLE-RIGHT-TURNED"
  | "SINGLE-RIGHT-TURNED-FOLDED"
  | "SINGLE-LEFT-TURNED"
  | "SINGLE-LEFT-TURNED-FOLDED";

type TDoorWindowRender =
  | "DOOR-LEFT-TURNED"
  | "DOOR-RIGHT-TURNED"
  | "DOOR-LEFT-TURNED-FOLDED"
  | "DOOR-RIGHT-TURNED-FOLDED";

type THorizontalImpostRender =
  | "HORIZONTAL-IMPOST"
  | "HORIZONTAL-IMPOST-TOP-TURNED"
  | "HORIZONTAL-IMPOST-BOTTOM-TURNED"
  | "HORIZONTAL-IMPOST-TOP-TURNED-FOLDED"
  | "HORIZONTAL-IMPOST-BOTTOM-TURNED-FOLDED"
  | "HORIZONTAL-IMPOST-BOTTOM-TURNED-TOP-TURNED-FOLDED"
  | "HORIZONTAL-IMPOST-BOTTOM-TURNED-FOLDED-TOP-TURNED-FOLDED";

type TVerticalImpostRender =
  | "VERTICAL-IMPOST"
  | "VERTICAL-IMPOST-LEFT-TURNED"
  | "VERTICAL-IMPOST-LEFT-TURNED-FOLDED"
  | "VERTICAL-IMPOST-RIGHT-TURNED"
  | "VERTICAL-IMPOST-RIGHT-TURNED-FOLDED"
  | "VERTICAL-IMPOST-LEFT-TURNED-RIGHT-TURNED-FOLDED"
  | "VERTICAL-IMPOST-LEFT-TURNED-FOLDED-RIGHT-TURNED-FOLDED";

export type TWindowRender =
  | TSingleWindowRender
  | TDoorWindowRender
  | THorizontalImpostRender
  | TVerticalImpostRender;

export type TOriginalWindow = TSingleWindowRender | TDoorWindowRender;

export type TRenderWindowState = {
  id: string;
  type: TWindowRender;
  originalType: TOriginalWindow;
  width: number;
  height: number;
};

export type TMainFormState = {
  profileOption: string | null;
  windowsillOption: string | null;
  colorOption: string | null;
  glazingOption: string | null;
  controlOption: string | null;
};
export const MIN_WINDOW_WIDTH = 700;
export const MAX_WINDOW_WIDTH = 2200;
export const MIN_WINDOW_HEIGHT = 1350;
export const MAX_WINDOW_HEIGHT = 3000;

export const MIN_DOOR_WIDTH = 700;
export const MAX_DOOR_WIDTH = 3000;
export const MIN_DOOR_HEIGHT = 2070;
export const MAX_DOOR_HEIGHT = 3000;

export const WindowConstructorContext =
  createContext<TWindowConstructorContext>({} as TWindowConstructorContext);

export const WindowConstructorContextProvider = (
  props: TWindowConstructorContextProvider
) => {
  const { children } = props;

  const [selectedWindow, setSelectedWindow] = useState<
    TSelectedWindow | undefined
  >();

  const [windowColor, setWindowColor] = useState<string>("transparent");

  const [renderWindowsState, setRenderWindowsState] = useState<
    Array<TRenderWindowState>
  >([]);

  const [mainFormState, setMainFormState] = useState<TMainFormState>({
    profileOption: null,
    windowsillOption: null,
    colorOption: null,
    glazingOption: null,
    controlOption: null,
  });

  const handleMainFormStateChange = useCallback(
    (values: Partial<TMainFormState>) => {
      setMainFormState((prevState) => ({
        ...prevState,
        ...values,
      }));
    },
    []
  );

  const removeImpost = (id: string) => {
    const newRenderWindowsState = renderWindowsState.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          type: item.originalType,
        };
      }
      return item;
    });
    setRenderWindowsState(newRenderWindowsState);
  };

  const setMassHeight = (height: number) => {
    const newRenderWindowsState = renderWindowsState.map((item) => {
      if (!item.type.toLowerCase().includes("door")) {
        return {
          ...item,
          height,
        };
      } else return item;
    });
    setRenderWindowsState(newRenderWindowsState);
  };

  useEffect(() => {
    const currentColor = mainFormState.colorOption?.split("_")[0];
    setWindowColor(currentColor || "transparent");
  }, [mainFormState]);

  const addImpost = useCallback(
    (id: string, impostType: TImpost) => {
      const newRenderWindowsState = renderWindowsState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            type:
              impostType === "HORIZONTAL"
                ? ("HORIZONTAL-IMPOST" as TWindowRender)
                : ("VERTICAL-IMPOST" as TWindowRender),
          };
        }
        return item;
      });
      setRenderWindowsState(newRenderWindowsState);
    },
    [renderWindowsState]
  );

  console.log(renderWindowsState, mainFormState);

  const setWindowWidth = (id: string, width: number) => {
    const newRenderWindowsState = renderWindowsState.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          width,
        };
      }
      return item;
    });
    setRenderWindowsState(newRenderWindowsState);
  };

  const setWindowHeight = (id: string, height: number) => {
    const newRenderWindowsState = renderWindowsState.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          height,
        };
      }
      return item;
    });
    setRenderWindowsState(newRenderWindowsState);
  };

  useEffect(() => {
    switch (selectedWindow?.type) {
      case "DEFAULT_WINDOW_SINGLE":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "0",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
        ]);

        break;
      case "DEFAULT_WINDOW_DOUBLE":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "1",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "2",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
        ]);
        break;
      case "DEFAULT_WINDOW_TRIPLE":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "3",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            id: "4",
            originalType: "SINGLE-EMPTY",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "5",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
        ]);
        break;
      case "DEFAULT_WINDOW_FOUR":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "6",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            id: "7",
            originalType: "SINGLE-EMPTY",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "8",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "9",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
        ]);
        break;

      case "DOOR":
        setRenderWindowsState([
          {
            type: "DOOR-LEFT-TURNED",
            originalType: "DOOR-LEFT-TURNED",
            id: "10",
            width: MIN_DOOR_WIDTH,
            height: MIN_DOOR_HEIGHT,
          },
        ]);
        break;

      case "DOOR_WINDOW_LEFT":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            id: "11",
            originalType: "SINGLE-EMPTY",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            id: "12",
            type: "DOOR-LEFT-TURNED",
            originalType: "DOOR-LEFT-TURNED",
            width: MIN_DOOR_WIDTH,
            height: MIN_DOOR_HEIGHT,
          },
        ]);
        break;
      case "DOOR_WINDOW_LEFT_DOUBLE":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            id: "13",
            originalType: "SINGLE-EMPTY",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            id: "14",
            originalType: "SINGLE-EMPTY",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "DOOR-LEFT-TURNED",
            originalType: "DOOR-LEFT-TURNED",
            id: "15",
            width: MIN_DOOR_WIDTH,
            height: MIN_DOOR_HEIGHT,
          },
        ]);
        break;
      case "DOOR_WINDOW_LEFT_TRIPLE":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "16",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "17",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "18",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "DOOR-LEFT-TURNED",
            originalType: "DOOR-LEFT-TURNED",
            id: "19",
            width: MIN_DOOR_WIDTH,
            height: MIN_DOOR_HEIGHT,
          },
        ]);
        break;
      case "DOOR_WINDOW_RIGHT":
        setRenderWindowsState([
          {
            type: "DOOR-RIGHT-TURNED",
            id: "20",
            originalType: "DOOR-RIGHT-TURNED",
            width: MIN_DOOR_WIDTH,
            height: MIN_DOOR_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "21",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
        ]);
        break;
      case "DOOR_WINDOW_RIGHT_DOUBLE":
        setRenderWindowsState([
          {
            type: "DOOR-RIGHT-TURNED",
            originalType: "DOOR-RIGHT-TURNED",
            id: "22",
            width: MIN_DOOR_WIDTH,
            height: MIN_DOOR_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "23",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            id: "24",
            originalType: "SINGLE-EMPTY",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
        ]);
        break;
      case "DOOR_WINDOW_RIGHT_TRIPLE":
        setRenderWindowsState([
          {
            type: "DOOR-RIGHT-TURNED",
            id: "25",
            originalType: "DOOR-RIGHT-TURNED",
            width: MIN_DOOR_WIDTH,
            height: MIN_DOOR_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "26",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "27",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "28",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
        ]);
        break;
      case "DOOR-MULTI":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "29",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
          {
            type: "DOOR-LEFT-TURNED",
            originalType: "DOOR-LEFT-TURNED",
            id: "30",
            width: MIN_DOOR_WIDTH,
            height: MIN_DOOR_HEIGHT,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "31",
            width: MIN_WINDOW_WIDTH,
            height: MIN_WINDOW_HEIGHT,
          },
        ]);
        break;

      case "HRUSCHEVKA_FIRST":
        setRenderWindowsState([
          {
            type: "SINGLE-RIGHT-TURNED-FOLDED",
            originalType: "SINGLE-RIGHT-TURNED-FOLDED",
            id: "32",
            width: 650,
            height: 1350,
          },
          {
            type: "SINGLE-LEFT-TURNED-FOLDED",
            originalType: "SINGLE-LEFT-TURNED-FOLDED",
            id: "33",
            width: 650,
            height: 1350,
          },
        ]);
        break;

      case "HRUSCHEVKA_SECOND":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "34",
            width: 650,
            height: 1350,
          },
          {
            type: "SINGLE-LEFT-TURNED-FOLDED",
            originalType: "SINGLE-LEFT-TURNED-FOLDED",
            id: "35",
            width: 650,
            height: 1350,
          },
        ]);
        break;

      case "HRUSCHEVKA_THIRD":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "36",
            width: 650,
            height: 1350,
          },
          {
            type: "DOOR-RIGHT-TURNED-FOLDED",
            originalType: "DOOR-RIGHT-TURNED-FOLDED",
            id: "37",
            width: 650,
            height: 2070,
          },
          {
            type: "SINGLE-LEFT-TURNED-FOLDED",
            originalType: "SINGLE-LEFT-TURNED-FOLDED",
            id: "38",
            width: 650,
            height: 1350,
          },
        ]);
        break;

      case "HRUSCHEVKA_FOURTH":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "39",
            width: 690,
            height: 1350,
          },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "40",
            width: 690,
            height: 1350,
          },
          // {
          //   type: "SINGLE-LEFT-TURNED-FOLDED",
          //   originalType: "SINGLE-LEFT-TURNED-FOLDED",
          //   id: "40",
          //   width: 690,
          //   height: 1350,
          // },
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "41",
            width: 690,
            height: 1350,
          },
        ]);
      case "BRESHNEWKA_FIRST":
        setRenderWindowsState([
          {
            type: "SINGLE-RIGHT-TURNED-FOLDED",
            originalType: "SINGLE-EMPTY",
            id: "42",
            width: 650,
            height: 1390,
          },
          {
            type: "SINGLE-LEFT-TURNED-FOLDED",
            originalType: "SINGLE-EMPTY",
            id: "43",
            width: 650,
            height: 1390,
          },
        ]);
        break;
      case "1STVR_FIRST":
        setRenderWindowsState([
          {
            type: "SINGLE-EMPTY",
            originalType: "SINGLE-EMPTY",
            id: "44",
            width: 900,
            height: 1400,
          },
        ]);
        break;
      case "1STVR_SECOND":
        setRenderWindowsState([
          {
            type: "SINGLE-LEFT-TURNED-FOLDED",
            originalType: "SINGLE-EMPTY",
            id: "45",
            width: 900,
            height: 1400,
          },
        ]);
        break;
    }
  }, [selectedWindow]);

  const switchWindowRenderState = (id: string) => {
    const newRenderWindowsState: Array<TRenderWindowState> =
      renderWindowsState.map((item) => {
        if (item.id === id) {
          switch (item.type) {
            case "SINGLE-EMPTY":
              return {
                ...item,
                type: "SINGLE-RIGHT-TURNED",
              };
            case "SINGLE-RIGHT-TURNED":
              return {
                ...item,
                type: "SINGLE-RIGHT-TURNED-FOLDED",
              };
            case "SINGLE-RIGHT-TURNED-FOLDED":
              return {
                ...item,
                type: "SINGLE-LEFT-TURNED",
              };
            case "SINGLE-LEFT-TURNED":
              return {
                ...item,
                type: "SINGLE-LEFT-TURNED-FOLDED",
              };
            case "SINGLE-LEFT-TURNED-FOLDED":
              return {
                ...item,
                type: "SINGLE-EMPTY",
              };
            case "DOOR-LEFT-TURNED":
              return {
                ...item,
                type: "DOOR-LEFT-TURNED-FOLDED",
              };
            case "DOOR-LEFT-TURNED-FOLDED":
              return {
                ...item,
                type: "DOOR-RIGHT-TURNED",
              };
            case "DOOR-RIGHT-TURNED":
              return {
                ...item,
                type: "DOOR-RIGHT-TURNED-FOLDED",
              };
            case "DOOR-RIGHT-TURNED-FOLDED":
              return {
                ...item,
                type: "DOOR-LEFT-TURNED",
              };
            case "HORIZONTAL-IMPOST":
              return {
                ...item,
                type: "HORIZONTAL-IMPOST-TOP-TURNED",
              };
            case "HORIZONTAL-IMPOST-TOP-TURNED":
              return {
                ...item,
                type: "HORIZONTAL-IMPOST-TOP-TURNED-FOLDED",
              };
            case "HORIZONTAL-IMPOST-TOP-TURNED-FOLDED":
              return {
                ...item,
                type: "HORIZONTAL-IMPOST-BOTTOM-TURNED",
              };
            case "HORIZONTAL-IMPOST-BOTTOM-TURNED":
              return {
                ...item,
                type: "HORIZONTAL-IMPOST-BOTTOM-TURNED-FOLDED",
              };
            case "HORIZONTAL-IMPOST-BOTTOM-TURNED-FOLDED":
              return {
                ...item,
                type: "HORIZONTAL-IMPOST-BOTTOM-TURNED-TOP-TURNED-FOLDED",
              };
            case "HORIZONTAL-IMPOST-BOTTOM-TURNED-TOP-TURNED-FOLDED":
              return {
                ...item,
                type: "HORIZONTAL-IMPOST-BOTTOM-TURNED-FOLDED-TOP-TURNED-FOLDED",
              };
            case "HORIZONTAL-IMPOST-BOTTOM-TURNED-FOLDED-TOP-TURNED-FOLDED":
              return {
                ...item,
                type: "HORIZONTAL-IMPOST",
              };
            case "VERTICAL-IMPOST":
              return {
                ...item,
                type: "VERTICAL-IMPOST-LEFT-TURNED",
              };
            case "VERTICAL-IMPOST-LEFT-TURNED":
              return {
                ...item,
                type: "VERTICAL-IMPOST-LEFT-TURNED-FOLDED",
              };
            case "VERTICAL-IMPOST-LEFT-TURNED-FOLDED":
              return {
                ...item,
                type: "VERTICAL-IMPOST-RIGHT-TURNED",
              };
            case "VERTICAL-IMPOST-RIGHT-TURNED":
              return {
                ...item,
                type: "VERTICAL-IMPOST-RIGHT-TURNED-FOLDED",
              };
            case "VERTICAL-IMPOST-RIGHT-TURNED-FOLDED":
              return {
                ...item,
                type: "VERTICAL-IMPOST-LEFT-TURNED-RIGHT-TURNED-FOLDED",
              };
            case "VERTICAL-IMPOST-LEFT-TURNED-RIGHT-TURNED-FOLDED":
              return {
                ...item,
                type: "VERTICAL-IMPOST-LEFT-TURNED-FOLDED-RIGHT-TURNED-FOLDED",
              };
            case "VERTICAL-IMPOST-LEFT-TURNED-FOLDED-RIGHT-TURNED-FOLDED":
              return {
                ...item,
                type: "VERTICAL-IMPOST",
              };

            default:
              return item;
          }
        } else {
          return item;
        }
      });
    setRenderWindowsState(newRenderWindowsState);
  };

  return (
    <WindowConstructorContext.Provider
      value={{
        selectedWindow,
        setSelectedWindow,
        switchWindowRenderState,
        windows: renderWindowsState,
        addImpost,
        removeImpost,
        mainFormState,
        windowColor,
        setWindowColor,
        handleMainFormStateChange,
        setWindows: setRenderWindowsState,
        setWindowHeight,
        setWindowWidth,
        setMassHeight,
      }}
    >
      {children}
    </WindowConstructorContext.Provider>
  );
};
