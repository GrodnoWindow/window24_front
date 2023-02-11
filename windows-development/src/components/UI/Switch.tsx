import { useState } from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import { clsx } from "clsx";

type Props = {
	enabled: boolean;
	onChange: (value: boolean) => void;
	name?: string;
	className?: string;
};

export const Switch = (props: Props) => {
	const { onChange, name, className } = props;
	const [enabled, setEnabled] = useState(false)
	return (
		<HeadlessSwitch
			checked={enabled}
			onChange={setEnabled}
			name={name}
			className={clsx(
				"relative inline-flex h-6 w-11 items-center rounded-full",
				enabled ? "bg-accent" : "bg-gray-200",
				className,
			)}
		>
			<span
				className={clsx(
					"transition duration-300 inline-block h-4 w-4 transform rounded-full bg-white",
					enabled ? "translate-x-6" : "translate-x-1"
				)}
			/>
		</HeadlessSwitch>
	);
};
