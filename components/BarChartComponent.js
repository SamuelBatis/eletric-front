import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {name: 'Janeiro', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Fevereiro', uv: 3000, pv: 1398, amt: 2210},
  {name: 'Março', uv: 2000, pv: 9800, amt: 2290},
  {name: 'Abril', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Maio', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Junho', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Julho', uv: 3490, pv: 4300, amt: 2100},
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{top: 20, right: 30, left: 0, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
