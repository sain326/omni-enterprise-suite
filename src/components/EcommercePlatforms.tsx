import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import ShopifySetup from './ecommerce/ShopifySetup';

interface Platform {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  route: string;
}

const platforms: Platform[] = [
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Build and customize your online store',
    logo: '🛍️',
    color: 'from-green-400 to-green-600',
    route: '/ecommerce/shopify'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'Sell on the world\'s largest marketplace',
    logo: '📦',
    color: 'from-orange-400 to-orange-600',
    route: '/ecommerce/amazon'
  },
  {
    id: 'walmart',
    name: 'Walmart',
    description: 'Reach millions of Walmart customers',
    logo: '🏪',
    color: 'from-blue-400 to-blue-600',
    route: '/ecommerce/walmart'
  },
  {
    id: 'ebay',
    name: 'eBay',
    description: 'Auction and fixed-price selling',
    logo: '🎯',
    color: 'from-yellow-400 to-yellow-600',
    route: '/ecommerce/ebay'
  },
  {
    id: 'etsy',
    name: 'Etsy',
    description: 'Marketplace for creative goods',
    logo: '🎨',
    color: 'from-pink-400 to-pink-600',
    route: '/ecommerce/etsy'
  },
  {
    id: 'facebook',
    name: 'Facebook Shop',
    description: 'Social commerce platform',
    logo: '📱',
    color: 'from-blue-500 to-blue-700',
    route: '/ecommerce/facebook'
  },
  {
    id: 'instagram',
    name: 'Instagram Shop',
    description: 'Visual shopping experience',
    logo: '📸',
    color: 'from-purple-400 to-pink-600',
    route: '/ecommerce/instagram'
  },
  {
    id: 'google',
    name: 'Google Shopping',
    description: 'Reach customers via Google',
    logo: '🔍',
    color: 'from-red-400 to-yellow-600',
    route: '/ecommerce/google'
  }
];

const EcommercePlatforms: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const itemsPerPage = 4;

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - itemsPerPage;
      return newIndex < 0 ? Math.max(0, platforms.length - itemsPerPage) : newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + itemsPerPage;
      return newIndex >= platforms.length ? 0 : newIndex;
    });
  };

  const handlePlatformClick = (platform: Platform) => {
    if (platform.id === 'shopify') {
      setSelectedPlatform('shopify');
    } else {
      alert(`${platform.name} integration coming soon!`);
    }
  };

  if (selectedPlatform === 'shopify') {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedPlatform(null)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Platforms</span>
          </Button>
        </div>
        <ShopifySetup />
      </div>
    );
  }

  const visiblePlatforms = platforms.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">E-commerce Platforms</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect and manage your presence across multiple e-commerce platforms from one central dashboard.
        </p>
      </div>

      {/* Platform Carousel */}
      <div className="relative">
        <div className="flex items-center justify-center space-x-4">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            className="rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Platform Icons Container */}
          <div className="flex space-x-6 overflow-hidden">
            {visiblePlatforms.map((platform, index) => (
              <div
                key={platform.id}
                className="transform transition-all duration-500 ease-in-out hover:scale-110 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <Card 
                  className="w-48 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group"
                  onClick={() => handlePlatformClick(platform)}
                >
                  <CardHeader className="text-center pb-2">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${platform.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-2xl">{platform.logo}</span>
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {platform.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center text-sm">
                      {platform.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Platform Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(platforms.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? 'bg-blue-600 scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">8+</CardTitle>
            <CardDescription>Connected Platforms</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-green-600">Real-time</CardTitle>
            <CardDescription>Inventory Sync</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-purple-600">Unified</CardTitle>
            <CardDescription>Order Management</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default EcommercePlatforms;
