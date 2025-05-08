
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeyInput = ({ apiKey, setApiKey }: ApiKeyInputProps) => {
  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      toast.success('API key saved successfully');
    } else {
      toast.error('Please enter a valid API key');
    }
  };

  return (
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
  );
};

export default ApiKeyInput;
