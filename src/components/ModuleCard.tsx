
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Module } from '@/types';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  Truck, 
  FileText, 
  CreditCard, 
  Globe 
} from 'lucide-react';

const iconMap = {
  users: Users,
  package: Package,
  'shopping-cart': ShoppingCart,
  truck: Truck,
  'file-text': FileText,
  'credit-card': CreditCard,
  globe: Globe,
};

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  const IconComponent = iconMap[module.icon as keyof typeof iconMap];

  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {module.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600">
          {module.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
