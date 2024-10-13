import React from 'react';
import Feature from './Feature/Feature';
import { FaBox, FaGift, FaDollarSign, FaPaintBrush, FaHome } from 'react-icons/fa'; // Example icons

const features = [
  { title: 'Packers & Movers', icon: <FaBox />,offer:"Lowest Price" },
  { title: 'Pay rent', icon:<FaDollarSign />,offer:"New Offers" },
  { title: 'Rental Agreement', icon: <FaHome />,offer:"10% off" },
  { title: 'Painting & Cleaning', icon: <FaPaintBrush />,offer:" New Coming" },
  { title: 'NoBroker For NRIs', icon: <FaHome />,offer:"Best Offers" },
];

const Features = () => {
  return (
    <section className="py-8 px-2 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
        <div className="flex flex-wrap justify-between">
          {features.map((feature, index) => (
            <Feature key={index} title={feature.title} icon={feature.icon} offer={feature.offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;