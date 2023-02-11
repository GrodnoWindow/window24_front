import Circle from "@uiw/react-color-circle";
import { useWindowConstructor } from "../hooks/useWindowConstructor";

export const WindowColorSelector = () => {
  const { windowColor, setWindowColor } = useWindowConstructor();

  return (
    <Circle
      colors={[
        "#f0f0ed",
        "#e7dfce",
        "#b7b8ba",
        "#bababe",
        "#555b5c",
        "#766a51",
        "#73D8FF",
        "#AEA1FF",
        "#FDA1FF",
        "#333333",
        "#808080",
        "#cccccc",
        "#ffffff",
      ]}
      color={windowColor}
      className="mx-auto my-6 max-w-sm"
      onChange={(color) => {
        setWindowColor(color.hex);
      }}
    />
  );
};
