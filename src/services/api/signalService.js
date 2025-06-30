import { signalData } from '@/services/mockData/signals.json';

class SignalService {
  constructor() {
    this.signals = [...signalData];
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.signals].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getById(id) {
    await this.delay();
    const signal = this.signals.find(s => s.Id === parseInt(id));
    if (!signal) {
      throw new Error('Signal not found');
    }
    return { ...signal };
  }

  async getRecentSignals(limit = 10) {
    await this.delay();
    return [...this.signals]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  async create(signalData) {
    await this.delay();
    const maxId = Math.max(...this.signals.map(s => s.Id));
    const newSignal = {
      Id: maxId + 1,
      ...signalData,
      timestamp: new Date().toISOString()
    };
    this.signals.push(newSignal);
    return { ...newSignal };
  }

  async update(id, updateData) {
    await this.delay();
    const index = this.signals.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Signal not found');
    }
    this.signals[index] = { ...this.signals[index], ...updateData };
    return { ...this.signals[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.signals.findIndex(s => s.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Signal not found');
    }
    this.signals.splice(index, 1);
    return { success: true };
  }
}

export const signalService = new SignalService();