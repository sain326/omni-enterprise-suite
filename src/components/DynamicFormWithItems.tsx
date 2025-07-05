
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormConfig } from '@/types';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

interface DynamicFormWithItemsProps {
  config: FormConfig & {
    hasItemDetails?: boolean;
    itemFields?: any[];
  };
  onSubmit?: (data: Record<string, any>) => void;
}

const DynamicFormWithItems: React.FC<DynamicFormWithItemsProps> = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [items, setItems] = useState([{ id: 1, ...{} }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (itemId: number, fieldName: string, value: any) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, [fieldName]: value }
        : item
    ));

    // Auto-add new row if this is the last row and has data
    const currentItem = items.find(item => item.id === itemId);
    const isLastItem = itemId === Math.max(...items.map(i => i.id));
    const hasRequiredData = config.itemFields?.some(field => 
      field.required && currentItem?.[field.name]
    );

    if (isLastItem && hasRequiredData && value) {
      const newId = Math.max(...items.map(i => i.id)) + 1;
      setItems(prev => [...prev, { id: newId }]);
    }
  };

  const removeItem = (itemId: number) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const addItem = () => {
    const newId = Math.max(...items.map(i => i.id)) + 1;
    setItems(prev => [...prev, { id: newId }]);
  };

  const calculateItemTotal = (item: any) => {
    const quantity = parseFloat(item.quantity || 0);
    const unitPrice = parseFloat(item.unitPrice || 0);
    const discount = parseFloat(item.discount || 0);
    const subtotal = quantity * unitPrice;
    const discountAmount = subtotal * (discount / 100);
    return subtotal - discountAmount;
  };

  const calculateGrandTotal = () => {
    return items.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = config.fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.name]);

    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in required fields: ${missingFields.map(f => f.label).join(', ')}`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate items if applicable
    if (config.hasItemDetails) {
      const validItems = items.filter(item => 
        config.itemFields?.some(field => field.required && item[field.name])
      );
      
      if (validItems.length === 0) {
        toast({
          title: "Validation Error",
          description: "Please add at least one item to the order",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const submitData = {
        ...formData,
        ...(config.hasItemDetails && { items: items.filter(item => 
          config.itemFields?.some(field => field.required && item[field.name])
        )}),
        total: config.hasItemDetails ? calculateGrandTotal() : undefined
      };

      if (onSubmit) {
        await onSubmit(submitData);
      }
      toast({
        title: "Success",
        description: "Form submitted successfully!",
      });
      setFormData({});
      setItems([{ id: 1 }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: any, value?: any, onChange?: (value: any) => void) => {
    const commonProps = {
      id: field.id,
      name: field.name,
      required: field.required,
      className: field.className,
    };

    const fieldValue = value !== undefined ? value : formData[field.name] || '';
    const fieldOnChange = onChange || ((val: any) => handleChange(field.name, val));

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => fieldOnChange(e.target.value)}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            placeholder={field.placeholder}
            value={fieldValue}
            onChange={(e) => fieldOnChange(e.target.value)}
          />
        );
      
      case 'select':
        return (
          <Select onValueChange={fieldOnChange} value={fieldValue}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'date':
        return (
          <Input
            {...commonProps}
            type="date"
            value={fieldValue}
            onChange={(e) => fieldOnChange(e.target.value)}
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={fieldValue || false}
              onCheckedChange={fieldOnChange}
            />
            <Label htmlFor={field.id}>{field.label}</Label>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        {config.description && (
          <CardDescription>{config.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Fields */}
          <div className="grid grid-cols-2 gap-4">
            {config.fields.map((field) => (
              <div key={field.name} className={field.className || 'col-span-1'}>
                {field.type !== 'checkbox' && (
                  <Label htmlFor={field.id} className="block mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Item Details Section */}
          {config.hasItemDetails && config.itemFields && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Order Items</h3>
                <Button type="button" onClick={addItem} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 grid gap-4" style={{
                  gridTemplateColumns: `repeat(${config.itemFields.length}, 1fr) auto auto`
                }}>
                  {config.itemFields.map((field) => (
                    <Label key={field.name} className="font-medium text-sm">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                  ))}
                  <Label className="font-medium text-sm">Total</Label>
                  <Label className="font-medium text-sm">Action</Label>
                </div>

                {items.map((item, index) => (
                  <div key={item.id} className="px-4 py-3 border-t grid gap-4 items-center" style={{
                    gridTemplateColumns: `repeat(${config.itemFields.length}, 1fr) auto auto`
                  }}>
                    {config.itemFields.map((field) => (
                      <div key={field.name}>
                        {renderField(
                          field,
                          item[field.name] || '',
                          (value) => handleItemChange(item.id, field.name, value)
                        )}
                      </div>
                    ))}
                    <div className="text-sm font-medium">
                      ${calculateItemTotal(item).toFixed(2)}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      disabled={items.length <= 1}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <div className="px-4 py-3 bg-gray-50 border-t">
                  <div className="flex justify-end">
                    <div className="text-lg font-bold">
                      Grand Total: ${calculateGrandTotal().toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : config.submitButtonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicFormWithItems;
