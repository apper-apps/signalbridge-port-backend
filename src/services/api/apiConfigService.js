import { toast } from 'react-toastify';

class ApiConfigService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'api_config';
  }

  async getConfig() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "endpoint" } },
          { field: { Name: "auth_method" } },
          { field: { Name: "webhook_url" } },
          { field: { Name: "is_active" } },
          { field: { Name: "mt5_parameters_server_address" } },
          { field: { Name: "mt5_parameters_login" } },
          { field: { Name: "mt5_parameters_password" } },
          { field: { Name: "mt5_parameters_max_lot_size" } },
          { field: { Name: "mt5_parameters_allowed_symbols" } },
          { field: { Name: "mt5_parameters_risk_level" } }
        ],
        pagingInfo: { limit: 1, offset: 0 }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return {};
      }

      return response.data && response.data.length > 0 ? response.data[0] : {};
    } catch (error) {
      console.error("Error fetching API configuration:", error);
      toast.error("Failed to load API configuration");
      return {};
    }
  }

  async updateConfig(newConfig) {
    try {
      // First, get existing config to get the ID
      const existingConfig = await this.getConfig();
      
      const params = {
        records: [{
          Id: existingConfig.Id || 1,
          Name: newConfig.Name || 'API Configuration',
          endpoint: newConfig.endpoint,
          auth_method: newConfig.auth_method,
          webhook_url: newConfig.webhook_url,
          is_active: newConfig.is_active !== undefined ? newConfig.is_active : true,
          mt5_parameters_server_address: newConfig.mt5_parameters_server_address,
          mt5_parameters_login: newConfig.mt5_parameters_login,
          mt5_parameters_password: newConfig.mt5_parameters_password,
          mt5_parameters_max_lot_size: newConfig.mt5_parameters_max_lot_size,
          mt5_parameters_allowed_symbols: newConfig.mt5_parameters_allowed_symbols,
          mt5_parameters_risk_level: newConfig.mt5_parameters_risk_level
        }]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
    } catch (error) {
      console.error("Error updating API configuration:", error);
      toast.error("Failed to update API configuration");
      return null;
    }
  }

  async testConnection(config) {
    // Simulate connection test with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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