import { configData } from '@/services/mockData/apiConfig.json';

class ApiConfigService {
  constructor() {
    this.config = { ...configData };
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getConfig() {
    await this.delay();
    return { ...this.config };
  }

  async updateConfig(newConfig) {
    await this.delay();
    this.config = { ...this.config, ...newConfig };
    return { ...this.config };
  }

  async testConnection(config) {
    await this.delay(1000); // Simulate longer test time
    
    // Simulate connection test logic
    const success = Math.random() > 0.2; // 80% success rate
    
    if (success) {
      return { success: true, message: 'Connection successful' };
    } else {
      return { success: false, error: 'Connection timeout - check server settings' };
    }
  }
}

export const apiConfigService = new ApiConfigService();