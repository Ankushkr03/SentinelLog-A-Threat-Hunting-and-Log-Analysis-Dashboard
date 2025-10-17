
import React from 'react';
import { TopAttacker } from '../types';
import { UserWarningIcon } from './icons';

interface TopAttackersTableProps {
  data: TopAttacker[];
}

const TopAttackersTable: React.FC<TopAttackersTableProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Top Attacker IPs</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
            <tr>
              <th scope="col" className="px-4 py-3">IP Address</th>
              <th scope="col" className="px-4 py-3 text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((attacker, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30">
                <td className="px-4 py-3 font-medium text-gray-200 whitespace-nowrap flex items-center">
                   <UserWarningIcon className="w-4 h-4 mr-2 text-yellow-400"/> {attacker.ip}
                </td>
                <td className="px-4 py-3 text-right">{attacker.count}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={2} className="text-center py-4">No significant attackers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopAttackersTable;
