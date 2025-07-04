
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, ShoppingCart, CreditCard, Store, TrendingUp, Activity } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for charts
  const salesData = [
    { name: 'Jan', POS: 4000, Ecommerce: 2400, Sales: 2400 },
    { name: 'Feb', POS: 3000, Ecommerce: 1398, Sales: 2210 },
    { name: 'Mar', POS: 2000, Ecommerce: 9800, Sales: 2290 },
    { name: 'Apr', POS: 2780, Ecommerce: 3908, Sales: 2000 },
    { name: 'May', POS: 1890, Ecommerce: 4800, Sales: 2181 },
    { name: 'Jun', POS: 2390, Ecommerce: 3800, Sales: 2500 },
  ];

  const platformData = [
    { name: 'Shopify', value: 400, color: '#8884d8' },
    { name: 'Amazon', value: 300, color: '#82ca9d' },
    { name: 'Walmart', value: 200, color: '#ffc658' },
    { name: 'eBay', value: 100, color: '#ff7c7c' },
  ];

  const onlineUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', lastSeen: '2 min ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', lastSeen: '5 min ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Idle', lastSeen: '15 min ago' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Active', lastSeen: '1 min ago' },
  ];

  const getDashboardData = () => {
    switch (user?.role) {
      case 'admin':
        return {
          title: 'Admin Dashboard',
          metrics: [
            { label: 'Total Employees', value: '247', color: 'bg-blue-500', icon: Users },
            { label: 'Active Orders', value: '89', color: 'bg-green-500', icon: ShoppingCart },
            { label: 'Monthly Revenue', value: '$45,780', color: 'bg-purple-500', icon: TrendingUp },
            { label: 'System Health', value: '98%', color: 'bg-emerald-500', icon: Activity },
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
            { label: 'Team Members', value: '12', color: 'bg-blue-500', icon: Users },
            { label: 'Pending Orders', value: '23', color: 'bg-orange-500', icon: ShoppingCart },
            { label: 'Department Revenue', value: '$12,340', color: 'bg-purple-500', icon: TrendingUp },
            { label: 'Task Completion', value: '87%', color: 'bg-green-500', icon: Activity },
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
            { label: 'My Sales', value: '15', color: 'bg-green-500', icon: ShoppingCart },
            { label: 'Inventory Items', value: '342', color: 'bg-blue-500', icon: Store },
            { label: 'POS Transactions', value: '67', color: 'bg-purple-500', icon: CreditCard },
            { label: 'Tasks Completed', value: '8/10', color: 'bg-emerald-500', icon: Activity },
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
              <metric.icon className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {user?.role === 'admin' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Revenue from different channels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="POS" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="Ecommerce" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="Sales" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Orders by e-commerce platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Online Users</CardTitle>
              <CardDescription>Currently active users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {onlineUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastSeen}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

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
