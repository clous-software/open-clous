// "use client";
// import { format, isValid } from 'date-fns';
// import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { TrendingUp, TrendingDown } from "lucide-react";
// import {
//     Area,
//     AreaChart,
//     Bar,
//     BarChart,
//     CartesianGrid,
//     Cell,
//     Label,
//     Legend,
//     Line,
//     LineChart,
//     Pie,
//     PieChart,
//     Rectangle,
//     ResponsiveContainer,
//     Sankey,
//     Tooltip,
//     XAxis,
//     YAxis,
// } from "recharts";
// import {
//     ChartContainer,
//     ChartTooltip,
//     ChartTooltipContent,
// } from "@/components/ui/chart";

// import { MdOutlineLightbulb } from "react-icons/md";
// import { formatXAxis, formatLabel, formatResponseText } from "@/utils/formattingUtils";
// import { IoFilter, IoReloadOutline } from 'react-icons/io5';
// import { PiSealCheck, PiSealCheckFill } from 'react-icons/pi';
// import { getDataQualityColor } from '@/utils/calculation';
// import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
// import { TbLayoutAlignMiddle } from 'react-icons/tb';
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

// import FilterDropdown from '@/components/complex/FilterDropdown';
// import { FilterOption, SubFilterOption } from '@/types/props';

// import {
//     DEFAULT_CHART_COLOR,
//     getColorFromPalette,
//     generateColorPaletteForKeys,
//     DEFAULT_COLOR_PALETTE
// } from '@/types/chartColors';

// import { cn } from '@/lib/utils';

// import { IoShieldCheckmarkOutline, IoShieldOutline, IoShieldHalfOutline } from 'react-icons/io5';
// import { IoRefreshOutline } from 'react-icons/io5';


// import { ContentBlock } from "@/types/props";
// import ActionTooltip from '../actions/ActionTooltip';


// export interface ChartUIConfig {
//     label?: string; // Display label for the metric
//     color?: string; // Color for the metric (hex, CSS variable, etc.)
//     icon?: React.ComponentType; // Optional icon component
// }

// export interface ChartConfig {
//     title: string;
//     metric_names?: string[];
//     xAxisKey?: string;
//     nameKey?: string; // Added for pie charts to specify the name key
//     is_stacked?: boolean;
//     filter_by?: Record<string, any>;
//     group_by?: string[];
//     sort_by?: Record<string, any>;
//     special_handling?: string;
//     ui?: Record<string, ChartUIConfig>; // UI configuration mapped by metric name
//     query?: string;
// }

// export interface ChartDataPoint {
//     [key: string]: any;

//     id?: string;

//     /**
//      * Indicates if this data point is flagged as anomalous.
//      */
//     is_anomaly?: boolean;
//     /**
//      * Optional reasoning or additional info about the anomaly.
//      */
//     anomaly_reason?: string;
//     /**
//      * If this data point is predicted rather than actual.
//      */
//     is_predicted?: boolean;

//     /**
//      * If this data point is bechmarked rather than actual.
//      */
//     is_benchmarked?: boolean;
//     /**
//      * (Optional) Confidence interval, forecast details, etc.
//      */
//     confidence_interval?: [number, number];
// }

// export interface AIInsights {
//     trend: Trend;
//     insights: string;
//     action: string;
//     data_quality: DataQuality;
// }

// interface Trend {
//     movement: string;
//     amount: string;
//     time_series: string;
// }

// interface DataQuality {
//     level: string;
//     quality: string;
// }

// export interface SankeyNode {
//     id: string;
//     name: string;
//     value?: number;
// }

// export interface SankeyLink {
//     source: string;
//     target: string;
//     value: number;
// }

// export interface SankeyData {
//     nodes: SankeyNode[];
//     links: SankeyLink[];
// }

// export interface ChartData {
//     visualization_type: "bar" | "multiBar" | "line" | "multiLine" | "pie" | "area" | "sankey";
//     id: string;
//     config: ChartConfig;
//     calculation_type?: string;
//     data: ChartData["visualization_type"] extends "sankey" ? SankeyData : ChartDataPoint[];
//     ai?: AIInsights;
// }

// export interface DashboardData {
//     id?: string;
//     title: string;
//     description: string;
//     charts: ChartData[];
//     blocks?: ContentBlock[];
// }

// export interface CardChartData {
//     metric: number;
//     metric_name: string;
//     trend: Trend;
//     insights: string;
//     action: string;
//     data_quality: DataQuality;
// }


// // Define a hook for resize observation
// const useResizeObserver = (ref: React.RefObject<HTMLDivElement | null>) => {
//     const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

//     React.useEffect(() => {
//         if (!ref.current) return;

//         const observer = new ResizeObserver(entries => {
//             if (entries[0]) {
//                 const { width, height } = entries[0].contentRect;
//                 setDimensions({ width, height });
//             }
//         });

//         observer.observe(ref.current);

//         return () => {
//             observer.disconnect();
//         };
//     }, [ref]);

//     return dimensions;
// };

// // Custom X-axis tick component with ActionTooltip for truncated labels
// const CustomXAxisTick = (props: any) => {
//     const { x, y, payload, width, index, visibleTicksCount } = props;
//     const value = payload.value;
//     const textRef = React.useRef<SVGTextElement>(null);
//     const [isTruncated, setIsTruncated] = React.useState(false);
//     const [displayValue, setDisplayValue] = React.useState('');

//     // Format date values
//     const date = new Date(value);
//     const formattedValue = isValid(date)
//         ? format(date, 'MMM d, yyyy')
//         : String(value);

//     // Calculate available width for each tick
//     // We use a more conservative approach to ensure labels don't overlap
//     const estimatedAvailableWidth = props.width ? (props.width / (props.visibleTicksCount || 5)) * 0.8 : 100;

