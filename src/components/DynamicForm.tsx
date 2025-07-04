
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

interface DynamicFormProps {
  config: FormConfig;
  onSubmit?: (data: Record<string, any>) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      toast({
        title: "Success",
        description: "Form submitted successfully!",
      });
      setFormData({});
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

  const renderField = (field: any) => {
    const commonProps = {
      id: field.id,
      name: field.name,
      required: field.required,
      className: field.className,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Input
            {...commonProps}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      
      case 'select':
        return (
          <Select onValueChange={(value) => handleChange(field.name, value)}>
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
            value={formData[field.name] || ''}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={formData[field.name] || false}
              onCheckedChange={(checked) => handleChange(field.name, checked)}
            />
            <Label htmlFor={field.id}>{field.label}</Label>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        {config.description && (
          <CardDescription>{config.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : config.submitButtonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DynamicForm;
