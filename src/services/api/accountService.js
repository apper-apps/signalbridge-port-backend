import { toast } from 'react-toastify';

class AccountService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'app_account';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "account_number" } },
          { field: { Name: "api_key" } },
          { field: { Name: "subscription_status" } },
          { field: { Name: "expiry_date" } },
          { field: { Name: "signals_received" } },
          { field: { Name: "last_active" } }
        ],
        orderBy: [
          { fieldName: "Id", sorttype: "ASC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast.error("Failed to load accounts");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "account_number" } },
          { field: { Name: "api_key" } },
          { field: { Name: "subscription_status" } },
          { field: { Name: "expiry_date" } },
          { field: { Name: "signals_received" } },
          { field: { Name: "last_active" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching account with ID ${id}:`, error);
      toast.error("Failed to load account");
      return null;
    }
  }

  async create(accountData) {
    try {
      const params = {
        records: [{
          Name: accountData.Name || '',
          Tags: accountData.Tags || '',
          account_number: accountData.account_number,
          api_key: accountData.api_key || this.generateApiKey(),
          subscription_status: accountData.subscription_status || 'active',
          expiry_date: accountData.expiry_date,
          signals_received: accountData.signals_received || 0,
          last_active: accountData.last_active || new Date().toISOString()
        }]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account");
      return null;
    }
  }

  async update(id, updateData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          ...updateData
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
      console.error("Error updating account:", error);
      toast.error("Failed to update account");
      return null;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
      return false;
    }
  }

  async generateApiKey(accountNumber) {
    const newKey = 'sb_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    
    if (accountNumber) {
      // Update the account with the new API key
      const accounts = await this.getAll();
      const account = accounts.find(a => a.account_number === accountNumber);
      if (account) {
        await this.update(account.Id, { api_key: newKey });
      }
    }
    
    return newKey;
  }

  generateApiKey() {
    return 'sb_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  }
}

export const accountService = new AccountService();