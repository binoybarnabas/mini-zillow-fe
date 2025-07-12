'use client';
import { Loader2 } from 'lucide-react'; 

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 bg-gray/1 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    </div>
  );
}
