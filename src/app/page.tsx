'use client';

import { useState } from 'react';
import { ChatInterface } from "@/components/chat/chat-interface";
import { LandingPage } from "@/components/landing-page";

const page = () => {
  const [showApp, setShowApp] = useState(false);

  const handleEnterApp = () => {
    console.log('Entering app, showApp state changing to true');
    setShowApp(true);
  };

  console.log('Page component rendered, showApp state:', showApp);

  if (showApp) {
    console.log('Rendering ChatInterface');
    return (
      <main className="min-h-screen bg-main">
        <ChatInterface />
      </main>
    );
  }

  console.log('Rendering LandingPage');
  return (
    <main className="min-h-screen">
      <LandingPage onEnter={handleEnterApp} />
    </main>
  );
};

export default page;