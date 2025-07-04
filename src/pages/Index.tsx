
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import ModuleCard from '@/components/ModuleCard';
import Dashboard from '@/components/Dashboard';
import ModuleView from '@/components/ModuleView';
import EcommercePlatforms from '@/components/EcommercePlatforms';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Module } from '@/types';
import modulesData from '@/data/modules.json';

const Index = () => {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'modules' | 'module' | 'ecommerce'>('modules');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  if (!user) {
    return <LoginForm />;
  }

  const filteredModules = (modulesData.modules as Module[]).filter(module => 
    module.allowedRoles.includes(user.role)
  );

  const handleModuleClick = (module: Module) => {
    if (module.id === 'ecommerce') {
      setCurrentView('ecommerce');
    } else {
      setSelectedModule(module);
      setCurrentView('module');
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          currentView={currentView}
          setCurrentView={setCurrentView}
          user={user}
          logout={logout}
        />
        
        <SidebarInset className="flex-1">
          <main className="p-6">
            {currentView === 'dashboard' && <Dashboard />}
            
            {currentView === 'modules' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-gray-900">Business Modules</h2>
                  <p className="text-gray-600 max-w-2xl">
                    Access your business management tools. Your role ({user.role}) determines which modules you can access.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredModules.map((module) => (
                    <ModuleCard 
                      key={module.id} 
                      module={module} 
                      onClick={() => handleModuleClick(module)}
                    />
                  ))}
                </div>
                
                {filteredModules.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No modules available for your role.</p>
                  </div>
                )}
              </div>
            )}

            {currentView === 'ecommerce' && <EcommercePlatforms />}
            
            {currentView === 'module' && selectedModule && (
              <ModuleView 
                moduleId={selectedModule.id} 
                moduleName={selectedModule.name}
              />
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
