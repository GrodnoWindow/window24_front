import Image from "next/image";
import { useSidebar } from "../hooks/useSidebar";
import { clsx } from "clsx";

export const SidebarHeader = () => {
  const { expanded, switchExpanded } = useSidebar();

  return (
    <div
      onClick={switchExpanded}
      className={clsx(
        "justify-left flex cursor-pointer items-center space-x-1 border-b pl-3",
        expanded ? "h-28" : "h-14"
      )}
    >
      {expanded ? (
        <Image src="/icons/logo.svg" width={120} height={90} alt="logo" />
      ) : (
        <Image
          src="/icons/logo_small.svg"
          width={60}
          height={40}
          alt="small logo"
        />
      )}
      {/*{expanded && <div className="font-bold">Тёплые окна</div>}*/}
    </div>
  );
};
