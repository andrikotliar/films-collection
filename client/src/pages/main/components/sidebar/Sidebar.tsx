import { SidebarContent } from './components';
import { SidebarProvider } from './context';

const Sidebar = () => {
  return (
    <SidebarProvider>
      <SidebarContent />
    </SidebarProvider>
  );
};

export { Sidebar };
