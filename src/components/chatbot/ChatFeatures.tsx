
import React from 'react';

const ChatFeatures = () => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold mb-2">What can DietBot help with?</h2>
      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
        <li>Dietary recommendations for specific health conditions</li>
        <li>Meal suggestions based on dietary preferences</li>
        <li>Foods to avoid for certain medical conditions</li>
        <li>General nutrition advice and healthy eating tips</li>
      </ul>
    </div>
  );
};

export default ChatFeatures;
