import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/NormalButton';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronDown } from 'lucide-react';
import { SubFilterOption } from '@/types/props';
import { FilterOption } from '@/types/props';
import { IoFilterOutline } from 'react-icons/io5';
import {
    IoBarChartOutline,
    IoBarChartSharp,
    IoPieChartOutline,
    IoStatsChartOutline,
    IoTrendingUpOutline
} from 'react-icons/io5';
import { BsBarChartSteps } from 'react-icons/bs';
import { TbChartSankey } from 'react-icons/tb';


interface FilterDropdownProps {
    tableType: 'candidates' | 'talent' | 'jobs' | 'dashboard';
    filterOptions?: FilterOption[];
    groupOptions?: FilterOption[];
    sortOptions?: FilterOption[];
    onFilterChange?: (selectedFilters: string[]) => void;
    onGroupChange?: (selectedGroup: string) => void;
    onSortChange?: (selectedSort: string) => void;
    onSortOrderChange?: () => void;
    sortOrder?: 'asc' | 'desc';
    availableSubFilters?: SubFilterOption[];
    selectedFilters?: string[];
    selectedGroup?: string;
    selectedSort?: string;
    onSubFilterChange: (subFilters: SubFilterOption[]) => void;
    icon?: boolean;
    chartType?: string;
    onChartTypeChange?: (chartType: string) => void;
    isMultiMetric?: boolean;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    tableType,
    filterOptions = [],
    groupOptions = [],
    sortOptions = [],
    onFilterChange,
    onGroupChange,
    onSortChange,
    onSortOrderChange,
    sortOrder = 'desc',
    availableSubFilters = [],
    onSubFilterChange,
    selectedFilters = [],
    selectedGroup,
    selectedSort,
    icon,
    chartType,
    onChartTypeChange,
    isMultiMetric = false,
}) => {
    // Debug logs for props
    console.log("FilterDropdown props:", {
        tableType,
        filterOptions,
        availableSubFilters,
        selectedFilters,
        selectedGroup,
        chartType,
        isMultiMetric
    });

    /**
   * Toggle a main filter: "Job," "Skill," etc.
   * If checking => we do NOT automatically add separate subfilters for every possible option
   * (unless that is your intended behavior). 
   * Instead, we *enable* that main filter and rely on the user to check the subfilters below.
   */
    const handleFilterChange = (filterType: string) => {
        let updatedFilters: string[];

        if (selectedFilters.includes(filterType)) {
            // --- UNCHECKING the main filter ---
            updatedFilters = selectedFilters.filter((f) => f !== filterType);

            // Clear subfilters for this type
            const newSubFilters = availableSubFilters.filter(sf => sf.type !== filterType);
            onSubFilterChange(newSubFilters);
        } else {
            // --- CHECKING the main filter ---
            updatedFilters = [...selectedFilters, filterType];

            // We don't need to clear any subfilters when adding a new filter
        }

        // Let the parent know the main filters changed
        onFilterChange?.(updatedFilters);
    };

    /**
  * When the user checks/unchecks an individual *sub*-filter (like a single skill or job),
  * we only toggle that value within `subFilters`.
  */
    const handleSubFilterChange = (sf: SubFilterOption) => {
        // Clone the array and toggle the checked state of the selected subfilter
        const newSubFilters = availableSubFilters.map(item => {
            if (item.type === sf.type && item.value === sf.value) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });

        // Log for debugging
        console.log("Subfilter changed:", sf, "New subfilters:", newSubFilters);

        // Notify parent component
        onSubFilterChange(newSubFilters);
    };

    /**
     * Group
     */
    const handleGroupSelection = (value: string) => {
        // Simply pass the selected group to the parent component
        onGroupChange?.(value);
    };

    /**
     * Sort
     * If user picks the same sort again, we toggle asc/desc 
     * in the parent via onSortOrderChange.
     */
    const handleSortChange = (value: string) => {
        if (selectedSort === value) {
            onSortOrderChange?.();
        } else {
            onSortChange?.(value);
        }
    };

    /**
     * Chart Type
     * Handle chart type selection
     */
    const handleChartTypeChange = (type: string) => {
        if (onChartTypeChange) {
            onChartTypeChange(type);
        }
    };

    /**
     * Renders the subfilters for each main filter
     */
    const renderSubFilters = (filterType: string) => {
        // Get all subfilters for this filter type
        const relevantOptions = availableSubFilters.filter(sf => sf.type === filterType);

        console.log("Rendering subfilters for", filterType, {
            availableSubFilters,
            relevantOptions,
            currentSelection: availableSubFilters.filter(sf => sf.type === filterType && sf.checked).map(sf => sf.value)
        });

        if (relevantOptions.length === 0) {
            console.log(`No subfilters available for ${filterType}`);
            return (
                <div className="mb-4 pl-3 ml-1 border-l-2 border-gray-100">
                    <p className="text-xs text-gray-500 italic">No filter options available</p>
                </div>
            );
        }

        return (
            <div className="mb-4 pl-3 ml-1 border-l-2 border-gray-100">
                <h3 className="text-xs font-medium text-gray-foreground mb-1 mt-2">
                    Select {filterType}
                </h3>
                <div className="max-h-40 overflow-y-auto pr-1">
                    {relevantOptions.map((option) => (
                        <div key={`${filterType}-${option.value}`} className="flex items-center mb-1">
                            <Checkbox
                                id={`${filterType}-${option.value}`}
                                checked={option.checked}
                                onCheckedChange={() => handleSubFilterChange(option)}
                            />
                            <label htmlFor={`${filterType}-${option.value}`} className="ml-2 text-sm capitalize">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Chart type options with icons
    const singleMetricChartTypes = [
        { value: 'bar', label: 'Bar Chart', icon: <IoBarChartOutline className="w-5 h-5" /> },
        { value: 'line', label: 'Line Chart', icon: <IoTrendingUpOutline className="w-5 h-5" /> },
        { value: 'pie', label: 'Pie Chart', icon: <IoPieChartOutline className="w-5 h-5" /> },
        { value: 'area', label: 'Area Chart', icon: <BsBarChartSteps className="w-5 h-5" /> },
        { value: 'sankey', label: 'Sankey Chart', icon: <TbChartSankey className="w-5 h-5" /> },
    ];

    const multiMetricChartTypes = [
        { value: 'multiBar', label: 'Multi Bar Chart', icon: <IoBarChartSharp className="w-5 h-5" /> },
        { value: 'multiLine', label: 'Multi Line Chart', icon: <IoStatsChartOutline className="w-5 h-5" /> },
    ];

    // Filter chart types based on whether the chart is multi-metric or not
    const chartTypeOptions = isMultiMetric
        ? [...singleMetricChartTypes, ...multiMetricChartTypes]
        : singleMetricChartTypes;

    // Render the group options
    const renderGroupOptions = () => {
        if (!groupOptions || groupOptions.length === 0) return null;

        return (
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-foreground mb-2">Group by</h3>
                <RadioGroup value={selectedGroup || ""} onValueChange={handleGroupSelection}>
                    {groupOptions.map((option) => (
                        <div key={option.value} className="flex items-center mb-1">
                            <RadioGroupItem id={`group-${option.value}`} value={option.value} />
                            <label htmlFor={`group-${option.value}`} className="ml-2 text-sm">
                                {option.label}
                            </label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        );
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button name="Filter" linkUrl="#" className="flex items-center gap-2" onClick={() => { }}>
                    {/* {icon ? <IoFilterOutline className="w-4 h-4 text-gray-foreground" /> : (
                        <>
                            Filter
                            <ChevronDown size={16} />
                        </>
                    )} */}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-4 w-64 rounded-2xl shadow-sm">
                {/* Chart Type Selector */}
                {onChartTypeChange && (
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-foreground mb-2">Chart Type</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {chartTypeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleChartTypeChange(option.value)}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${chartType === option.value
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                    title={option.label}
                                >
                                    {option.icon}
                                    <span className="text-xs mt-1">{option.value}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Filters */}
                {filterOptions.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-foreground mb-2">Filter by</h3>
                        {filterOptions.map((option) => (
                            <div key={option.value} className="mb-1">
                                <div className="flex items-center">
                                    <Checkbox
                                        id={option.value}
                                        checked={selectedFilters.includes(option.value)}
                                        onCheckedChange={() => handleFilterChange(option.value)}
                                    />
                                    <label htmlFor={option.value} className="ml-2 text-sm">
                                        {option.label}
                                    </label>
                                </div>
                                {/* Always show subfilters for this filter type if it's selected */}
                                {selectedFilters.includes(option.value) && renderSubFilters(option.value)}
                            </div>
                        ))}
                    </div>
                )}

                {/* Group By */}
                {renderGroupOptions()}

                {/* Sort By */}
                {sortOptions && sortOptions.length > 0 && (
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-foreground mb-2">Sort by</h3>
                        <RadioGroup value={selectedSort || ""} onValueChange={handleSortChange}>
                            {sortOptions.map((option) => (
                                <div key={option.value} className="flex items-center mb-1">
                                    <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                                    <label htmlFor={`sort-${option.value}`} className="ml-2 text-sm">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </RadioGroup>
                        {selectedSort && (
                            <Button name="Sort" linkUrl="#" className="mt-2 w-full" onClick={() => { }}>
                                {/* {sortOrder === 'asc' ? 'Ascending' : 'Descending'} */}
                            </Button>
                        )}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default FilterDropdown;
