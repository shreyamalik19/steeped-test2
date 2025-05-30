import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';

export default function RadarChartComponent({ data }) {
  const chartData = [
    { attribute: 'Creaminess', value: Number(data.creaminess) || 0 },
    { attribute: 'Nuttiness', value: Number(data.nuttiness) || 0 },
    { attribute: 'Strength', value: Number(data.strength) || 0 },
    { attribute: 'Astringency', value: Number(data.astringency) || 0 },
    { attribute: 'Floral', value: Number(data.floral) || 0 },
    { attribute: 'Sweet', value: Number(data.sweet) || 0 }
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="attribute" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar name="Flavor" dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
