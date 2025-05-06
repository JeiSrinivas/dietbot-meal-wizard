
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const MealWizard = () => {
  // State for user inputs
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    medicalCondition: '',
    dietaryPreferences: [] as string[],
    allergies: [] as string[]
  });

  // State for meal plan results
  const [mealPlan, setMealPlan] = useState<null | {
    breakfast: { name: string; description: string; image: string; nutrients: { calories: string; protein: string; carbs: string; fat: string } };
    lunch: { name: string; description: string; image: string; nutrients: { calories: string; protein: string; carbs: string; fat: string } };
    dinner: { name: string; description: string; image: string; nutrients: { calories: string; protein: string; carbs: string; fat: string } };
  }>(null);

  // State for current step
  const [step, setStep] = useState(1);

  // List of medical conditions
  const medicalConditions = ["Diabetes", "Hypertension", "Thyroid Disorder", "Obesity", "Heart Disease", "None"];
  
  // List of dietary preferences
  const dietaryPrefs = ["Vegetarian", "Vegan", "Gluten-Free", "Low-Carb", "Keto", "Pescatarian"];
  
  // List of common allergies
  const allergyOptions = ["Dairy", "Nuts", "Seafood", "Eggs", "Soy", "Wheat"];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle checkbox changes for multi-select options
  const handleCheckboxChange = (category: string, item: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        [category]: [...formData[category as keyof typeof formData] as string[], item]
      });
    } else {
      setFormData({
        ...formData,
        [category]: (formData[category as keyof typeof formData] as string[]).filter(i => i !== item)
      });
    }
  };

  // Generate meal plan
  const generateMealPlan = () => {
    // In a real application, this would make an API call to the backend
    // For now, we'll simulate a response
    
    // Mock meal plan based on medical condition
    let mockMealPlan;
    
    if (formData.medicalCondition === "Diabetes") {
      mockMealPlan = {
        breakfast: {
          name: "Low-GI Breakfast Bowl",
          description: "Steel-cut oats with chia seeds, cinnamon, and berries. Perfect for stable blood sugar.",
          image: "https://source.unsplash.com/featured/?oatmeal,breakfast",
          nutrients: { calories: "320", protein: "12g", carbs: "45g", fat: "9g" }
        },
        lunch: {
          name: "Mediterranean Quinoa Salad",
          description: "Quinoa with cucumbers, tomatoes, olives, feta cheese, and olive oil dressing.",
          image: "https://source.unsplash.com/featured/?quinoa,salad",
          nutrients: { calories: "380", protein: "15g", carbs: "42g", fat: "16g" }
        },
        dinner: {
          name: "Baked Fish with Roasted Vegetables",
          description: "Salmon fillet with asparagus, bell peppers, and sweet potatoes.",
          image: "https://source.unsplash.com/featured/?salmon,vegetables",
          nutrients: { calories: "410", protein: "32g", carbs: "23g", fat: "18g" }
        }
      };
    } else if (formData.medicalCondition === "Hypertension") {
      mockMealPlan = {
        breakfast: {
          name: "DASH Diet Smoothie Bowl",
          description: "Banana, berries, spinach smoothie topped with unsalted nuts and seeds.",
          image: "https://source.unsplash.com/featured/?smoothie,bowl",
          nutrients: { calories: "290", protein: "10g", carbs: "42g", fat: "11g" }
        },
        lunch: {
          name: "Low-Sodium Power Bowl",
          description: "Brown rice, unsalted beans, avocado, roasted vegetables, and herbs.",
          image: "https://source.unsplash.com/featured/?bowl,healthy",
          nutrients: { calories: "410", protein: "14g", carbs: "58g", fat: "15g" }
        },
        dinner: {
          name: "Herb-Roasted Chicken with Vegetables",
          description: "Herb-seasoned chicken breast with roasted potatoes and green beans.",
          image: "https://source.unsplash.com/featured/?chicken,vegetables",
          nutrients: { calories: "380", protein: "35g", carbs: "28g", fat: "12g" }
        }
      };
    } else if (formData.medicalCondition === "Thyroid Disorder") {
      mockMealPlan = {
        breakfast: {
          name: "Iodine-Rich Breakfast",
          description: "Greek yogurt parfait with brazil nuts, sea vegetables, and berries.",
          image: "https://source.unsplash.com/featured/?yogurt,parfait",
          nutrients: { calories: "310", protein: "18g", carbs: "32g", fat: "14g" }
        },
        lunch: {
          name: "Selenium-Boosting Salad",
          description: "Spinach salad with tuna, eggs, sunflower seeds, and olive oil dressing.",
          image: "https://source.unsplash.com/featured/?spinach,salad",
          nutrients: { calories: "360", protein: "28g", carbs: "18g", fat: "20g" }
        },
        dinner: {
          name: "Zinc-Rich Dinner Plate",
          description: "Grass-fed beef with pumpkin seeds, mushrooms, and broccoli.",
          image: "https://source.unsplash.com/featured/?beef,vegetables",
          nutrients: { calories: "420", protein: "38g", carbs: "20g", fat: "22g" }
        }
      };
    } else {
      mockMealPlan = {
        breakfast: {
          name: "Balanced Breakfast",
          description: "Whole grain toast with avocado, poached eggs, and fresh fruit.",
          image: "https://source.unsplash.com/featured/?avocado,toast",
          nutrients: { calories: "340", protein: "16g", carbs: "38g", fat: "15g" }
        },
        lunch: {
          name: "Nutritious Grain Bowl",
          description: "Farro with roasted vegetables, chickpeas, and tahini dressing.",
          image: "https://source.unsplash.com/featured/?grain,bowl",
          nutrients: { calories: "390", protein: "14g", carbs: "48g", fat: "17g" }
        },
        dinner: {
          name: "Protein-Packed Dinner",
          description: "Grilled chicken with quinoa and steamed seasonal vegetables.",
          image: "https://source.unsplash.com/featured/?grilled,chicken",
          nutrients: { calories: "405", protein: "35g", carbs: "30g", fat: "14g" }
        }
      };
    }
    
    // Set the meal plan and move to results
    setMealPlan(mockMealPlan);
    setStep(3);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Meal Plan Wizard</h1>
        
        <div className="max-w-3xl mx-auto">
          <Tabs value={`step-${step}`} onValueChange={(value) => setStep(parseInt(value.split('-')[1]))}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="step-1" disabled={step < 1}>Personal Info</TabsTrigger>
              <TabsTrigger value="step-2" disabled={step < 2}>Preferences</TabsTrigger>
              <TabsTrigger value="step-3" disabled={step < 3}>Your Meal Plan</TabsTrigger>
            </TabsList>
            
            <TabsContent value="step-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age" 
                          name="age" 
                          type="number" 
                          placeholder="Enter your age" 
                          value={formData.age} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange('gender', value)}
                          value={formData.gender}
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input 
                          id="weight" 
                          name="weight" 
                          type="number" 
                          placeholder="Enter your weight" 
                          value={formData.weight} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input 
                          id="height" 
                          name="height" 
                          type="number" 
                          placeholder="Enter your height" 
                          value={formData.height} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="activityLevel">Activity Level</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('activityLevel', value)}
                        value={formData.activityLevel}
                      >
                        <SelectTrigger id="activityLevel">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                          <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                          <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                          <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                          <SelectItem value="veryActive">Very active (very hard daily exercise or physical job)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="medicalCondition">Medical Condition</Label>
                      <RadioGroup 
                        onValueChange={(value) => handleSelectChange('medicalCondition', value)}
                        value={formData.medicalCondition}
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {medicalConditions.map((condition) => (
                            <div key={condition} className="flex items-center space-x-2">
                              <RadioGroupItem value={condition} id={`condition-${condition}`} />
                              <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button 
                      className="w-full bg-dietbot-primary hover:bg-dietbot-dark" 
                      onClick={() => setStep(2)}
                      disabled={!formData.age || !formData.gender || !formData.medicalCondition}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="step-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Dietary Preferences</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {dietaryPrefs.map((pref) => (
                          <div key={pref} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`pref-${pref}`} 
                              checked={formData.dietaryPreferences.includes(pref)}
                              onCheckedChange={(checked) => 
                                handleCheckboxChange('dietaryPreferences', pref, checked as boolean)
                              }
                            />
                            <Label htmlFor={`pref-${pref}`}>{pref}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Food Allergies</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {allergyOptions.map((allergy) => (
                          <div key={allergy} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`allergy-${allergy}`} 
                              checked={formData.allergies.includes(allergy)}
                              onCheckedChange={(checked) => 
                                handleCheckboxChange('allergies', allergy, checked as boolean)
                              }
                            />
                            <Label htmlFor={`allergy-${allergy}`}>{allergy}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between gap-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="w-1/2">
                        Back
                      </Button>
                      <Button 
                        className="w-1/2 bg-dietbot-primary hover:bg-dietbot-dark" 
                        onClick={generateMealPlan}
                      >
                        Generate Meal Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="step-3">
              <Card>
                <CardContent className="pt-6">
                  {mealPlan ? (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Your Personalized Meal Plan</h2>
                        <p className="text-gray-600">Based on your {formData.medicalCondition} condition and preferences</p>
                      </div>
                      
                      {/* Breakfast */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <img 
                              src={mealPlan.breakfast.image} 
                              alt={mealPlan.breakfast.name} 
                              className="h-48 w-full object-cover"
                            />
                          </div>
                          <div className="p-4 md:w-2/3">
                            <div className="uppercase tracking-wide text-sm text-dietbot-primary font-semibold">Breakfast</div>
                            <h3 className="font-bold text-xl mt-1">{mealPlan.breakfast.name}</h3>
                            <p className="mt-2 text-gray-600">{mealPlan.breakfast.description}</p>
                            
                            <div className="mt-4 flex flex-wrap gap-3">
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                {mealPlan.breakfast.nutrients.calories} kcal
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Protein: {mealPlan.breakfast.nutrients.protein}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Carbs: {mealPlan.breakfast.nutrients.carbs}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Fat: {mealPlan.breakfast.nutrients.fat}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Lunch */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <img 
                              src={mealPlan.lunch.image} 
                              alt={mealPlan.lunch.name} 
                              className="h-48 w-full object-cover"
                            />
                          </div>
                          <div className="p-4 md:w-2/3">
                            <div className="uppercase tracking-wide text-sm text-dietbot-primary font-semibold">Lunch</div>
                            <h3 className="font-bold text-xl mt-1">{mealPlan.lunch.name}</h3>
                            <p className="mt-2 text-gray-600">{mealPlan.lunch.description}</p>
                            
                            <div className="mt-4 flex flex-wrap gap-3">
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                {mealPlan.lunch.nutrients.calories} kcal
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Protein: {mealPlan.lunch.nutrients.protein}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Carbs: {mealPlan.lunch.nutrients.carbs}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Fat: {mealPlan.lunch.nutrients.fat}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dinner */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/3">
                            <img 
                              src={mealPlan.dinner.image} 
                              alt={mealPlan.dinner.name} 
                              className="h-48 w-full object-cover"
                            />
                          </div>
                          <div className="p-4 md:w-2/3">
                            <div className="uppercase tracking-wide text-sm text-dietbot-primary font-semibold">Dinner</div>
                            <h3 className="font-bold text-xl mt-1">{mealPlan.dinner.name}</h3>
                            <p className="mt-2 text-gray-600">{mealPlan.dinner.description}</p>
                            
                            <div className="mt-4 flex flex-wrap gap-3">
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                {mealPlan.dinner.nutrients.calories} kcal
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Protein: {mealPlan.dinner.nutrients.protein}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Carbs: {mealPlan.dinner.nutrients.carbs}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                Fat: {mealPlan.dinner.nutrients.fat}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between gap-4">
                        <Button variant="outline" onClick={() => setStep(2)} className="w-1/2">
                          Back
                        </Button>
                        <Button 
                          className="w-1/2 bg-dietbot-primary hover:bg-dietbot-dark" 
                          onClick={() => {
                            setStep(1);
                            setMealPlan(null);
                          }}
                        >
                          Start Over
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-dietbot-primary border-solid mx-auto mb-4"></div>
                      <p>Generating your personalized meal plan...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MealWizard;
