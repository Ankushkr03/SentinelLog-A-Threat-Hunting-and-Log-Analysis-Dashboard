
import React from 'react';
import { AnalysisResult } from '../types';
import SummaryMetrics from './SummaryMetrics';
import ThreatsOverTimeChart from './ThreatsOverTimeChart';
import AttackTypesPieChart from './AttackTypesPieChart';
import TopAttackersTable from './TopAttackersTable';
import RecentAlerts from './RecentAlerts';
import { PrintIcon, ResetIcon } from './icons';

interface DashboardProps {
  result: AnalysisResult;
  fileName: string;
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ result, fileName, onReset }) => {
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Analysis Dashboard</h2>
          <p className="text-gray-400">Results for: <span className="font-semibold text-gray-200">{fileName}</span></p>
        </div>
        <div id="dashboard-controls" className="flex items-center gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <PrintIcon className="w-5 h-5"/>
            <span>Print Report</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <ResetIcon className="w-5 h-5"/>
            <span>New Analysis</span>
          </button>
        </div>
      </div>
      
      <SummaryMetrics summary={result.summary} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-4 shadow-lg">
          <ThreatsOverTimeChart data={result.timelineData} />
        </div>
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 shadow-lg">
          <AttackTypesPieChart data={result.attackTypeDistribution} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-gray-800/50 border border-gray-700 rounded-xl p-4 shadow-lg">
            <RecentAlerts threats={result.threats} />
        </div>
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-4 shadow-lg">
            <TopAttackersTable data={result.topAttackers} />
        </div>
      </div>
       <style>
        {`
          @media print {
            body {
              background-color: white !important;
              color: black !important;
            }
            .bg-gray-800\\/50, .bg-gray-900, .bg-gray-700 {
              background-color: white !important;
              border: 1px solid #ccc !important;
            }
            .text-white, .text-gray-200, .text-gray-300, .text-gray-400 {
              color: black !important;
            }
            .text-blue-400, .text-red-400, .text-yellow-400, .text-green-400 {
                color: black !important;
            }
            .recharts-text, .recharts-label, .recharts-legend-item-text {
                fill: black !important;
            }
            .recharts-cartesian-axis-tick-line, .recharts-cartesian-grid-line {
                stroke: #ccc !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