//     // Measure and truncate text if necessary
//     React.useEffect(() => {
//         if (textRef.current) {
//             try {
//                 const textWidth = textRef.current.getComputedTextLength();
//                 // If text is too long for the available space
//                 if (textWidth > estimatedAvailableWidth) {
//                     setIsTruncated(true);
//                     // Calculate how many characters we can fit
//                     const charWidth = textWidth / formattedValue.length;
//                     const charsToShow = Math.floor(estimatedAvailableWidth / charWidth) - 3; // -3 for the ellipsis
//                     setDisplayValue(`${formattedValue.substring(0, Math.max(charsToShow, 5))}...`);
//                 } else {
//                     setIsTruncated(false);
//                     setDisplayValue(formattedValue);
//                 }
//             } catch (e) {
//                 // Fallback if getComputedTextLength fails
//                 setDisplayValue(formattedValue);
//             }
//         } else {
//             setDisplayValue(formattedValue);
//         }
//     }, [formattedValue, estimatedAvailableWidth]);

//     return (
//         <g transform={`translate(${x},${y})`}>
//             {isTruncated ? (
//                 <ActionTooltip label={formattedValue} side="top" align="center">
//                     <g>
//                         <text
//                             ref={textRef}
//                             x={0}
//                             y={0}
//                             dy={16}
//                             textAnchor="middle"
//                             fill="#666"
//                             fontSize={12}
//                         >
//                             {displayValue}
//                         </text>
//                     </g>
//                 </ActionTooltip>
//             ) : (
//                 <text
//                     ref={textRef}
//                     x={0}
//                     y={0}
//                     dy={16}
//                     textAnchor="middle"
//                     fill="#666"
//                     fontSize={12}
//                 >
//                     {displayValue || formattedValue}
//                 </text>
//             )}
//         </g>
//     );
// };

// interface ChartCardHeaderProps {
//     title: string;
//     ai?: {
//         data_quality?: {
//             level: string;
//             quality: string;
//         };
//         trend?: {
//             movement?: string;
//             amount?: string;
//             time_series?: string;
//         };
//     };
//     onRegenerate?: () => void;
//     confidenceMode?: "neutral" | "low" | "high";
//     setConfidenceMode?: (mode: "neutral" | "low" | "high") => void;

//     chartData?: ChartData;
//     onFilterChange?: (selectedFilters: string[]) => void;
//     onGroupChange?: (selectedGroup: string) => void;
//     onSubFilterChange?: (subFilters: SubFilterOption[]) => void;
//     onChartTypeChange?: (chartType: string) => void;
// }

// function ChartCardHeader({ title, ai, onRegenerate, confidenceMode, setConfidenceMode, chartData, onFilterChange, onGroupChange, onSubFilterChange, onChartTypeChange }: ChartCardHeaderProps) {
//     console.log("Here's the title right now!:", title);
//     const titleRef = React.useRef<HTMLDivElement>(null);
//     const [isTitleTruncated, setIsTitleTruncated] = React.useState(false);

//     // Check if title is truncated based on width
//     React.useEffect(() => {
//         if (titleRef.current) {
//             const element = titleRef.current;
//             setIsTitleTruncated(element.scrollWidth > element.clientWidth);
//         }
//     }, [title]);

//     // Figure out the primary numeric key
//     const primaryMetricKey = React.useMemo(() => {
//         if (chartData?.config?.metric_names && chartData.config.metric_names.length > 0) {
//             return chartData.config.metric_names[0];
//         }
//         return "value"; // fallback
//     }, [chartData?.config?.metric_names]);

//     // Determine if chart is multi-metric
//     const isMultiMetric = React.useMemo(() => {
//         return chartData?.config?.metric_names && chartData.config.metric_names.length > 1;
//     }, [chartData?.config?.metric_names]);

//     // Compute total or average of that numeric key
//     const { total, average } = React.useMemo(() => {
//         const data = chartData?.data ?? [];
//         let sum = 0;
//         data.forEach((dp) => {
//             // First try to get the value using primaryMetricKey
//             let numericValue = typeof dp[primaryMetricKey] === "number" ? dp[primaryMetricKey] : null;

//             // If that fails and primaryMetricKey isn't "value", try using "value" directly
//             if (numericValue === null && primaryMetricKey !== "value" && typeof dp["value"] === "number") {
//                 numericValue = dp["value"];
//             }

//             // Default to 0 if no valid value found
//             sum += numericValue ?? 0;
//         });
//         if (data.length === 0) {
//             return { total: 0, average: 0 };
//         }
//         return { total: sum.toFixed(2), average: (sum / data.length).toFixed(2) };
//     }, [chartData?.data, primaryMetricKey]);

//     // Determine which value to display based on calculation_type
//     const displayValue = chartData?.calculation_type === 'average' ? average : total;

//     // Local state for managing filter selections.
//     const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
//     const [subFilters, setSubFilters] = useState<SubFilterOption[]>([]);
//     const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);

//     // Generate subfilters when filters or chart data changes
//     React.useEffect(() => {
//         if (!chartData || !chartData.data || chartData.data.length === 0 || selectedFilters.length === 0) {
//             setSubFilters([]);
//             return;
//         }

//         // Generate subfilters for each selected filter
//         const newSubFilters: SubFilterOption[] = [];

//         selectedFilters.forEach(filterType => {
//             // Get unique values for this filter type
//             const uniqueValues = new Set<string>();
//             chartData.data.forEach(dataPoint => {
//                 if (dataPoint[filterType] !== undefined && dataPoint[filterType] !== null) {
//                     uniqueValues.add(String(dataPoint[filterType]));
//                 }
//             });

//             // Create subfilter options for each unique value
//             uniqueValues.forEach(value => {
//                 // Check if this subfilter already exists to preserve its checked state
//                 const existingSubFilter = subFilters.find(
//                     sf => sf.type === filterType && sf.value === value
//                 );

//                 newSubFilters.push({
//                     type: filterType,
//                     value: value,
//                     label: value.charAt(0).toUpperCase() + value.slice(1),
//                     checked: existingSubFilter ? existingSubFilter.checked : false
//                 });
//             });
//         });

//         setSubFilters(newSubFilters);
//     }, [selectedFilters, chartData]);

