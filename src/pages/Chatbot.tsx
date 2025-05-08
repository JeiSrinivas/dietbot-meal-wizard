
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ApiKeyInput from '@/components/chatbot/ApiKeyInput';
import ChatMessages from '@/components/chatbot/ChatMessages';
import ChatInput from '@/components/chatbot/ChatInput';
import ChatFeatures from '@/components/chatbot/ChatFeatures';
import { useChatbot } from '@/hooks/useChatbot';

const Chatbot = () => {
  const {
    input,
    setInput,
    apiKey,
    setApiKey,
    messages,
    isTyping,
    loading,
    handleSend
  } = useChatbot();

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">DietBot Chat Assistant</h1>
          
          <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ChatMessages messages={messages} isTyping={isTyping} />
            
            <ChatInput 
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              isDisabled={loading || !apiKey}
              apiKeyExists={!!apiKey}
            />
          </div>

          <ChatFeatures />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chatbot;
