import { memo } from "react";

type Props = {
  text: string;
};;

export const WindowConstructorSubHeader = memo((props: Props) => {
  const { text } = props;
  return (
    <h2 className="relative my-8 block pl-6 text-[26px] mb-9 font-semibold before:absolute before:bottom-0 before:left-0 before:h-full before:w-[5px] before:bg-accent">
      {text}
    </h2>
  );
});
