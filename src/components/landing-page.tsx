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
      <section className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-main via-main to-secondary-background">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Title */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-4 text-black leading-none">
              ⚡ SOLANA
              <span className="block bg-black text-white px-3 sm:px-4 py-2 inline-block mt-2 border-2 sm:border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                YIELD
              </span>
              AGGREGATOR
            </h1>
            <p className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold text-black mb-6 sm:mb-8 max-w-4xl mx-auto px-2">
              AI GENERATES YIELD IDEAS • COMMUNITY VOTES • SOLANA SPEED
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-10 sm:mb-16 px-4">
            <button
              onClick={handleEnterClick}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-black px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl border-2 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[4px] sm:hover:translate-y-[4px] transition-all uppercase flex items-center justify-center gap-3"
            >
              ⚡ TRY DEMO
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <div className="bg-white border-2 sm:border-4 border-black px-6 sm:px-8 py-3 sm:py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-black text-xl sm:text-2xl text-purple-600">SHOWCASE</span>
              <span className="font-bold text-base sm:text-lg text-black ml-2">ONLY</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-16 px-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border-2 sm:border-4 border-black p-4 sm:p-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="text-2xl sm:text-3xl font-black text-black">{stat.number}</div>
                <div className="text-xs sm:text-sm font-bold text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-100 border-t-2 sm:border-t-4 border-black relative bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:25px_25px]">
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center mb-3 sm:mb-4 text-black">
            FEATURES
          </h2>
          <p className="text-sm sm:text-base md:text-xl font-bold text-center text-gray-600 mb-8 sm:mb-12 md:mb-16 px-2">
            EVERYTHING YOU NEED TO DOMINATE DEFI YIELD FARMING
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${feature.color} border-2 sm:border-4 border-black p-5 sm:p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[4px] sm:hover:translate-y-[4px] transition-all cursor-pointer`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="bg-black text-white p-2 sm:p-3 border-2 border-black shrink-0">
                    <div className="h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black leading-tight">{feature.title}</h3>
                </div>
                <p className="text-sm sm:text-base md:text-lg font-bold text-black leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-black text-white border-t-2 sm:border-t-4 border-black relative bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:30px_30px]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            READY TO START?
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-bold mb-8 sm:mb-12 text-gray-300 px-2">
            JOIN 15,000+ TRADERS ALREADY USING SOLANA YIELD SIGNALS
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <button
              onClick={handleEnterClick}
              className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-black px-8 sm:px-12 py-4 sm:py-6 text-lg sm:text-xl md:text-2xl border-2 sm:border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] sm:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] sm:hover:translate-x-[4px] sm:hover:translate-y-[4px] transition-all uppercase"
            >
              🌾 LAUNCH APP
            </button>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-sm sm:text-base">LIVE SIGNALS STREAMING NOW</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t-2 border-gray-700">
            <p className="font-bold text-gray-400 text-sm sm:text-base px-2">
              YIELD.FARM SIGNALS - DEFI INTELLIGENCE PLATFORM
            </p>
            <p className="text-xs sm:text-sm font-bold text-gray-500 mt-2 px-2">
              No wallet connection required • Free to use • Real-time data
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}