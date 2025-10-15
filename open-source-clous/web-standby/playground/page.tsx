'use client';

import GlassCard from '@/components/ui/GlassCard';
import GlassCardLegacy from '@/components/ui/GlassCardLegacy';
import { useState } from 'react';

export default function PlaygroundPage() {
    const [showControls, setShowControls] = useState(false);
    const [displacement, setDisplacement] = useState(70);
    const [elasticity, setElasticity] = useState(0.15);

    return (
        <main className="flex min-h-screen flex-col items-center p-12 bg-gradient-to-br from-sky-800 to-indigo-900 text-white">
            <h1 className="text-4xl font-bold mb-10">Liquid Glass Playground</h1>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold mb-2">Modern Liquid Glass</h2>

                    <GlassCardLegacy
                        className="lg--fallback p-0 h-64"
                    // displacementScale={displacement}
                    // elasticity={elasticity}
                    >
                        <div className="flex items-center justify-center h-full">
                            <h3 className="text-xl">Interactive Liquid Glass</h3>
                        </div>
                    </GlassCardLegacy>

                    <GlassCardLegacy
                        className="lg--fallback p-0 h-64"
                        variant="primary"
                    // displacementScale={displacement}
                    // elasticity={elasticity}
                    >
                        <div className="flex items-center justify-center h-full">
                            <h3 className="text-xl">Primary Variant</h3>
                        </div>
                    </GlassCardLegacy>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className="text-2xl font-semibold mb-2">Legacy Glassmorphism</h2>

                    <GlassCardLegacy className="h-64">
                        <div className="flex items-center justify-center h-full">
                            <h3 className="text-xl">Static Glassmorphism</h3>
                        </div>
                    </GlassCardLegacy>

                    <GlassCardLegacy className="h-64" variant="primary">
                        <div className="flex items-center justify-center h-full">
                            <h3 className="text-xl">Primary Variant</h3>
                        </div>
                    </GlassCardLegacy>
                </div>
            </div>

            <button
                className="py-2 px-4 bg-white/20 backdrop-blur-sm rounded-full mb-8"
                onClick={() => setShowControls(!showControls)}
            >
                {showControls ? 'Hide Controls' : 'Show Controls'}
            </button>

            {showControls && (
                <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-2xl">
                    <div className="mb-6">
                        <label className="block mb-2">
                            Displacement Scale: {displacement}
                        </label>
                        <input
                            type="range"
                            min="10"
                            max="150"
                            value={displacement}
                            onChange={(e) => setDisplacement(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block mb-2">
                            Elasticity: {elasticity.toFixed(2)}
                        </label>
                        <input
                            type="range"
                            min="0.05"
                            max="0.3"
                            step="0.01"
                            value={elasticity}
                            onChange={(e) => setElasticity(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>
            )}
        </main>
    );
} 