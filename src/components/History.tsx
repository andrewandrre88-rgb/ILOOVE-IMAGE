import { useEffect, useState } from 'react';
import { getUserHistory } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { History as HistoryIcon, Clock, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export default function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchHistory = async () => {
        const data = await getUserHistory(user.uid);
        setHistory(data);
        setLoading(false);
      };
      fetchHistory();
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="mt-12 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
      <div className="flex items-center space-x-3 mb-8">
        <div className="bg-blue-100 p-2 rounded-xl">
          <HistoryIcon className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Recent Activity</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No recent activity yet. Start editing some images!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={item.id} 
              className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2.5 rounded-xl">
                  <FileText className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm truncate max-w-[200px] sm:max-w-xs">{item.fileName}</p>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.tool}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {item.timestamp?.toDate().toLocaleDateString()} {item.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-100 px-2.5 py-1 rounded-lg">
                {item.action}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
