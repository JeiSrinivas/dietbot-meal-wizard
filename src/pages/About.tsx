
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">About DietBot</h1>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  DietBot was created to help individuals with specific medical conditions make informed dietary choices. 
                  Our AI-powered platform provides personalized meal recommendations based on medical conditions, 
                  personal preferences, and nutritional needs. We believe that good nutrition is a cornerstone of 
                  managing chronic conditions and improving quality of life.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How DietBot Works</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  DietBot uses a sophisticated algorithm that combines medical dietary guidelines with personal preferences
                  to create customized meal plans. Our system considers:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Medical conditions and their specific dietary requirements</li>
                  <li>Personal information such as age, gender, and activity level</li>
                  <li>Food preferences and allergies</li>
                  <li>Nutritional balance and portion control</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Health Conditions We Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Diabetes</h3>
                    <p className="text-gray-700">
                      Our recommendations focus on low-glycemic foods that help maintain stable blood sugar levels
                      while providing essential nutrients.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Hypertension</h3>
                    <p className="text-gray-700">
                      We suggest meals aligned with the DASH diet approach, emphasizing low sodium options and
                      foods rich in potassium, calcium, and magnesium.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Thyroid Disorders</h3>
                    <p className="text-gray-700">
                      Our meal plans consider foods that support thyroid function while avoiding those that may
                      interfere with medication or hormone production.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Obesity</h3>
                    <p className="text-gray-700">
                      We provide balanced, nutritious meals with appropriate portion sizes and nutrient density to
                      support healthy weight management.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Our Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  DietBot was developed by a multidisciplinary team of:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Clinical Nutritionists with expertise in medical nutrition therapy</li>
                  <li>Software Engineers specialized in AI and machine learning</li>
                  <li>Healthcare Professionals with experience in chronic disease management</li>
                  <li>User Experience Designers focused on healthcare applications</li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="bg-dietbot-primary rounded-lg p-6 text-white text-center">
              <h2 className="text-xl font-bold mb-3">Ready to create your personalized meal plan?</h2>
              <p className="mb-4">
                Start your journey to better health through proper nutrition tailored to your needs.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="/meal-wizard" className="bg-white text-dietbot-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
