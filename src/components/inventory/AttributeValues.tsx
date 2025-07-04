
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { AttributeValue, Attribute } from '@/types';

const AttributeValues: React.FC = () => {
  const [attributeValues, setAttributeValues] = useState<AttributeValue[]>([]);
  const [attributes] = useState<Attribute[]>([]); // This would come from context or props
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ attributeId: '', value: '', displayName: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAttributeValue: AttributeValue = {
      id: Date.now().toString(),
      attributeId: formData.attributeId,
      value: formData.value,
      displayName: formData.displayName || formData.value,
    };
    setAttributeValues([...attributeValues, newAttributeValue]);
    setFormData({ attributeId: '', value: '', displayName: '' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setAttributeValues(attributeValues.filter(val => val.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Attribute Values</CardTitle>
            <CardDescription>Define values for your attributes</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)} disabled={attributes.length === 0}>
            <Plus className="w-4 h-4 mr-2" />
            Add Value
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {attributes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">Create attributes first before adding values.</p>
          </div>
        )}

        {showForm && attributes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Attribute Value</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="attribute-select">Select Attribute</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, attributeId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an attribute" />
                    </SelectTrigger>
                    <SelectContent>
                      {attributes.map((attribute) => (
                        <SelectItem key={attribute.id} value={attribute.id}>
                          {attribute.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="e.g., Red, Large, Cotton"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="display-name">Display Name (Optional)</Label>
                  <Input
                    id="display-name"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="How to display this value"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">Add Value</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {attributeValues.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No attribute values created yet.</p>
            </div>
          ) : (
            attributeValues.map((attributeValue) => (
              <Card key={attributeValue.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{attributeValue.displayName || attributeValue.value}</h3>
                      <p className="text-sm text-gray-600">
                        Attribute: {attributes.find(a => a.id === attributeValue.attributeId)?.name || 'Unknown'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(attributeValue.id)}>
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

export default AttributeValues;
