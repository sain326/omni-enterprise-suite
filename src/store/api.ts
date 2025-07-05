
// Centralized API store for handling all API endpoints
class ApiStore {
  private baseUrl: string = '';
  
  // Authentication endpoints
  auth = {
    login: (email: string, password: string) => {
      return this.post('/auth/login', { email, password });
    },
    register: (userData: any) => {
      return this.post('/auth/register', userData);
    },
    logout: () => {
      return this.post('/auth/logout');
    }
  };

  // Sales endpoints
  sales = {
    getOrders: () => {
      return this.get('/sales/orders');
    },
    createOrder: (orderData: any) => {
      return this.post('/sales/orders', orderData);
    },
    updateOrder: (id: string, orderData: any) => {
      return this.put(`/sales/orders/${id}`, orderData);
    },
    deleteOrder: (id: string) => {
      return this.delete(`/sales/orders/${id}`);
    },
    getCustomers: () => {
      return this.get('/sales/customers');
    },
    createCustomer: (customerData: any) => {
      return this.post('/sales/customers', customerData);
    }
  };

  // Inventory endpoints
  inventory = {
    getProducts: () => {
      return this.get('/inventory/products');
    },
    createProduct: (productData: any) => {
      return this.post('/inventory/products', productData);
    },
    updateProduct: (id: string, productData: any) => {
      return this.put(`/inventory/products/${id}`, productData);
    },
    deleteProduct: (id: string) => {
      return this.delete(`/inventory/products/${id}`);
    },
    getCategories: () => {
      return this.get('/inventory/categories');
    },
    getBrands: () => {
      return this.get('/inventory/brands');
    }
  };

  // HR endpoints
  hr = {
    getEmployees: () => {
      return this.get('/hr/employees');
    },
    createEmployee: (employeeData: any) => {
      return this.post('/hr/employees', employeeData);
    },
    updateEmployee: (id: string, employeeData: any) => {
      return this.put(`/hr/employees/${id}`, employeeData);
    },
    deleteEmployee: (id: string) => {
      return this.delete(`/hr/employees/${id}`);
    }
  };

  // POS endpoints
  pos = {
    getTransactions: () => {
      return this.get('/pos/transactions');
    },
    createTransaction: (transactionData: any) => {
      return this.post('/pos/transactions', transactionData);
    },
    getProducts: () => {
      return this.get('/pos/products');
    }
  };

  // Dashboard endpoints
  dashboard = {
    getStats: () => {
      return this.get('/dashboard/stats');
    },
    getOnlineUsers: () => {
      return this.get('/dashboard/online-users');
    },
    getSalesData: () => {
      return this.get('/dashboard/sales-data');
    },
    getEcommerceData: () => {
      return this.get('/dashboard/ecommerce-data');
    },
    getPosData: () => {
      return this.get('/dashboard/pos-data');
    }
  };

  // Generic HTTP methods
  private async get(endpoint: string) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  private async post(endpoint: string, data?: any) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }

  private async put(endpoint: string, data: any) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('PUT request failed:', error);
      throw error;
    }
  }

  private async delete(endpoint: string) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('DELETE request failed:', error);
      throw error;
    }
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('authToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return response.text();
  }

  // Method to set base URL for API
  setBaseUrl(url: string) {
    this.baseUrl = url;
  }
}

export const apiStore = new ApiStore();
export default apiStore;
