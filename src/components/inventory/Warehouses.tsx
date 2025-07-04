
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { Warehouse } from '@/types';

const Warehouses: React.FC = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', address: '', managerId: '', isActive: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWarehouse: Warehouse = {
      id: Date.now().toString(),
      name: formData.name,
      address: formData.address,
      managerId: formData.managerId || undefined,
      isActive: formData.isActive,
    };
    setWarehouses([...warehouses, newWarehouse]);
    setFormData({ name: '', address: '', managerId: '', isActive: true });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setWarehouses(warehouses.filter(warehouse => warehouse.id !== id));
  };

  const toggleActive = (id: string) => {
    setWarehouses(warehouses.map(warehouse => 
      warehouse.id === id 
        ? { ...warehouse, isActive: !warehouse.isActive }
        : warehouse
    ));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Warehouses</CardTitle>
            <CardDescription>Manage your warehouse locations</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Warehouse
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Warehouse</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="warehouse-name">Warehouse Name</Label>
                  <Input
                    id="warehouse-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter warehouse name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="warehouse-address">Address</Label>
                  <Textarea
                    id="warehouse-address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter complete warehouse address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="manager-id">Manager ID (Optional)</Label>
                  <Input
                    id="manager-id"
                    value={formData.managerId}
                    onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
                    placeholder="Enter manager employee ID"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is-active"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
                  />
                  <Label htmlFor="is-active">Active warehouse</Label>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Add Warehouse</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {warehouses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No warehouses created yet.</p>
              <p className="text-sm text-gray-500">Add your first warehouse to get started.</p>
            </div>
          ) : (
            warehouses.map((warehouse) => (
              <Card key={warehouse.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{warehouse.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            warehouse.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {warehouse.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{warehouse.address}</p>
                        {warehouse.managerId && (
                          <p className="text-gray-500 text-xs mt-1">Manager ID: {warehouse.managerId}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleActive(warehouse.id)}
                      >
                        {warehouse.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(warehouse.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Warehouses;
