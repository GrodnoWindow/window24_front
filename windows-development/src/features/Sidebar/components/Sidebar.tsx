import React, { useRef } from "react";
import { useSidebar } from "../hooks/useSidebar";
import { SidebarLinks } from "./SidebarLinks";
import { SidebarHeader } from "./SidebarHeader";
import { motion } from "framer-motion";
import { SidebarFooter } from "./SidebarFooter";
import { useOutsideClick } from "../../WindowConstructor/hooks/helpers/useOutsideClick";

export const Sidebar = () => {
  const { expanded, switchExpanded } = useSidebar();

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, () => {
    if (expanded) switchExpanded();
  });

  return (
    <motion.div
      ref={ref}
      animate={{
        width: expanded ? "100%" : "auto",
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      className="sticky top-0 left-0 z-20 h-screen max-w-[15vw] bg-gray-50 text-gray-800 antialiased"
    >
      <div className="flex h-full w-full flex-col border-r bg-white shadow-2xl">
        <SidebarHeader />
        <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden">
          <SidebarLinks />
          <SidebarFooter />
        </div>
      </div>
    </motion.div>
  );
};
