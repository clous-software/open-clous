"use client";

import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    ConnectionLineType,
    Panel,
    NodeTypes,
    EdgeTypes,
    ReactFlowProvider,
    useReactFlow,
    MiniMap,
    Connection,
    addEdge
} from 'reactflow';

// Import icons
import {
    FaBriefcase,
    FaUser,
    FaUserGraduate,
    FaBook,
    FaUsers,
    FaUserTie,
    FaTools,
    FaCloud,
    FaCode,
    FaGraduationCap,
    FaExclamationTriangle,
    FaFlag,
    FaQuestion,
    FaBuilding,
    FaMap,
    FaPlus,
    FaSearch,
    FaExpand,
    FaCompress,
    FaUndo,
    FaRedo,
    FaTrash,
    FaExchangeAlt,
    FaCogs,
    FaBrain,
    FaProjectDiagram
} from 'react-icons/fa';

// Custom Node Components
import AllCard from '@/components/complex/diagram-nodes/AllCard';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { BiExpandAlt } from 'react-icons/bi';

// Types
interface DiagramData {
    nodes: Node[];
    edges: Edge[];
    layout: {
        type: string;
        spacing?: number;
    };
    theme?: string;
    extras?: Record<string, any>;
}

interface DiagramRendererProps {
    data: DiagramData | string;
    height?: string;
    width?: string;
    className?: string;
    onNodeClick?: (node: Node) => void;
    onEdgeClick?: (edge: Edge) => void;
    fitView?: boolean;
}

// Define custom node types
const nodeTypes: NodeTypes = {
    AllCard,
};

// Node type options for the add node menu
const nodeTypeOptions = [
    { type: 'ObjectSimple', label: 'Empty Node', icon: 'user' },
    { type: 'ObjectComplex', label: 'Object Node', icon: 'building' },
];

// Helper function to get icon component by name
const getIconByName = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
        'user': <FaUser />,
        'building': <FaBuilding />,
        'code': <FaCode />,
        'cogs': <FaCogs />,
        'brain': <FaBrain />,
        'project-diagram': <FaProjectDiagram />,
        'user-tie': <FaUserTie />,
        'user-graduate': <FaUserGraduate />,
        'book': <FaBook />,
        // Add more icons as needed
    };

    return iconMap[iconName] || <FaQuestion />;
};

// Layout algorithms
const applyLayout = (nodes: Node[], edges: Edge[], layout: { type: string; spacing?: number }) => {
    // This is a simple implementation - for production, you might want more sophisticated layouts
    const { type, spacing = 100 } = layout;

    if (type === 'horizontal-flow') {
        // Simple horizontal layout
        const levels: Record<string, Node[]> = {};

        // First pass: assign levels based on incoming edges
        const assignLevels = (nodeId: string, level: number, visited: Set<string> = new Set()) => {
            if (visited.has(nodeId)) return;
            visited.add(nodeId);

            if (!levels[level]) levels[level] = [];
            const node = nodes.find(n => n.id === nodeId);
            if (node) {
                levels[level].push(node);

                // Find all outgoing edges
                const outgoingEdges = edges.filter(e => e.source === nodeId);
                outgoingEdges.forEach(edge => {
                    assignLevels(edge.target, level + 1, visited);
                });
            }
        };

        // Find root nodes (nodes with no incoming edges)
        const nodeIdsWithIncomingEdges = new Set(edges.map(e => e.target));
        const rootNodeIds = nodes
            .filter(node => !nodeIdsWithIncomingEdges.has(node.id))
            .map(node => node.id);

        // If no root nodes found, just use the first node
        if (rootNodeIds.length === 0 && nodes.length > 0) {
            rootNodeIds.push(nodes[0].id);
        }

        // Assign levels starting from root nodes
        rootNodeIds.forEach(nodeId => assignLevels(nodeId, 0));

        // Second pass: position nodes based on levels
        Object.keys(levels).forEach((levelStr, levelIndex) => {
            const levelNodes = levels[levelStr];
            levelNodes.forEach((node, nodeIndex) => {
                const nodeCount = levelNodes.length;
                const nodeSpacing = spacing;
                const x = levelIndex * spacing * 2;
                const y = nodeIndex * nodeSpacing - (nodeCount - 1) * nodeSpacing / 2;

                node.position = { x, y };
            });
        });
    } else if (type === 'vertical-tree') {
        // Simple vertical tree layout
        // Similar to horizontal but with x and y swapped
        const levels: Record<string, Node[]> = {};

        const assignLevels = (nodeId: string, level: number, visited: Set<string> = new Set()) => {
            if (visited.has(nodeId)) return;
            visited.add(nodeId);

            if (!levels[level]) levels[level] = [];
            const node = nodes.find(n => n.id === nodeId);
            if (node) {
                levels[level].push(node);

                const outgoingEdges = edges.filter(e => e.source === nodeId);
                outgoingEdges.forEach(edge => {
                    assignLevels(edge.target, level + 1, visited);
                });
            }
        };

        const nodeIdsWithIncomingEdges = new Set(edges.map(e => e.target));
        const rootNodeIds = nodes
            .filter(node => !nodeIdsWithIncomingEdges.has(node.id))
            .map(node => node.id);

        if (rootNodeIds.length === 0 && nodes.length > 0) {
            rootNodeIds.push(nodes[0].id);
        }

        rootNodeIds.forEach(nodeId => assignLevels(nodeId, 0));

        Object.keys(levels).forEach((levelStr, levelIndex) => {
            const levelNodes = levels[levelStr];
            levelNodes.forEach((node, nodeIndex) => {
                const nodeCount = levelNodes.length;
                const nodeSpacing = spacing;
                const y = levelIndex * spacing * 2;
                const x = nodeIndex * nodeSpacing - (nodeCount - 1) * nodeSpacing / 2;

                node.position = { x, y };
            });
        });
    }

    return nodes;
};


