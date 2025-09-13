'use client';

import { useState } from 'react';
import { TrendingUp, Zap, Users, ArrowRight, BarChart3 } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleEnterClick = () => {
    console.log('Demo button clicked!');
    onEnter();
  };

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "AI YIELD IDEAS",
      description: "Advanced AI generates creative yield farming strategies on Solana ecosystem protocols",
      color: "bg-yellow-400"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "COMMUNITY VOTING",
      description: "Vote on AI-generated strategies with thumbs up/down to surface the best opportunities",
      color: "bg-cyan-400"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "SOLANA PROTOCOLS",
      description: "Aggregate yields from Raydium, Orca, Jupiter, and other top Solana DeFi protocols",
      color: "bg-green-400"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "SHOWCASE PLATFORM",
      description: "Demonstration of yield aggregation concepts with interactive voting and live data",
      color: "bg-purple-400"
    }
  ];

  const stats = [
    { number: "500+", label: "AI IDEAS GENERATED" },
    { number: "25", label: "SOLANA PROTOCOLS" },
    { number: "15K+", label: "COMMUNITY VOTES" },
    { number: "DEMO", label: "SHOWCASE MODE" }
  ];

  return (
    <div className="min-h-screen bg-main overflow-x-hidden bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:20px_20px]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-main via-main to-secondary-background">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-4 text-black leading-none">
              ⚡ SOLANA
              <span className="block bg-black text-white px-4 py-2 inline-block mt-2 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                YIELD
              </span>
              AGGREGATOR
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-black mb-8 max-w-4xl mx-auto">
              AI GENERATES YIELD IDEAS • COMMUNITY VOTES • SOLANA SPEED
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <button
              onClick={handleEnterClick}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black px-12 py-6 text-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all uppercase flex items-center gap-3"
            >
              ⚡ TRY DEMO
              <ArrowRight className="h-6 w-6" />
            </button>
            <div className="bg-white border-4 border-black px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-black text-2xl text-purple-600">SHOWCASE</span>
              <span className="font-bold text-lg text-black ml-2">ONLY</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-3xl font-black text-black">{stat.number}</div>
                <div className="text-sm font-bold text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-100 border-t-4 border-black relative bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:25px_25px]">
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-black">
            FEATURES
          </h2>
          <p className="text-xl font-bold text-center text-gray-600 mb-16">
            EVERYTHING YOU NEED TO DOMINATE DEFI YIELD FARMING
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.color} border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-black text-white p-3 border-2 border-black">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-black text-black">{feature.title}</h3>
                </div>
                <p className="text-lg font-bold text-black leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black text-white border-t-4 border-black relative bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:30px_30px]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            READY TO START?
          </h2>
          <p className="text-xl font-bold mb-12 text-gray-300">
            JOIN 15,000+ TRADERS ALREADY USING SOLANA YIELD SIGNALS
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleEnterClick}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black px-12 py-6 text-2xl border-4 border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all uppercase"
            >
              🌾 LAUNCH APP
            </button>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold">LIVE SIGNALS STREAMING NOW</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t-2 border-gray-700">
            <p className="font-bold text-gray-400">
              YIELD.FARM SIGNALS - DEFI INTELLIGENCE PLATFORM
            </p>
            <p className="text-sm font-bold text-gray-500 mt-2">
              No wallet connection required • Free to use • Real-time data
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}