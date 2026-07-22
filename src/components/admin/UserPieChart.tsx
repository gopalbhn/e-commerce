import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { PieChartData } from "../../lib/data.js"

const UserPieChart = ({ data }: { data: any }) => {
    return (
        <PieChart
            style={{ width: "100%", maxWidth: '500px', maxHeight: "60vh", aspectRatio: "1/1" }}
            responsive
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20
            }}
        >
            <Pie
                data={data}
                nameKey='name'
                dataKey='value'
                cx="40%"
                cy="50%"
                innerRadius={80}
                outerRadius={130}
                fill="#793A2E"
            >
                <Tooltip />
                {PieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
        </PieChart>
    )
}

export default UserPieChart