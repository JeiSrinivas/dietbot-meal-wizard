
import { useState, useEffect } from 'react';
import { useOpenAI } from '@/utils/openaiService';
import { toast } from 'sonner';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const useChatbot = () => {
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

  return {
    input,
    setInput,
    apiKey,
    setApiKey,
    messages,
    isTyping,
    loading,
    handleSend
  };
};
