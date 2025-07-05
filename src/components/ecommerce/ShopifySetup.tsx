
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Settings, Key, Globe, Shield } from 'lucide-react';

const ShopifySetup: React.FC = () => {
  const [credentials, setCredentials] = useState({
    shopName: '',
    apiKey: '',
    apiSecret: '',
    accessToken: '',
    webhookUrl: '',
    scopes: 'read_products,write_products,read_orders,write_orders'
  });

  const [isConnected, setIsConnected] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleConnect = async () => {
    if (!credentials.shopName || !credentials.apiKey || !credentials.apiSecret) {
      toast({
        title: "Missing Credentials",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here you would typically make an API call to verify credentials
      console.log('Connecting to Shopify with:', credentials);
      
      // Simulate connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsConnected(true);
      toast({
        title: "Connected Successfully",
        description: "Your Shopify store has been connected!",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Settings className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold">Shopify Integration Setup</h2>
        <p className="text-gray-600">Connect your Shopify store to sync products, orders, and inventory</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            API Credentials
          </CardTitle>
          <CardDescription>
            Enter your Shopify app credentials to establish the connection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shopName" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Shop Name
              </Label>
              <Input
                id="shopName"
                placeholder="your-shop-name"
                value={credentials.shopName}
                onChange={(e) => handleInputChange('shopName', e.target.value)}
              />
              <p className="text-xs text-gray-500">Just the shop name, not the full URL</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={credentials.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apiSecret">API Secret</Label>
              <Input
                id="apiSecret"
                type="password"
                placeholder="Enter your API secret"
                value={credentials.apiSecret}
                onChange={(e) => handleInputChange('apiSecret', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessToken">Access Token</Label>
              <Input
                id="accessToken"
                type="password"
                placeholder="Enter access token"
                value={credentials.accessToken}
                onChange={(e) => handleInputChange('accessToken', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhookUrl" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Webhook URL
            </Label>
            <Input
              id="webhookUrl"
              placeholder="https://your-domain.com/webhooks/shopify"
              value={credentials.webhookUrl}
              onChange={(e) => handleInputChange('webhookUrl', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scopes">API Scopes</Label>
            <Textarea
              id="scopes"
              placeholder="read_products,write_products,read_orders"
              value={credentials.scopes}
              onChange={(e) => handleInputChange('scopes', e.target.value)}
              rows={2}
            />
          </div>

          <Button 
            onClick={handleConnect} 
            className="w-full"
            variant={isConnected ? "secondary" : "default"}
          >
            {isConnected ? "Connected ✓" : "Connect to Shopify"}
          </Button>

          {isConnected && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                ✅ Successfully connected to {credentials.shopName}.myshopify.com
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">1. Create a Private App</h4>
            <p className="text-sm text-gray-600">
              Go to your Shopify admin → Settings → Apps and sales channels → Develop apps → Create an app
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">2. Configure API Access</h4>
            <p className="text-sm text-gray-600">
              Enable the required API scopes for products, orders, and inventory management
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">3. Get Credentials</h4>
            <p className="text-sm text-gray-600">
              Copy the API key, API secret, and access token from your app configuration
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopifySetup;
