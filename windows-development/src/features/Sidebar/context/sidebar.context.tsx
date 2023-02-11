import { createContext, ReactNode, useCallback, useState } from "react";

type TContext = {
  expanded: boolean;
  switchExpanded: () => void;
};
type TProviderProps = {
  children: ReactNode;
};

export const SidebarContext = createContext<TContext>({} as TContext);

export const SidebarProvider = (props: TProviderProps) => {
  const { children } = props;

  const [expanded, setExpanded] = useState(false);

  const switchExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <SidebarContext.Provider value={{ expanded, switchExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};
