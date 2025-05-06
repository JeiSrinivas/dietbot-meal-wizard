
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 text-dietbot-primary" />,
      title: 'Personalized Meal Plans',
      description: 'Get meal plans tailored to your specific health conditions and dietary needs'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-dietbot-primary" />,
      title: 'Disease-Specific Recommendations',
      description: 'Dietary advice for diabetes, hypertension, thyroid disorders and more'
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-dietbot-primary" />,
      title: 'AI-Powered Chatbot',
      description: 'Ask questions about your diet and get instant, personalized answers'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-dietbot-light to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-dietbot-dark mb-4">
                  Your Personal <span className="text-dietbot-primary">Diet Assistant</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6">
                  Get personalized meal plans tailored to your health conditions and dietary preferences
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/meal-wizard">
                    <Button className="bg-dietbot-primary hover:bg-dietbot-dark text-white px-8 py-6 rounded-lg text-lg">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/chatbot">
                    <Button variant="outline" className="border-dietbot-primary text-dietbot-primary hover:bg-dietbot-light px-8 py-6 rounded-lg text-lg">
                      Try Chatbot
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white p-4 rounded-2xl shadow-lg max-w-md">
                  <img 
                    src="https://source.unsplash.com/featured/?healthy,food,salad" 
                    alt="Healthy Meal" 
                    className="w-full h-72 object-cover rounded-xl"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">Your personalized meal plan</h3>
                    <p className="text-gray-600">Healthy options based on your conditions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How DietBot Helps You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-dietbot-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to start your healthy journey?</h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Let our AI help you create the perfect meal plan based on your health conditions and preferences.
            </p>
            <Link to="/meal-wizard">
              <Button className="bg-white text-dietbot-primary hover:bg-gray-100 px-8 py-6 rounded-lg text-lg">
                Create Your Meal Plan
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
