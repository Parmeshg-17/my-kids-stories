import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link 
        to={`/category/${category.slug}`}
        className="group relative block overflow-hidden rounded-2xl aspect-[4/3]"
      >
        <img 
          src={category.imageUrl} 
          alt={category.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white font-bold text-xl md:text-2xl">{category.name}</h3>
        </div>
      </Link>
    </motion.div>
  );
}
