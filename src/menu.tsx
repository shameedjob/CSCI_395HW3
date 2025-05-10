import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';

const products = [
  // Appetizers
  { id: 1, name: 'Calamari', category: 'Appetizers', price: 8.5, description: 'Lightly breaded and fried squid served with marinara sauce.', image: 'https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/blt9f27a2bff3f619bf/664cbe049d58ffea213697b9/calmari-recipe-fried-calamari.jpg?q=70&width=3840&auto=webp' },
  { id: 2, name: 'Crab Cakes', category: 'Appetizers', price: 9.5, description: 'Delicious crab cakes with aioli dipping sauce.', image: 'https://austin-eats.com/wp-content/uploads/crab-cakes-500x500.jpg' },

  // Entrees
  { id: 3, name: 'Grilled Salmon', category: 'Entrees', price: 17.99, description: 'Fresh salmon grilled to perfection with lemon butter.', image: 'https://hips.hearstapps.com/hmg-prod/images/how-to-grill-salmon-recipe1-1655870645.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*' },
  { id: 4, name: 'Lobster Tail', category: 'Entrees', price: 24.99, description: 'Succulent lobster tail served with garlic butter.', image: 'https://www.thecookierookie.com/wp-content/uploads/2022/12/featured-how-to-cook-lobster-tails-recipe.jpg' },

  // Desserts
  { id: 5, name: 'Key Lime Pie', category: 'Desserts', price: 6.5, description: 'Tart and creamy pie with a graham cracker crust.', image: 'https://www.allrecipes.com/thmb/A-6rkpI0Rue80ECAYoqhgpEClfg=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/12698-Easy-Key-Lime-Pie-ddmfs-103444-4x3-1-eb1a59500e384b2b8939094ce18d08be.jpg' },
  { id: 6, name: 'Chocolate Lava Cake', category: 'Desserts', price: 7.0, description: 'Rich chocolate cake with a gooey center.', image: 'https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4117-feature.jpg' },

  // Drinks
  { id: 7, name: 'Iced Tea', category: 'Drinks', price: 2.5, description: 'Refreshing iced tea with lemon.', image: 'https://hips.hearstapps.com/hmg-prod/images/delish-210419-iced-tea-02-landscape-jg-1619020612.jpg?crop=0.8891666666666667xw:1xh;center,top&resize=1200:*' },
  { id: 8, name: 'Lemonade', category: 'Drinks', price: 2.5, description: 'Homemade lemonade with a citrus twist.', image: 'https://www.allrecipes.com/thmb/-sGgcEhnlIhqr0legC4Q7TPkRhU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/32385-best-lemonade-ever-DDMFS-4x3-8cef7761205e417499c89eb178e5ba2b.jpg' },
];

export default function ShoppingCartSimulator() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="mb-4 col-span-full">
        <Button className="bg-orange-400 text-white hover:bg-orange-500 transition-transform duration-200 transform hover:scale-105" onClick={() => window.location.href = 'https://www.google.com'}>
          Return
        </Button>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Menu</h2>
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-1 border-gray-400">{category}</h3>
            <div className="space-y-4">
              {products.filter(p => p.category === category).map((product) => (
                <Card key={product.id} className="p-4 bg-white shadow-lg rounded-2xl">
                  <CardContent className="p-0 mb-2 flex gap-4 items-start">
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <p className="font-semibold text-lg text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                      <p className="text-sm font-medium text-orange-400">${product.price}</p>
                    </div>
                  </CardContent>
                  <div className="flex justify-end">
                    <Button className="bg-orange-400 text-white hover:bg-orange-500 transition-transform duration-200 transform hover:scale-105" onClick={() => addToCart(product)}>
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-700">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="p-4 flex justify-between items-center bg-white shadow-md rounded-xl">
                <CardContent className="p-0">
                  <p className="font-semibold text-gray-900">{item.name} x {item.quantity}</p>
                  <p className="text-sm text-gray-600">${(item.price * item.quantity).toFixed(2)}</p>
                </CardContent>
                <Button variant="destructive" className="bg-orange-500 hover:bg-orange-600 text-white transition-transform duration-200 transform hover:scale-105" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </Button>
              </Card>
            ))}
            <div className="text-right font-bold text-xl text-orange-500">Total: ${getTotal()}</div>
            <div className="flex justify-end">
              <Button variant="outline" className="border-orange-400 text-orange-400 hover:bg-orange-100 transition-transform duration-200 transform hover:scale-105" onClick={clearCart}>Clear Cart</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
