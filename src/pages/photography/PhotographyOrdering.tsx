import { useState, useEffect } from 'react';
import { Check, ShoppingCart, X } from 'lucide-react';
import SectionHeader from '../../components/SectionHeader';
import SakuraPetals from '../../components/SakuraPetals';
import AdminLogin from '../../components/AdminLogin';
import { supabase, Photo, PhotoInventory, Order, OrderItem } from '../../lib/supabase';

interface CartItem extends OrderItem {
  inventory_id: string;
}

export default function PhotographyOrdering() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [inventory, setInventory] = useState<PhotoInventory[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    special_instructions: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [photosRes, inventoryRes] = await Promise.all([
        supabase.from('photos').select('*').order('created_at', { ascending: false }),
        supabase.from('photo_inventory').select('*'),
      ]);

      setPhotos(photosRes.data || []);
      setInventory(inventoryRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPhotoInventory = (photoId: string): PhotoInventory[] => {
    return inventory.filter((inv) => inv.photo_id === photoId);
  };

  const addToCart = (inv: PhotoInventory, quantity: number) => {
    if (!selectedPhoto) return;

    const newItem: CartItem = {
      inventory_id: inv.id,
      photo_id: selectedPhoto.id,
      photo_title: selectedPhoto.title,
      size: inv.size,
      material: inv.material,
      quantity,
      price: inv.price,
    };

    setCart([...cart, newItem]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setSubmitMessage('Please add items to your cart');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const orderNumber = `ORD-${Date.now()}`;
      const totalPrice = calculateCartTotal();

      await supabase.from('orders').insert([
        {
          order_number: orderNumber,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          items: cart,
          total_price: totalPrice,
          shipping_address: formData.shipping_address,
          special_instructions: formData.special_instructions,
          status: 'pending',
        },
      ]);

      setSubmitMessage(`Order placed successfully! Order #: ${orderNumber}`);
      setCart([]);
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        shipping_address: '',
        special_instructions: '',
      });

      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      console.error('Error placing order:', error);
      setSubmitMessage('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { label: 'Portfolio', path: '/photography/showcase' },
    { label: 'Order', path: '/photography/ordering' },
    { label: 'Contact', path: '/photography/contact' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sakura-50 via-peach-50 to-cottage-50 relative">
        <SakuraPetals />
        <SectionHeader section="photography" links={navLinks} />
        <div className="flex items-center justify-center min-h-screen">
          <div className="inline-block w-12 h-12 border-4 border-brown-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakura-50 via-peach-50 to-cottage-50 relative">
      <SakuraPetals />
      <SectionHeader section="photography" links={navLinks} />
      <AdminLogin />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-brown-800 mb-4">
              Order Prints
            </h1>
            <p className="text-lg text-brown-600 max-w-2xl mx-auto">
              Museum-quality prints crafted with care and delivered to your door
            </p>
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-brown-600 text-lg">No photos available yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {photos.map((photo, index) => {
                  const photoInv = getPhotoInventory(photo.id);
                  const hasInventory = photoInv.length > 0;

                  return (
                    <div
                      key={photo.id}
                      onClick={() => {
                        if (hasInventory) {
                          setSelectedPhoto(photo);
                        }
                      }}
                      className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 border-2 animate-slide-up ${
                        hasInventory ? 'cursor-pointer hover:scale-[1.02]' : 'opacity-50 cursor-not-allowed'
                      } ${
                        selectedPhoto?.id === photo.id
                          ? 'border-sakura-400 ring-4 ring-sakura-200'
                          : 'border-cottage-200 hover:border-sakura-300'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={photo.image_url}
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-brown-800 mb-1">{photo.title}</h3>
                        <p className="text-sakura-600 text-sm">{photo.category}</p>
                        {!hasInventory && (
                          <p className="text-red-600 text-xs mt-2">Out of stock</p>
                        )}
                      </div>

                      {selectedPhoto?.id === photo.id && (
                        <div className="absolute top-4 right-4 w-10 h-10 bg-sakura-500 rounded-full flex items-center justify-center shadow-lg">
                          <Check size={20} className="text-white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {selectedPhoto && (
                <div className="bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-3xl font-bold text-brown-800 mb-8">
                    {selectedPhoto.title} - Available Options
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getPhotoInventory(selectedPhoto.id).length > 0 ? (
                          getPhotoInventory(selectedPhoto.id).map((inv) => (
                            <div
                              key={inv.id}
                              className="p-6 border-2 border-cottage-200 rounded-xl hover:border-peach-400 transition-all"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <p className="text-lg font-semibold text-brown-800">{inv.size}</p>
                                  <p className="text-sm text-brown-600">{inv.material}</p>
                                </div>
                                <p className="text-2xl font-bold text-sakura-600">${inv.price}</p>
                              </div>
                              <p className="text-sm text-brown-700 mb-4">
                                In Stock: <span className="font-semibold">{inv.quantity}</span>
                              </p>
                              {inv.quantity > 0 && (
                                <button
                                  onClick={() => addToCart(inv, 1)}
                                  className="w-full px-4 py-2 bg-gradient-to-r from-sakura-400 to-peach-400 text-white rounded-lg font-medium hover:scale-105 transition-all"
                                >
                                  Add to Cart
                                </button>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-brown-600 col-span-2">No inventory available</p>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-1">
                      <div className="sticky top-32 bg-gradient-to-br from-cottage-50 to-peach-50 border-2 border-cottage-300 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-semibold text-brown-800 mb-4">Cart ({cart.length})</h3>

                        {cart.length === 0 ? (
                          <p className="text-brown-600 text-sm">Your cart is empty</p>
                        ) : (
                          <>
                            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                              {cart.map((item, index) => (
                                <div
                                  key={index}
                                  className="p-3 bg-white rounded-lg border border-cottage-200"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <div>
                                      <p className="text-sm font-semibold text-brown-800">
                                        {item.photo_title}
                                      </p>
                                      <p className="text-xs text-brown-600">
                                        {item.size} - {item.material}
                                      </p>
                                    </div>
                                    <button
                                      onClick={() => removeFromCart(index)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <X size={16} />
                                    </button>
                                  </div>
                                  <div className="flex justify-between text-xs text-brown-600">
                                    <span>x{item.quantity}</span>
                                    <span className="font-semibold">${item.price * item.quantity}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="border-t-2 border-cottage-300 pt-4 mb-6">
                              <div className="flex justify-between mb-4">
                                <span className="text-lg font-semibold text-brown-800">Total:</span>
                                <span className="text-3xl font-bold text-sakura-600">
                                  ${calculateCartTotal()}
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-12 bg-white/80 backdrop-blur-sm border-2 border-cottage-200 rounded-3xl p-8 shadow-2xl">
                  <h2 className="text-3xl font-bold text-brown-800 mb-8">Shipping Information</h2>

                  <form onSubmit={handleSubmitOrder} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-brown-800 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.customer_name}
                          onChange={(e) =>
                            setFormData({ ...formData, customer_name: e.target.value })
                          }
                          className="cottagecore-input"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-brown-800 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.customer_email}
                          onChange={(e) =>
                            setFormData({ ...formData, customer_email: e.target.value })
                          }
                          className="cottagecore-input"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brown-800 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.customer_phone}
                        onChange={(e) =>
                          setFormData({ ...formData, customer_phone: e.target.value })
                        }
                        className="cottagecore-input"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brown-800 mb-2">
                        Shipping Address
                      </label>
                      <textarea
                        value={formData.shipping_address}
                        onChange={(e) =>
                          setFormData({ ...formData, shipping_address: e.target.value })
                        }
                        className="cottagecore-input min-h-[120px]"
                        placeholder="Street address, city, state, zip, country"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brown-800 mb-2">
                        Special Instructions (Optional)
                      </label>
                      <textarea
                        value={formData.special_instructions}
                        onChange={(e) =>
                          setFormData({ ...formData, special_instructions: e.target.value })
                        }
                        className="cottagecore-input min-h-[100px]"
                        placeholder="Any special requests or handling instructions..."
                      />
                    </div>

                    {submitMessage && (
                      <div
                        className={`p-4 rounded-lg text-center font-medium ${
                          submitMessage.includes('successfully')
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {submitMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || cart.length === 0}
                      className="w-full cottagecore-btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart size={20} />
                      <span>{isSubmitting ? 'Placing Order...' : 'Place Order'}</span>
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