//     // Derive filter and group options from the chart data (if provided).
//     let filterOptions: FilterOption[] = [];
//     let groupOptions: FilterOption[] = [];
//     if (chartData && chartData.data && chartData.data.length > 0) {
//         const firstDataPoint = chartData.data[0];
//         // Determine the primary key (the representative value)
//         const primaryKey =
//             chartData.config.metric_names && chartData.config.metric_names.length > 0
//                 ? chartData.config.metric_names[0]
//                 : "value";
//         // Exclude keys that should not be used for filtering/grouping.
//         const excludeKeys = new Set([
//             primaryKey,
//             chartData.config.xAxisKey,
//             "is_anomaly",
//             "anomaly_reason",
//             "is_predicted",
//             "confidence_interval",
//             "value",  // Exclude 'value' as requested
//             "type",   // Exclude 'type' as requested
//             "subtype" // Exclude 'subtype' as requested
//         ]);
//         const availableKeys = Object.keys(firstDataPoint).filter(
//             (key) => !excludeKeys.has(key)
//         );
//         // Map the remaining keys to FilterOption format.
//         filterOptions = availableKeys.map((key) => ({
//             value: key,
//             label: key.charAt(0).toUpperCase() + key.slice(1),
//         }));
//         // For grouping, you might want the same options.
//         groupOptions = filterOptions;
//     }


//     // Handlers to update local state and notify parent components.
//     const handleLocalFilterChange = (filters: string[]) => {
//         // Find filters that were removed
//         const removedFilters = selectedFilters.filter(f => !filters.includes(f));

//         // Update selected filters
//         setSelectedFilters(filters);

//         // If filters were removed, also remove their subfilters
//         if (removedFilters.length > 0) {
//             const updatedSubFilters = subFilters.filter(sf => !removedFilters.includes(sf.type));
//             setSubFilters(updatedSubFilters);
//         }

//         if (onFilterChange) {
//             console.log("Calling onFilterChange with filters:", filters);
//             onFilterChange(filters);
//         }
//     };

//     const handleLocalSubFilterChange = (subFilters: SubFilterOption[]) => {
//         // Update local state with the new subfilters
//         setSubFilters(subFilters);

//         if (onSubFilterChange) {
//             console.log("Calling onSubFilterChange with subFilters:", subFilters);
//             onSubFilterChange(subFilters);
//         }
//     };

//     const handleLocalGroupChange = (group: string) => {
//         // Update local state with the new group
//         setSelectedGroup(group);

//         if (onGroupChange) {
//             console.log("Calling onGroupChange with group:", group);
//             onGroupChange(group);
//         }
//     };

//     const handleLocalChartTypeChange = (chartType: string) => {
//         if (onChartTypeChange) {
//             console.log("Calling onChartTypeChange with chartType:", chartType);
//             onChartTypeChange(chartType);
//         }
//     };

//     console.log("Here's the filterOptions right now inside ChartCardHeader:", filterOptions);
//     console.log("Here's the groupOptions right now inside ChartCardHeader:", groupOptions);
//     console.log("Here's the selectedFilters right now inside ChartCardHeader:", selectedFilters);
//     console.log("Here's the subFilters right now inside ChartCardHeader:", subFilters);
//     console.log("Here's the selectedGroup right now inside ChartCardHeader:", selectedGroup);
//     console.log("Current chart type:", chartData?.visualization_type);
//     console.log("Is multi-metric:", isMultiMetric);

//     return (
//         <CardHeader className="px-4 pt-3 pb-2 flex justify-between items-start relative">
//             <CardTitle className="flex flex-col max-w-[70%]">
//                 {isTitleTruncated ? (
//                     <ActionTooltip label={title} align="start" side="bottom">
//                         <div
//                             ref={titleRef}
//                             className="flex items-center gap-2 truncate text-sm font-medium"
//                         >
//                             {title ? title : "Untitled"}
//                         </div>
//                     </ActionTooltip>
//                 ) : (
//                     <div className="flex items-center gap-2 text-sm font-medium">
//                         {title ? title : "Untitled"}
//                     </div>
//                 )}
//                 <div className="flex items-end gap-3">
//                     {displayValue && <p className="text-4xl font-bold">{displayValue}</p>}
//                     {ai?.trend && ai.trend.movement && (
//                         <div className="flex gap-1 font-medium leading-none text-center items-center mb-0.5">
//                             {ai.trend.movement === 'up' ? (
//                                 <p className="text-sm text-gray-foreground">+</p>
//                             ) : ai.trend.movement === 'down' ? (
//                                 <p className="text-sm text-gray-foreground">-</p>
//                             ) : (
//                                 <p className="text-sm text-gray-foreground">~</p>
//                             )}
//                             {ai.trend.amount && <p className="text-sm text-gray-foreground">{ai.trend.amount}</p>}
//                             {ai.trend.time_series && <p className="text-sm text-gray-foreground">{ai.trend.time_series}</p>}
//                         </div>
//                     )}
//                 </div>
//             </CardTitle>

//             <div className="flex items-center gap-2">
//                 {/* Data Quality Indicator */}
//                 {ai?.data_quality && (
//                     <ActionTooltip label={ai?.data_quality?.quality ?? "No data quality"} side="bottom" align="end"
//                         tag={<p className={`text-sm rounded-full px-1 py-0.5 ${getDataQualityColor(
//                             ai?.data_quality?.level ?? "moderate",
//                             "text"
//                         )}`}>{ai?.data_quality?.level}</p>}>
//                         <div className={`flex items-center gap-2 ml-auto rounded-full px-2 py-1 ${getDataQualityColor(
//                             ai?.data_quality?.level ?? "moderate",
//                             "bg"
//                         )}`}>
//                             <PiSealCheckFill
//                                 className={`w-3.5 h-3.5 text-gray-foreground ${getDataQualityColor(
//                                     ai?.data_quality?.level ?? "moderate",
//                                     "text"
//                                 )}`}
//                             />

//                         </div>
//                     </ActionTooltip>
//                 )}

