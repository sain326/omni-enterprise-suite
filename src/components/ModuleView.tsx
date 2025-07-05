
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{moduleName}</h1>
          <p className="text-gray-600">Manage your {moduleName.toLowerCase()} operations</p>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">0</div>
              <p className="text-gray-600">Items in system</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">0</div>
              <p className="text-gray-600">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">0</div>
              <p className="text-gray-600">Awaiting action</p>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'add-new' && (
        <>
          {formConfig ? (
            <DynamicForm config={formConfig} onSubmit={handleFormSubmit} />
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
        </>
      )}

      {activeTab === 'manage' && (
        <Card>
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
      )}

      {activeTab === 'reports' && (
        <Card>
          <CardHeader>
            <CardTitle>{moduleName} Reports</CardTitle>
            <CardDescription>Analytics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Reports will be generated based on your data.</p>
              <p className="text-sm text-gray-500">
                Connect your backend API to display comprehensive reports and analytics.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ModuleView;
