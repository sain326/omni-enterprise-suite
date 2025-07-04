
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Brand } from '@/types';

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', logo: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBrand: Brand = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      logo: formData.logo || undefined,
    };
    setBrands([...brands, newBrand]);
    setFormData({ name: '', description: '', logo: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setBrands(brands.filter(brand => brand.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Brands</CardTitle>
            <CardDescription>Manage product brands</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Brand
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Brand</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="brand-name">Brand Name</Label>
                  <Input
                    id="brand-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter brand name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="brand-description">Description</Label>
                  <Textarea
                    id="brand-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter brand description"
                  />
                </div>
                <div>
                  <Label htmlFor="brand-logo">Logo URL (Optional)</Label>
                  <Input
                    id="brand-logo"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Add Brand</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {brands.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No brands created yet.</p>
              <p className="text-sm text-gray-500">Add your first brand to get started.</p>
            </div>
          ) : (
            brands.map((brand) => (
              <Card key={brand.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      {brand.logo && (
                        <img 
                          src={brand.logo} 
                          alt={brand.name} 
                          className="w-12 h-12 object-contain rounded"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{brand.name}</h3>
                        {brand.description && (
                          <p className="text-gray-600 text-sm mt-1">{brand.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(brand.id)}>
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

export default Brands;
