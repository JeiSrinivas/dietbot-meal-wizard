
import React, { useState, useRef, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useOpenAI } from '@/utils/openaiService';
import { toast } from 'sonner';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm DietBot. How can I help with your nutrition questions today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { sendMessage, loading, error } = useOpenAI(apiKey);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to automatically scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if API key exists in localStorage
    const storedApiKey = localStorage.getItem('openai_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Function to handle sending messages
  const handleSend = async () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Set typing indicator
    setIsTyping(true);
    
    // Get all previous messages in the format OpenAI expects
    const messageHistory = messages
      .filter(msg => msg.sender !== 'bot' || messages.indexOf(msg) !== 0) // Skip initial greeting
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));
    
    // Add the new user message
    messageHistory.push({ role: 'user', content: userMessage.content });
    
    try {
      // Get response from OpenAI
      const botResponseText = await sendMessage(messageHistory);
      
      const botResponse: Message = {
        content: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      console.error('Error getting response:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      toast.success('API key saved successfully');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">DietBot Chat Assistant</h1>
          
          {/* API Key Input */}
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="password"
                placeholder="Enter your OpenAI API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-grow"
              />
              <Button 
                onClick={handleSaveApiKey} 
                className="bg-dietbot-primary hover:bg-dietbot-dark"
                disabled={!apiKey.trim()}
              >
                Save API Key
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Chat messages container */}
            <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-dietbot-primary text-white' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[75%]">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask about diet recommendations for your condition..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  className="flex-grow"
                  disabled={loading || !apiKey}
                />
                <Button 
                  onClick={handleSend} 
                  className="bg-dietbot-primary hover:bg-dietbot-dark"
                  disabled={loading || !apiKey}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {!apiKey ? (
                <p className="text-xs text-amber-600 mt-2">
                  Please enter your OpenAI API key above to start chatting
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-2">
                  Try asking: "What should I eat for diabetes?" or "Recommend foods for hypertension"
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-2">What can DietBot help with?</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
              <li>Dietary recommendations for specific health conditions</li>
              <li>Meal suggestions based on dietary preferences</li>
              <li>Foods to avoid for certain medical conditions</li>
              <li>General nutrition advice and healthy eating tips</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chatbot;
