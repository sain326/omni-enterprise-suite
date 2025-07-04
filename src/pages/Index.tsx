
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import ModuleCard from '@/components/ModuleCard';
import Dashboard from '@/components/Dashboard';
import ModuleView from '@/components/ModuleView';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Module } from '@/types';
import modulesData from '@/data/modules.json';

const Index = () => {
  const { user, logout, switchRole } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'modules' | 'module'>('modules');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  if (!user) {
    return <LoginForm />;
  }

  const filteredModules = modulesData.modules.filter(module => 
    module.allowedRoles.includes(user.role)
  );

  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
    setCurrentView('module');
  };

  const handleRoleChange = (newRole: string) => {
    switchRole(newRole as 'admin' | 'user' | 'manager');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Enterprise Suite
              </h1>
              <Badge variant="secondary" className="capitalize">
                {user.role}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-4">
                <Button 
                  variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('dashboard')}
                >
                  Dashboard
                </Button>
                <Button 
                  variant={currentView === 'modules' ? 'default' : 'ghost'}
                  onClick={() => setCurrentView('modules')}
                >
                  Modules
                </Button>
              </nav>
              
              {/* Role Switcher for Demo */}
              <Select value={user.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{user.name}</span>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && <Dashboard />}
        
        {currentView === 'modules' && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Business Modules</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
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
        
        {currentView === 'module' && selectedModule && (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('modules')}
              className="mb-4"
            >
              ← Back to Modules
            </Button>
            <ModuleView 
              moduleId={selectedModule.id} 
              moduleName={selectedModule.name}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
