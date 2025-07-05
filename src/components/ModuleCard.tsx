
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Module } from '@/types';

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  return (
    <Card 
      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-300 bg-gradient-to-br from-white to-gray-50"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
            {module.icon || module.name.charAt(0)}
          </div>
          <Badge variant="secondary" className="text-xs">
            {module.category}
          </Badge>
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">
          {module.name}
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-2">
          {module.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {module.allowedRoles.map((role) => (
            <Badge key={role} variant="outline" className="text-xs capitalize">
              {role}
            </Badge>
          ))}
        </div>
        
        <div className="text-sm text-gray-500">
          Click to access module
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleCard;
