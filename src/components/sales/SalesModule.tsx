
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BusinessPartners from './BusinessPartners';
import SalesOrders from './SalesOrders';
import DynamicFormWithItems from '../DynamicFormWithItems';
import formsData from '@/data/forms.json';

interface SalesModuleProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SalesModule: React.FC<SalesModuleProps> = ({ activeTab, setActiveTab }) => {
  const handleFormSubmit = (data: Record<string, any>) => {
    console.log('Form submitted:', data);
    // Here you would typically send data to your API
  };

  return (
    <div className="space-y-6 p-6">
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
            <p className="text-gray-600">Manage your sales operations, customers, and orders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">0</div>
                <p className="text-blue-600/70">Business partners</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">0</div>
                <p className="text-green-600/70">In progress</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-800">Monthly Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">$0</div>
                <p className="text-purple-600/70">This month</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800">Pending Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">0</div>
                <p className="text-orange-600/70">Awaiting approval</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'partners' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Partners</h1>
            <p className="text-gray-600">Manage your customers and vendors</p>
          </div>
          <BusinessPartners />
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Orders</h1>
            <p className="text-gray-600">Manage and track your sales orders</p>
          </div>
          <SalesOrders />
        </div>
      )}

      {activeTab === 'create-order' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create Sales Order</h1>
            <p className="text-gray-600">Create a new sales order with item details</p>
          </div>
          <DynamicFormWithItems 
            config={formsData.salesOrder as any}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {activeTab === 'create-partner' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add Business Partner</h1>
            <p className="text-gray-600">Register a new customer or vendor</p>
          </div>
          <DynamicFormWithItems 
            config={formsData.businessPartner as any}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Reports</h1>
            <p className="text-gray-600">Analytics and insights for your sales performance</p>
          </div>
          
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-100 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800">Sales Reports</CardTitle>
              <CardDescription className="text-emerald-600">Analytics and insights for your sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-emerald-700 mb-4">Sales reports will be generated based on your data.</p>
                <p className="text-sm text-emerald-600">
                  Connect your backend API to display comprehensive sales analytics and reports.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SalesModule;
