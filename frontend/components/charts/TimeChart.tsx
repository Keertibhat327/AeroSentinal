"use client";

import { useStore } from "@/lib/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

export function TimeChart() {
  const { history } = useStore();

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="rgba(255,255,255,0.3)" 
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} 
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            domain={[0, 100]} 
            stroke="rgba(255,255,255,0.3)" 
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "rgba(10, 10, 10, 0.9)", 
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.5)"
            }} 
            itemStyle={{ color: "#fff" }}
          />
          <ReferenceLine y={50} stroke="#ef4444" strokeDasharray="3 3" opacity={0.5} />
          <ReferenceLine y={75} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.5} />
          <Line 
            type="monotone" 
            dataKey="engineScore" 
            name="Engine Health"
            stroke="#6366f1" 
            strokeWidth={3} 
            dot={false}
            activeDot={{ r: 6, fill: "#6366f1", stroke: "#fff" }}
            isAnimationActive={false}
          />
          <Line 
            type="monotone" 
            dataKey="ecsFouling" 
            name="ECS Fouling"
            stroke="#10b981" 
            strokeWidth={3} 
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
