
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AttackTypeDistributionPoint } from '../types';

interface AttackTypesPieChartProps {
  data: AttackTypeDistributionPoint[];
}

const COLORS = ['#3B82F6', '#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#EC4899'];

const AttackTypesPieChart: React.FC<AttackTypesPieChartProps> = ({ data }) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-white mb-4">Attack Type Distribution</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                borderColor: '#4A5568',
              }}
            />
             <Legend wrapperStyle={{ color: '#A0AEC0' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default AttackTypesPieChart;
