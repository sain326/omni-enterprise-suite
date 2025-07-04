
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Package, Variants } from 'lucide-react';
import { Product, ProductCategory, Brand, Attribute, AttributeValue, Warehouse } from '@/types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [categories] = useState<ProductCategory[]>([]); // These would come from context
  const [brands] = useState<Brand[]>([]);
  const [attributes] = useState<Attribute[]>([]);
  const [attributeValues] = useState<AttributeValue[]>([]);
  const [warehouses] = useState<Warehouse[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    brandId: '',
    type: 'standard' as 'standard' | 'multi-variant',
    basePrice: 0,
    variants: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      categoryId: formData.categoryId,
      brandId: formData.brandId || undefined,
      type: formData.type,
      basePrice: formData.basePrice,
      variants: [],
      isActive: true,
    };
    setProducts([...products, newProduct]);
    setFormData({
      name: '',
      description: '',
      categoryId: '',
      brandId: '',
      type: 'standard',
      basePrice: 0,
      variants: []
    });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your product catalog</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="variants">Variants</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div>
                      <Label htmlFor="product-name">Product Name</Label>
                      <Input
                        id="product-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="product-description">Description</Label>
                      <Textarea
                        id="product-description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Enter product description"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-category">Category</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
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
                      
                      <div>
                        <Label htmlFor="product-brand">Brand (Optional)</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, brandId: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map((brand) => (
                              <SelectItem key={brand.id} value={brand.id}>
                                {brand.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="product-type">Product Type</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, type: value as 'standard' | 'multi-variant' })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard (Single Variant)</SelectItem>
                            <SelectItem value="multi-variant">Multi-Variant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="base-price">Base Price</Label>
                        <Input
                          id="base-price"
                          type="number"
                          step="0.01"
                          value={formData.basePrice}
                          onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="variants" className="space-y-4">
                    <div className="text-center py-8">
                      <Variants className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Product Variants</h3>
                      <p className="text-gray-600 mb-4">
                        {formData.type === 'standard' 
                          ? 'Standard products have a single variant automatically created.' 
                          : 'Configure multiple variants with different attributes for this product.'
                        }
                      </p>
                      {formData.type === 'multi-variant' && (
                        <div className="space-y-4">
                          <p className="text-sm text-gray-500">
                            Create attributes and attribute values first to configure variants.
                          </p>
                          <Button variant="outline" disabled={attributes.length === 0}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Variant
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="inventory" className="space-y-4">
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Inventory Management</h3>
                      <p className="text-gray-600 mb-4">
                        Set initial stock levels for each warehouse.
                      </p>
                      {warehouses.length === 0 && (
                        <p className="text-sm text-gray-500">
                          Create warehouses first to manage inventory levels.
                        </p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="flex space-x-2">
                  <Button type="submit">Add Product</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No products created yet.</p>
              <p className="text-sm text-gray-500">Add your first product to get started.</p>
            </div>
          ) : (
            products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{product.name}</h3>
                        <Badge variant={product.type === 'standard' ? 'default' : 'secondary'}>
                          {product.type === 'standard' ? 'Standard' : 'Multi-Variant'}
                        </Badge>
                        <Badge variant={product.isActive ? 'default' : 'secondary'}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      {product.description && (
                        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Base Price: ${product.basePrice.toFixed(2)}</span>
                        <span>Variants: {product.variants.length}</span>
                        <span>Category: {categories.find(c => c.id === product.categoryId)?.name || 'Unknown'}</span>
                        {product.brandId && (
                          <span>Brand: {brands.find(b => b.id === product.brandId)?.name || 'Unknown'}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
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

export default Products;
