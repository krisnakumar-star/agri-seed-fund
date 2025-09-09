// src/pages/Investers.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

// Dummy data
const investmentData = [
  { name: "Farmland A", value: 40000 },
  { name: "Farmland B", value: 25000 },
  { name: "Farmland C", value: 35000 },
  { name: "Farmland D", value: 15000 },
];

const profitLossData = [
  { month: "Jan", profit: 4000, loss: 1000 },
  { month: "Feb", profit: 3000, loss: 2000 },
  { month: "Mar", profit: 5000, loss: 1500 },
  { month: "Apr", profit: 2500, loss: 500 },
  { month: "May", profit: 6000, loss: 1200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Investers: React.FC = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-10 text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📊 Investor Dashboard
      </motion.h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          {
            title: "Total Invested",
            value: "$115,000",
            icon: <Wallet className="w-8 h-8 text-blue-600" />,
          },
          {
            title: "Profit This Year",
            value: "$21,500",
            icon: <TrendingUp className="w-8 h-8 text-green-600" />,
          },
          {
            title: "Loss This Year",
            value: "$6,200",
            icon: <TrendingDown className="w-8 h-8 text-red-600" />,
          },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
          >
            {stat.icon}
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h3 className="text-xl font-bold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Current Investments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={investmentData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {investmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line Chart */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Profit & Loss Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={profitLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="loss"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow lg:col-span-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Profit vs Loss Comparison</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={profitLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="loss" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Tips Section */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-green-100 p-6 mt-10 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-3 text-green-700 flex items-center">
          💡 Investment Tips
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Diversify across different farmland types for better stability.</li>
          <li>Reinvest at least 20% of profits into upcoming projects.</li>
          <li>Track seasonal crop trends to maximize profit margins.</li>
          <li>Consider long-term sustainability for higher returns.</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Investers;
