
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
          placeholder="Ask about meal prep for specific health conditions..."
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
        <p className="text-xs text-gray-600 mt-2">
          No API key needed! You can still chat about meal preparation for health conditions.
        </p>
      ) : (
        <p className="text-xs text-gray-500 mt-2">
          Try asking: "What meals can help with flu recovery?" or "Suggest meal prep for diabetes"
        </p>
      )}
    </div>
  );
};

export default ChatInput;
