import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data, simulacao }) => {
  const combinedData = data.map((item, index) => ({
    ...item,
    simulacaoValor: simulacao[index] ? simulacao[index].valor : null,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={combinedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="valor" name="Real" fill="#8884d8" />
        {simulacao && simulacao.length > 0 && (
          <Bar dataKey="simulacaoValor" name="Simulação" fill="#82ca9d" />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