//                 {/* Confidence Mode Toggle */}
//                 {/* {confidenceMode && setConfidenceMode && (
//                     <ActionTooltip
//                         label={`Confidence: ${confidenceMode}`}
//                         side="top"
//                     >
//                         <Button
//                             variant="secondary"
//                             size="sm"
//                             className="w-6 h-6"
//                             onClick={() => {
//                                 const modes: ("neutral" | "low" | "high")[] = [
//                                     "neutral",
//                                     "low",
//                                     "high",
//                                 ];
//                                 const currentIndex = modes.indexOf(confidenceMode);
//                                 const nextIndex = (currentIndex + 1) % modes.length;
//                                 setConfidenceMode(modes[nextIndex]);
//                             }}
//                         >
//                             {confidenceMode === "high" ? (
//                                 <IoShieldCheckmarkOutline className="w-4 h-4" />
//                             ) : confidenceMode === "low" ? (
//                                 <IoShieldOutline className="w-4 h-4" />
//                             ) : (
//                                 <IoShieldHalfOutline className="w-4 h-4" />
//                             )}
//                         </Button>
//                     </ActionTooltip>
//                 )} */}

//                 {/* Filter Dropdown */}
//                 {chartData && (
//                     <FilterDropdown
//                         tableType="dashboard"
//                         filterOptions={filterOptions}
//                         groupOptions={groupOptions}
//                         onFilterChange={handleLocalFilterChange}
//                         onGroupChange={handleLocalGroupChange}
//                         onSubFilterChange={handleLocalSubFilterChange}
//                         selectedFilters={selectedFilters}
//                         selectedGroup={selectedGroup}
//                         availableSubFilters={subFilters}
//                         icon={true}
//                         chartType={chartData.visualization_type}
//                         onChartTypeChange={handleLocalChartTypeChange}
//                         isMultiMetric={isMultiMetric}
//                     />
//                 )}

//                 {/* Regenerate Button */}
//                 {/* {onRegenerate && (
//                     <Button
//                         variant="secondary"
//                         size="sm"
//                         className="w-6 h-6"
//                         onClick={onRegenerate}
//                     >
//                         <IoRefreshOutline className="w-4 h-4" />
//                     </Button>
//                 )} */}
//             </div>
//         </CardHeader>
//     );
// }

// interface ChartCardFooterProps {
//     ai?: {
//         trend?: {
//             movement: string;
//             amount?: string;
//             time_series?: string;
//         };
//         insights?: string;
//         action?: string;
//     };
// }

// function ChartCardFooter({ ai }: ChartCardFooterProps) {
//     return (
//         <CardFooter className="flex-col gap-2 text-sm px-8 py-3">

//             {ai?.insights && (

//                 <div className="flex gap-2 font-medium leading-none text-center mx-auto">
//                     {formatResponseText(ai.insights, "smallest")}
//                 </div>
//             )}
//         </CardFooter>
//     );
// }

// export const getChartUIConfig = (data: ChartData): Record<string, ChartUIConfig> => {
//     if (!data.data || !data.data.length) return {};

//     // If metric_names are provided, iterate over them.
//     if (data.config.metric_names && data.config.metric_names.length > 0) {
//         // Generate a color palette for all metrics
//         const autoColors = generateColorPaletteForKeys(
//             data.config.metric_names,
//             data.visualization_type === "pie" // Use extended palette for pie charts
//         );

//         return data.config.metric_names.reduce((acc, metric, index) => {
//             // Check if any data point contains a valid number for the metric.
//             const hasMetric = data.data.some(dp => typeof dp[metric] === "number");

//             // If the metric isn't present but "value" exists, use "value" as fallback.
//             const keyToUse = hasMetric
//                 ? metric
//                 : (typeof data.data[0].value === "number" ? "value" : metric);

//             // Get color from UI config if available, otherwise use auto-generated color
//             const color = data.config.ui && data.config.ui[metric] && data.config.ui[metric].color
//                 ? data.config.ui[metric].color
//                 : autoColors[metric] || getColorFromPalette(index);

//             // Prevent duplicate keys if multiple metrics fallback to "value".
//             if (acc[keyToUse]) {
//                 acc[`${keyToUse}_${index}`] = {
//                     label: data.config.ui && data.config.ui[metric]
//                         ? data.config.ui[metric].label
//                         : metric.replace(/_/g, " ").toUpperCase(),
//                     color: color,
//                 };
//             } else {
//                 acc[keyToUse] = {
//                     label: data.config.ui && data.config.ui[metric]
//                         ? data.config.ui[metric].label
//                         : metric.replace(/_/g, " ").toUpperCase(),
//                     color: color,
//                 };
//             }
//             return acc;
//         }, {} as Record<string, ChartUIConfig>);
//     }

//     // Fallback: If no metric_names, analyze the first data point for numeric keys.
//     const ignoreKeys = new Set([
//         data.config.xAxisKey,
//         "is_anomaly",
//         "anomaly_reason",
//         "is_predicted",
//         "confidence_interval"
//     ]);
//     const firstDataPoint = data.data[0];
//     let dataKeys = Object.keys(firstDataPoint).filter(key =>
//         !ignoreKeys.has(key) && typeof firstDataPoint[key] === "number"
//     );

//     // If no numeric keys were found but "value" exists, fallback to "value".
//     if (dataKeys.length === 0 && typeof firstDataPoint.value === "number") {
//         dataKeys = ["value"];
//     }

//     // Generate a color palette for all data keys
//     const autoColors = generateColorPaletteForKeys(
//         dataKeys,
//         data.visualization_type === "pie" // Use extended palette for pie charts
//     );

//     return dataKeys.reduce((acc, key, index) => {
//         // Get color from UI config if available, otherwise use auto-generated color
//         const color = data.config.ui && data.config.ui[key] && data.config.ui[key].color
//             ? data.config.ui[key].color
//             : autoColors[key] || getColorFromPalette(index);

//         if (data.config.ui && data.config.ui[key]) {
//             acc[key] = {
//                 label: data.config.ui[key].label,
//                 color: color,
//             };
//         } else {
//             acc[key] = {
//                 label: key.replace(/_/g, " ").toUpperCase(),
//                 color: color,
//             };
//         }
//         return acc;
//     }, {} as Record<string, ChartUIConfig>);
// };

