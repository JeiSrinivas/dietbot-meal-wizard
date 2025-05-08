
import React from 'react';

interface ChatMessageProps {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatMessage = ({ content, sender, timestamp }: ChatMessageProps) => {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[75%] rounded-lg p-3 ${
          sender === 'user' 
            ? 'bg-dietbot-primary text-white' 
            : 'bg-white border border-gray-200'
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        <p className={`text-xs mt-1 ${
          sender === 'user' ? 'text-white/70' : 'text-gray-500'
        }`}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
