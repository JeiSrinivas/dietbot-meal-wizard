
// OpenAI API service for chat completions
import { useState } from 'react';
import { findMealPrepResponse } from './mealPrepData';

interface OpenAIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OpenAIResponse {
  content: string;
  loading: boolean;
  error: string | null;
}

export const useOpenAI = (apiKey: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (messages: OpenAIMessage[]): Promise<string> => {
    setLoading(true);
    setError(null);
    
    // Get the latest user message
    const userMessage = messages[messages.length - 1].content;
    
    // If no API key, use local response system
    if (!apiKey || apiKey.trim() === '') {
      setLoading(false);
      return findMealPrepResponse(userMessage);
    }
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system', 
              content: 'You are DietBot, an AI assistant specialized in nutrition and dietary advice particularly for sick people and those with medical conditions. Provide helpful, evidence-based information about meal preparation and nutrition for various health conditions like flu, cold, diabetes, hypertension, digestive issues, post-surgery recovery, and immune support. Keep responses concise, practical and focused on meal preparation.'
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to get response from OpenAI');
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;
      return botResponse;
    } catch (err: any) {
      const errorMessage = err.message || 'Error connecting to OpenAI API';
      console.error('OpenAI API error:', errorMessage);
      
      // Use fallback response system when API fails
      return findMealPrepResponse(userMessage);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};
