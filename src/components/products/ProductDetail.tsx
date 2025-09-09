import React, { useState } from 'react';
import { X, ShoppingCart, Package, Calendar, Tag } from 'lucide-react';
import { Product } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose }) => {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleAddToCart = async () => {
    if (user?.role !== 'user') return;
    
    setIsAddingToCart(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing cart from localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if product already in cart
      const existingItemIndex = existingCart.findIndex((item: any) => item.productId === product.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity
        existingCart[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        existingCart.push({
          id: Date.now().toString(),
          productId: product.id,
          product: product,
          quantity: quantity,
          price: product.price,
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(existingCart));
      
      alert(`${product.name} berhasil ditambahkan ke keranjang!`);
      onClose();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Gagal menambahkan ke keranjang');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Detail Produk</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <div className="aspect-w-16 aspect-h-12 mb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-lg border border-gray-200"
                />
              </div>
              
              {/* Product Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="text-blue-600" size={20} />
                    <span className="font-medium text-gray-900">Stok</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{product.stock}</p>
                  <p className="text-sm text-gray-600">Unit tersedia</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="text-green-600" size={20} />
                    <span className="font-medium text-gray-900">Kategori</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{product.category}</p>
                  <p className="text-sm text-gray-600">Jenis produk</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Tersedia' : 'Tidak Tersedia'}
                  </span>
                </div>
                <p className="text-3xl font-bold text-blue-600 mb-4">{formatCurrency(product.price)}</p>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Product Metadata */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Informasi Produk</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-gray-600">Dibuat:</span>
                    <span className="text-gray-900">{formatDate(product.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400" size={16} />
                    <span className="text-gray-600">Diperbarui:</span>
                    <span className="text-gray-900">{formatDate(product.updatedAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="text-gray-400" size={16} />
                    <span className="text-gray-600">ID Produk:</span>
                    <span className="text-gray-900 font-mono">{product.id}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart Section (Only for users) */}
              {user?.role === 'user' && product.isActive && product.stock > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <label className="font-medium text-gray-900">Jumlah:</label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                        min="1"
                        max={product.stock}
                        className="w-16 text-center py-2 border-0 focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-600">
                      (Maksimal {product.stock} unit)
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-medium text-gray-900">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(product.price * quantity)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Menambahkan...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="inline mr-2" size={20} />
                        Tambah ke Keranjang
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Out of Stock Message */}
              {user?.role === 'user' && product.isActive && product.stock === 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-center">
                    <p className="text-red-800 font-medium">Produk sedang habis</p>
                    <p className="text-red-600 text-sm mt-1">Silakan cek kembali nanti</p>
                  </div>
                </div>
              )}

              {/* Inactive Product Message */}
              {user?.role === 'user' && !product.isActive && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
                    <p className="text-gray-800 font-medium">Produk tidak tersedia</p>
                    <p className="text-gray-600 text-sm mt-1">Produk ini sedang tidak dijual</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;