
import React, { useState, useRef, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm DietBot. How can I help with your nutrition questions today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample responses for common questions
  const botResponses: Record<string, string[]> = {
    "diabetes": [
      "For diabetes, focus on foods with a low glycemic index like whole grains, legumes, and non-starchy vegetables.",
      "Try to limit refined carbs and sugars. Instead, opt for complex carbohydrates like quinoa, brown rice, and sweet potatoes.",
      "Regular meal timing can help maintain stable blood sugar levels. Try to eat at consistent times each day."
    ],
    "hypertension": [
      "For hypertension, the DASH diet is often recommended - it focuses on fruits, vegetables, whole grains, and lean proteins.",
      "Reducing sodium intake is crucial. Aim for less than 2,300mg per day, or ideally less than 1,500mg.",
      "Foods rich in potassium, like bananas, spinach, and sweet potatoes, can help lower blood pressure."
    ],
    "thyroid": [
      "For thyroid issues, focus on selenium-rich foods like Brazil nuts, tuna, and eggs.",
      "Iodine is important for thyroid function - seaweed, dairy products, and iodized salt are good sources.",
      "Some foods can interfere with thyroid medication, so take your medication on an empty stomach and wait before eating."
    ],
    "weight loss": [
      "For weight loss, focus on creating a calorie deficit through a combination of diet and exercise.",
      "Prioritize high-protein foods and fiber-rich vegetables to help you feel full longer.",
      "Consider intermittent fasting or meal timing strategies that work with your lifestyle."
    ],
    "healthy snacks": [
      "Great healthy snack options include Greek yogurt with berries, apple slices with almond butter, or hummus with veggie sticks.",
      "A handful of nuts or seeds provides healthy fats and protein, making them a satisfying snack.",
      "Roasted chickpeas or edamame make great high-protein, fiber-rich snack options."
    ],
    "vegetarian": [
      "For a balanced vegetarian diet, ensure you're getting enough protein from sources like legumes, tofu, tempeh, and dairy/eggs if included.",
      "Consider supplements for nutrients that can be harder to get from plant foods, like vitamin B12 and omega-3 fatty acids.",
      "Combine different plant proteins (like rice and beans) to get all essential amino acids."
    ]
  };

  // Function to automatically scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to get bot response based on user input
  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for specific keywords in the user's message
    for (const [key, responses] of Object.entries(botResponses)) {
      if (input.includes(key)) {
        // Return a random response from the array of potential responses
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // If no specific keywords are found, return a default response
    return "I'm not sure how to answer that specifically. However, I can provide information about diet recommendations for conditions like diabetes, hypertension, thyroid disorders, or general nutrition advice. Could you please clarify your question?";
  };

  // Function to handle sending messages
  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        content: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">DietBot Chat Assistant</h1>
          
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
                      <p>{message.content}</p>
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
                />
                <Button 
                  onClick={handleSend} 
                  className="bg-dietbot-primary hover:bg-dietbot-dark"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Try asking: "What should I eat for diabetes?" or "Recommend foods for hypertension"
              </p>
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
