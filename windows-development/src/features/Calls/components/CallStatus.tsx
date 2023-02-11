type Props = {
  status: number;
};

export const CallStatus = (props: Props) => {
  const { status } = props;
  const getStatusInfo = () => {
    switch (status) {
      case 0:
        return {
          text: "Новая заявка",
          color: "#00C383",
        };
      case 1:
        return {
          color: "#E11D48",
          text: "Пропущенный",
        };
      case 2:
        return {
          color: "#FBA918",
          text: "Нецелевой",
        };
      case 3:
        return {
          color: "#7C3AED",
          text: "Входящий",
        };
      default:
        return {
          color: "#222222",
          text: "Неизвестный",
        };
    }
  };
  const { text, color } = getStatusInfo();

  return (
    <span
      className="block text-sm uppercase font-semibold"
      style={{
        color,
      }}
    >
      {text}
    </span>
  );
};
