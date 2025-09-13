import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const wallet = searchParams.get('wallet');
  
  if (!wallet) {
    return new Response('Wallet address required', { status: 400 });
  }
  
  // Create SSE stream
  const encoder = new TextEncoder();
  
  const customReadable = new ReadableStream({
    start(controller) {
      // Send initial connection status
      const connectionEvent = {
        type: 'connection_status',
        data: { connected: true }
      };
      
      controller.enqueue(
        encoder.encode(`data: ${JSON.stringify(connectionEvent)}\n\n`)
      );
      
      // Simulate periodic AI responses (in real app, this would be triggered by actual AI responses)
      const interval = setInterval(() => {
        // This is just a demo - in production, you'd listen for actual AI responses
        const demoResponses = [
          "Based on current market conditions, I recommend considering diversified DeFi strategies.",
          "Your portfolio shows good diversification across different protocols.",
          "Gas fees are currently low - might be a good time for transactions.",
          "Consider taking profits on your leveraged positions given recent volatility."
        ];
        
        const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
        const messageId = `ai_${Date.now()}`;
        
        // Send message in chunks to simulate streaming
        const chunks = randomResponse.split(' ');
        let chunkIndex = 0;
        
        const chunkInterval = setInterval(() => {
          if (chunkIndex < chunks.length) {
            const chunk = chunks[chunkIndex] + ' ';
            const chunkEvent = {
              type: 'message_chunk',
              data: { content: chunk, messageId }
            };
            
            try {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(chunkEvent)}\n\n`)
              );
            } catch (error) {
              clearInterval(chunkInterval);
              return;
            }
            
            chunkIndex++;
          } else {
            // Send completion event
            const completeEvent = {
              type: 'message_complete',
              data: { messageId }
            };
            
            try {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(completeEvent)}\n\n`)
              );
            } catch (error) {
              // Stream closed
            }
            
            clearInterval(chunkInterval);
          }
        }, 100);
      }, 15000); // Send demo message every 15 seconds
      
      // Cleanup function
      const cleanup = () => {
        clearInterval(interval);
        try {
          controller.close();
        } catch (error) {
          // Stream already closed
        }
      };
      
      // Handle client disconnect
      request.signal.addEventListener('abort', cleanup);
      
      // Cleanup after 5 minutes
      setTimeout(cleanup, 5 * 60 * 1000);
    },
  });
  
  return new Response(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}