// Add Node Menu component
interface AddNodeMenuProps {
    onAddNode: (nodeType: string, iconName: string) => void;
    isOpen: boolean;
    toggleMenu: () => void;
}

const AddNodeMenu: React.FC<AddNodeMenuProps> = ({ onAddNode, isOpen, toggleMenu }) => {
    return (
        <div className={`add-node-menu absolute top-4 left-4 bg-white rounded-lg shadow-md border border-gray-200 long-transition z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="p-3 border-b">
                <h3 className="font-medium text-sm">Add new node</h3>
            </div>
            <div className="p-2">
                <div className="grid grid-cols-2 gap-2">
                    {nodeTypeOptions.map((option) => (
                        <button
                            key={option.type}
                            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md text-left"
                            onClick={() => onAddNode(option.type, option.icon)}
                        >
                            <div className="text-primary text-lg">
                                {getIconByName(option.icon)}
                            </div>
                            <span className="text-sm">{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DiagramFlow = ({ data, height = '500px', width = '100%', onNodeClick, onEdgeClick, fitView = true }: DiagramRendererProps) => {
    const reactFlowInstance = useReactFlow();
    const [isAddNodeMenuOpen, setIsAddNodeMenuOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);

    // Parse data if it's a string
    const parsedData: DiagramData = useMemo(() => {
        if (typeof data === 'string') {
            try {
                return JSON.parse(data);
            } catch (e) {
                console.error('Failed to parse diagram data:', e);
                return { nodes: [], edges: [], layout: { type: 'horizontal-flow' } };
            }
        }
        return data as DiagramData;
    }, [data]);

    // Process and layout nodes
    const initialNodes = useMemo(() => {
        return parsedData.nodes || [];
    }, [parsedData]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(parsedData.edges || []);

    // Handle node click
    const handleNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
        event.stopPropagation();
        setSelectedNode(node);
        if (onNodeClick) {
            onNodeClick(node);
        }
    }, [onNodeClick]);

    // Handle edge click
    const handleEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
        event.stopPropagation();
        setSelectedEdge(edge);
        if (onEdgeClick) {
            onEdgeClick(edge);
        }
    }, [onEdgeClick]);

    // Handle connections between nodes
    const onConnect = useCallback(
        (connection: Connection) => {
            setEdges((eds: Edge[]) => addEdge({
                ...connection,
                type: 'default',
                animated: false,
            }, eds));
        },
        [setEdges]
    );

    return (
        <div style={{ height, width }} className="bg-white rounded-lg border border-gray-200 min-h-[500px]">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeClick={handleNodeClick}
                onEdgeClick={handleEdgeClick}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                connectionLineType={ConnectionLineType.SmoothStep}
                fitView={fitView}
                deleteKeyCode="Delete"
            >
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
};

// Wrapper component with ReactFlowProvider
const DiagramRenderer: React.FC<DiagramRendererProps> = (props) => {
    return (
        <ReactFlowProvider>
            <DiagramFlow {...props} />
        </ReactFlowProvider>
    );
};

export default DiagramRenderer;
