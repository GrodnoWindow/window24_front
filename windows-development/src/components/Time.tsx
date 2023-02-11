import { HTMLAttributes, memo, useMemo } from "react";
import ruRu from "date-fns/locale/ru";
import { format, toDate } from "date-fns-tz";

type Props = {
  date: string;
  formatString: string;
} & HTMLAttributes<HTMLTimeElement>;

export const Time = memo((props: Props) => {
  const { date, formatString, ...rest } = props;

  const formattedTime = useMemo(
    () => format(toDate(date), formatString, { locale: ruRu }),
    [date, formatString]
  );

  return (
    <time dateTime={date} {...rest}>
      {formattedTime}
    </time>
  );
});
