import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  productivityData,
  taskStatusData,
  weeklyProgressData,
  teamActivityData,
} from "./data";

const grid = "oklch(1 0 0 / 0.06)";
const axis = "oklch(0.68 0.03 240)";

const tooltipStyle = {
  background: "oklch(0.19 0.02 210 / 0.95)",
  border: "1px solid oklch(1 0 0 / 0.1)",
  borderRadius: 12,
  fontSize: 12,
  color: "white",
  padding: "8px 12px",
  backdropFilter: "blur(20px)",
};

function ChartCard({
  title,
  subtitle,
  children,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl glass-strong p-5"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          {children as any}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function Charts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Productivity trend" subtitle="Tasks shipped per day" delay={0}>
        <LineChart data={productivityData}>
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.72 0.14 180)" />
              <stop offset="100%" stopColor="oklch(0.85 0.12 178)" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="day" stroke={axis} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis stroke={axis} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={28} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "oklch(0.72 0.14 180 / 0.3)" }} />
          <Line type="monotone" dataKey="prev" stroke="oklch(0.45 0.03 215)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGrad)"
            strokeWidth={3}
            dot={{ r: 3, fill: "oklch(0.72 0.14 180)" }}
            activeDot={{ r: 5 }}
            animationDuration={800}
          />
        </LineChart>
      </ChartCard>

      <ChartCard title="Task status" subtitle="Distribution across states" delay={0.05}>
        <PieChart>
          <Pie
            data={taskStatusData}
            dataKey="value"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            stroke="none"
            animationDuration={800}
          >
            {taskStatusData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 11, color: "oklch(0.68 0.03 240)" }}
          />
        </PieChart>
      </ChartCard>

      <ChartCard title="Weekly progress" subtitle="Planned vs shipped" delay={0.1}>
        <BarChart data={weeklyProgressData} barCategoryGap={16}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="week" stroke={axis} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis stroke={axis} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={28} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(1 0 0 / 0.03)" }} />
          <Bar dataKey="planned" fill="oklch(0.45 0.03 215)" radius={[6, 6, 0, 0]} animationDuration={800} />
          <Bar dataKey="shipped" fill="oklch(0.72 0.14 180)" radius={[6, 6, 0, 0]} animationDuration={800} />
        </BarChart>
      </ChartCard>

      <ChartCard title="Team activity" subtitle="Commits & reviews today" delay={0.15}>
        <AreaChart data={teamActivityData}>
          <defs>
            <linearGradient id="areaA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.14 180)" stopOpacity={0.6} />
              <stop offset="100%" stopColor="oklch(0.72 0.14 180)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="areaB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.12 178)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="oklch(0.85 0.12 178)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="hour" stroke={axis} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis stroke={axis} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={28} />
          <Tooltip contentStyle={tooltipStyle} />
          <Area type="monotone" dataKey="commits" stroke="oklch(0.72 0.14 180)" fill="url(#areaA)" strokeWidth={2} animationDuration={800} />
          <Area type="monotone" dataKey="reviews" stroke="oklch(0.85 0.12 178)" fill="url(#areaB)" strokeWidth={2} animationDuration={800} />
        </AreaChart>
      </ChartCard>
    </div>
  );
}
