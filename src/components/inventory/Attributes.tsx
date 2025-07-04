
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Attribute } from '@/types';

const Attributes: React.FC = () => {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'text', required: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAttribute: Attribute = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type as Attribute['type'],
      required: formData.required,
    };
    setAttributes([...attributes, newAttribute]);
    setFormData({ name: '', type: 'text', required: false });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setAttributes(attributes.filter(attr => attr.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Product Attributes</CardTitle>
            <CardDescription>Define attributes for product variants</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Attribute
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Attribute</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="attribute-name">Attribute Name</Label>
                  <Input
                    id="attribute-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Size, Color, Material"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="attribute-type">Attribute Type</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select attribute type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="select">Select (Dropdown)</SelectItem>
                      <SelectItem value="color">Color</SelectItem>
                      <SelectItem value="boolean">Yes/No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="required"
                    checked={formData.required}
                    onCheckedChange={(checked) => setFormData({ ...formData, required: !!checked })}
                  />
                  <Label htmlFor="required">Required attribute</Label>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Add Attribute</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {attributes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No attributes created yet.</p>
              <p className="text-sm text-gray-500">Add attributes to define product variants.</p>
            </div>
          ) : (
            attributes.map((attribute) => (
              <Card key={attribute.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{attribute.name}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-600 capitalize">Type: {attribute.type}</span>
                        {attribute.required && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Required</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(attribute.id)}>
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

export default Attributes;
