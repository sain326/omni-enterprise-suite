
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutDashboard, Package, LogOut, User } from 'lucide-react';
import { User as UserType } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface AppSidebarProps {
  currentView: string;
  setCurrentView: (view: 'dashboard' | 'modules' | 'module' | 'ecommerce') => void;
  user: UserType;
  logout: () => void;
}

export function AppSidebar({ currentView, setCurrentView, user, logout }: AppSidebarProps) {
  const { switchRole } = useAuth();

  const handleRoleChange = (newRole: string) => {
    switchRole(newRole as 'admin' | 'user' | 'manager');
  };

  const navigationItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      onClick: () => setCurrentView('dashboard'),
      active: currentView === 'dashboard'
    },
    {
      title: 'Modules',
      icon: Package,
      onClick: () => setCurrentView('modules'),
      active: currentView === 'modules' || currentView === 'module' || currentView === 'ecommerce'
    }
  ];

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <SidebarTrigger />
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Enterprise Suite
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={item.onClick}
                    isActive={item.active}
                    className="w-full"
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Role Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2">
              <Select value={user.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <Badge variant="secondary" className="text-xs capitalize">
                {user.role}
              </Badge>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={logout}
            className="w-full"
            size="sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
