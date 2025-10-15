
import React from 'react';
import { ChartData } from '@/components/complex/chartRenderer'; // Adjust the import path as needed
import { MultiBarChartComponent } from '@/components/complex/chartRenderer';
import { MultiLineChartComponent } from '@/components/complex/chartRenderer';
import { PieChartComponent } from '@/components/complex/chartRenderer';
import { AreaChartComponent } from '@/components/complex/chartRenderer';
// A simple ChartRenderer that selects a chart component based on the visualization type.
const ChartRenderer: React.FC<{ data: ChartData; onRegenerate?: () => void }> = ({ data, onRegenerate }) => {
    console.log("Here is the data", data);
    switch (data.visualization_type) {
        case 'pie':
            return <PieChartComponent data={data} onRegenerate={onRegenerate} />;
        case 'area':
            return <AreaChartComponent data={data} onRegenerate={onRegenerate} />;


        // For the other types, you could implement additional components.
        default:
            return (
                <div>
                    Chart type <strong>{data.visualization_type}</strong> not implemented yet.
                </div>
            );
    }
};

// Synthetically generated chart data (7 examples)
// (Note: this is a JavaScript object literal version of the JSON provided.)
const syntheticCharts: ChartData[] = [
    // Stacked Area Chart
    {
        visualization_type: "area",
        id: "chart-006",
        config: {
            title: "Enhanced Revenue Breakdown Over Time",
            metric_names: ["Data Analysis Skill", "Industry Benchmark", "Clous Benchmark"],
            xAxisKey: "month",
            is_stacked: true,
            filter_by: { region: "global" },
            group_by: ["month"],
            sort_by: { month: "asc" },
            special_handling: "cumulative",
            ui: {
                ProductRevenue: {
                    label: "Product Revenue",
                    color: "#2ECC71",
                    icon: undefined,
                },
                ServiceRevenue: {
                    label: "Service Revenue",
                    color: "#3498DB",
                    icon: undefined,
                },
                AdRevenue: {
                    label: "Ad Revenue",
                    color: "#E74C3C",
                    icon: undefined,
                }
            },
        },
        calculation_type: "sum",
        data: [
            { month: "2025-01", ProductRevenue: 10000, ServiceRevenue: 5000, AdRevenue: 2000, is_anomaly: false, anomaly_reason: "", is_predicted: false, is_benchmarked: true, confidence_interval: [9500, 10500] },
            { month: "2025-02", ProductRevenue: 12000, ServiceRevenue: 5500, AdRevenue: 2500, is_anomaly: false, anomaly_reason: "", is_predicted: true, is_benchmarked: true, confidence_interval: [11500, 12500] },
            { month: "2025-03", ProductRevenue: 11000, ServiceRevenue: 6000, AdRevenue: 2200, is_anomaly: true, anomaly_reason: "Seasonal dip", is_predicted: false, is_benchmarked: false, confidence_interval: [10500, 11500] },
            { month: "2025-04", ProductRevenue: 11500, ServiceRevenue: 5800, AdRevenue: 2300, is_anomaly: false, anomaly_reason: "", is_predicted: true, is_benchmarked: true, confidence_interval: [11200, 11800] }
        ],
        ai: {
            trend: {
                movement: "stable",
                amount: "N/A",
                time_series: "flat"
            },
            insights: "",
            action: "Monitor quarterly trends",
            data_quality: {
                level: "high",
                quality: "complete"
            }
        }
    },
];


const ChartTestComponent: React.FC = () => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {syntheticCharts.map((chart) => (
                <div key={chart.id} style={{ marginBottom: '2rem' }}>
                    <ChartRenderer data={chart} />
                </div>
            ))}
        </div>
    );
};

export default ChartTestComponent;