// export function MultiBarChartComponent({ data, onRegenerate, size }: { data: ChartData, onRegenerate?: () => void, size?: "small" | "medium" | "large" }) {
//     const uiConfig = getChartUIConfig(data);
//     const dataKeys = Object.keys(uiConfig ?? {});

//     // If no xAxisKey is provided, use the first string key (e.g., "label")
//     const effectiveXAxisKey = data.config.xAxisKey ||
//         Object.keys(data.data[0]).find(key => typeof data.data[0][key] === "string") || "";

//     // Generate colors for each data key using our new palette
//     const colorMap = React.useMemo(() => {
//         return generateColorPaletteForKeys(dataKeys);
//     }, [dataKeys]);

//     // Custom shape for bars to handle predictions and benchmarks
//     const renderBar = (props: any) => {
//         const { x, y, width, height, fill, payload } = props;

//         // Determine styling based on data point type
//         let barFill = fill;
//         let barStroke = fill;
//         let barStrokeWidth = 0;
//         let barStrokeDasharray = "none";
//         let barOpacity = 1;

//         // Handle cases where a data point is both predicted and benchmarked
//         if (payload.is_predicted && payload.is_benchmarked) {
//             barStroke = fill;
//             barStrokeWidth = 2;
//             barStrokeDasharray = "3 3";
//             barOpacity = 0.7; // Slightly more visible than regular benchmark
//         } else if (payload.is_predicted) {
//             barStroke = fill;
//             barStrokeWidth = 2;
//             barStrokeDasharray = "3 3";
//         } else if (payload.is_benchmarked) {
//             barOpacity = 0.7;
//         }

//         return (
//             <rect
//                 x={x}
//                 y={y}
//                 width={width}
//                 height={height}
//                 fill={barFill}
//                 stroke={barStroke}
//                 strokeWidth={barStrokeWidth}
//                 strokeDasharray={barStrokeDasharray}
//                 opacity={barOpacity}
//                 rx={8}
//                 ry={8}
//             />
//         );
//     };

//     return (

//         <ChartContainer config={uiConfig}>
//             <BarChart accessibilityLayer data={data.data}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis
//                     dataKey={effectiveXAxisKey}
//                     tickLine={false}
//                     tickMargin={10}
//                     axisLine={false}
//                     tick={<CustomXAxisTick />}
//                 />
//                 <YAxis
//                     tickLine={false}
//                     tickMargin={0}
//                     axisLine={false}
//                 />
//                 <ChartTooltip
//                     cursor={false}
//                     // @ts-ignore - xAxisKey is used in the component but not in the type definition
//                     content={<ChartTooltipContent xAxisKey={effectiveXAxisKey} />}
//                 />
//                 {/* <Legend /> */}
//                 {dataKeys.map((key, index) => (
//                     <Bar
//                         key={key}
//                         dataKey={key}
//                         name={uiConfig[key]?.label || key}
//                         fill={colorMap[key]}
//                         radius={8}
//                         shape={renderBar}
//                     />
//                 ))}
//             </BarChart>
//         </ChartContainer>
//     );
// }

// export function MultiLineChartComponent({ data, onRegenerate, size }: { data: ChartData, onRegenerate?: () => void, size?: "small" | "medium" | "large" }) {
//     const uiConfig = getChartUIConfig(data);
//     const dataKeys = Object.keys(uiConfig ?? {});

//     // If no xAxisKey is provided, use the first string key (e.g., "date")
//     const effectiveXAxisKey = data.config.xAxisKey ||
//         Object.keys(data.data[0]).find(key => typeof data.data[0][key] === "string") || "";

//     // Generate colors for each data key using our new palette
//     const colorMap = React.useMemo(() => {
//         return generateColorPaletteForKeys(dataKeys);
//     }, [dataKeys]);

//     // Calculate trend if not provided using useMemo instead of mutating data
//     const chartDataWithTrend = React.useMemo(() => {
//         if (data.ai && (!data.ai.trend || !data.ai.trend.movement || !data.ai.trend.amount)) {
//             // For multi-line charts, use the first metric for trend calculation
//             const valueKey = dataKeys[0];
//             const trend = calculateTrend(data.data, valueKey);
//             data.ai = {
//                 ...data.ai,
//                 trend
//             };
//         }
//         return data;
//     }, [data, dataKeys]);

//     // Custom dot component for line chart
//     const renderDot = (props: any) => {
//         const { cx, cy, payload, stroke, dataKey } = props;

//         // Skip rendering if coordinates are invalid or data point doesn't have a value
//         if (!cx || !cy || isNaN(cx) || isNaN(cy) ||
//             payload[dataKey] === undefined || payload[dataKey] === null) {
//             return <g></g>; // Return empty group instead of null
//         }

//         // Default styling
//         let dotFill = "#fff";
//         let dotStroke = stroke;
//         let dotStrokeWidth = 2;
//         let dotRadius = 4;

//         // Styling for predicted points
//         if (payload.is_predicted) {
//             return (
//                 <svg x={cx - 6} y={cy - 6} width={12} height={12} fill="none" viewBox="0 0 12 12">
//                     <circle cx="6" cy="6" r="5" stroke={dotStroke} strokeWidth="2" strokeDasharray="2 2" fill={dotFill} />
//                 </svg>
//             );
//         }

//         // Styling for anomaly points
//         if (payload.is_anomaly) {
//             dotFill = colorMap[dataKey];
//             dotStroke = colorMap[dataKey]; // Red color for anomalies
//             dotStrokeWidth = 2;
//             dotRadius = 6; // Slightly larger
//         }

//         return (
//             <circle
//                 cx={cx}
//                 cy={cy}
//                 r={dotRadius}
//                 stroke={dotStroke}
//                 strokeWidth={dotStrokeWidth}
//                 fill={dotFill}
//             />
//         );
//     };

