import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useWindowConstructor } from "../hooks/useWindowConstructor";
import { TImpost } from "../context/window-constructor.context";
import { Select } from "../../../components/UI/Select";

type TFormProps = {
  impostStyle: TImpost;
  windowNumber: string;
};

type TOptions = {
  value: TImpost;
  label: string;
};

const impostOptions: Array<TOptions> = [
  { label: "Горизонтальный", value: "HORIZONTAL" },
  { label: "Вертикальный", value: "VERTICAL" },
];

export const WindowImpostForm = () => {
  const { windows, addImpost } = useWindowConstructor();

  const { control, handleSubmit, register } = useForm<TFormProps>({
    defaultValues: {
      impostStyle: "HORIZONTAL",
    },
  });

  const onSubmit: SubmitHandler<TFormProps> = (data) => {
    const window = windows[Number(data.windowNumber) - 1];
    if (window.originalType.includes("DOOR")) {
      return;
    }
    addImpost(window.id, data.impostStyle);
  };

  return (
    <div className="mx-auto mt-10 flex items-center justify-center p-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="ml-11 flex items-center justify-center gap-3 rounded-md border-2 border-dashed p-2 text-sm"
      >
        Добавить{" "}
        <Controller
          control={control}
          rules={{ required: true }}
          name="impostStyle"
          render={({ field: { onChange, ref, name, value } }) => (
            <Select
              ref={ref}
              name={name}
              options={impostOptions}
              value={impostOptions.find((c) => c.value === value)}
              defaultValue={impostOptions[0]}
              onChange={(val) => onChange(val?.value)}
            />
          )}
        />{" "}
        импост в окне №{" "}
        <input
          {...register("windowNumber", {
            required: true,
          })}
          type="number"
          defaultValue="1"
          min="1"
          max={windows.length}
          className="w-12 rounded-md border border-gray-300 py-1 pl-[15px] text-center outline-none"
        />
        <button
          type="submit"
          className="cursor-pointer rounded-[5px] border bg-gradient-to-r from-[#BADFDB] to-[#87CED7] px-2 py-1 text-lg font-semibold text-white hover:text-[#3D3D3D] hover:underline"
        >
          Добавить импост
        </button>
      </form>
    </div>
  );
};
