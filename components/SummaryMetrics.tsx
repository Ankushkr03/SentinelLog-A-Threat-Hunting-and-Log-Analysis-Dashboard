
import React from 'react';
import { AnalysisResult } from '../types';
import { FileTextIcon, AlertTriangleIcon, ShieldAlertIcon } from './icons';

interface SummaryMetricsProps {
  summary: AnalysisResult['summary'];
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number | string; colorClass: string }> = ({ icon, label, value, colorClass }) => (
    <div className={`bg-gray-800/50 border-l-4 ${colorClass} p-4 rounded-lg flex items-center shadow-md`}>
        {icon}
        <div className="ml-4">
            <p className="text-sm text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);


const SummaryMetrics: React.FC<SummaryMetricsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
            icon={<FileTextIcon className="w-10 h-10 text-blue-400"/>}
            label="Total Log Entries"
            value={summary.totalLogEntries.toLocaleString()}
            colorClass="border-blue-400"
        />
        <StatCard 
            icon={<AlertTriangleIcon className="w-10 h-10 text-yellow-400"/>}
            label="Threats Detected"
            value={summary.threatsDetected.toLocaleString()}
            colorClass="border-yellow-400"
        />
        <StatCard 
            icon={<ShieldAlertIcon className="w-10 h-10 text-red-500"/>}
            label="High Severity Alerts"
            value={summary.highSeverityAlerts.toLocaleString()}
            colorClass="border-red-500"
        />
    </div>
  );
};

export default SummaryMetrics;
