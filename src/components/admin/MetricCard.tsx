import {
    ResponsiveContainer,
    XAxis,
    Tooltip,
    BarChart,
    Bar,
    Cell,
} from "recharts";

interface WeeklyData {
    week: string;
    value: number;
}

interface MetricChartProps {
    title: string;
    data: WeeklyData[];
}

const MetricChart = ({
    title,
    data,
}: MetricChartProps) => {
    return (
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold text-gray-600">{title}</p>
            </div>

            <ResponsiveContainer width="100%" height={150}>
                <BarChart data={data}>
                    <XAxis dataKey="week" className="text-sm" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip labelStyle={{ color: "#4F46E5" }} content={<CustomTooltip />} cursor={false} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {data.map((_, index) => (
                            <Cell key={index} fill={
                                index % 2 == 0 ? "#793A2E5C" : "#8F4B3D"
                            } />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

function CustomTooltip() {
    return (
        <div className="text-xl text-white">
            10
        </div>
    )
}
export default MetricChart;