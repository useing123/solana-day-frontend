'use client';

import { useState, useRef, useEffect } from "react";
import { Message } from "./message";
import { InvestmentSuggestion } from "../investment-suggestion";
import { toast } from "react-hot-toast";

interface ChatMessage {
  id: string;
  content: string;
  sender: 'assistant' | 'system';
  timestamp: Date;
  suggestion?: InvestmentSuggestionData;
  messageType?: 'investment' | 'market_update' | 'warning' | 'news';
}

interface InvestmentSuggestionData {
  id: string;
  protocol: string;
  tokenPair: string;
  apy: number;
  tvl: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  description: string;
  pros: string[];
  cons: string[];
  investorCount: number;
}

const mockSuggestions: InvestmentSuggestionData[] = [
  {
    id: '1',
    protocol: 'Raydium',
    tokenPair: 'USDC-SOL',
    apy: 24.5,
    tvl: '$45.2M',
    riskLevel: 'Medium',
    description: 'Stable liquidity pool with consistent trading volume. Good for moderate risk tolerance with auto-compounding rewards.',
    pros: ['High liquidity', 'Proven track record', 'Auto-compounding', 'Low impermanent loss'],
    cons: ['Medium volatility risk', 'Smart contract risk', 'Platform dependency'],
    investorCount: 127
  },
  {
    id: '2',
    protocol: 'Orca',
    tokenPair: 'USDT-USDC',
    apy: 8.2,
    tvl: '$28.8M',
    riskLevel: 'Low',
    description: 'Ultra-stable stablecoin pair with minimal impermanent loss risk. Perfect for capital preservation with yield.',
    pros: ['Very low risk', 'No impermanent loss', 'Stable returns', 'High security'],
    cons: ['Lower APY', 'Limited upside potential'],
    investorCount: 89
  },
  {
    id: '3',
    protocol: 'Jupiter',
    tokenPair: 'JUP-SOL',
    apy: 45.8,
    tvl: '$12.3M',
    riskLevel: 'High',
    description: 'High-yield opportunity with Jupiter governance token. Significant potential but higher volatility and smart contract risks.',
    pros: ['Very high APY', 'Growing ecosystem', 'Strong tokenomics'],
    cons: ['High volatility', 'New protocol', 'Regulatory uncertainty', 'Higher smart contract risk'],
    investorCount: 203
  }
];

