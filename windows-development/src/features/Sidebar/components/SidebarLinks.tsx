import { motion } from "framer-motion";
import { SidebarLink } from "./SidebarLink";

const animation = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const links = [
  {
    label: "Конструктор",
    href: "/constructor",
    imgLink: "/icons/constructor.svg",
  },
  {
    label: "Продукт",
    href: "/product",
    imgLink: "/icons/product.svg",
  },
  {
    label: "Звонки",
    href: "/calls",
    imgLink: "/icons/calls.svg",
  },
  {
    label: "Клиенты",
    href: "/clients",
    imgLink: "/icons/clients.svg",
  },
  {
    label: "Маркетинг",
    href: "/marketing",
    imgLink: "/icons/ads.svg",
  },
];

export const SidebarLinks = () => {
  return (
    <motion.ul
      animate="animate"
      initial="initial"
      variants={animation}
      className="flex flex-col justify-between space-y-1 py-4 transition-all duration-500"
    >
      {links.map((link, index) => (
        <SidebarLink key={index} {...link} />
      ))}
    </motion.ul>
  );
};
