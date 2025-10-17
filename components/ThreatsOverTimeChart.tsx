
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TimelineDataPoint } from '../types';

interface ThreatsOverTimeChartProps {
  data: TimelineDataPoint[];
}

const ThreatsOverTimeChart: React.FC<ThreatsOverTimeChartProps> = ({ data }) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-white mb-4">Threats Over Time</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="time" stroke="#A0AEC0" />
            <YAxis stroke="#A0AEC0" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                borderColor: '#4A5568',
              }}
            />
            <Legend wrapperStyle={{ color: '#A0AEC0' }}/>
            <Line type="monotone" dataKey="count" name="Threats" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ThreatsOverTimeChart;
