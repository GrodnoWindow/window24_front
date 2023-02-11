import React, { useEffect } from "react";
import { WindowConstructorSubHeader } from "../WindowConstructorSubHeader";
import optionsData from "../../../../data/optionsData.json";
import optionsData2 from "../../../../data/optionsData2.json";
import optionsData3 from "../../../../data/optionsData3.json";
import optionColor from "../../../../data/optionsColor.json";
import { SelectRenderer } from "./SelectRenderer";
import { useWindowConstructor } from "../../hooks/useWindowConstructor";
import { useForm } from "react-hook-form";
import { TMainFormState } from "../../context/window-constructor.context";
import { ComboboxRenderer } from "./ComboboxRenderer";

type TFormProps = TMainFormState;

export const MainForm = () => {
  const { control, watch } = useForm<TFormProps>();

  const { handleMainFormStateChange } = useWindowConstructor();

  useEffect(() => {
    const subscription = watch((value) => handleMainFormStateChange(value));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="mt-24 pb-32">
      <form>
        <div>
          <WindowConstructorSubHeader text="Профиль и стеклопакет" />
          <div className="grid grid-cols-2 gap-4">
            <SelectRenderer optionsData={optionsData} control={control} />
            <ComboboxRenderer optionsData={optionColor} control={control} />
          </div>
        </div>
        <div>
          <WindowConstructorSubHeader text="Комплектация" />
          <div className="grid grid-cols-2 gap-4">
            <SelectRenderer optionsData={optionsData2} control={control} />
          </div>
        </div>
        <div>
          <WindowConstructorSubHeader text="Дополнительные требования" />
          <div className="grid grid-cols-2 gap-4">
            <SelectRenderer optionsData={optionsData3} control={control} />
          </div>
        </div>
      </form>
    </div>
  );
};
