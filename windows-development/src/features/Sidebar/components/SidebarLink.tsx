import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { clsx } from "clsx";
import { useSidebar } from "../hooks/useSidebar";
import { motion } from "framer-motion";

type Props = {
  href: string;
  label: string;
  imgLink?: string;
};

const linkAnimation = {
  initial: {
    opacity: 0,
    scale: 0.7,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const SidebarLink = (props: Props) => {
  const { href, label, imgLink } = props;
  const { expanded } = useSidebar();
  const { asPath } = useRouter();
  const activeLink = useMemo(() => href === asPath, [asPath, href]);
  return (
    <motion.li variants={linkAnimation}>
      <Link href={href}>
        <a
          className={clsx(
            "border-full group relative flex h-11  flex-row items-center border-l-4 border-transparent  pr-6 text-gray-600 transition-all duration-300 ease-in-out focus:outline-none",
            activeLink
              ? "rounded-r-full bg-accent "
              : "border-transparent hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm"
          )}
        >
          {imgLink && (
            <span className="ml-4 flex h-5 flex-none items-center justify-center">
              <Image
                src={imgLink}
                width={20}
                height={20}
                alt={label}
                className={clsx(
                  " transition-all duration-300 ease-in-out group-hover:opacity-100",
                  activeLink ? "opacity-100 " : "opacity-70"
                )}
              />
            </span>
          )}
          {expanded && (
            <div className="flex items-center flex-grow justify-between">
              <span
                className={clsx(
                  "ml-2 h-5 truncate text-sm tracking-wide transition-all duration-300 ease-in-out ",
                  activeLink
                    ? "font-semibold text-white "
                    : "group-hover:font-medium"
                )}
              >
                {label}
              </span>

              <div>
                <ChevronRightIcon
                  className={clsx(
                    "ml-auto h-5 w-5  flex-none justify-self-end transition-all duration-300 ease-in-out",
                    !activeLink
                      ? "group-hover:translate-x-2 group-hover:scale-110"
                      : "translate-x-2 scale-110"
                  )}
                />
              </div>
            </div>
          )}
        </a>
      </Link>
    </motion.li>
  );
};
