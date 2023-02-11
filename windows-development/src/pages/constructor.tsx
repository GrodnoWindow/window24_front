import { NextPage } from "next";
import { WindowConstructorContextProvider } from "../features/WindowConstructor/context/window-constructor.context";
import { WindowConstructor } from "../features/WindowConstructor/components/WindowConstructor";
import { PageHeader } from "../features/PageHeader";

const ConstructorPage: NextPage = () => {
  return (
		<section>
			<WindowConstructorContextProvider>
				
				<PageHeader text="Онлайн конструктор и калькулятор" aligning="center" />
				<WindowConstructor />
			</WindowConstructorContextProvider>
		</section>
  );
};

export default ConstructorPage;
