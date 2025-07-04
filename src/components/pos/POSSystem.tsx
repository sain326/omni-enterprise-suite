
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Minus, Plus, X, CreditCard, DollarSign } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

const POSSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('terminal');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock products data
  const products: Product[] = [
    { id: '1', name: 'Laptop', price: 999.99, image: '/placeholder.svg', category: 'Electronics', stock: 10 },
    { id: '2', name: 'Coffee Mug', price: 12.99, image: '/placeholder.svg', category: 'Kitchen', stock: 25 },
    { id: '3', name: 'Wireless Mouse', price: 29.99, image: '/placeholder.svg', category: 'Electronics', stock: 15 },
    { id: '4', name: 'Notebook', price: 8.99, image: '/placeholder.svg', category: 'Office', stock: 30 },
    { id: '5', name: 'Headphones', price: 79.99, image: '/placeholder.svg', category: 'Electronics', stock: 8 },
    { id: '6', name: 'Water Bottle', price: 15.99, image: '/placeholder.svg', category: 'Sports', stock: 20 },
    { id: '7', name: 'Desk Lamp', price: 45.99, image: '/placeholder.svg', category: 'Home', stock: 12 },
    { id: '8', name: 'Phone Case', price: 19.99, image: '/placeholder.svg', category: 'Electronics', stock: 18 },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToOrder = (product: Product) => {
    const existingItem = orderItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromOrder(productId);
      return;
    }
    
    setOrderItems(orderItems.map(item =>
      item.product.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromOrder = (productId: string) => {
    setOrderItems(orderItems.filter(item => item.product.id !== productId));
  };

  const getTotalAmount = () => {
    return orderItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    alert(`Order completed! Total: $${getTotalAmount().toFixed(2)}`);
    setOrderItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">POS System</h1>
          <p className="text-gray-600">Point of Sale Terminal</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="terminal">POS Terminal</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="terminal">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Products Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => addToOrder(product)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                      <p className="text-lg font-bold text-green-600">${product.price}</p>
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">Stock: {product.stock}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No items in order</p>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {orderItems.map((item) => (
                          <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.product.name}</h4>
                              <p className="text-sm text-gray-600">${item.product.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFromOrder(item.product.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Total:</span>
                          <span className="text-2xl font-bold text-green-600">
                            ${getTotalAmount().toFixed(2)}
                          </span>
                        </div>
                        
                        <Button onClick={handleCheckout} className="w-full" size="lg">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Complete Order
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent POS transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">No transactions yet.</p>
                <p className="text-sm text-gray-500">
                  Completed orders will appear here.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>POS Reports</CardTitle>
              <CardDescription>Sales analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Reports will be generated based on your transaction data.</p>
                <p className="text-sm text-gray-500">
                  Complete some orders to see detailed analytics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default POSSystem;
