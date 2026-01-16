import React from 'react';
import deliveryImage from '../assets/delivery.png';
import { Check } from 'lucide-react';

const features = [
  "We coordinate delivery through florists who already serve your area, prioritising local partners wherever possible.",
  "Addresses, dates, and delivery frequency can be changed at any time. Moves don’t interrupt deliveries, and plans can be adjusted or cancelled with ease.",
  "Each bouquet can include a personalised message, written once or updated whenever you like."
];

export const DeliverySection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Image Column */}
          <div>
            <img 
              src={deliveryImage} 
              alt="Florist delivering a bouquet of flowers" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>

          {/* Text Column */}
          <div className="text-black">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Delivery you can trust
            </h2>
            
            <ul className="space-y-4 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 mt-1 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <p className="text-lg italic">
              Our role is simple: quietly make sure flowers arrive, every time.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
