import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface AllCardData {
    title: string;
    content?: string;
    icon?: string;
}

const AllCard: React.FC<NodeProps<AllCardData>> = ({ data }) => {
    return (
        <div className="p-3 rounded-lg shadow-md bg-white border border-gray-200 min-w-[180px]">
            <Handle type="target" position={Position.Top} />
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="text-primary text-lg">
                        {data.icon}
                    </div>
                    <h3 className="font-medium text-sm">
                        {data.title}
                    </h3>
                </div>
            </div>
            {data.content && (
                <p className="text-sm text-gray-600">
                    {data.content}
                </p>
            )}
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default AllCard; 