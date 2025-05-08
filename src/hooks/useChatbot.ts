
import { useState, useEffect } from 'react';
import { useOpenAI } from '@/utils/openaiService';
import { toast } from 'sonner';
import { findMealPrepResponse } from '@/utils/mealPrepData';

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
      content: "Hi there! I'm DietBot. How can I help with your nutrition questions today? Try asking me one of the questions below.",
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
    
    try {
      let botResponseText = '';
      
      // Use API if key exists, otherwise use hardcoded responses
      if (apiKey) {
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
          botResponseText = await sendMessage(messageHistory);
        } catch (err) {
          // Fallback to hardcoded responses if API fails
          console.error('API call failed, using fallback responses');
          botResponseText = findMealPrepResponse(userMessage.content);
        }
      } else {
        // Use hardcoded responses when no API key
        setTimeout(() => {
          botResponseText = findMealPrepResponse(userMessage.content);
        }, 500); // Add a small delay to simulate thinking
        
        // Wait for the timeout to complete
        await new Promise(resolve => setTimeout(resolve, 600));
      }
      
      const botResponse: Message = {
        content: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      console.error('Error getting response:', err);
      toast.error('Failed to get a response. Please try again.');
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
