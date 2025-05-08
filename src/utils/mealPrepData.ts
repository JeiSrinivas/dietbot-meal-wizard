
interface MealPrepResponse {
  keywords: string[];
  response: string;
}

export const mealPrepResponses: MealPrepResponse[] = [
  {
    keywords: ['illness type', 'what illness', 'which illness'],
    response: "Please choose from: cold, flu, fever, diabetes, or general weakness."
  },
  {
    keywords: ['veg or non', 'vegetarian', 'non-vegetarian', 'nonveg', 'non veg'],
    response: "Veg: khichdi, dal rice, moong dal soup, paneer curry, mixed veg stew.\n\nNon-veg: chicken broth, boiled egg, grilled fish, chicken soup, soft rice with fish curry."
  },
  {
    keywords: ['allergies', 'allergy', 'allergic'],
    response: "Please avoid ingredients like nuts, dairy, or gluten if allergic. Let me know your allergy and I'll adjust the meal accordingly."
  },
  {
    keywords: ['meal time', 'mealtime', 'time of meal', 'when to eat'],
    response: "Breakfast: oats porridge, boiled eggs, fruit bowl, upma.\n\nLunch: khichdi, dal chawal, veg curry with rice or chapati.\n\nDinner: soup, lightly sautéed vegetables, curd rice, grilled tofu."
  },
  {
    keywords: ['symptoms', 'direct choice', 'what symptoms'],
    response: "If symptoms: please type them (e.g., cold, body pain, fatigue).\n\nIf direct choice: just tell me your illness or preferred meal type (e.g., high protein veg)."
  },
  {
    keywords: ['flu', 'cold', 'fever', 'cough'],
    response: "For flu or cold, focus on hydrating foods like chicken soup, herbal teas with honey, and broths. Foods rich in vitamin C (citrus, berries) and zinc (pumpkin seeds) can support your immune system. Aim for easy-to-digest meals like rice porridge, baked sweet potatoes, and steamed vegetables. Stay hydrated with water, electrolyte drinks, and herbal teas."
  },
  {
    keywords: ['stomach', 'gastritis', 'digestive', 'nausea', 'diarrhea', 'vomiting'],
    response: "For digestive issues, stick to the BRAT diet (Bananas, Rice, Applesauce, Toast) initially. Gradually add plain boiled chicken, steamed white fish, and well-cooked vegetables. Avoid spicy, fatty, and dairy-rich foods. Ginger or peppermint tea can help with nausea. Stay hydrated with water and electrolyte solutions, especially if experiencing diarrhea or vomiting."
  },
  {
    keywords: ['diabetes', 'blood sugar', 'glucose'],
    response: "For diabetes, focus on balanced meals with low glycemic index foods. Include lean proteins (chicken, fish, tofu), non-starchy vegetables, whole grains (quinoa, brown rice), and healthy fats (avocado, nuts). Meal prep ideas: overnight oats with cinnamon and berries; chicken and vegetable stir-fry with brown rice; baked fish with roasted vegetables. Monitor carbohydrate portions and distribute them evenly throughout the day."
  },
  {
    keywords: ['hypertension', 'blood pressure', 'heart', 'cardiac'],
    response: "For high blood pressure, prepare low-sodium meals rich in potassium, magnesium, and calcium. Focus on the DASH diet approach with plenty of vegetables, fruits, whole grains, and lean proteins. Meal prep ideas: overnight oatmeal with berries; quinoa bowls with roasted vegetables and grilled chicken; baked salmon with steamed vegetables and brown rice. Avoid processed foods and use herbs and spices instead of salt for flavoring."
  },
  {
    keywords: ['cancer', 'chemo', 'chemotherapy', 'radiation'],
    response: "For cancer patients, especially those undergoing treatment: Focus on nutrient-dense, soft foods that are gentle on the system. Protein is crucial - try smoothies with protein powder, Greek yogurt with honey, egg-based dishes, and tender chicken. For nausea, try ginger tea and small frequent meals. Cold foods often work better if there are taste changes or mouth sores. Stay hydrated and consider fortifying foods with healthy fats like olive oil or avocado to increase calorie intake if weight loss is a concern."
  },
  {
    keywords: ['recovery', 'surgery', 'post-op', 'operation', 'healing'],
    response: "For post-surgery recovery, focus on protein-rich foods to support healing: eggs, Greek yogurt, lean meats, fish, and plant proteins. Include vitamin C rich foods (bell peppers, citrus, berries) and zinc sources (pumpkin seeds, meat) to support wound healing. Fiber-rich foods like whole grains and cooked vegetables can help prevent constipation from pain medications. Meal prep ideas: vegetable frittatas, chicken and vegetable soup, baked fish with quinoa, and smoothies with protein powder and fruits."
  },
  {
    keywords: ['immune', 'immunity', 'resistance', 'white blood cells'],
    response: "To boost immunity, focus on nutrient-dense foods rich in vitamins A, C, D, E, zinc, and selenium. Meal prep ideas: colorful vegetable soups with garlic and ginger; citrus and berry fruit salads; yogurt parfaits with berries and nuts; sheet pan meals with colorful vegetables and lean proteins; turmeric and ginger tea with honey and lemon. Include fermented foods like yogurt and kimchi for gut health, which is linked to immune function."
  },
  {
    keywords: ['fatigue', 'energy', 'tired', 'exhaustion', 'anemia'],
    response: "For fatigue and low energy, focus on iron-rich foods (lean red meat, spinach, lentils), complex carbohydrates for sustained energy (oats, sweet potatoes, quinoa), and protein (eggs, chicken, tofu). Include vitamin C sources with iron-rich plant foods to enhance absorption. Meal prep ideas: overnight oats with nuts and berries; grain bowls with lean protein and vegetables; energy balls with dates, nuts, and seeds; vegetable and bean soups. Stay hydrated and consider smaller, more frequent meals."
  }
];

export const defaultResponse = "For meal preparation when sick, focus on easily digestible, nutrient-dense foods. Hydration is key - prepare broths, herbal teas, and infused water. For general illness, consider homemade soups with vegetables and lean protein, steamed vegetables, and gentle grains like rice or oatmeal. Simple proteins like poached chicken or baked fish are usually well-tolerated. Ginger and turmeric can help with inflammation. For specific conditions, please ask about them directly, such as 'What should I eat for diabetes?' or 'Best foods for recovery after surgery?'";

export const findMealPrepResponse = (query: string): string => {
  const lowercaseQuery = query.toLowerCase();
  
  for (const item of mealPrepResponses) {
    if (item.keywords.some(keyword => lowercaseQuery.includes(keyword))) {
      return item.response;
    }
  }
  
  return defaultResponse;
};