//     return (
//         <ChartContainer config={uiConfig}>
//             <LineChart accessibilityLayer data={data.data}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis
//                     dataKey={effectiveXAxisKey}
//                     tickLine={false}
//                     tickMargin={10}
//                     axisLine={false}
//                     tick={<CustomXAxisTick />}
//                 />
//                 <YAxis
//                     tickLine={false}
//                     tickMargin={0}
//                     axisLine={false}
//                 />
//                 <ChartTooltip
//                     cursor={false}
//                     // @ts-ignore - xAxisKey is used in the component but not in the type definition
//                     content={<ChartTooltipContent xAxisKey={effectiveXAxisKey} />}
//                 />
//                 {/* <Legend /> */}
//                 {dataKeys.map((key) => (
//                     <Line
//                         key={key}
//                         type="monotone"
//                         dataKey={key}
//                         name={uiConfig[key]?.label || key}
//                         stroke={colorMap[key]}
//                         strokeWidth={2}
//                         dot={renderDot}
//                         activeDot={{ r: 6, strokeWidth: 2 }}
//                         isAnimationActive={true}
//                         connectNulls={true}
//                     />
//                 ))}
//             </LineChart>
//         </ChartContainer>
//     );
// }

// export function PieChartComponent({ data, onRegenerate, size }: { data: ChartData, onRegenerate?: () => void, size?: "small" | "medium" | "large" }) {
//     const uiConfig = getChartUIConfig(data);
//     const dataKey = Object.keys(uiConfig ?? {})[0];

//     // If no xAxisKey is provided, use the first string key (e.g., "label")
//     // If a nameKey is explicitly set in the config, use that instead
//     const effectiveXAxisKey = data.config.nameKey || data.config.xAxisKey ||
//         Object.keys(data.data[0]).find(key => typeof data.data[0][key] === "string") || "";

//     // Generate colors for each slice using our new palette
//     const pieColors = React.useMemo(() => {
//         return data.data.map((_, index) => getColorFromPalette(index));
//     }, [data.data]);

//     // Calculate trend if not provided using useMemo instead of mutating data
//     const chartDataWithTrend = React.useMemo(() => {
//         if (data.ai && (!data.ai.trend || !data.ai.trend.movement || !data.ai.trend.amount)) {
//             const trend = calculateTrend(data.data, dataKey);
//             data.ai = {
//                 ...data.ai,
//                 trend
//             };
//         }
//         return data;
//     }, [data, dataKey]);

//     // Calculate total and average for display
//     const { total, average } = React.useMemo(() => {
//         const sum = data.data.reduce((acc, item) => acc + (item[dataKey] || 0), 0);
//         const avg = data.data.length > 0 ? sum / data.data.length : 0;
//         return { total: sum, average: avg };
//     }, [data.data, dataKey]);

//     // Determine which value to display based on calculation_type
//     const displayValue = data.calculation_type === 'average' ? average : total;

//     // Get metric name for display
//     const metricName = React.useMemo(() => {
//         // Try to get the metric name from config
//         if (data.config.metric_names && data.config.metric_names.length > 0) {
//             return data.config.metric_names[0];
//         }

//         // Otherwise use the dataKey or a default
//         return uiConfig[dataKey]?.label || dataKey || 'Value';
//     }, [data.config.metric_names, dataKey, uiConfig]);


//     return (
//         <ChartContainer config={uiConfig}>
//             <PieChart>
//                 <Pie
//                     data={data.data}
//                     dataKey={dataKey}
//                     nameKey={effectiveXAxisKey}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     // label={renderCustomizedLabel}
//                     outerRadius="90%"
//                     innerRadius="60%"

//                     fill="#F26C21"
//                 >
//                     {data.data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={pieColors[index]} />
//                     ))}
//                     <Label
//                         content={({ viewBox }) => {
//                             if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                                 return (
//                                     <text
//                                         x={viewBox.cx}
//                                         y={viewBox.cy}
//                                         textAnchor="middle"
//                                         dominantBaseline="middle"
//                                     >
//                                         <tspan
//                                             x={viewBox.cx}
//                                             y={viewBox.cy}
//                                             className="fill-foreground text-4xl font-bold whitespace-nowrap"
//                                         >
//                                             {displayValue.toLocaleString()}
//                                         </tspan>
//                                         <tspan
//                                             x={viewBox.cx}
//                                             y={(viewBox.cy || 0) + 24}
//                                             className="fill-muted-foreground text-xs"
//                                         >
//                                             {data.calculation_type === 'average' ? `Average ${metricName}` : `Total ${metricName}`}
//                                         </tspan>
//                                     </text>
//                                 );
//                             }
//                             return null;
//                         }}
//                     />
//                 </Pie>
//                 <ChartTooltip
//                     content={
//                         // @ts-ignore - xAxisKey is used in the component but not in the type definition
//                         <ChartTooltipContent
//                             hideLabel
//                             xAxisKey={effectiveXAxisKey}
//                             formatter={(value) =>
//                                 `${String(value).slice(0, 5)} (${((Number(value) / total) * 100).toFixed(1)}%)`
//                             }
//                         />
//                     }
//                 />
//                 {/* <Legend /> */}
//             </PieChart>
//         </ChartContainer>
//     );
// }

// export function AreaChartComponent({
//     data,
//     stacked,
//     onRegenerate,
//     size
// }: {
//     data: ChartData;
//     stacked?: boolean;
//     onRegenerate?: () => void;
//     size?: "small" | "medium" | "large";
// }) {
//     const uiConfig = getChartUIConfig(data);
//     const dataKeys = Object.keys(uiConfig ?? {});

//     // If no xAxisKey is provided, use the first string key (e.g., "date")
//     const effectiveXAxisKey = data.config.xAxisKey ||
//         Object.keys(data.data[0]).find(key => typeof data.data[0][key] === "string") || "";

//     // Generate colors for each data key using our new palette
//     const colorMap = React.useMemo(() => {
//         return generateColorPaletteForKeys(dataKeys);
//     }, [dataKeys]);

//     // Calculate trend if not provided using useMemo instead of mutating data
//     const chartDataWithTrend = React.useMemo(() => {
//         if (data.ai && (!data.ai.trend || !data.ai.trend.movement || !data.ai.trend.amount)) {
//             // For area charts, use the first metric for trend calculation
//             const valueKey = dataKeys[0];
//             const trend = calculateTrend(data.data, valueKey);
//             data.ai = {
//                 ...data.ai,
//                 trend
//             };
//         }
//         return data;
//     }, [data, dataKeys]);

