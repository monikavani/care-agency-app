export interface Carer {
  id: string;
  name: string;
  email: string;
}

export interface Client {
  id: string;
  name: string;
  address: string;
}

export interface Shift {
  id: string;
  carerId: string;
  clientId: string;
  start: Date;
  end: Date;
}

// Centralized mock data service
class MockDataService {
  private static instance: MockDataService;
  
  private constructor() {}
  
  static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
    }
    return MockDataService.instance;
  }

  getCarers(): Carer[] {
    return [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
      { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com' },
      { id: '5', name: 'David Brown', email: 'david@example.com' },
      { id: '6', name: 'Emily Davis', email: 'emily@example.com' },
      { id: '7', name: 'Robert Taylor', email: 'robert@example.com' },
      { id: '8', name: 'Lisa Anderson', email: 'lisa@example.com' },
      { id: '9', name: 'James Martinez', email: 'james@example.com' },
      { id: '10', name: 'Maria Garcia', email: 'maria@example.com' },
    ];
  }

  getClients(): Client[] {
    return [
      { id: '1', name: 'Alice Johnson', address: '123 Main St, Downtown' },
      { id: '2', name: 'Bob Williams', address: '456 Oak Ave, Westside' },
      { id: '3', name: 'Charlie Brown', address: '789 Pine Rd, Eastside' },
      { id: '4', name: 'Diana Miller', address: '321 Elm St, Northside' },
      { id: '5', name: 'Edward Wilson', address: '654 Maple Dr, Southside' },
      { id: '6', name: 'Fiona Thompson', address: '987 Cedar Ln, Central' },
      { id: '7', name: 'George Harris', address: '147 Birch Way, Uptown' },
      { id: '8', name: 'Helen Clark', address: '258 Spruce Ct, Midtown' },
      { id: '9', name: 'Ian Rodriguez', address: '369 Willow Pl, Riverside' },
      { id: '10', name: 'Julia Lee', address: '741 Aspen Blvd, Hillcrest' },
      { id: '11', name: 'Kevin White', address: '852 Poplar St, Lakeside' },
      { id: '12', name: 'Laura Moore', address: '963 Sycamore Ave, Parkview' },
    ];
  }

  getShifts(): Shift[] {
    return [
      // John Doe's shifts
      {
        id: '1',
        carerId: '1',
        clientId: '1',
        start: new Date(2024, 11, 15, 9, 0),
        end: new Date(2024, 11, 15, 13, 0),
      },
      {
        id: '2',
        carerId: '1',
        clientId: '2',
        start: new Date(2024, 11, 16, 14, 0),
        end: new Date(2024, 11, 16, 18, 0),
      },
      {
        id: '3',
        carerId: '1',
        clientId: '3',
        start: new Date(2024, 11, 17, 8, 0),
        end: new Date(2024, 11, 17, 12, 0),
      },
      {
        id: '4',
        carerId: '1',
        clientId: '4',
        start: new Date(2024, 11, 18, 15, 0),
        end: new Date(2024, 11, 18, 19, 0),
      },

      // Jane Smith's shifts
      {
        id: '5',
        carerId: '2',
        clientId: '5',
        start: new Date(2024, 11, 15, 10, 0),
        end: new Date(2024, 11, 15, 15, 0),
      },
      {
        id: '6',
        carerId: '2',
        clientId: '6',
        start: new Date(2024, 11, 16, 9, 0),
        end: new Date(2024, 11, 16, 13, 0),
      },
      {
        id: '7',
        carerId: '2',
        clientId: '7',
        start: new Date(2024, 11, 17, 14, 0),
        end: new Date(2024, 11, 17, 18, 0),
      },

      // Mike Johnson's shifts
      {
        id: '8',
        carerId: '3',
        clientId: '8',
        start: new Date(2024, 11, 15, 8, 0),
        end: new Date(2024, 11, 15, 12, 0),
      },
      {
        id: '9',
        carerId: '3',
        clientId: '9',
        start: new Date(2024, 11, 16, 13, 0),
        end: new Date(2024, 11, 16, 17, 0),
      },

      // Sarah Wilson's shifts
      {
        id: '10',
        carerId: '4',
        clientId: '10',
        start: new Date(2024, 11, 15, 11, 0),
        end: new Date(2024, 11, 15, 16, 0),
      },
      {
        id: '11',
        carerId: '4',
        clientId: '11',
        start: new Date(2024, 11, 16, 8, 0),
        end: new Date(2024, 11, 16, 12, 0),
      },
      {
        id: '12',
        carerId: '4',
        clientId: '12',
        start: new Date(2024, 11, 17, 15, 0),
        end: new Date(2024, 11, 17, 19, 0),
      },

      // David Brown's shifts
      {
        id: '13',
        carerId: '5',
        clientId: '1',
        start: new Date(2024, 11, 18, 9, 0),
        end: new Date(2024, 11, 18, 13, 0),
      },
      {
        id: '14',
        carerId: '5',
        clientId: '2',
        start: new Date(2024, 11, 19, 14, 0),
        end: new Date(2024, 11, 19, 18, 0),
      },

      // Emily Davis's shifts
      {
        id: '15',
        carerId: '6',
        clientId: '3',
        start: new Date(2024, 11, 18, 10, 0),
        end: new Date(2024, 11, 18, 15, 0),
      },
      {
        id: '16',
        carerId: '6',
        clientId: '4',
        start: new Date(2024, 11, 19, 8, 0),
        end: new Date(2024, 11, 19, 12, 0),
      },

      // Robert Taylor's shifts
      {
        id: '17',
        carerId: '7',
        clientId: '5',
        start: new Date(2024, 11, 18, 13, 0),
        end: new Date(2024, 11, 18, 17, 0),
      },

      // Lisa Anderson's shifts
      {
        id: '18',
        carerId: '8',
        clientId: '6',
        start: new Date(2024, 11, 18, 9, 0),
        end: new Date(2024, 11, 18, 13, 0),
      },
      {
        id: '19',
        carerId: '8',
        clientId: '7',
        start: new Date(2024, 11, 19, 14, 0),
        end: new Date(2024, 11, 19, 18, 0),
      },

      // James Martinez's shifts
      {
        id: '20',
        carerId: '9',
        clientId: '8',
        start: new Date(2024, 11, 18, 11, 0),
        end: new Date(2024, 11, 18, 16, 0),
      },

      // Maria Garcia's shifts
      {
        id: '21',
        carerId: '10',
        clientId: '9',
        start: new Date(2024, 11, 18, 8, 0),
        end: new Date(2024, 11, 18, 12, 0),
      },
      {
        id: '22',
        carerId: '10',
        clientId: '10',
        start: new Date(2024, 11, 19, 15, 0),
        end: new Date(2024, 11, 19, 19, 0),
      },
    ];
  }

  getShiftsByCarer(carerId: string): Shift[] {
    return this.getShifts().filter(shift => shift.carerId === carerId);
  }
}

// Export singleton instance
export const mockDataService = MockDataService.getInstance();

// Legacy exports for backward compatibility (no breaking changes)
export const mockCarers = mockDataService.getCarers();
export const mockClients = mockDataService.getClients();

export function hasShiftOverlap(
  shifts: Shift[],
  carerId: string,
  newStart: Date,
  newEnd: Date,
  excludeShiftId?: string
): boolean {
  return shifts.some(shift => {
    if (shift.carerId !== carerId) return false;
    if (excludeShiftId && shift.id === excludeShiftId) return false;
    return (
      (newStart >= shift.start && newStart < shift.end) ||
      (newEnd > shift.start && newEnd <= shift.end) ||
      (newStart <= shift.start && newEnd >= shift.end)
    );
  });
}