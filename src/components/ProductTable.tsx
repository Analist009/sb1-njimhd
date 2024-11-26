import React from 'react';
import { ExternalLink, Check, AlertTriangle, Star, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  price: number;
  seller: string;
  url?: string;
  image?: string;
  availability?: boolean;
  rating?: number;
  shipping?: string;
  condition?: string;
  description?: string;
}

interface Props {
  products: Product[];
  bestPrice: number;
}

export default function ProductTable({ products, bestPrice }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/5 rounded-lg overflow-hidden backdrop-blur-sm ${
              product.price === bestPrice ? 'ring-2 ring-green-400' : ''
            }`}
          >
            {product.image && (
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.seller} product`}
                  className="w-full h-full object-cover"
                />
                {product.price === bestPrice && (
                  <div className="absolute top-2 right-2 bg-green-400 text-black px-2 py-1 rounded-full text-sm font-bold">
                    מחיר מומלץ
                  </div>
                )}
              </div>
            )}
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">{product.seller}</h3>
                <span className="text-xl font-bold text-indigo-300">₪{product.price.toLocaleString()}</span>
              </div>
              
              {product.description && (
                <p className="text-indigo-200 text-sm mb-3 line-clamp-2">{product.description}</p>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4">
                    {product.availability !== false ? (
                      <Check className="text-green-400" />
                    ) : (
                      <AlertTriangle className="text-yellow-400" />
                    )}
                  </div>
                  <span className="text-indigo-200">
                    {product.availability !== false ? 'במלאי' : 'אזל מהמלאי'}
                  </span>
                </div>
                
                {product.shipping && (
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="w-4 h-4 text-indigo-300" />
                    <span className="text-indigo-200">{product.shipping}</span>
                  </div>
                )}
                
                {product.rating && (
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-indigo-200">{product.rating} / 5</span>
                  </div>
                )}
              </div>
              
              {product.url && (
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 transition-colors"
                >
                  <span>לרכישה</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}