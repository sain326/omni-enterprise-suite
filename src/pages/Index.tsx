
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

  // Show sidebar only when inside a module or ecommerce
  if (currentView === 'module' || currentView === 'ecommerce') {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50">
          <AppSidebar 
            currentView={currentView}
            setCurrentView={setCurrentView}
            user={user}
            logout={logout}
            selectedModule={selectedModule}
          />
          
          <SidebarInset className="flex-1">
            <main className="p-6">
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
  }

  // Main modules screen without sidebar
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Enterprise Suite
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                  {user.role}
                </span>
              </div>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        {currentView === 'dashboard' && <Dashboard />}
        
        {currentView === 'modules' && (
          <div className="max-w-7xl mx-auto space-y-6">
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
      </main>
    </div>
  );
};

export default Index;
