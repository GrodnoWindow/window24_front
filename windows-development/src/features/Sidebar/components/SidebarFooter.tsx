import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useSidebar } from "../hooks/useSidebar";
import clsx from "clsx";
import { useUser } from "@hooks/api/useUser";
import { useAuth } from "@hooks/api/useAuth";

export const SidebarFooter = () => {
  const { expanded } = useSidebar();
  const { data: user } = useUser();

  const { signOut } = useAuth();

  const handleSignOutClick = async () => {
    await signOut();
  };

  return (
    <div className="mt-auto flex items-center justify-between px-3">
      {expanded && (
        <div className="inline-flex">
          <a
            href="#"
            className="group relative flex flex-row items-center space-x-3 rounded-r-full border-transparent p-1 pr-6 text-gray-600 transition-all duration-500 ease-in-out hover:bg-gray-100 hover:text-gray-800 focus:outline-none"
          >
            <div className="rounded-full py-1 text-black">
              <div className="relative h-[40px] w-[40px]">
                <Image
                  src="/icons/profile.jpeg"
                  layout="fill"
                  className="flex-none rounded-full text-black"
                  alt="profileImg"
                />
              </div>
            </div>
            <div>
              <span className="block text-sm font-semibold text-black">
                {user?.first_name} {user?.last_name}
              </span>
              <span className="block text-xs text-black">Менеджер</span>
            </div>
          </a>
        </div>
      )}

      <button
        className={clsx(
          "flex h-fit flex-none items-center justify-center rounded-full p-2 transition ease-in-out hover:bg-gray-200 hover:text-gray-700",
          expanded ? "my-auto" : "mx-auto"
        )}
        type="button"
        onClick={handleSignOutClick}
      >
        <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-none" />
      </button>
    </div>
  );
};
