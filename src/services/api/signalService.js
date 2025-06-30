import { toast } from 'react-toastify';

class SignalService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'signal';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "symbol" } },
          { field: { Name: "action" } },
          { field: { Name: "price" } },
          { field: { Name: "stop_loss" } },
          { field: { Name: "take_profit" } },
          { field: { Name: "lot_size" } },
          { field: { Name: "status" } },
          { 
            field: { name: "account_number" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          { fieldName: "timestamp", sorttype: "DESC" }
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
      console.error("Error fetching signals:", error);
      toast.error("Failed to load signals");
      return [];
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "symbol" } },
          { field: { Name: "action" } },
          { field: { Name: "price" } },
          { field: { Name: "stop_loss" } },
          { field: { Name: "take_profit" } },
          { field: { Name: "lot_size" } },
          { field: { Name: "status" } },
          { 
            field: { name: "account_number" },
            referenceField: { field: { Name: "Name" } }
          }
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
      console.error(`Error fetching signal with ID ${id}:`, error);
      toast.error("Failed to load signal");
      return null;
    }
  }

  async getRecentSignals(limit = 10) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "symbol" } },
          { field: { Name: "action" } },
          { field: { Name: "price" } },
          { field: { Name: "stop_loss" } },
          { field: { Name: "take_profit" } },
          { field: { Name: "lot_size" } },
          { field: { Name: "status" } },
          { 
            field: { name: "account_number" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          { fieldName: "timestamp", sorttype: "DESC" }
        ],
        pagingInfo: { limit: limit, offset: 0 }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching recent signals:", error);
      toast.error("Failed to load recent signals");
      return [];
    }
  }

  async create(signalData) {
    try {
      const params = {
        records: [{
          Name: signalData.Name || `${signalData.symbol} ${signalData.action}`,
          timestamp: signalData.timestamp || new Date().toISOString(),
          symbol: signalData.symbol,
          action: signalData.action,
          price: signalData.price,
          stop_loss: signalData.stop_loss,
          take_profit: signalData.take_profit,
          lot_size: signalData.lot_size,
          account_number: signalData.account_number,
          status: signalData.status || 'pending'
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
      console.error("Error creating signal:", error);
      toast.error("Failed to create signal");
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
      console.error("Error updating signal:", error);
      toast.error("Failed to update signal");
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
      console.error("Error deleting signal:", error);
      toast.error("Failed to delete signal");
      return false;
    }
  }
}

export const signalService = new SignalService();