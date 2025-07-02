import { Carer, Client, Shift, mockDataService } from '@/lib/data';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API errors
const simulateError = () => Math.random() < 0.1;

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

class ApiService {
  private async makeRequest<T>(
    operation: () => T,
    delayMs: number = 500
  ): Promise<ApiResponse<T>> {
    await delay(delayMs);
    
    if (simulateError()) {
      throw new Error('Network error occurred. Please try again.');
    }
    
    return {
      data: operation(),
      success: true
    };
  }

  // Carer APIs
  async getCarers(): Promise<ApiResponse<Carer[]>> {
    return this.makeRequest(() => mockDataService.getCarers(), 1500);
  }

  // Client APIs
  async getClients(): Promise<ApiResponse<Client[]>> {
    return this.makeRequest(() => mockDataService.getClients(), 1500);
  }

  // Shift APIs
  async getShifts(): Promise<ApiResponse<Shift[]>> {
    return this.makeRequest(() => mockDataService.getShifts(), 2000);
  }

  async createShift(shiftData: Omit<Shift, 'id'>): Promise<ApiResponse<Shift>> {
    return this.makeRequest(() => ({
      id: Date.now().toString(),
      ...shiftData,
    }), 1000);
  }
}

export const apiService = new ApiService(); 