//     return (

//         <ChartContainer config={uiConfig}>
//             <AreaChart accessibilityLayer data={data.data}>
//                 <CartesianGrid vertical={false} />
//                 <XAxis
//                     dataKey={effectiveXAxisKey}
//                     tickLine={false}
//                     tickMargin={10}
//                     axisLine={false}
//                     tick={<CustomXAxisTick />}
//                 />
//                 <YAxis
//                     tickLine={false}
//                     tickMargin={0}
//                     axisLine={false}
//                 />
//                 <ChartTooltip
//                     cursor={false}
//                     content={<ChartTooltipContent xAxisKey={effectiveXAxisKey} />}
//                 />
//                 {/* <Legend /> */}
//                 {dataKeys.map((key) => (
//                     <Area
//                         key={key}
//                         type="monotone"
//                         dataKey={key}
//                         name={uiConfig[key]?.label || key}
//                         stroke={colorMap[key]}
//                         fill={colorMap[key]}
//                         fillOpacity={0.3}
//                         stackId={stacked ? "stack" : undefined}
//                         isAnimationActive={true}
//                         connectNulls={true}
//                     />
//                 ))}
//             </AreaChart>
//         </ChartContainer>
//     );
// }

// // Responsive chart wrapper component
// export function ResponsiveChartWrapper({
//     data,
//     onRegenerate,
//     insightsLoading,
// }: {
//     data: ChartData;
//     onRegenerate?: () => void;
//     insightsLoading: boolean;
// }) {
//     const containerRef = React.useRef<HTMLDivElement>(null);
//     const { width, height } = useResizeObserver(containerRef);

//     // Define breakpoints for different chart types
//     const isSmall = width < 400 || height < 250;
//     const isSuperSmall = width < 200 || height < 150;

//     console.log('data inside the ResponsiveChartWrapper function inside chartRenderer.tsx', isSmall, isSuperSmall);

//     // Render the full chart for larger containers
//     return (
//         <div ref={containerRef} className="w-full h-full relative">
//             {insightsLoading && (
//                 <div className="absolute top-2 right-2 z-10 flex items-center gap-2 text-xs bg-background/80 p-1 rounded-md">
//                     <div className="animate-spin w-3 h-3 border-2 border-primary border-t-transparent rounded-full"></div>
//                     <span>Updating insights...</span>
//                 </div>
//             )}
//             {
//                 // Otherwise, render the appropriate chart
//                 renderChart(data, onRegenerate, isSmall ? "small" : "medium")
//             }
//         </div>
//     );
// }

// // Helper function to render the appropriate chart based on visualization_type
// function renderChart(data: ChartData, onRegenerate?: () => void, size?: "small" | "medium" | "large") {
//     // Ensure data has trend information
//     let chartDataWithTrend = data;
//     if (data.ai && !data.ai.trend) {
//         // Find the appropriate value key
//         const valueKey = data.config.metric_names && data.config.metric_names.length > 0
//             ? data.config.metric_names[0]
//             : (Object.keys(data.data[0]).find(key =>
//                 typeof data.data[0][key] === 'number' &&
//                 !['is_anomaly', 'anomaly_reason', 'is_predicted', 'confidence_interval'].includes(key)
//             ) || 'value');

//         const trend = calculateTrend(data.data, valueKey);
//         chartDataWithTrend = {
//             ...data,
//             ai: {
//                 ...data.ai,
//                 trend
//             }
//         };
//     }

//     // Determine confidence mode based on predicted data
//     const hasPredictedData = Array.isArray(chartDataWithTrend.data) && chartDataWithTrend.data.some((item: any) => item.is_predicted);
//     const confidenceMode = hasPredictedData ? "high" : "neutral";

//     console.log('data inside the renderChart function inside chartRenderer.tsx', chartDataWithTrend);

//     switch (chartDataWithTrend.visualization_type) {
//         case "pie":
//             return <PieChartComponent data={chartDataWithTrend} onRegenerate={onRegenerate} size={size} />;
//         case "area":
//             return <AreaChartComponent
//                 data={chartDataWithTrend}
//                 stacked={chartDataWithTrend.config?.is_stacked}
//                 onRegenerate={onRegenerate}
//                 size={size}
//             />;
//         default:
//             return <div>Unsupported chart type: {chartDataWithTrend.visualization_type}</div>;
//     }
// }

// export default function ChartRenderer({
//     data,
//     onRegenerate,
// }: {
//     data: ChartData;
//     onRegenerate?: () => void;
// }) {


//     // State for chart data with potential modifications
//     const [chartData, setChartData] = useState<ChartData>(data);

//     // Update chartData when data prop changes
//     useEffect(() => {
//         setChartData(data);
//     }, [data]);

//     // Process insights data to update chart data
//     // Derive processedData from chartData and insights.
//     const processedData = useMemo(() => {
//         // For now, just return a copy of the chart data
//         return JSON.parse(JSON.stringify(chartData));
//     }, [chartData]);

//     // State for confidence mode
//     const [confidenceMode, setConfidenceMode] = useState<"neutral" | "low" | "high">("neutral");

//     // State for filtered data
//     const [filteredData, setFilteredData] = useState<ChartData>(processedData);

//     // State for tracking selected filters and groups
//     const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
//     const [selectedSubFilters, setSelectedSubFilters] = useState<SubFilterOption[]>([]);
//     const [selectedGroup, setSelectedGroup] = useState<string | undefined>(undefined);

//     // Update filtered data when processed data changes
//     useEffect(() => {
//         setFilteredData(processedData);
//     }, [processedData]);

//     // Handle filter changes
//     const handleFilterChange = (selectedFilters: string[]) => {
//         console.log("Filter change in ChartRenderer:", selectedFilters);
//         setSelectedFilters(selectedFilters);

//         if (selectedFilters.length === 0) {
//             // If no filters selected, reset to original data
//             setFilteredData(processedData);
//             return;
//         }

//         // Create a deep copy of the processed data
//         const updatedData = JSON.parse(JSON.stringify(processedData));

