'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface StreamEvent {
  type: 'message_chunk' | 'message_complete' | 'error' | 'connection_status';
  data: {
    content?: string;
    messageId?: string;
    error?: string;
    connected?: boolean;
  };
}

interface UseChatStreamOptions {
  onMessageChunk?: (chunk: string, messageId: string) => void;
  onMessageComplete?: (content: string, messageId: string) => void;
  onError?: (error: string) => void;
  onConnectionChange?: (connected: boolean) => void;
}

export function useChatStream(options: UseChatStreamOptions = {}) {
  const { publicKey } = useWallet();
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageBufferRef = useRef<Map<string, string>>(new Map());
  
  const { onMessageChunk, onMessageComplete, onError, onConnectionChange } = options;
  
  const connect = useCallback(() => {
    if (!publicKey) return;
    
    try {
      // Close existing connection
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      
      // Create new SSE connection (would typically be to your backend API)
      const eventSource = new EventSource(
        `/api/chat/stream?wallet=${publicKey.toString()}`,
        { withCredentials: true }
      );
      
      eventSourceRef.current = eventSource;
      
      eventSource.onopen = () => {
        setIsConnected(true);
        setError(null);
        onConnectionChange?.(true);
        console.log('Chat stream connected');
      };
      
      eventSource.onmessage = (event) => {
        try {
          const streamEvent: StreamEvent = JSON.parse(event.data);
          
          switch (streamEvent.type) {
            case 'message_chunk':
              if (streamEvent.data.content && streamEvent.data.messageId) {
                const messageId = streamEvent.data.messageId;
                const currentBuffer = messageBufferRef.current.get(messageId) || '';
                const updatedBuffer = currentBuffer + streamEvent.data.content;
                
                messageBufferRef.current.set(messageId, updatedBuffer);
                onMessageChunk?.(streamEvent.data.content, messageId);
              }
              break;
              
            case 'message_complete':
              if (streamEvent.data.messageId) {
                const messageId = streamEvent.data.messageId;
                const fullMessage = messageBufferRef.current.get(messageId) || '';
                
                onMessageComplete?.(fullMessage, messageId);
                messageBufferRef.current.delete(messageId);
              }
              break;
              
            case 'error':
              if (streamEvent.data.error) {
                setError(streamEvent.data.error);
                onError?.(streamEvent.data.error);
              }
              break;
          }
        } catch (err) {
          console.error('Failed to parse SSE message:', err);
        }
      };
      
      eventSource.onerror = () => {
        setIsConnected(false);
        setError('Connection lost');
        onConnectionChange?.(false);
        
        // Attempt reconnection after delay
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 3000);
      };
      
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMsg);
      onError?.(errorMsg);
    }
  }, [publicKey, onMessageChunk, onMessageComplete, onError, onConnectionChange]);
  
  const disconnect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    setIsConnected(false);
    setError(null);
    messageBufferRef.current.clear();
    onConnectionChange?.(false);
  }, [onConnectionChange]);
  
  const sendMessage = useCallback(async (content: string): Promise<string> => {
    if (!publicKey || !isConnected) {
      throw new Error('Not connected');
    }
    
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Send message to backend API
      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          wallet: publicKey.toString(),
          messageId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      return messageId;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMsg);
      onError?.(errorMsg);
      throw err;
    }
  }, [publicKey, isConnected, onError]);
  
  // Auto-connect when wallet is connected
  useEffect(() => {
    if (publicKey) {
      connect();
    } else {
      disconnect();
    }
    
    return disconnect;
  }, [publicKey, connect, disconnect]);
  
  return {
    isConnected,
    error,
    connect,
    disconnect,
    sendMessage,
  };
}