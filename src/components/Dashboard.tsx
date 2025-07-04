
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { user } = useAuth();

  const getDashboardData = () => {
    switch (user?.role) {
      case 'admin':
        return {
          title: 'Admin Dashboard',
          metrics: [
            { label: 'Total Employees', value: '247', color: 'bg-blue-500' },
            { label: 'Active Orders', value: '89', color: 'bg-green-500' },
            { label: 'Monthly Revenue', value: '$45,780', color: 'bg-purple-500' },
            { label: 'System Health', value: '98%', color: 'bg-emerald-500' },
          ],
          recentActivity: [
            'New employee onboarding completed',
            'Inventory levels updated',
            'Monthly sales report generated',
            'System backup completed',
          ]
        };
      case 'manager':
        return {
          title: 'Manager Dashboard',
          metrics: [
            { label: 'Team Members', value: '12', color: 'bg-blue-500' },
            { label: 'Pending Orders', value: '23', color: 'bg-orange-500' },
            { label: 'Department Revenue', value: '$12,340', color: 'bg-purple-500' },
            { label: 'Task Completion', value: '87%', color: 'bg-green-500' },
          ],
          recentActivity: [
            'Team meeting scheduled',
            'Performance reviews updated',
            'Budget approval pending',
            'New product launch planning',
          ]
        };
      case 'user':
        return {
          title: 'User Dashboard',
          metrics: [
            { label: 'My Sales', value: '15', color: 'bg-green-500' },
            { label: 'Inventory Items', value: '342', color: 'bg-blue-500' },
            { label: 'POS Transactions', value: '67', color: 'bg-purple-500' },
            { label: 'Tasks Completed', value: '8/10', color: 'bg-emerald-500' },
          ],
          recentActivity: [
            'New sale recorded',
            'Inventory stock updated',
            'Customer order processed',
            'Daily report submitted',
          ]
        };
      default:
        return { title: 'Dashboard', metrics: [], recentActivity: [] };
    }
  };

  const dashboardData = getDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{dashboardData.title}</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Badge variant="secondary" className="capitalize">
          {user?.role}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.label}
              </CardTitle>
              <div className={`w-3 h-3 rounded-full ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and actions in your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dashboardData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span className="text-gray-700">{activity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
