import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { HTMLAttributes, HTMLInputTypeAttribute } from "react";
import clsx from "clsx";

type Props<T extends FieldValues> = UseControllerProps<T> &
  HTMLAttributes<HTMLInputElement> & {
    label: string;
    type?: HTMLInputTypeAttribute;
  };

export const Input = <T extends FieldValues>(props: Props<T>) => {
  const { label, control, name, rules, ...rest } = props;

  const {
    field,
    fieldState: { error, isTouched },
  } = useController<T>({
    name,
    control,
    rules,
  });
  const isError = isTouched && error;

  return (
    <div>
      <label className="text-sm" htmlFor={name}>
        {label}
        {rules?.required && <sup className="text-xs text-red-500">*</sup>}
      </label>
      <input
        className={clsx(
          "mt-1 block w-full rounded-sm border border-transparent bg-[#ECECEC] py-2 px-3 outline-none",
          isError && "border-red-500"
        )}
        {...field}
        {...rest}
      />
      {isError && (
        <span className="text-sm text-red-400">{error?.message}</span>
      )}
    </div>
  );
};
