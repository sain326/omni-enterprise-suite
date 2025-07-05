
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import ModuleCard from '@/components/ModuleCard';
import Dashboard from '@/components/Dashboard';
import ModuleView from '@/components/ModuleView';
import EcommercePlatforms from '@/components/EcommercePlatforms';
import POSSystem from '@/components/pos/POSSystem';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Module } from '@/types';
import modulesData from '@/data/modules.json';

const Index = () => {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<'login' | 'register' | 'dashboard' | 'modules' | 'module' | 'ecommerce' | 'pos'>('login');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Set initial view based on user state
  useEffect(() => {
    console.log('Index useEffect - user:', user, 'currentView:', currentView);
    if (user) {
      // User is logged in, show modules by default
      if (currentView === 'login' || currentView === 'register') {
        console.log('User logged in, setting view to modules');
        setCurrentView('modules');
      }
    } else {
      // No user, show login
      console.log('No user, setting view to login');
      setCurrentView('login');
    }
  }, [user]);

  console.log('Index render - user:', user, 'currentView:', currentView);

  // Show login form if no user and on login view
  if (!user && currentView === 'login') {
    return <LoginForm onRegister={() => setCurrentView('register')} />;
  }

  // Show register form if no user and on register view
  if (!user && currentView === 'register') {
    return <RegisterForm onBackToLogin={() => setCurrentView('login')} />;
  }

  // If no user but not on login/register, redirect to login
  if (!user) {
    return <LoginForm onRegister={() => setCurrentView('register')} />;
  }

  // User is logged in, proceed with main app
  const filteredModules = modulesData.modules.filter((module): module is Module => 
    module.allowedRoles.includes(user.role as 'admin' | 'user' | 'manager')
  );

  const handleModuleClick = (module: Module) => {
    console.log('Module clicked:', module.id);
    if (module.id === 'ecommerce') {
      setCurrentView('ecommerce');
    } else if (module.id === 'pos') {
      setCurrentView('pos');
      setActiveTab('terminal');
    } else {
      setSelectedModule(module);
      setCurrentView('module');
      setActiveTab('overview');
    }
  };

  // Full screen POS view
  if (currentView === 'pos') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4 bg-white border-b flex items-center">
          <Button
            variant="ghost"
            onClick={() => setCurrentView('modules')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <h1 className="text-xl font-bold">POS System</h1>
        </div>
        <POSSystem />
      </div>
    );
  }

  // Show sidebar when inside a module or ecommerce
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
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          
          <SidebarInset className="flex-1">
            <main>
              {currentView === 'ecommerce' && <EcommercePlatforms />}
              
              {currentView === 'module' && selectedModule && (
                <ModuleView 
                  moduleId={selectedModule.id} 
                  moduleName={selectedModule.name}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
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
