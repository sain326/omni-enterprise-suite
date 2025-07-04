
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DynamicForm from './DynamicForm';
import { FormConfig } from '@/types';
import formsData from '@/data/forms.json';

interface ModuleViewProps {
  moduleId: string;
  moduleName: string;
}

const ModuleView: React.FC<ModuleViewProps> = ({ moduleId, moduleName }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getFormConfig = (): FormConfig | null => {
    switch (moduleId) {
      case 'hr':
        return formsData.employee;
      case 'inventory':
        return formsData.product;
      case 'sales':
        return formsData.customer;
      default:
        return null;
    }
  };

  const formConfig = getFormConfig();

  const handleFormSubmit = (data: Record<string, any>) => {
    console.log(`${moduleId} form submitted:`, data);
    // Here you would typically send the data to your backend API
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{moduleName}</h1>
          <p className="text-gray-600">Manage your {moduleName.toLowerCase()} operations</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="add-new">Add New</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="add-new">
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
        </TabsContent>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Manage {moduleName}</CardTitle>
              <CardDescription>View and edit existing records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No data available yet.</p>
                <p className="text-sm text-gray-500">
                  Start by adding new items using the "Add New" tab, or integrate with your backend API to display existing data.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModuleView;
