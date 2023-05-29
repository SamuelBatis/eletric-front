import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineChartComponent = ({ data, simulacao }) => {
  const combinedData = data.map((item, index) => ({
    ...item,
    simulacaoValor: simulacao[index] ? simulacao[index].valor : null,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={combinedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="valor" name="Real" stroke="#8884d8" />
        <Line type="monotone" dataKey="simulacaoValor" name="Simulação" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
