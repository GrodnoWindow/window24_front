import React, { useEffect } from "react";
import {
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
  TMainFormState,
} from "../context/window-constructor.context";
import { useForm } from "react-hook-form";
import { useWindowConstructor } from "../hooks/useWindowConstructor";

type TFormProps = Pick<TMainFormState, "width" | "height">;

export const WindowDimensionsForm = () => {
  const { handleMainFormStateChange } = useWindowConstructor();
  const { register, watch } = useForm<TMainFormState>();

  useEffect(() => {
    const subscription = watch((value) => handleMainFormStateChange(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form className="mt-4 flex items-center justify-center gap-7">
      <div className="flex items-center gap-2">
        <label htmlFor="width">Ширина</label>
        <input
          {...register("width", { required: true, min: 800, max: 2000 })}
          type="number"
          defaultValue={MIN_WIDTH}
          max={MAX_WIDTH}
          min={MIN_WIDTH}
          className=" rounded-md border border-gray-300 py-1 pl-[15px] text-center outline-none"
        />
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="height">Высота</label>
        <input
          {...register("height", { required: true, min: 800, max: 2000 })}
          type="number"
          defaultValue={MIN_HEIGHT}
          max={MAX_HEIGHT}
          min={MIN_HEIGHT}
          className="rounded-md border border-gray-300 py-1 pl-[15px] text-center outline-none"
        />
      </div>
    </form>
  );
};