const aiMessages = [
  { content: "🚀 New yield farming opportunity detected! Current market conditions are favorable for DeFi investments.", type: 'investment' },
  { content: "📊 Market Update: DeFi TVL has increased by 15% this week. High activity in yield farming protocols.", type: 'market_update' },
  { content: "⚠️ Risk Alert: High volatility detected in governance tokens. Consider risk management strategies.", type: 'warning' },
  { content: "💡 Strategy Tip: Dollar-cost averaging into stable pools can reduce risk while maintaining steady yields.", type: 'news' },
  { content: "🔥 Hot Alert: Several protocols showing unusually high APY rates. Time-sensitive opportunities available.", type: 'investment' }
];

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '📢 Welcome to YieldFarm Signals! This channel provides AI-powered yield farming investment signals and market analysis. Follow the latest DeFi opportunities!',
      sender: 'system',
      timestamp: new Date(),
      messageType: 'news'
    }
  ]);
  const [reactions, setReactions] = useState<{[key: string]: {likes: number; dislikes: number; userLiked: boolean; userDisliked: boolean}}>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-generate AI messages
  useEffect(() => {
    const interval = setInterval(() => {
      const shouldPostSuggestion = Math.random() > 0.5;

      if (shouldPostSuggestion) {
        // Post investment suggestion
        const randomSuggestion = mockSuggestions[Math.floor(Math.random() * mockSuggestions.length)];
        const suggestionWithNewId = {
          ...randomSuggestion,
          id: Date.now().toString()
        };

        const aiMessage: ChatMessage = {
          id: Date.now().toString(),
          content: `🎯 AI Signal: High-potential yield farming opportunity identified`,
          sender: 'assistant',
          timestamp: new Date(),
          suggestion: suggestionWithNewId,
          messageType: 'investment'
        };

        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Post regular AI message
        const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)];
        const aiMessage: ChatMessage = {
          id: Date.now().toString(),
          content: randomMessage.content,
          sender: 'assistant',
          timestamp: new Date(),
          messageType: randomMessage.type as 'investment' | 'market_update' | 'warning' | 'news'
        };

        setMessages(prev => [...prev, aiMessage]);

        // Initialize reactions for new suggestions
        if (aiMessage.suggestion) {
          setReactions(prev => ({
            ...prev,
            [aiMessage.suggestion!.id]: {
              likes: Math.floor(Math.random() * 100) + 10,
              dislikes: Math.floor(Math.random() * 20) + 2,
              userLiked: false,
              userDisliked: false
            }
          }));
        }
      }
    }, 6000); // Post every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const handleInvest = () => {
    toast.success('🚀 Investment signal bookmarked! Added to your watchlist');
  };

  const handleReaction = (suggestionId: string, type: 'like' | 'dislike') => {
    setReactions(prev => {
      const current = prev[suggestionId] || { likes: 42, dislikes: 8, userLiked: false, userDisliked: false };

      if (type === 'like') {
        if (current.userLiked) {
          // Remove like
          return {
            ...prev,
            [suggestionId]: { ...current, likes: current.likes - 1, userLiked: false }
          };
        } else {
          // Add like, remove dislike if exists
          return {
            ...prev,
            [suggestionId]: {
              likes: current.likes + (current.userDisliked ? 0 : 1),
              dislikes: current.userDisliked ? current.dislikes - 1 : current.dislikes,
              userLiked: true,
              userDisliked: false
            }
          };
        }
      } else {
        if (current.userDisliked) {
          // Remove dislike
          return {
            ...prev,
            [suggestionId]: { ...current, dislikes: current.dislikes - 1, userDisliked: false }
          };
        } else {
          // Add dislike, remove like if exists
          return {
            ...prev,
            [suggestionId]: {
              likes: current.userLiked ? current.likes - 1 : current.likes,
              dislikes: current.dislikes + (current.userLiked ? 0 : 1),
              userLiked: false,
              userDisliked: true
            }
          };
        }
      }
    });
  };

  return (
    <div className="h-screen flex flex-col bg-main border-2 border-black">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 bg-white border-b-2 border-black">
        <div className="flex items-center gap-3">
          <div className="bg-black text-white px-3 py-1 font-bold text-xl">
            🌾 YIELD.FARM
          </div>
          <div className="bg-yellow-400 px-2 py-1 text-xs font-bold border-2 border-black">
            15.2K TRADERS
          </div>
          <div className="bg-cyan-400 px-2 py-1 text-xs font-bold border-2 border-black">
            LIVE SIGNALS
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 border border-black animate-pulse"></div>
          <span className="font-bold text-sm">STREAMING</span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
        {messages.map((message) => (
          <div key={message.id} className="space-y-4">
            <Message
              content={message.content}
              sender={message.sender}
              timestamp={message.timestamp}
            />
            {message.suggestion && (
              <div className="ml-0">
                <InvestmentSuggestion
                  {...message.suggestion}
                  onInvest={handleInvest}
                  onReaction={handleReaction}
                  reactions={reactions[message.suggestion.id]}
                  timestamp={message.timestamp}
                />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Status Bar */}
      <div className="bg-black text-white p-4 border-t-2 border-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 animate-pulse"></div>
              <span className="font-bold text-sm">LIVE FEED ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400"></div>
              <span className="font-bold text-sm">{messages.length} SIGNALS TODAY</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-cyan-400"></div>
              <span className="font-bold text-sm">DeFi MARKETS OPEN</span>
            </div>
          </div>
          <div className="bg-yellow-400 text-black px-4 py-2 font-black border-2 border-white">
            FREE TO VIEW
          </div>
        </div>
      </div>
    </div>
  );
}