export const mockPlants = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    species: 'Monstera',
    health: 85,
    waterLevel: 40,
    sunlight: 'Bright Indirect',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d40?auto=format&fit=crop&w=500&q=80',
    status: 'Good',
    lastWatered: '2 days ago',
  },
  {
    id: 2,
    name: 'Fiddle Leaf Fig',
    species: 'Ficus lyrata',
    health: 92,
    waterLevel: 75,
    sunlight: 'Full Sun',
    image: 'https://images.unsplash.com/photo-1597055905081-8b15e4f2b968?auto=format&fit=crop&w=500&q=80',
    status: 'Excellent',
    lastWatered: '1 day ago',
  },
  {
    id: 3,
    name: 'Snake Plant',
    species: 'Sansevieria',
    health: 60,
    waterLevel: 20,
    sunlight: 'Low Light',
    image: 'https://images.unsplash.com/photo-1593482892280-924b176722aa?auto=format&fit=crop&w=500&q=80',
    status: 'Needs Water',
    lastWatered: '14 days ago',
  }
];

export const mockTips = [
  "Wipe your plant's leaves with a damp cloth to help them photosynthesize better.",
  "Check the soil moisture before watering to prevent root rot.",
  "Group plants together to create a microclimate with higher humidity."
];

export const mockChatHistory = [
  { id: 1, sender: 'ai', text: 'Hi! I am your PlantPal AI Assistant. How can I help you today?' },
  { id: 2, sender: 'user', text: 'Why are my Monstera leaves turning yellow?' },
  { id: 3, sender: 'ai', text: 'Yellowing leaves on a Monstera are often caused by overwatering. Check if the top 2 inches of soil are dry before watering again. Ensure your pot has good drainage!' },
];
