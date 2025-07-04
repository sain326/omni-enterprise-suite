
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
import { ArrowLeft, Package, LogOut, User, Users, ShoppingCart, FileText, Settings, CreditCard, BarChart3, Plus, Search, Briefcase } from 'lucide-react';
import { User as UserType, Module } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface AppSidebarProps {
  currentView: string;
  setCurrentView: (view: 'dashboard' | 'modules' | 'module' | 'ecommerce' | 'pos') => void;
  user: UserType;
  logout: () => void;
  selectedModule?: Module | null;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export function AppSidebar({ currentView, setCurrentView, user, logout, selectedModule, activeTab, setActiveTab }: AppSidebarProps) {
  const { switchRole } = useAuth();

  const handleRoleChange = (newRole: string) => {
    switchRole(newRole as 'admin' | 'user' | 'manager');
  };

  const handleBackToModules = () => {
    setCurrentView('modules');
  };

  const getModuleNavigation = (moduleId: string) => {
    switch (moduleId) {
      case 'sales':
        return [
          { title: 'Overview', icon: BarChart3, id: 'overview' },
          { title: 'Business Partners', icon: Users, id: 'partners' },
          { title: 'Sales Orders', icon: ShoppingCart, id: 'orders' },
          { title: 'Reports', icon: FileText, id: 'reports' }
        ];
      case 'hr':
        return [
          { title: 'Overview', icon: BarChart3, id: 'overview' },
          { title: 'Add New', icon: Plus, id: 'add-new' },
          { title: 'Manage', icon: Settings, id: 'manage' },
          { title: 'Reports', icon: FileText, id: 'reports' }
        ];
      case 'inventory':
        return [
          { title: 'Overview', icon: BarChart3, id: 'overview' },
          { title: 'Products', icon: Package, id: 'products' },
          { title: 'Categories', icon: Settings, id: 'categories' },
          { title: 'Brands', icon: Briefcase, id: 'brands' },
          { title: 'Warehouses', icon: Settings, id: 'warehouses' },
          { title: 'Attributes', icon: Settings, id: 'attributes' },
          { title: 'Attribute Values', icon: Settings, id: 'attribute-values' }
        ];
      case 'pos':
        return [
          { title: 'POS Terminal', icon: CreditCard, id: 'terminal' },
          { title: 'Transactions', icon: FileText, id: 'transactions' },
          { title: 'Reports', icon: BarChart3, id: 'reports' }
        ];
      default:
        return [
          { title: 'Overview', icon: BarChart3, id: 'overview' },
          { title: 'Add New', icon: Plus, id: 'add-new' },
          { title: 'Manage', icon: Settings, id: 'manage' },
          { title: 'Reports', icon: FileText, id: 'reports' }
        ];
    }
  };

  const moduleNavigation = selectedModule ? getModuleNavigation(selectedModule.id) : [];

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
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleBackToModules} className="w-full">
                  <ArrowLeft className="mr-3 h-4 w-4" />
                  Back to Modules
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {selectedModule && (
          <SidebarGroup>
            <SidebarGroupLabel>{selectedModule.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {moduleNavigation.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      className={`w-full ${activeTab === item.id ? 'bg-blue-100 text-blue-700' : ''}`}
                      onClick={() => setActiveTab?.(item.id)}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {currentView === 'pos' && (
          <SidebarGroup>
            <SidebarGroupLabel>POS System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className={`w-full ${activeTab === 'terminal' ? 'bg-blue-100 text-blue-700' : ''}`}
                    onClick={() => setActiveTab?.('terminal')}
                  >
                    <CreditCard className="mr-3 h-4 w-4" />
                    POS Terminal
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className={`w-full ${activeTab === 'transactions' ? 'bg-blue-100 text-blue-700' : ''}`}
                    onClick={() => setActiveTab?.('transactions')}
                  >
                    <FileText className="mr-3 h-4 w-4" />
                    Transactions
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className={`w-full ${activeTab === 'reports' ? 'bg-blue-100 text-blue-700' : ''}`}
                    onClick={() => setActiveTab?.('reports')}
                  >
                    <BarChart3 className="mr-3 h-4 w-4" />
                    Reports
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

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
