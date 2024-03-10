import { Sidebar } from '@/pages/Main/components/Sidebar/Sidebar';
import { SidebarProvider } from '@/pages/Main/components/Sidebar/Sidebar.context';

const SidebarWrapper = () => {
  return (
    <SidebarProvider>
      <Sidebar />
    </SidebarProvider>
  );
};

export { SidebarWrapper };
