import History from '../components/History';

export default function HistoryPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tight">My Activity History</h1>
          <p className="text-xl text-gray-600">Review your recent image processing tasks and history.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <History />
        </div>
      </div>
    </div>
  );
}
