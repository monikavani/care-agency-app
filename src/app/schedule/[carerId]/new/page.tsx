'use client';

import { useForm } from 'react-hook-form';
import { useShiftContext } from '@/context/ShiftContext';
import { useRouter } from 'next/navigation';
import { hasShiftOverlap } from '@/lib/data';
import { useState, useEffect } from 'react';
import { use } from 'react';
import { mockCarers } from '@/lib/data';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';

interface PageParams {
  carerId: string;
}

type FormData = {
  clientId: string;
  start: string;
  end: string;
};

export default function NewShiftPage({ params }: { params: Promise<PageParams> }) {
  const { carerId } = use(params);
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch, 
    setError: setFormError,
    clearErrors
  } = useForm<FormData>();
  
  const { state, createShift } = useShiftContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Watch date fields for real-time validation
  const startDate = watch('start');
  const endDate = watch('end');

  const carer = state.carers.find(c => c.id === carerId) || mockCarers.find(c => c.id === carerId);

  useEffect(() => {
    if (startDate) {
      validateFutureDate(startDate, 'start');
    }
    if (endDate) {
      validateFutureDate(endDate, 'end');
    }
  }, [startDate, endDate]);

  const validateFutureDate = (dateString: string, field: 'start' | 'end') => {
    const selectedDate = new Date(dateString);
    const now = new Date();
    
    if (selectedDate < now) {
      setFormError(field, {
        type: 'manual',
        message: 'Please select a future date/time'
      });
    } else {
      clearErrors(field);
    }
  };

  const onSubmit = async (data: FormData) => {
    setError(null);
    
    try {
      const startDate = new Date(data.start);
      const endDate = new Date(data.end);
      const now = new Date();

      // Final validation check
      if (startDate < now || endDate < now) {
        setError('Please select future dates/times');
        return;
      }

      if (endDate <= startDate) {
        setError('End time must be after start time');
        return;
      }
      
      if (hasShiftOverlap(state.shifts, carerId, startDate, endDate)) {
        setError('This shift overlaps with an existing shift');
        return;
      }

      // Use context API to create shift
      await createShift({
        carerId,
        clientId: data.clientId,
        start: startDate,
        end: endDate,
      });
      
      router.push(`/schedule/${carerId}`);
      
    } catch (err) {
      // Error is handled by context
      setError('Failed to create shift. Please try again.');
    }
  };

  // Get current datetime in correct format for input min attribute
  const now = new Date();
  const minDateTime = now.toISOString().slice(0, 16);

  // Show loading state during initial data load
  if (state.loading || !state.initialized) {
    return (
      <div className="p-4">
        <LoadingState message="Loading data..." />
      </div>
    );
  }

  // Show error state if there's an error
  if (state.error) {
    return (
      <div className="p-4">
        <ErrorState 
          message={state.error} 
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  return (
    <div className="p-4 mx-auto bg-white rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add {carer?.name || 'New'} Shift</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Client" error={errors.clientId?.message}>
          <select
            {...register('clientId', { required: 'Client is required' })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={state.loading}
          >
            <option value="">Select a client</option>
            {state.clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Start Time" error={errors.start?.message}>
          <input
            type="datetime-local"
            {...register('start', { 
              required: 'Start time is required',
              validate: value => new Date(value) >= new Date() || 'Must be future date'
            })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={minDateTime}
            disabled={state.loading}
          />
        </FormField>

        <FormField label="End Time" error={errors.end?.message}>
          <input
            type="datetime-local"
            {...register('end', { 
              required: 'End time is required',
              validate: value => new Date(value) >= new Date() || 'Must be future date'
            })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min={minDateTime}
            disabled={state.loading}
          />
        </FormField>

        {error && (
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {state.error && (
          <div className="p-3 bg-red-100 text-red-600 rounded-lg">
            {state.error}
          </div>
        )}

        <div className="flex space-x-4 pt-4 justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.push(`/schedule/${carerId}`)}
            disabled={state.loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={state.loading}
          >
            Save Shift
          </Button>
        </div>
      </form>
    </div>
  );
}