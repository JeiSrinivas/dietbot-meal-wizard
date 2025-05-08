
import React from 'react';

const ChatFeatures = () => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold mb-2">Ask DietBot these questions:</h2>
      <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
        <li><span className="font-medium">Illness type?</span> - Find out which illnesses the bot can help with</li>
        <li><span className="font-medium">Veg or non-veg?</span> - Get meal suggestions based on your dietary preference</li>
        <li><span className="font-medium">Any allergies?</span> - Learn how to adapt meals for allergies</li>
        <li><span className="font-medium">Meal time?</span> - Discover meals suitable for different times of day</li>
        <li><span className="font-medium">Symptoms or direct choice?</span> - Understand how to ask for advice</li>
      </ul>
      <p className="text-xs text-gray-500 mt-2 italic">You can also ask about specific conditions like "diabetes" or "fever"</p>
    </div>
  );
};

export default ChatFeatures;