//         // Apply filters to the data
//         if (Array.isArray(updatedData.data)) {
//             updatedData.data = updatedData.data.filter((item: any) => {
//                 // For each selected filter, check if the item has that property
//                 return selectedFilters.some(filter => {
//                     return item[filter] !== undefined;
//                 });
//             });
//         }

//         setFilteredData(updatedData);
//     };

//     // Handle sub-filter changes
//     const handleSubFilterChange = (subFilters: SubFilterOption[]) => {
//         console.log("Sub-filter change in ChartRenderer:", subFilters);
//         setSelectedSubFilters(subFilters);

//         const checkedSubFilters = subFilters.filter(sf => sf.checked);

//         if (checkedSubFilters.length === 0) {
//             // If no sub-filters checked, apply only the main filters
//             handleFilterChange(selectedFilters);
//             return;
//         }

//         // Create a deep copy of the processed data
//         const updatedData = JSON.parse(JSON.stringify(processedData));

//         // Apply sub-filters to the data
//         if (Array.isArray(updatedData.data)) {
//             updatedData.data = updatedData.data.filter((item: any) => {
//                 // For each checked sub-filter, check if the item matches
//                 return checkedSubFilters.some(sf => {
//                     return item[sf.type] === sf.value ||
//                         // Handle string/number conversion if needed
//                         (typeof item[sf.type] === 'number' && item[sf.type].toString() === sf.value) ||
//                         (typeof item[sf.type] === 'string' && typeof sf.value === 'string' &&
//                             item[sf.type].toLowerCase() === sf.value.toLowerCase());
//                 });
//             });
//         }

//         setFilteredData(updatedData);
//     };

//     // Handle group changes
//     const handleGroupChange = (selectedGroup: string) => {
//         console.log("Group change in ChartRenderer:", selectedGroup);
//         setSelectedGroup(selectedGroup);

//         if (!selectedGroup) {
//             // If no group selected, reset to original data
//             setFilteredData(processedData);
//             return;
//         }

//         // Create a deep copy of the processed data
//         const updatedData = JSON.parse(JSON.stringify(processedData));

//         // Apply grouping to the data
//         if (Array.isArray(updatedData.data)) {
//             // Group the data by the selected group
//             const groupedData: { [key: string]: any[] } = {};

//             updatedData.data.forEach((item: any) => {
//                 const groupValue = item[selectedGroup];
//                 if (!groupValue) return;

//                 if (!groupedData[groupValue]) {
//                     groupedData[groupValue] = [];
//                 }

//                 groupedData[groupValue].push(item);
//             });

//             // Transform grouped data back to array format
//             const newData: any[] = [];

//             Object.entries(groupedData).forEach(([groupValue, items]) => {
//                 // Calculate aggregated values for each group
//                 const aggregatedItem: any = { [selectedGroup]: groupValue };

//                 // Find numeric properties to aggregate
//                 const numericProps = Object.keys(items[0]).filter(key => {
//                     return typeof items[0][key] === 'number' &&
//                         !['is_anomaly', 'is_predicted', 'is_benchmarked'].includes(key);
//                 });

//                 // Calculate sum for each numeric property
//                 numericProps.forEach(prop => {
//                     aggregatedItem[prop] = items.reduce((sum, item) => sum + (item[prop] || 0), 0);
//                 });

//                 newData.push(aggregatedItem);
//             });

//             updatedData.data = newData;

//             // Update the X-axis key to use the selected group
//             if (!updatedData.config) {
//                 updatedData.config = {};
//             }
//             updatedData.config.xAxisKey = selectedGroup;

//             // For pie charts, also set the nameKey
//             if (updatedData.visualization_type === 'pie') {
//                 updatedData.config.nameKey = selectedGroup;
//             }
//         }

//         setFilteredData(updatedData);
//     };

//     // Determine if chart is multi-metric
//     const isMultiMetric = useMemo(() => {
//         return filteredData?.config?.metric_names && filteredData.config.metric_names.length > 1;
//     }, [filteredData?.config?.metric_names]);

//     // Handle chart type changes
//     const handleChartTypeChange = (chartType: string) => {
//         console.log("Chart type change in ChartRenderer:", chartType);

//         // Create a deep copy of the filtered data
//         const updatedData = JSON.parse(JSON.stringify(filteredData));

//         // Update the visualization type
//         updatedData.visualization_type = chartType as ChartData["visualization_type"];

//         // Ensure the X-axis configuration is preserved
//         if (updatedData.config && updatedData.config.xAxisKey) {
//             // Make sure the X-axis key is appropriate for the chart type
//             const xAxisKey = updatedData.config.xAxisKey;

//             // For pie charts, ensure the nameKey is set correctly
//             if (chartType === 'pie') {
//                 // For pie charts, we need to make sure the nameKey is set to the current xAxisKey
//                 if (!updatedData.config) {
//                     updatedData.config = {};
//                 }
//                 updatedData.config.nameKey = xAxisKey;
//             }
//         }

//         setFilteredData(updatedData);
//         setChartData(updatedData);
//     };

//     if (filteredData.config === undefined || filteredData.config === null) {
//         return <div>No data</div>;
//     }

//     return (
//         <Card className="w-full h-full overflow-hidden">
//             <ChartCardHeader
//                 title={filteredData.config?.title ?? 'No title yet'}
//                 ai={filteredData.ai ?? {}}
//                 onRegenerate={onRegenerate}
//                 confidenceMode={confidenceMode}
//                 setConfidenceMode={setConfidenceMode}
//                 chartData={filteredData}
//                 onFilterChange={handleFilterChange}
//                 onGroupChange={handleGroupChange}
//                 onSubFilterChange={handleSubFilterChange}
//                 onChartTypeChange={handleChartTypeChange}
//             />
//             <CardContent className="p-0 h-[calc(100%-8rem)]">
//                 <ResponsiveChartWrapper
//                     data={filteredData}
//                     onRegenerate={onRegenerate}
//                     insightsLoading={false}
//                 />
//             </CardContent>
//             <ChartCardFooter ai={filteredData.ai} />
//         </Card>
//     );
// }