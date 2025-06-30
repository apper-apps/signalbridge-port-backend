import { accountData } from '@/services/mockData/accounts.json';

class AccountService {
  constructor() {
    this.accounts = [...accountData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.accounts];
  }

  async getById(id) {
    await this.delay();
    const account = this.accounts.find(a => a.Id === parseInt(id));
    if (!account) {
      throw new Error('Account not found');
    }
    return { ...account };
  }

  async create(accountData) {
    await this.delay();
    const maxId = Math.max(...this.accounts.map(a => a.Id));
    const newAccount = {
      Id: maxId + 1,
      ...accountData,
      apiKey: this.generateApiKey(),
      signalsReceived: 0,
      lastActive: new Date().toISOString()
    };
    this.accounts.push(newAccount);
    return { ...newAccount };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.accounts.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Account not found');
    }
    this.accounts[index] = { ...this.accounts[index], ...updateData };
    return { ...this.accounts[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.accounts.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Account not found');
    }
    this.accounts.splice(index, 1);
    return { success: true };
  }

  async generateApiKey(accountNumber) {
    await this.delay();
    const newKey = 'sb_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    
    const account = this.accounts.find(a => a.accountNumber === accountNumber);
    if (account) {
      account.apiKey = newKey;
    }
    
    return newKey;
  }

  generateApiKey() {
    return 'sb_' + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
  }
}

export const accountService = new AccountService();