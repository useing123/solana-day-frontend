'use client';

import { useState, useRef, useEffect } from "react";
import { Message } from "./message";
import { InvestmentSuggestion } from "../investment-suggestion";
import { TransactionModal } from "../transaction-modal";
import { WalletButton } from "../wallet-button";
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

// Pre-existing AI messages and ideas for consistency
const existingAIMessages = [
  { content: "🤖 AI Idea: Arbitrage opportunity detected between Raydium and Orca liquidity pools for SOL-USDC pair.", type: 'investment' },
  { content: "📊 Market Analysis: Solana DeFi TVL trending upward. Perfect time for yield aggregation strategies.", type: 'market_update' },
  { content: "💡 AI Strategy: Combine liquidity mining on multiple Solana DEXs to maximize governance token rewards.", type: 'news' },
  { content: "🔥 AI Alert: Jupiter swap fees creating unique yield opportunities through volume-based rewards.", type: 'investment' },
  { content: "⚡ Solana Speed: Take advantage of low transaction costs for frequent yield optimization rebalancing.", type: 'news' }
];

// Additional AI messages for new generation
const newAIMessages = [
  { content: "🧠 AI Discovery: Cross-protocol staking rewards on Marinade + Lido offering 12.8% compounded APY.", type: 'investment' },
  { content: "📈 Smart Signal: Serum DEX volume spike suggests increased yield farming activity incoming.", type: 'market_update' },
  { content: "⚡ AI Optimization: Flash loan arbitrage between Solana DEXs showing 3-5% profit margins.", type: 'investment' },
  { content: "🎯 Strategy Alert: Governance mining on multiple protocols can yield additional 8-15% in tokens.", type: 'news' },
  { content: "🔮 AI Prediction: Upcoming Solana protocol launches will create temporary high-yield opportunities.", type: 'market_update' }
];

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: '📢 Welcome to Solana Yield Aggregator Demo! Watch as AI generates creative yield farming ideas for Solana protocols. Vote with 👍/👎 to help surface the best strategies. This is a showcase platform demonstrating yield aggregation concepts.',
      sender: 'system',
      timestamp: new Date(),
      messageType: 'news'
    }
  ]);
  const [reactions, setReactions] = useState<{[key: string]: {likes: number; dislikes: number; userLiked: boolean; userDisliked: boolean}}>({});
  const [existingMessageIndex, setExistingMessageIndex] = useState(0);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<{
    type: 'like' | 'dislike' | 'invest';
    suggestionId: string;
    suggestionTitle: string;
  } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-generate AI messages - show existing ideas first, then new ones
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
          content: `🤖 AI Generated Yield Idea: Solana protocol opportunity analyzed`,
          sender: 'assistant',
          timestamp: new Date(),
          suggestion: suggestionWithNewId,
          messageType: 'investment'
        };

        setMessages(prev => [...prev, aiMessage]);

        // Initialize reactions for new suggestions
        setReactions(prev => ({
          ...prev,
          [suggestionWithNewId.id]: {
            likes: Math.floor(Math.random() * 100) + 10,
            dislikes: Math.floor(Math.random() * 20) + 2,
            userLiked: false,
            userDisliked: false
          }
        }));
      } else {
        // Prioritize existing ideas first, then use new ones
        const messageCount = messages.length;
        const useExistingIdeas = messageCount < 8; // Show existing ideas for first few messages

        const messagePool = useExistingIdeas
          ? existingAIMessages
          : Math.random() > 0.3 ? existingAIMessages : newAIMessages;

        const randomMessage = messagePool[Math.floor(Math.random() * messagePool.length)];
        const aiMessage: ChatMessage = {
          id: Date.now().toString(),
          content: randomMessage.content,
          sender: 'assistant',
          timestamp: new Date(),
          messageType: randomMessage.type as 'investment' | 'market_update' | 'warning' | 'news'
        };

        setMessages(prev => [...prev, aiMessage]);
      }
    }, 6000); // Post every 6 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  const handleInvest = (suggestionId: string, suggestionTitle: string) => {
    setCurrentTransaction({
      type: 'invest',
      suggestionId,
      suggestionTitle
    });
    setShowTransactionModal(true);
  };

  const handleReaction = (suggestionId: string, type: 'like' | 'dislike') => {
    const suggestion = messages.find(m => m.suggestion?.id === suggestionId)?.suggestion;
    if (!suggestion) return;

    setCurrentTransaction({
      type,
      suggestionId,
      suggestionTitle: `${suggestion.protocol} ${suggestion.tokenPair}`
    });
    setShowTransactionModal(true);
  };

  const handleTransactionConfirm = (signature?: string) => {
    if (!currentTransaction) return;

    const { type, suggestionId } = currentTransaction;

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

    const message = signature
      ? `🎉 ${currentTransaction.type === 'like' ? 'Vote recorded!' : 'Feedback recorded!'} Transaction: ${signature.slice(0, 8)}...`
      : `🎉 ${currentTransaction.type === 'like' ? 'Vote recorded!' : 'Feedback recorded!'} Transaction signed successfully.`;
    toast.success(message);
  };

  return (
    <div className="h-screen flex flex-col bg-main border-2 border-black">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-white border-b-2 border-black gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="bg-black text-white px-2 sm:px-3 py-1 font-bold text-base sm:text-xl whitespace-nowrap">
            ⚡ SOLANA YIELD
          </div>
          <div className="bg-yellow-400 px-2 py-1 text-xs font-bold border-2 border-black whitespace-nowrap">
            AI GENERATOR
          </div>
          <div className="bg-cyan-400 px-2 py-1 text-xs font-bold border-2 border-black whitespace-nowrap">
            SHOWCASE DEMO
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <WalletButton />
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 border border-black animate-pulse"></div>
            <span className="font-bold text-xs sm:text-sm whitespace-nowrap">STREAMING</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-100">
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
                  onInvest={() => handleInvest(message.suggestion!.id, `${message.suggestion!.protocol} ${message.suggestion!.tokenPair}`)}
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
      <div className="bg-black text-white p-3 sm:p-4 border-t-2 border-black">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 animate-pulse"></div>
              <span className="font-bold text-xs sm:text-sm whitespace-nowrap">AI GENERATOR ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400"></div>
              <span className="font-bold text-xs sm:text-sm whitespace-nowrap">{messages.length} IDEAS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400"></div>
              <span className="font-bold text-xs sm:text-sm whitespace-nowrap">SOLANA PROTOCOLS</span>
            </div>
          </div>
          <div className="bg-purple-400 text-black px-3 sm:px-4 py-1 sm:py-2 font-black text-xs sm:text-sm border-2 border-white whitespace-nowrap">
            DEMO MODE
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {showTransactionModal && currentTransaction && (
        <TransactionModal
          isOpen={showTransactionModal}
          onClose={() => {
            setShowTransactionModal(false);
            setCurrentTransaction(null);
          }}
          onConfirm={handleTransactionConfirm}
          type={currentTransaction.type}
          suggestionTitle={currentTransaction.suggestionTitle}
          suggestionId={currentTransaction.suggestionId}
        />
      )}
    </div>
  );
}