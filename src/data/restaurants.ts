export interface MenuItemData {
  name: string;
  description: string;
  price: number;
}

export interface MenuCategory {
  category: string;
  items: MenuItemData[];
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: '$' | '$$' | '$$$';
  rating: number;
  description: string;
  image: string;
  menu: MenuCategory[];
}

export const restaurants: Restaurant[] = [
  {
    id: 'bella-napoli',
    name: 'Bella Napoli',
    cuisine: 'Italian',
    priceRange: '$$',
    rating: 4.5,
    description: 'Authentic Neapolitan pizza and handmade pasta in a cozy trattoria setting.',
    image: '#C62828',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Bruschetta Trio', description: 'Tomato basil, mushroom, and olive tapenade on grilled ciabatta', price: 12 },
          { name: 'Burrata Caprese', description: 'Creamy burrata with heirloom tomatoes and basil pesto', price: 15 },
          { name: 'Calamari Fritti', description: 'Crispy fried calamari with marinara and lemon aioli', price: 14 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Margherita Pizza', description: 'San Marzano tomatoes, fresh mozzarella, basil, extra virgin olive oil', price: 18 },
          { name: 'Cacio e Pepe', description: 'Handmade tonnarelli with pecorino romano and black pepper', price: 20 },
          { name: 'Chicken Parmigiana', description: 'Breaded chicken cutlet with marinara and melted mozzarella', price: 22 },
          { name: 'Risotto ai Funghi', description: 'Arborio rice with wild mushrooms, parmesan, and truffle oil', price: 24 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Tiramisu', description: 'Classic layered mascarpone, espresso, and ladyfingers', price: 10 },
          { name: 'Panna Cotta', description: 'Vanilla bean panna cotta with berry compote', price: 9 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'House Chianti', description: 'Glass of Tuscan red wine', price: 12 },
          { name: 'Limoncello Spritz', description: 'Limoncello, prosecco, and soda water', price: 14 },
        ],
      },
    ],
  },
  {
    id: 'taco-loco',
    name: 'Taco Loco',
    cuisine: 'Mexican',
    priceRange: '$',
    rating: 4.2,
    description: 'Street-style tacos and burritos with bold, authentic flavors.',
    image: '#F9A825',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Chips & Guacamole', description: 'Fresh-made guac with warm tortilla chips', price: 8 },
          { name: 'Elote', description: 'Grilled corn with mayo, cotija cheese, chile, and lime', price: 6 },
          { name: 'Queso Fundido', description: 'Melted cheese with chorizo and flour tortillas', price: 10 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Street Tacos (3)', description: 'Choice of carne asada, al pastor, or carnitas on corn tortillas', price: 12 },
          { name: 'Burrito Supreme', description: 'Flour tortilla stuffed with rice, beans, meat, cheese, and salsa', price: 14 },
          { name: 'Quesadilla Grande', description: 'Grilled flour tortilla with cheese, peppers, and chicken', price: 13 },
          { name: 'Enchiladas Rojas', description: 'Three corn tortillas filled with chicken, topped with red sauce', price: 15 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Churros', description: 'Crispy cinnamon-sugar churros with chocolate sauce', price: 7 },
          { name: 'Tres Leches Cake', description: 'Sponge cake soaked in three milks with whipped cream', price: 8 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'Horchata', description: 'Creamy rice and cinnamon drink', price: 4 },
          { name: 'Margarita', description: 'Classic lime margarita, on the rocks or frozen', price: 10 },
        ],
      },
    ],
  },
  {
    id: 'thai-orchid',
    name: 'Thai Orchid',
    cuisine: 'Thai',
    priceRange: '$$',
    rating: 4.7,
    description: 'Fragrant curries and stir-fries made with fresh herbs and spices.',
    image: '#7B1FA2',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with sweet chili sauce', price: 8 },
          { name: 'Tom Yum Soup', description: 'Spicy and sour soup with shrimp, mushrooms, and lemongrass', price: 10 },
          { name: 'Satay Chicken', description: 'Grilled chicken skewers with peanut sauce', price: 11 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Pad Thai', description: 'Stir-fried rice noodles with shrimp, tofu, peanuts, and bean sprouts', price: 16 },
          { name: 'Green Curry', description: 'Coconut milk curry with bamboo shoots, basil, and chicken', price: 18 },
          { name: 'Massaman Curry', description: 'Rich peanut curry with potatoes, onions, and beef', price: 19 },
          { name: 'Basil Fried Rice', description: 'Jasmine rice stir-fried with Thai basil, vegetables, and egg', price: 15 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Mango Sticky Rice', description: 'Sweet sticky rice with fresh mango and coconut cream', price: 9 },
          { name: 'Thai Iced Tea Panna Cotta', description: 'Creamy panna cotta infused with Thai tea', price: 8 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'Thai Iced Tea', description: 'Sweet and creamy iced tea with condensed milk', price: 5 },
          { name: 'Coconut Water', description: 'Fresh young coconut water', price: 4 },
        ],
      },
    ],
  },
  {
    id: 'smokehouse-bbq',
    name: 'Smokehouse BBQ',
    cuisine: 'BBQ',
    priceRange: '$$',
    rating: 4.4,
    description: 'Low-and-slow smoked meats with homemade sauces and classic sides.',
    image: '#4E342E',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Smoked Wings', description: 'Slow-smoked chicken wings with dry rub or sauce', price: 13 },
          { name: 'Loaded Nachos', description: 'Tortilla chips with pulled pork, cheese, jalapeños, and sour cream', price: 12 },
          { name: 'Cornbread Muffins', description: 'Sweet honey cornbread with whipped butter', price: 6 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Brisket Plate', description: '12-hour smoked beef brisket with two sides', price: 24 },
          { name: 'Pulled Pork Sandwich', description: 'Hickory-smoked pulled pork on a brioche bun with coleslaw', price: 16 },
          { name: 'Baby Back Ribs', description: 'Full rack of St. Louis-style ribs with BBQ sauce', price: 28 },
          { name: 'Smoked Chicken Half', description: 'Half chicken rubbed with house spice blend, two sides', price: 18 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Pecan Pie', description: 'Classic Southern pecan pie with whipped cream', price: 8 },
          { name: 'Banana Pudding', description: 'Layered vanilla pudding with bananas and wafers', price: 7 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'Sweet Tea', description: 'Southern-style sweetened iced tea', price: 3 },
          { name: 'Craft Root Beer', description: 'House-made root beer', price: 5 },
        ],
      },
    ],
  },
  {
    id: 'sakura-sushi',
    name: 'Sakura Sushi',
    cuisine: 'Sushi',
    priceRange: '$$$',
    rating: 4.8,
    description: 'Premium sushi and sashimi crafted by a master chef using the freshest fish.',
    image: '#E91E63',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Edamame', description: 'Steamed soybeans with sea salt', price: 6 },
          { name: 'Miso Soup', description: 'Traditional dashi broth with tofu, wakame, and scallions', price: 5 },
          { name: 'Tuna Tataki', description: 'Seared tuna with ponzu sauce and microgreens', price: 16 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Omakase (8 pc)', description: "Chef's selection of eight premium nigiri pieces", price: 45 },
          { name: 'Dragon Roll', description: 'Shrimp tempura inside, avocado and eel on top with unagi sauce', price: 22 },
          { name: 'Sashimi Platter', description: 'Assortment of 15 pieces of fresh sashimi', price: 38 },
          { name: 'Spicy Tuna Roll', description: 'Fresh tuna with spicy mayo, cucumber, and tobiko', price: 16 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Mochi Ice Cream', description: 'Assorted mochi ice cream (matcha, strawberry, mango)', price: 8 },
          { name: 'Yuzu Sorbet', description: 'Refreshing Japanese citrus sorbet', price: 7 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'Hot Sake', description: 'Premium junmai sake, served warm', price: 10 },
          { name: 'Matcha Latte', description: 'Ceremonial grade matcha with steamed milk', price: 6 },
        ],
      },
    ],
  },
  {
    id: 'green-leaf-cafe',
    name: 'Green Leaf Cafe',
    cuisine: 'Vegan',
    priceRange: '$$',
    rating: 4.3,
    description: 'Creative plant-based dishes that prove vegan food can be exciting and delicious.',
    image: '#2E7D32',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Avocado Toast', description: 'Sourdough with smashed avocado, hemp seeds, and chili flakes', price: 11 },
          { name: 'Cauliflower Wings', description: 'Crispy battered cauliflower with buffalo sauce', price: 10 },
          { name: 'Spring Greens Salad', description: 'Mixed greens with citrus vinaigrette and candied walnuts', price: 12 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Buddha Bowl', description: 'Quinoa, roasted vegetables, hummus, and tahini dressing', price: 16 },
          { name: 'Impossible Burger', description: 'Plant-based patty with vegan cheese, lettuce, and special sauce', price: 17 },
          { name: 'Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms and nutritional yeast', price: 19 },
          { name: 'Thai Coconut Curry', description: 'Vegetables and tofu in coconut curry over jasmine rice', price: 18 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Raw Chocolate Cake', description: 'Cashew-based chocolate cake with date crust', price: 10 },
          { name: 'Açaí Bowl', description: 'Blended açaí with granola, coconut, and fresh fruit', price: 12 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'Green Smoothie', description: 'Spinach, banana, mango, and oat milk', price: 8 },
          { name: 'Cold Brew', description: 'Slow-dripped cold brew with oat milk', price: 6 },
        ],
      },
    ],
  },
  {
    id: 'burger-barn',
    name: 'Burger Barn',
    cuisine: 'American',
    priceRange: '$',
    rating: 4.0,
    description: 'Juicy hand-smashed burgers, crispy fries, and thick milkshakes.',
    image: '#FF6F00',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Onion Rings', description: 'Beer-battered onion rings with ranch dipping sauce', price: 8 },
          { name: 'Mozzarella Sticks', description: 'Golden fried mozzarella with marinara sauce', price: 9 },
          { name: 'Loaded Fries', description: 'Crispy fries topped with cheese sauce, bacon, and scallions', price: 10 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Classic Smash Burger', description: 'Double smashed patties, American cheese, pickles, onion, special sauce', price: 13 },
          { name: 'BBQ Bacon Burger', description: 'Beef patty with cheddar, bacon, onion rings, and BBQ sauce', price: 15 },
          { name: 'Mushroom Swiss Burger', description: 'Beef patty with sautéed mushrooms and melted Swiss cheese', price: 14 },
          { name: 'Chicken Sandwich', description: 'Crispy or grilled chicken with lettuce, tomato, and mayo', price: 12 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Milkshake', description: 'Thick and creamy — vanilla, chocolate, or strawberry', price: 7 },
          { name: 'Brownie Sundae', description: 'Warm fudge brownie with vanilla ice cream and whipped cream', price: 9 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'Fresh Lemonade', description: 'Hand-squeezed lemonade with mint', price: 4 },
          { name: 'Craft Soda', description: 'Assorted artisan sodas', price: 4 },
        ],
      },
    ],
  },
  {
    id: 'mediterranean-grill',
    name: 'Mediterranean Grill',
    cuisine: 'Mediterranean',
    priceRange: '$$',
    rating: 4.6,
    description: 'Fresh Mediterranean flavors with grilled meats, vibrant salads, and warm pita.',
    image: '#0277BD',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Hummus & Pita', description: 'Creamy chickpea hummus with warm pita bread and olive oil', price: 9 },
          { name: 'Falafel Plate', description: 'Crispy chickpea fritters with tahini sauce and pickled turnips', price: 11 },
          { name: 'Baba Ganoush', description: 'Smoky roasted eggplant dip with pomegranate seeds', price: 10 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Chicken Shawarma Plate', description: 'Marinated chicken with rice, salad, hummus, and garlic sauce', price: 18 },
          { name: 'Lamb Kofta', description: 'Grilled spiced lamb skewers with tzatziki and grilled vegetables', price: 22 },
          { name: 'Mixed Grill', description: 'Chicken, lamb, and beef skewers with rice and grilled peppers', price: 26 },
          { name: 'Falafel Wrap', description: 'Warm pita stuffed with falafel, vegetables, and tahini', price: 14 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Baklava', description: 'Layers of phyllo, pistachios, and honey syrup', price: 8 },
          { name: 'Kunafa', description: 'Crispy shredded pastry with sweet cheese and rose syrup', price: 10 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'Turkish Coffee', description: 'Strong, finely ground coffee prepared in a cezve', price: 5 },
          { name: 'Ayran', description: 'Chilled salted yogurt drink', price: 4 },
        ],
      },
    ],
  },
  {
    id: 'seoul-kitchen',
    name: 'Seoul Kitchen',
    cuisine: 'Korean',
    priceRange: '$$',
    rating: 4.5,
    description: 'Bold Korean flavors with sizzling BBQ, spicy stews, and crispy fried chicken.',
    image: '#D32F2F',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Kimchi Pancake', description: 'Crispy scallion and kimchi pancake with soy dipping sauce', price: 10 },
          { name: 'Japchae', description: 'Stir-fried glass noodles with vegetables and sesame', price: 12 },
          { name: 'Tteokbokki', description: 'Chewy rice cakes in spicy gochujang sauce', price: 9 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Korean Fried Chicken', description: 'Double-fried chicken with soy garlic or spicy glaze', price: 17 },
          { name: 'Bibimbap', description: 'Rice bowl with vegetables, egg, beef, and gochujang', price: 16 },
          { name: 'Bulgogi', description: 'Marinated grilled beef with rice and banchan', price: 20 },
          { name: 'Kimchi Jjigae', description: 'Spicy kimchi stew with tofu and pork belly', price: 15 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Bingsu', description: 'Shaved ice with red bean, mochi, and condensed milk', price: 11 },
          { name: 'Hotteok', description: 'Sweet filled pancake with brown sugar and nuts', price: 7 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'Soju', description: 'Classic Korean rice spirit', price: 8 },
          { name: 'Banana Milk', description: 'Sweet banana-flavored milk drink', price: 4 },
        ],
      },
    ],
  },
  {
    id: 'the-breakfast-counter',
    name: 'The Breakfast Counter',
    cuisine: 'Brunch',
    priceRange: '$',
    rating: 4.1,
    description: 'All-day breakfast and brunch classics with bottomless coffee.',
    image: '#FFB300',
    menu: [
      {
        category: 'Appetizers',
        items: [
          { name: 'Fruit Bowl', description: 'Seasonal fresh fruits with honey-yogurt drizzle', price: 8 },
          { name: 'Biscuits & Gravy', description: 'Buttermilk biscuits with sausage gravy', price: 9 },
        ],
      },
      {
        category: 'Mains',
        items: [
          { name: 'Classic Eggs Benedict', description: 'Poached eggs, Canadian bacon, hollandaise on an English muffin', price: 15 },
          { name: 'Buttermilk Pancakes', description: 'Fluffy stack of three with maple syrup and butter', price: 12 },
          { name: 'Avocado Toast Deluxe', description: 'Sourdough with avocado, poached egg, everything seasoning', price: 14 },
          { name: 'Country Fried Steak & Eggs', description: 'Breaded steak with eggs, hash browns, and toast', price: 16 },
        ],
      },
      {
        category: 'Desserts',
        items: [
          { name: 'Cinnamon Roll', description: 'Warm glazed cinnamon roll with cream cheese icing', price: 6 },
          { name: 'Belgian Waffle', description: 'Crispy waffle with berries and whipped cream', price: 11 },
        ],
      },
      {
        category: 'Drinks',
        items: [
          { name: 'Bottomless Coffee', description: 'Unlimited drip coffee refills', price: 4 },
          { name: 'Fresh OJ', description: 'Freshly squeezed orange juice', price: 5 },
          { name: 'Mimosa', description: 'Sparkling wine with fresh orange juice', price: 9 },
        ],
      },
    ],
  },
];
