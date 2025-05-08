
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSend: () => void;
  isDisabled: boolean;
  apiKeyExists: boolean;
}

const ChatInput = ({ input, setInput, handleSend, isDisabled, apiKeyExists }: ChatInputProps) => {
  return (
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
          disabled={isDisabled}
        />
        <Button 
          onClick={handleSend} 
          className="bg-dietbot-primary hover:bg-dietbot-dark"
          disabled={isDisabled}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      {!apiKeyExists ? (
        <p className="text-xs text-amber-600 mt-2">
          Please enter your OpenAI API key above to start chatting
        </p>
      ) : (
        <p className="text-xs text-gray-500 mt-2">
          Try asking: "What should I eat for diabetes?" or "Recommend foods for hypertension"
        </p>
      )}
    </div>
  );
};

export default ChatInput;
