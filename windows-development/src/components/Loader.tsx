import { Bars } from "react-loader-spinner";

export const Loader = () => {
	return (
		<div className="my-auto flex h-[90vh] items-center justify-center">
			<Bars
				height="150"
				width="150"
				color="#5391dc"
				ariaLabel="bars-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};
