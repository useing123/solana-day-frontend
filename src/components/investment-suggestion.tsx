'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, Shield, AlertTriangle, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InvestmentSuggestionProps {
  id: string;
  protocol: string;
  tokenPair: string;
  apy: number;
  tvl: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
  pros: string[];
  cons: string[];
  timestamp: Date;
  onInvest?: () => void;
  onReaction?: (suggestionId: string, type: 'like' | 'dislike') => void;
  investorCount?: number;
  reactions?: {
    likes: number;
    dislikes: number;
    userLiked: boolean;
    userDisliked: boolean;
  };
}

export function InvestmentSuggestion({
  id,
  protocol,
  tokenPair,
  apy,
  tvl,
  riskLevel,
  description,
  pros,
  cons,
  timestamp,
  onInvest,
  onReaction,
  investorCount = 0,
  reactions = { likes: 42, dislikes: 8, userLiked: false, userDisliked: false }
}: InvestmentSuggestionProps) {
  const [isInvesting, setIsInvesting] = useState(false);

  const handleInvest = () => {
    setIsInvesting(true);
    onInvest?.();
    setTimeout(() => setIsInvesting(false), 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return <Shield className="h-4 w-4" />;
      case 'Medium': return <AlertTriangle className="h-4 w-4" />;
      case 'High': return <AlertTriangle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="border-2 sm:border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-3 sm:p-4">
      <div className="space-y-3 sm:space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-black uppercase">{protocol}</h3>
              <div className={cn("px-2 sm:px-3 py-1 font-black text-xs border-2 border-black flex items-center gap-1 w-fit", getRiskColor(riskLevel))}>
                {getRiskIcon(riskLevel)}
                {riskLevel.toUpperCase()}
              </div>
            </div>
            <div className="bg-black text-white px-2 sm:px-3 py-1 font-bold text-xs sm:text-sm inline-block">
              {tokenPair}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <div className="bg-green-400 border-2 border-black p-2 sm:p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-2xl sm:text-3xl font-black text-black flex items-center gap-1">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />
                {apy}%
              </div>
              <div className="text-xs sm:text-sm font-bold text-black">APY</div>
            </div>
          </div>
        </div>

        {/* TVL */}
        <div className="bg-gray-100 border-2 border-black p-3 flex justify-between items-center">
          <span className="font-bold text-black">TVL:</span>
          <span className="font-black text-black text-lg">{tvl}</span>
        </div>

        {/* Description */}
        <div className="bg-yellow-200 border-2 border-black p-3">
          <p className="font-bold text-black text-sm">{description}</p>
        </div>

        {/* Pros and Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-200 border-2 border-black p-3">
            <h4 className="font-black text-black mb-2 flex items-center gap-1 uppercase">
              <TrendingUp className="h-4 w-4" />
              PROS
            </h4>
            <ul className="space-y-1">
              {pros.map((pro, index) => (
                <li key={index} className="text-xs font-bold text-black flex items-start gap-2">
                  <span className="bg-black text-white w-4 h-4 flex items-center justify-center text-xs">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-200 border-2 border-black p-3">
            <h4 className="font-black text-black mb-2 flex items-center gap-1 uppercase">
              <TrendingDown className="h-4 w-4" />
              RISKS
            </h4>
            <ul className="space-y-1">
              {cons.map((con, index) => (
                <li key={index} className="text-xs font-bold text-black flex items-start gap-2">
                  <span className="bg-black text-white w-4 h-4 flex items-center justify-center text-xs">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Token Details Section */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <div className="bg-purple-200 border-2 border-black p-2 text-center">
            <div className="font-black text-[10px] sm:text-xs">24H VOLUME</div>
            <div className="font-bold text-sm sm:text-lg">${(Math.random() * 50 + 10).toFixed(1)}M</div>
          </div>
          <div className="bg-blue-200 border-2 border-black p-2 text-center">
            <div className="font-black text-[10px] sm:text-xs">LIQUIDITY</div>
            <div className="font-bold text-sm sm:text-lg">${(Math.random() * 100 + 50).toFixed(0)}M</div>
          </div>
          <div className="bg-orange-200 border-2 border-black p-2 text-center">
            <div className="font-black text-[10px] sm:text-xs">FEES (24H)</div>
            <div className="font-bold text-sm sm:text-lg">${(Math.random() * 500 + 100).toFixed(0)}K</div>
          </div>
        </div>

        {/* Investment Section */}
        <div className="bg-black text-white p-2 sm:p-3 border-2 border-black">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <span className="font-bold text-[10px] sm:text-xs">
                {timestamp.toLocaleString().toUpperCase()}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onReaction?.(id, 'like')}
                  className={cn(
                    "px-2 sm:px-3 py-1 font-bold text-xs border-2 border-white transition-all hover:scale-105",
                    reactions.userLiked
                      ? "bg-green-400 text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                      : "bg-blue-400 text-black hover:bg-blue-300"
                  )}
                >
                  <ThumbsUp className="h-3 w-3 mr-1 inline" />
                  {reactions.likes}
                </button>
                <button
                  onClick={() => onReaction?.(id, 'dislike')}
                  className={cn(
                    "px-2 sm:px-3 py-1 font-bold text-xs border-2 border-white transition-all hover:scale-105",
                    reactions.userDisliked
                      ? "bg-red-500 text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                      : "bg-pink-400 text-black hover:bg-pink-300"
                  )}
                >
                  <TrendingDown className="h-3 w-3 mr-1 inline" />
                  {reactions.dislikes}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-[10px] sm:text-xs whitespace-nowrap">{investorCount} WATCHING</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={handleInvest}
              disabled={isInvesting}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-black px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all disabled:opacity-50 uppercase flex-1"
            >
              {isInvesting ? "BOOKMARKING..." : "📊 ADD TO WATCHLIST"}
            </button>
            <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-black px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all">
              🔗 PROTOCOL
            </button>
            <button className="bg-green-400 hover:bg-green-300 text-black font-black px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] sm:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[1px] hover:translate-y-[1px] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] transition-all">
              📈 CHART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}