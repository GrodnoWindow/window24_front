import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { ComboBox } from "../../../../components/UI/ComboBox";

type Props<TControl extends FieldValues> = {
  optionsData: Array<{
    name: string;
    placeholder: string;
    label: string;
    options: Array<{
      value: string;
      price: number;
      label: string;
    }>;
  }>;
  control: Control<TControl>;
};

export const ComboboxRenderer = <TControl extends FieldValues>(
  props: Props<TControl>
) => {
  const { optionsData, control } = props;
  return (
    <>
      {optionsData.map((option) => (
        <Controller
          control={control}
          key={option.name}
          rules={{ required: true }}
          name={option.name as Path<TControl>}
          render={({ field: { onChange, ref, name, value } }) => (
            <div className="mb-9 flex flex-col">
              <label className="mb-3 text-lg text-[#3D3D3D]">
                {option.label}
              </label>
              <ComboBox
                ref={ref}
                name={name}
                options={option.options.map((option) => {
                  const primaryColor = option.value;
                  return {
                    ...option,
                    renderElement: (
                      <div className="flex items-center">
                        <div
                          className="mr-3 h-6 w-6 rounded-full"
                          style={{
                            backgroundColor: primaryColor,
                            border: `1px solid black`,
                          }}
                        />
                        {option.label}
                      </div>
                    ),
                  };
                })}
                value={option.options.find((c) => c.value === value)}
                placeholder={option.placeholder}
                onChange={(val) => onChange(val.value)}
              />
            </div>
          )}
        />
      ))}
    </>
  );
};
