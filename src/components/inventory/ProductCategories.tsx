
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ProductCategory } from '@/types';

const ProductCategories: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', parentId: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: ProductCategory = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      parentId: formData.parentId || undefined,
    };
    setCategories([...categories, newCategory]);
    setFormData({ name: '', description: '', parentId: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Organize your products into categories</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Category</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter category name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category-description">Description</Label>
                  <Textarea
                    id="category-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter category description"
                  />
                </div>
                <div>
                  <Label htmlFor="parent-category">Parent Category (Optional)</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, parentId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select parent category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Add Category</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No categories created yet.</p>
              <p className="text-sm text-gray-500">Add your first category to get started.</p>
            </div>
          ) : (
            categories.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      {category.description && (
                        <p className="text-gray-600 text-sm mt-1">{category.description}</p>
                      )}
                      {category.parentId && (
                        <p className="text-gray-500 text-xs mt-1">
                          Parent: {categories.find(c => c.id === category.parentId)?.name}
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(category.id)}>
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

export default ProductCategories;
