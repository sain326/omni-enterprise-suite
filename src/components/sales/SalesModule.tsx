
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import BusinessPartners from './BusinessPartners';
import SalesOrders from './SalesOrders';

interface SalesModuleProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SalesModule: React.FC<SalesModuleProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-gray-600">Manage your sales operations, customers, and orders</p>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">0</div>
              <p className="text-gray-600">Business partners</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">0</div>
              <p className="text-gray-600">In progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">$0</div>
              <p className="text-gray-600">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">0</div>
              <p className="text-gray-600">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'partners' && <BusinessPartners />}

      {activeTab === 'orders' && <SalesOrders />}

      {activeTab === 'reports' && (
        <Card>
          <CardHeader>
            <CardTitle>Sales Reports</CardTitle>
            <CardDescription>Analytics and insights for your sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Sales reports will be generated based on your data.</p>
              <p className="text-sm text-gray-500">
                Connect your backend API to display comprehensive sales analytics and reports.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalesModule;
