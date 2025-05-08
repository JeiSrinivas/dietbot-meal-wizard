
// OpenAI API service for chat completions
import { useState } from 'react';

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
    if (!apiKey || apiKey.trim() === '') {
      setError('API key is required. Please enter your OpenAI API key.');
      return 'API key is required. Please enter your OpenAI API key.';
    }

    setLoading(true);
    setError(null);
    
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
              content: 'You are DietBot, an AI assistant specialized in nutrition and dietary advice. Provide helpful, evidence-based information about nutrition for various health conditions like diabetes, hypertension, thyroid disorders, and general healthy eating. Keep responses concise and practical.'
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
      setError(errorMessage);
      return `Error: ${errorMessage}`;
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};
