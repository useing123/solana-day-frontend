'use client';

import { cn } from "@/lib/utils";

interface MessageProps {
  content: string;
  sender: 'assistant' | 'system';
  timestamp: Date;
  className?: string;
}

export function Message({ content, sender, timestamp, className }: MessageProps) {
  const isSystem = sender === 'system';

  return (
    <div className={cn("flex w-full gap-3", className)}>
      {!isSystem && (
        <div className="bg-black text-white w-10 h-10 flex items-center justify-center font-bold text-lg border-2 border-black">
          AI
        </div>
      )}

      <div className="flex-1">
        <div className={cn(
          "border-2 border-black p-3 font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          sender === 'assistant' && "bg-cyan-400 text-black",
          isSystem && "bg-yellow-400 text-black"
        )}>
          {content}
        </div>

        <div className="mt-1 text-xs font-bold text-gray-600">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}