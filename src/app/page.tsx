'use client';

import { useShiftContext } from '@/context/ShiftContext';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import LoadingState from '@/components/ui/LoadingState';
import ErrorState from '@/components/ui/ErrorState';

export default function Home() {
  const { state } = useShiftContext();
  
  if (state.loading || !state.initialized) {
    return (
      <div className="p-4">
        <LoadingState message="Loading carers..." />
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
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Carers</h1>

      <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="p-3 text-left">Carer</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Shift(s)</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {state.carers.map((carer) => {
                const shiftCount = state.shifts.filter(s => s.carerId === carer.id).length;
                return (
                  <tr key={carer.id} className="border-t">
                    <td className="p-3">{carer.name}</td>
                    <td className="p-3">{carer.email}</td>
                    <td className="p-3">{shiftCount} {shiftCount <= 1 ? 'shift' : 'shifts'} assigned</td>
                    <td className="p-3">
                      <Link href={`/schedule/${carer.id}`}>
                        <Button size="sm">
                          View Schedule
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </div>
  );
}