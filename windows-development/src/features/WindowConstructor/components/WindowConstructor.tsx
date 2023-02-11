import { WindowRenderer } from "./WindowRenderer";
import { MainForm } from "./MainForm";
import { WindowImpostForm } from "./WindowImpostForm";
import { WindowTypeSelector } from "./WindowTypeSelector";
import { WindowTypeTemplateSelector } from "./WindowTypeTemplateSelector";

export const WindowConstructor = () => {
  return (
    <section>
      <div className="mt-7 flex divide-x-2 divide-slate-300">
        <div className="mr-5 flex w-[45%] flex-col gap-7">
          <WindowTypeSelector />
          <WindowTypeTemplateSelector />
          <MainForm />
        </div>
        <div className="my-8 w-[55%]">
          <WindowRenderer />
          {/*<WindowDimensionsForm />*/}
          <WindowImpostForm />
        </div>
      </div>
    </section>
  );
};
