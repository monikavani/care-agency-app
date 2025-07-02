'use client';

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
  FC,
  useEffect
} from 'react';
import { Carer, Client, Shift } from '@/lib/data';
import { apiService } from '@/services/api';

type ShiftState = {
  carers: Carer[];
  clients: Client[];
  shifts: Shift[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
};

// Action types
type ShiftAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CARERS'; payload: Carer[] }
  | { type: 'SET_CLIENTS'; payload: Client[] }
  | { type: 'SET_SHIFTS'; payload: Shift[] }
  | { type: 'ADD_SHIFT'; payload: Shift }
  | { type: 'SET_INITIALIZED'; payload: boolean };

// Context type
type ShiftContextType = {
  state: ShiftState;
  dispatch: Dispatch<ShiftAction>;
  loadInitialData: () => Promise<void>;
  createShift: (shiftData: Omit<Shift, 'id'>) => Promise<void>;
};

// Create context with proper typing
const ShiftContext = createContext<ShiftContextType | null>(null);

// Define initial state
const initialState: ShiftState = {
  carers: [],
  clients: [],
  shifts: [],
  loading: true,
  error: null,
  initialized: false,
};

// Create reducer
const shiftReducer = (state: ShiftState, action: ShiftAction): ShiftState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CARERS':
      return { ...state, carers: action.payload };
    case 'SET_CLIENTS':
      return { ...state, clients: action.payload };
    case 'SET_SHIFTS':
      return { ...state, shifts: action.payload };
    case 'ADD_SHIFT':
      return { ...state, shifts: [...state.shifts, action.payload] };
    case 'SET_INITIALIZED':
      return { ...state, initialized: action.payload };
    default:
      return state;
  }
};

// Create provider component
export const ShiftProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shiftReducer, initialState);

  const loadInitialData = async () => {
    if (state.initialized) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const [carersResponse, clientsResponse, shiftsResponse] = await Promise.all([
        apiService.getCarers(),
        apiService.getClients(),
        apiService.getShifts()
      ]);

      dispatch({ type: 'SET_CARERS', payload: carersResponse.data });
      dispatch({ type: 'SET_CLIENTS', payload: clientsResponse.data });
      dispatch({ type: 'SET_SHIFTS', payload: shiftsResponse.data });
      dispatch({ type: 'SET_INITIALIZED', payload: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load data';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const createShift = async (shiftData: Omit<Shift, 'id'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await apiService.createShift(shiftData);
      dispatch({ type: 'ADD_SHIFT', payload: response.data });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create shift';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Load initial data when provider mounts
  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <ShiftContext.Provider value={{ 
      state, 
      dispatch, 
      loadInitialData, 
      createShift, 
    }}>
      {children}
    </ShiftContext.Provider>
  );
};

// Create custom hook
export const useShiftContext = () => {
  const context = useContext(ShiftContext);
  if (!context) {
    throw new Error('useShiftContext must be used within a ShiftProvider');
  }
  return context;
};