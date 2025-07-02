'use client';

import { useShiftContext } from '@/context/ShiftContext';
import Link from 'next/link';
import { mockCarers, mockClients } from '@/lib/data';
import { use } from 'react';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';
import Button from '@/components/ui/Button';

interface PageParams {
  carerId: string;
}

export default function SchedulePage({ params }: { params: Promise<PageParams> }) {
  const { carerId } = use(params);
  const { state } = useShiftContext();
  
  // Filter shifts and find carer
  const shifts = state.shifts.filter(s => s.carerId === carerId);
  const carer = state.carers.find(c => c.id === carerId) || mockCarers.find(c => c.id === carerId);

  if (state.loading || !state.initialized) {
    return (
      <div className="p-4">
        <LoadingState message="Loading schedule..." />
      </div>
    );
  }

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

  if (!carer) {
    return (
      <div className="p-4">
        <p>Carer not found</p>
        <Link href="/" className="text-primary-500 hover:underline">
          ← Back to carers
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">{carer.name}&apos;s Schedule</h1>
        <div className="flex gap-4">
          <Link href="/" className="text-primary-500 hover:underline flex items-center">
            ← Back to carers
          </Link>
          <Link href={`/schedule/${carerId}/new`}>
            <Button>
              Add New Shift
            </Button>
          </Link>
        </div>
      </div>

      {shifts.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No shifts scheduled yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Start</th>
                <th className="p-3 text-left">End</th>
                <th className="p-3 text-left">Duration</th>
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift) => {
                const client = state.clients.find(c => c.id === shift.clientId) || mockClients.find(c => c.id === shift.clientId);
                const duration = (shift.end.getTime() - shift.start.getTime()) / (1000 * 60 * 60);
                return (
                  <tr key={shift.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{client?.name}</td>
                    <td className="p-3">{shift.start.toLocaleString()}</td>
                    <td className="p-3">{shift.end.toLocaleString()}</td>
                    <td className="p-3">{duration.toFixed(1)} hours</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}