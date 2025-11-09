import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit2, Save, Upload, Settings, Package, ShoppingBag } from 'lucide-react';
import { supabase, Photo, Live2DModel, Game, SiteSetting, PhotoInventory, Order } from '../lib/supabase';
import { uploadFile, deleteFile, validateFileType, validateFileSize, IMAGE_ALLOWED_TYPES, VIDEO_ALLOWED_TYPES, MAX_IMAGE_SIZE_MB, MAX_VIDEO_SIZE_MB } from '../lib/storage';

interface AdminPanelProps {
  onClose: () => void;
}

type TabType = 'photos' | 'live2d' | 'games' | 'inventory' | 'orders' | 'settings';

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('photos');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [models, setModels] = useState<Live2DModel[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [inventory, setInventory] = useState<PhotoInventory[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'photos') {
        const { data } = await supabase.from('photos').select('*').order('created_at', { ascending: false });
        setPhotos(data || []);
      } else if (activeTab === 'live2d') {
        const { data } = await supabase.from('live2d_models').select('*').order('created_at', { ascending: false });
        setModels(data || []);
      } else if (activeTab === 'games') {
        const { data } = await supabase.from('games').select('*').order('created_at', { ascending: false });
        setGames(data || []);
      } else if (activeTab === 'inventory') {
        const { data } = await supabase.from('photo_inventory').select('*').order('created_at', { ascending: false });
        setInventory(data || []);
      } else if (activeTab === 'orders') {
        const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        setOrders(data || []);
      } else if (activeTab === 'settings') {
        const { data } = await supabase.from('site_settings').select('*').order('key');
        setSettings(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, table: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      await supabase.from(table).delete().eq('id', id);
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete item');
    }
  };

  const handleImageUpload = async (file: File, bucket: 'photos' | 'live2d-images' | 'games'): Promise<string> => {
    if (!validateFileType(file, IMAGE_ALLOWED_TYPES)) {
      alert('Invalid file type. Please upload an image file (JPEG, PNG, WebP, or GIF).');
      return '';
    }

    if (!validateFileSize(file, MAX_IMAGE_SIZE_MB)) {
      alert(`File too large. Maximum size is ${MAX_IMAGE_SIZE_MB}MB.`);
      return '';
    }

    try {
      const result = await uploadFile(file, bucket);

      if (result.error) {
        alert(`Upload failed: ${result.error}`);
        return '';
      }

      return result.url;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      return '';
    }
  };

  const handleVideoUpload = async (file: File): Promise<string> => {
    if (!validateFileType(file, VIDEO_ALLOWED_TYPES)) {
      alert('Invalid file type. Please upload a video file (MP4, WebM, MOV, or AVI).');
      return '';
    }

    if (!validateFileSize(file, MAX_VIDEO_SIZE_MB)) {
      alert(`File too large. Maximum size is ${MAX_VIDEO_SIZE_MB}MB.`);
      return '';
    }

    try {
      const result = await uploadFile(file, 'live2d-videos');

      if (result.error) {
        alert(`Upload failed: ${result.error}`);
        return '';
      }

      return result.url;
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
      return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-brown-900/95 backdrop-blur-md overflow-y-auto">
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-cottage-50 to-peach-50 rounded-3xl shadow-2xl border-4 border-brown-200 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-brown-600 to-cottage-600 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Settings size={32} />
                Admin Panel
              </h1>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex border-b-2 border-cottage-200 bg-white/50 overflow-x-auto">
              {(['photos', 'live2d', 'games', 'inventory', 'orders', 'settings'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setShowAddForm(false);
                    setEditingId(null);
                  }}
                  className={`px-4 md:px-6 py-4 font-semibold transition-all whitespace-nowrap text-sm md:text-base ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-sakura-400 to-peach-400 text-white'
                      : 'text-brown-700 hover:bg-cottage-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('2d', '2D')}
                </button>
              ))}
            </div>

            <div className="p-6">
              {(activeTab === 'photos' || activeTab === 'live2d' || activeTab === 'games' || activeTab === 'inventory') && (
                <div className="mb-6">
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sakura-400 to-peach-400 text-white rounded-full font-medium hover:scale-105 transition-all shadow-lg"
                  >
                    <Plus size={20} />
                    Add New {activeTab === 'photos' ? 'Photo' : activeTab === 'live2d' ? 'Model' : activeTab === 'games' ? 'Game' : 'Inventory Item'}
                  </button>
                </div>
              )}

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block w-12 h-12 border-4 border-brown-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {activeTab === 'photos' && <PhotosSection photos={photos} onDelete={handleDelete} onEdit={setEditingId} editingId={editingId} onRefresh={fetchData} showAddForm={showAddForm} setShowAddForm={setShowAddForm} onImageUpload={handleImageUpload} />}
                  {activeTab === 'live2d' && <Live2DSection models={models} onDelete={handleDelete} onEdit={setEditingId} editingId={editingId} onRefresh={fetchData} showAddForm={showAddForm} setShowAddForm={setShowAddForm} onImageUpload={handleImageUpload} onVideoUpload={handleVideoUpload} />}
                  {activeTab === 'games' && <GamesSection games={games} onDelete={handleDelete} onEdit={setEditingId} editingId={editingId} onRefresh={fetchData} showAddForm={showAddForm} setShowAddForm={setShowAddForm} onImageUpload={handleImageUpload} />}
                  {activeTab === 'inventory' && <InventorySection inventory={inventory} photos={photos} onDelete={handleDelete} onRefresh={fetchData} showAddForm={showAddForm} setShowAddForm={setShowAddForm} />}
                  {activeTab === 'orders' && <OrdersSection orders={orders} onRefresh={fetchData} />}
                  {activeTab === 'settings' && <SettingsSection settings={settings} onRefresh={fetchData} />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotosSection({ photos, onDelete, onEdit, editingId, onRefresh, showAddForm, setShowAddForm, onImageUpload }: any) {
  const [formData, setFormData] = useState({ title: '', description: '', category: '', image_url: '' });
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploading(true);
      const file = e.dataTransfer.files[0];
      const url = await onImageUpload(file, 'photos');
      if (url) {
        setFormData({ ...formData, image_url: url });
      }
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await supabase.from('photos').update(formData).eq('id', editingId);
      } else {
        await supabase.from('photos').insert([formData]);
      }
      onRefresh();
      setFormData({ title: '', description: '', category: '', image_url: '' });
      setShowAddForm(false);
      onEdit(null);
    } catch (error) {
      console.error('Error saving photo:', error);
      alert('Failed to save photo');
    }
  };

  const startEdit = (photo: Photo) => {
    setFormData({
      title: photo.title,
      description: photo.description,
      category: photo.category,
      image_url: photo.image_url,
    });
    onEdit(photo.id);
    setShowAddForm(true);
  };

  return (
    <div>
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-2xl border-2 border-cottage-200 shadow-lg">
          <h3 className="text-xl font-bold text-brown-800 mb-4">{editingId ? 'Edit' : 'Add'} Photo</h3>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-brown-800 mb-2">Image</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive ? 'border-sakura-400 bg-sakura-50' : 'border-cottage-300 hover:border-cottage-400'
              }`}
            >
              {uploading ? (
                <div className="py-8">
                  <div className="inline-block w-8 h-8 border-4 border-brown-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-brown-600">Uploading...</p>
                </div>
              ) : formData.image_url ? (
                <div className="space-y-4">
                  <img src={formData.image_url} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: '' })}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto text-cottage-400 mb-2" size={48} />
                  <p className="text-brown-700 font-medium mb-1">Drag and drop image here</p>
                  <p className="text-brown-500 text-sm">or paste image URL below</p>
                </>
              )}
            </div>
            <input
              type="text"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="cottagecore-input mt-2"
              placeholder="Or paste image URL"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="cottagecore-input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="cottagecore-input"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-brown-800 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="cottagecore-input min-h-[100px]"
              required
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 cottagecore-btn-primary flex items-center justify-center gap-2">
              <Save size={20} />
              Save Photo
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                onEdit(null);
                setFormData({ title: '', description: '', category: '', image_url: '' });
              }}
              className="flex-1 px-6 py-3 bg-cottage-200 hover:bg-cottage-300 text-brown-800 rounded-full font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo: Photo) => (
          <div key={photo.id} className="bg-white rounded-xl border-2 border-cottage-200 overflow-hidden shadow-lg hover:shadow-xl transition-all">
            <img src={photo.image_url} alt={photo.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-brown-800 mb-1">{photo.title}</h3>
              <p className="text-sm text-brown-600 mb-1">{photo.category}</p>
              <p className="text-xs text-brown-500 mb-3 line-clamp-2">{photo.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(photo)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-cottage-100 hover:bg-cottage-200 text-brown-700 rounded-lg text-sm font-medium transition-all"
                >
                  <Edit2 size={14} />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(photo.id, 'photos')}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Live2DSection({ models, onDelete, onEdit, editingId, onRefresh, showAddForm, setShowAddForm, onImageUpload, onVideoUpload }: any) {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    type: '',
    image_url: '',
    video_url: '',
    features: '',
    rating: 5,
    year: new Date().getFullYear().toString(),
  });
  const [dragActive, setDragActive] = useState(false);
  const [dragType, setDragType] = useState<'image' | 'video' | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent, type: 'image' | 'video') => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      setDragType(type);
    } else if (e.type === "dragleave") {
      setDragActive(false);
      setDragType(null);
    }
  };

  const handleDrop = async (e: React.DragEvent, type: 'image' | 'video') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setDragType(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploading(true);
      const file = e.dataTransfer.files[0];
      const url = type === 'image' ? await onImageUpload(file, 'live2d-images') : await onVideoUpload(file);
      if (url) {
        if (type === 'image') {
          setFormData({ ...formData, image_url: url });
        } else {
          setFormData({ ...formData, video_url: url });
        }
      }
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
      const data = {
        ...formData,
        features: featuresArray,
      };

      if (editingId) {
        await supabase.from('live2d_models').update(data).eq('id', editingId);
      } else {
        await supabase.from('live2d_models').insert([data]);
      }
      onRefresh();
      setFormData({ title: '', client: '', type: '', image_url: '', video_url: '', features: '', rating: 5, year: new Date().getFullYear().toString() });
      setShowAddForm(false);
      onEdit(null);
    } catch (error) {
      console.error('Error saving model:', error);
      alert('Failed to save model');
    }
  };

  const startEdit = (model: Live2DModel) => {
    setFormData({
      title: model.title,
      client: model.client,
      type: model.type,
      image_url: model.image_url,
      video_url: model.video_url,
      features: Array.isArray(model.features) ? model.features.join(', ') : '',
      rating: model.rating,
      year: model.year,
    });
    onEdit(model.id);
    setShowAddForm(true);
  };

  return (
    <div>
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-2xl border-2 border-cottage-200 shadow-lg">
          <h3 className="text-xl font-bold text-brown-800 mb-4">{editingId ? 'Edit' : 'Add'} Live2D Model</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Thumbnail Image</label>
              <div
                onDragEnter={(e) => handleDrag(e, 'image')}
                onDragLeave={(e) => handleDrag(e, 'image')}
                onDragOver={(e) => handleDrag(e, 'image')}
                onDrop={(e) => handleDrop(e, 'image')}
                className={`border-2 border-dashed rounded-xl p-4 text-center transition-all ${
                  dragActive && dragType === 'image' ? 'border-sakura-400 bg-sakura-50' : 'border-cottage-300'
                }`}
              >
                {uploading ? (
                  <div className="py-4">
                    <div className="inline-block w-6 h-6 border-4 border-brown-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : formData.image_url ? (
                  <div>
                    <img src={formData.image_url} alt="Preview" className="max-h-32 mx-auto rounded-lg mb-2" />
                    <button type="button" onClick={() => setFormData({ ...formData, image_url: '' })} className="text-red-600 text-xs">Remove</button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto text-cottage-400 mb-1" size={32} />
                    <p className="text-brown-600 text-xs">Drop image</p>
                  </>
                )}
              </div>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="cottagecore-input mt-2"
                placeholder="Or paste URL"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Video</label>
              <div
                onDragEnter={(e) => handleDrag(e, 'video')}
                onDragLeave={(e) => handleDrag(e, 'video')}
                onDragOver={(e) => handleDrag(e, 'video')}
                onDrop={(e) => handleDrop(e, 'video')}
                className={`border-2 border-dashed rounded-xl p-4 text-center transition-all ${
                  dragActive && dragType === 'video' ? 'border-peach-400 bg-peach-50' : 'border-cottage-300'
                }`}
              >
                {uploading ? (
                  <div className="py-4">
                    <div className="inline-block w-6 h-6 border-4 border-brown-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : formData.video_url ? (
                  <div>
                    <p className="text-green-600 text-xs mb-2">Video uploaded</p>
                    <button type="button" onClick={() => setFormData({ ...formData, video_url: '' })} className="text-red-600 text-xs">Remove</button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto text-cottage-400 mb-1" size={32} />
                    <p className="text-brown-600 text-xs">Drop video</p>
                  </>
                )}
              </div>
              <input
                type="text"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="cottagecore-input mt-2"
                placeholder="Or paste YouTube/video URL"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="cottagecore-input" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Client</label>
              <input type="text" value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className="cottagecore-input" required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Type</label>
              <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="cottagecore-input" required>
                <option value="">Select...</option>
                <option value="Full Body">Full Body</option>
                <option value="Half Body">Half Body</option>
                <option value="Chibi">Chibi</option>
                <option value="Animation">Animation</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Rating</label>
              <input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="cottagecore-input" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Year</label>
              <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="cottagecore-input" required />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-brown-800 mb-2">Features (comma-separated)</label>
            <input type="text" value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} className="cottagecore-input" placeholder="Feature 1, Feature 2, Feature 3" />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 cottagecore-btn-primary flex items-center justify-center gap-2">
              <Save size={20} />
              Save Model
            </button>
            <button type="button" onClick={() => { setShowAddForm(false); onEdit(null); setFormData({ title: '', client: '', type: '', image_url: '', video_url: '', features: '', rating: 5, year: new Date().getFullYear().toString() }); }} className="flex-1 px-6 py-3 bg-cottage-200 hover:bg-cottage-300 text-brown-800 rounded-full font-medium transition-all">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model: Live2DModel) => (
          <div key={model.id} className="bg-white rounded-xl border-2 border-cottage-200 overflow-hidden shadow-lg hover:shadow-xl transition-all">
            <img src={model.image_url} alt={model.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-brown-800 mb-1">{model.title}</h3>
              <p className="text-sm text-brown-600 mb-1">{model.client} • {model.type}</p>
              <p className="text-xs text-brown-500 mb-3">{model.year}</p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(model)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-cottage-100 hover:bg-cottage-200 text-brown-700 rounded-lg text-sm font-medium transition-all">
                  <Edit2 size={14} />
                  Edit
                </button>
                <button onClick={() => onDelete(model.id, 'live2d_models')} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GamesSection({ games, onDelete, onEdit, editingId, onRefresh, showAddForm, setShowAddForm, onImageUpload }: any) {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    description: '',
    image_url: '',
    tech: '',
    status: 'In Development',
    year: new Date().getFullYear().toString(),
    players: 'Single Player',
    is_enabled: true,
  });
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploading(true);
      const file = e.dataTransfer.files[0];
      const url = await onImageUpload(file, 'games');
      if (url) {
        setFormData({ ...formData, image_url: url });
      }
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const techArray = formData.tech.split(',').map(t => t.trim()).filter(t => t);
      const data = {
        ...formData,
        tech: techArray,
      };

      if (editingId) {
        await supabase.from('games').update(data).eq('id', editingId);
      } else {
        await supabase.from('games').insert([data]);
      }
      onRefresh();
      setFormData({ title: '', genre: '', description: '', image_url: '', tech: '', status: 'In Development', year: new Date().getFullYear().toString(), players: 'Single Player', is_enabled: true });
      setShowAddForm(false);
      onEdit(null);
    } catch (error) {
      console.error('Error saving game:', error);
      alert('Failed to save game');
    }
  };

  const startEdit = (game: Game) => {
    setFormData({
      title: game.title,
      genre: game.genre,
      description: game.description,
      image_url: game.image_url,
      tech: Array.isArray(game.tech) ? game.tech.join(', ') : '',
      status: game.status,
      year: game.year,
      players: game.players,
      is_enabled: game.is_enabled,
    });
    onEdit(game.id);
    setShowAddForm(true);
  };

  return (
    <div>
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-2xl border-2 border-cottage-200 shadow-lg">
          <h3 className="text-xl font-bold text-brown-800 mb-4">{editingId ? 'Edit' : 'Add'} Game</h3>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-brown-800 mb-2">Game Image</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive ? 'border-sakura-400 bg-sakura-50' : 'border-cottage-300'
              }`}
            >
              {uploading ? (
                <div className="py-8">
                  <div className="inline-block w-8 h-8 border-4 border-brown-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-2 text-brown-600">Uploading...</p>
                </div>
              ) : formData.image_url ? (
                <div>
                  <img src={formData.image_url} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-2" />
                  <button type="button" onClick={() => setFormData({ ...formData, image_url: '' })} className="text-red-600">Remove</button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto text-cottage-400 mb-2" size={48} />
                  <p className="text-brown-700 font-medium">Drag and drop image</p>
                </>
              )}
            </div>
            <input type="text" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="cottagecore-input mt-2" placeholder="Or paste URL" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="cottagecore-input" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Genre</label>
              <input type="text" value={formData.genre} onChange={(e) => setFormData({ ...formData, genre: e.target.value })} className="cottagecore-input" required />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-brown-800 mb-2">Description</label>
            <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="cottagecore-input min-h-[100px]" required />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="cottagecore-input">
                <option value="In Development">In Development</option>
                <option value="Released">Released</option>
                <option value="Prototype">Prototype</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Year</label>
              <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="cottagecore-input" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Players</label>
              <input type="text" value={formData.players} onChange={(e) => setFormData({ ...formData, players: e.target.value })} className="cottagecore-input" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-brown-800 mb-2">Tech Stack (comma-separated)</label>
            <input type="text" value={formData.tech} onChange={(e) => setFormData({ ...formData, tech: e.target.value })} className="cottagecore-input" placeholder="Unity, C#, 2D" />
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.is_enabled} onChange={(e) => setFormData({ ...formData, is_enabled: e.target.checked })} className="w-5 h-5" />
              <span className="text-sm font-semibold text-brown-800">Visible on website</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 cottagecore-btn-primary flex items-center justify-center gap-2">
              <Save size={20} />
              Save Game
            </button>
            <button type="button" onClick={() => { setShowAddForm(false); onEdit(null); setFormData({ title: '', genre: '', description: '', image_url: '', tech: '', status: 'In Development', year: new Date().getFullYear().toString(), players: 'Single Player', is_enabled: true }); }} className="flex-1 px-6 py-3 bg-cottage-200 hover:bg-cottage-300 text-brown-800 rounded-full font-medium transition-all">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game: Game) => (
          <div key={game.id} className="bg-white rounded-xl border-2 border-cottage-200 overflow-hidden shadow-lg hover:shadow-xl transition-all">
            <img src={game.image_url} alt={game.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-brown-800">{game.title}</h3>
                {!game.is_enabled && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Hidden</span>}
              </div>
              <p className="text-sm text-brown-600 mb-1">{game.genre} • {game.status}</p>
              <p className="text-xs text-brown-500 mb-3 line-clamp-2">{game.description}</p>
              <div className="flex gap-2">
                <button onClick={() => startEdit(game)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-cottage-100 hover:bg-cottage-200 text-brown-700 rounded-lg text-sm font-medium transition-all">
                  <Edit2 size={14} />
                  Edit
                </button>
                <button onClick={() => onDelete(game.id, 'games')} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all">
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection({ settings, onRefresh }: any) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const startEdit = (setting: SiteSetting) => {
    setEditingKey(setting.key);
    setEditValue(setting.value);
  };

  const saveEdit = async (key: string) => {
    try {
      await supabase.from('site_settings').update({ value: editValue }).eq('key', key);
      setEditingKey(null);
      onRefresh();
    } catch (error) {
      console.error('Error updating setting:', error);
      alert('Failed to update setting');
    }
  };

  return (
    <div className="space-y-4">
      {settings.map((setting: SiteSetting) => (
        <div key={setting.id} className="p-6 bg-white rounded-xl border-2 border-cottage-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-brown-800 mb-1">{setting.key}</h3>
              {editingKey === setting.key ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="cottagecore-input"
                  autoFocus
                />
              ) : (
                <p className="text-brown-600">{setting.value}</p>
              )}
            </div>
            <div className="ml-4">
              {editingKey === setting.key ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(setting.key)}
                    className="px-4 py-2 bg-gradient-to-r from-sakura-400 to-peach-400 text-white rounded-lg font-medium hover:scale-105 transition-all"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingKey(null)}
                    className="px-4 py-2 bg-cottage-200 text-brown-800 rounded-lg font-medium hover:bg-cottage-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startEdit(setting)}
                  className="px-4 py-2 bg-cottage-100 hover:bg-cottage-200 text-brown-700 rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InventorySection({ inventory, photos, onDelete, onRefresh, showAddForm, setShowAddForm }: any) {
  const [formData, setFormData] = useState({ photo_id: '', size: '', material: '', quantity: 0, price: 0 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await supabase.from('photo_inventory').insert([formData]);
      onRefresh();
      setFormData({ photo_id: '', size: '', material: '', quantity: 0, price: 0 });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving inventory:', error);
      alert('Failed to save inventory item');
    }
  };

  return (
    <div>
      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-2xl border-2 border-cottage-200 shadow-lg">
          <h3 className="text-xl font-bold text-brown-800 mb-4">Add Inventory Item</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Photo</label>
              <select
                value={formData.photo_id}
                onChange={(e) => setFormData({ ...formData, photo_id: e.target.value })}
                className="cottagecore-input"
                required
              >
                <option value="">Select photo...</option>
                {photos.map((photo: Photo) => (
                  <option key={photo.id} value={photo.id}>
                    {photo.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Size</label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="cottagecore-input"
                placeholder="e.g., 8x10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Material</label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="cottagecore-input"
                placeholder="e.g., Fine Art Paper"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brown-800 mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="cottagecore-input"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-brown-800 mb-2">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              className="cottagecore-input"
              required
            />
          </div>

          <div className="flex gap-3">
            <button type="submit" className="flex-1 cottagecore-btn-primary flex items-center justify-center gap-2">
              <Save size={20} />
              Save Item
            </button>
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setFormData({ photo_id: '', size: '', material: '', quantity: 0, price: 0 });
              }}
              className="flex-1 px-6 py-3 bg-cottage-200 hover:bg-cottage-300 text-brown-800 rounded-full font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4">
        {inventory.map((inv: PhotoInventory) => {
          const photo = photos.find((p: Photo) => p.id === inv.photo_id);
          return (
            <div key={inv.id} className="bg-white rounded-xl border-2 border-cottage-200 p-4 shadow-lg hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-brown-800">{photo?.title || 'Unknown Photo'}</h3>
                  <p className="text-sm text-brown-600">{inv.size} - {inv.material}</p>
                </div>
                <button
                  onClick={() => onDelete(inv.id, 'photo_inventory')}
                  className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-all flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-2 text-sm text-brown-700">
                <p>Price: <span className="font-semibold">${inv.price}</span></p>
                <p>Qty: <span className="font-semibold">{inv.quantity}</span></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrdersSection({ orders }: any) {
  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <p className="text-brown-600 text-center py-8">No orders yet</p>
      ) : (
        orders.map((order: Order) => (
          <div key={order.id} className="bg-white rounded-xl border-2 border-cottage-200 p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-brown-800">Order #{order.order_number}</h3>
                <p className="text-sm text-brown-600">{order.customer_name} ({order.customer_email})</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : order.status === 'processing'
                      ? 'bg-blue-100 text-blue-700'
                      : order.status === 'shipped'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                }`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-brown-600">Phone</p>
                <p className="font-medium text-brown-800">{order.customer_phone}</p>
              </div>
              <div>
                <p className="text-brown-600">Total</p>
                <p className="font-medium text-sakura-600 text-lg">${order.total_price}</p>
              </div>
              <div className="col-span-2">
                <p className="text-brown-600">Shipping Address</p>
                <p className="font-medium text-brown-800">{order.shipping_address}</p>
              </div>
            </div>

            <div className="border-t-2 border-cottage-200 pt-4">
              <p className="text-sm font-semibold text-brown-800 mb-2">Items:</p>
              <div className="space-y-1 text-sm">
                {(order.items || []).map((item: OrderItem, idx: number) => (
                  <p key={idx} className="text-brown-700">
                    {item.photo_title} - {item.size} ({item.material}) x{item.quantity} = ${item.price * item.quantity}
                  </p>
                ))}
              </div>
            </div>

            {order.special_instructions && (
              <div className="mt-4 p-3 bg-cottage-50 rounded-lg border border-cottage-200">
                <p className="text-xs font-semibold text-brown-800 mb-1">Special Instructions:</p>
                <p className="text-sm text-brown-700">{order.special_instructions}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
