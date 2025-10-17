
import React from 'react';
import { Threat } from '../types';

interface RecentAlertsProps {
  threats: Threat[];
}

const getSeverityClass = (severity: Threat['severity']) => {
    switch (severity) {
        case 'Critical': return 'bg-red-900/50 border-red-500 text-red-300';
        case 'High': return 'bg-red-800/50 border-red-600 text-red-400';
        case 'Medium': return 'bg-yellow-700/50 border-yellow-500 text-yellow-300';
        case 'Low': return 'bg-blue-800/50 border-blue-600 text-blue-400';
        default: return 'bg-gray-700/50 border-gray-600 text-gray-300';
    }
}

const RecentAlerts: React.FC<RecentAlertsProps> = ({ threats }) => {
    const sortedThreats = [...threats].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const recentThreats = sortedThreats.slice(0, 10); // Show latest 10
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Recent Alerts</h3>
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {recentThreats.length > 0 ? recentThreats.map((threat, index) => (
          <details key={index} className={`p-3 rounded-lg border-l-4 transition-colors duration-200 ${getSeverityClass(threat.severity)}`}>
            <summary className="font-semibold cursor-pointer flex justify-between items-center text-sm">
                <span>{threat.threatType} from {threat.sourceIp}</span>
                <span className="text-xs font-mono opacity-80">{new Date(threat.timestamp).toLocaleTimeString()}</span>
            </summary>
            <div className="mt-2 text-xs opacity-90 space-y-1">
                <p><span className="font-semibold">Description:</span> {threat.description}</p>
                <p className="font-mono bg-gray-900/50 p-2 rounded"><span className="font-semibold">Log Entry:</span> {threat.logEntry}</p>
            </div>
          </details>
        )) : (
            <div className="text-center text-gray-500 py-8">
                <p>No threats detected in this log file.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default RecentAlerts;
