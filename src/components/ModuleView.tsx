
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DynamicForm from './DynamicForm';
import InventoryManager from './inventory/InventoryManager';
import SalesModule from './sales/SalesModule';
import { FormConfig } from '@/types';
import formsData from '@/data/forms.json';

interface ModuleViewProps {
  moduleId: string;
  moduleName: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ModuleView: React.FC<ModuleViewProps> = ({ moduleId, moduleName, activeTab, setActiveTab }) => {
  const getFormConfig = (): FormConfig | null => {
    switch (moduleId) {
      case 'hr':
        return formsData.employee as FormConfig;
      case 'inventory':
        return formsData.product as FormConfig;
      case 'sales':
        return formsData.customer as FormConfig;
      default:
        return null;
    }
  };

  const formConfig = getFormConfig();

  const handleFormSubmit = (data: Record<string, any>) => {
    console.log(`${moduleId} form submitted:`, data);
    // Here you would typically send the data to your backend API
  };

  // Special handling for specific modules
  if (moduleId === 'inventory') {
    return <InventoryManager />;
  }

  if (moduleId === 'sales') {
    return <SalesModule activeTab={activeTab} setActiveTab={setActiveTab} />;
  }

  // Generic module view based on active tab
  return (
    <div className="space-y-6 p-6">
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{moduleName}</h1>
            <p className="text-gray-600">Manage your {moduleName.toLowerCase()} operations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Total Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">0</div>
                <p className="text-blue-600/70">Items in system</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">0</div>
                <p className="text-green-600/70">Currently active</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">0</div>
                <p className="text-orange-600/70">Awaiting action</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'add-new' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New {moduleName.slice(0, -1)}</h1>
            <p className="text-gray-600">Create a new {moduleName.toLowerCase().slice(0, -1)} record</p>
          </div>
          
          {formConfig ? (
            <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
              <CardContent className="p-6">
                <DynamicForm config={formConfig} onSubmit={handleFormSubmit} />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Add New Item</CardTitle>
                <CardDescription>Form configuration not available for this module</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  This module doesn't have a predefined form. You can integrate with your backend API to create custom forms.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage {moduleName}</h1>
            <p className="text-gray-600">View and edit existing records</p>
          </div>
          
          <Card className="bg-gradient-to-br from-gray-50 to-slate-100 border-gray-200">
            <CardHeader>
              <CardTitle>Manage {moduleName}</CardTitle>
              <CardDescription>View and edit existing records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No data available yet.</p>
                <p className="text-sm text-gray-500">
                  Start by adding new items using the sidebar navigation, or integrate with your backend API to display existing data.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{moduleName} Reports</h1>
            <p className="text-gray-600">Analytics and insights</p>
          </div>
          
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800">{moduleName} Reports</CardTitle>
              <CardDescription className="text-emerald-600">Analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-emerald-700 mb-4">Reports will be generated based on your data.</p>
                <p className="text-sm text-emerald-600">
                  Connect your backend API to display comprehensive reports and analytics.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ModuleView;
