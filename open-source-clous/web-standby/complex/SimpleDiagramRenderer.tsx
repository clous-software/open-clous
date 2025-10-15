"use client";

import React from 'react';

interface DiagramNode {
    id: string;
    position: { x: number; y: number };
    data: {
        title: string;
        content: string;
    };
}

interface DiagramEdge {
    id: string;
    source: string;
    target: string;
}

interface DiagramData {
    nodes: DiagramNode[];
    edges: DiagramEdge[];
    layout?: {
        type: string;
        spacing?: number;
    };
}

interface SimpleDiagramRendererProps {
    data: DiagramData | string;
    height?: string;
    width?: string;
    className?: string;
}

const SimpleDiagramRenderer: React.FC<SimpleDiagramRendererProps> = ({
    data,
    height = '500px',
    width = '100%',
    className = ''
}) => {
    // Parse data if it's a string
    const parsedData: DiagramData = React.useMemo(() => {
        if (typeof data === 'string') {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error('Failed to parse diagram data:', e);
                return { nodes: [], edges: [] };
            }
        }
        return data as DiagramData;
    }, [data]);

    const { nodes, edges } = parsedData;

    // Calculate SVG viewBox based on node positions
    const calculateViewBox = () => {
        if (nodes.length === 0) return "0 0 800 400";

        const minX = Math.min(...nodes.map(n => n.position.x)) - 100;
        const maxX = Math.max(...nodes.map(n => n.position.x)) + 300;
        const minY = Math.min(...nodes.map(n => n.position.y)) - 100;
        const maxY = Math.max(...nodes.map(n => n.position.y)) + 200;

        return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
    };

    // Find node by id
    const findNode = (id: string) => nodes.find(n => n.id === id);

    return (
        <div
            style={{ height, width }}
            className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
        >
            <svg
                width="100%"
                height="100%"
                viewBox={calculateViewBox()}
                className="block"
            >
                {/* Render edges */}
                {edges.map(edge => {
                    const sourceNode = findNode(edge.source);
                    const targetNode = findNode(edge.target);

                    if (!sourceNode || !targetNode) return null;

                    const sourceX = sourceNode.position.x + 125; // Center of node (250px wide / 2)
                    const sourceY = sourceNode.position.y + 50;  // Center of node (100px high / 2)
                    const targetX = targetNode.position.x + 125;
                    const targetY = targetNode.position.y + 50;

                    return (
                        <g key={edge.id}>
                            <line
                                x1={sourceX}
                                y1={sourceY}
                                x2={targetX}
                                y2={targetY}
                                stroke="#94a3b8"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                            />
                        </g>
                    );
                })}

                {/* Arrow marker definition */}
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon
                            points="0 0, 10 3.5, 0 7"
                            fill="#94a3b8"
                        />
                    </marker>
                </defs>

                {/* Render nodes */}
                {nodes.map(node => (
                    <g key={node.id}>
                        <foreignObject
                            x={node.position.x}
                            y={node.position.y}
                            width="250"
                            height="100"
                        >
                            <div className="w-full h-full p-4 bg-white border-2 border-blue-300 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-semibold text-sm text-gray-800 mb-1 truncate">
                                    {node.data.title}
                                </h3>
                                <p className="text-xs text-gray-600 leading-tight line-clamp-3">
                                    {node.data.content}
                                </p>
                            </div>
                        </foreignObject>
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default SimpleDiagramRenderer; 