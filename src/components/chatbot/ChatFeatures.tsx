
import React from 'react';

const ChatFeatures = () => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow p-4">
      <h2 className="font-semibold mb-2">What can DietBot help with?</h2>
      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
        <li>Meal preparation advice for common illnesses (flu, cold, fever)</li>
        <li>Dietary recommendations for medical conditions (diabetes, hypertension)</li>
        <li>Nutritional support for recovery after surgery or illness</li>
        <li>Foods to boost immunity and energy levels</li>
        <li>Digestive-friendly meal ideas for stomach issues</li>
      </ul>
    </div>
  );
};

export default ChatFeatures;
