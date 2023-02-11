
import { useContext } from 'react';
import { SidebarContext } from '../context/sidebar.context';

export const useSidebar = () => useContext(SidebarContext)
