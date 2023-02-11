import { useContext } from "react";
import { WindowConstructorContext } from "../context/window-constructor.context";

export const useWindowConstructor = () => useContext(WindowConstructorContext);
