import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Trash2 } from 'lucide-react';

export const ManagePortfolio: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('PC_BUILD');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert('Please select an image first.');
    
    setIsSubmitting(true);
    
    try {
      // 1. Upload image to Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio_images')
        .upload(fileName, imageFile);
        
      if (uploadError) throw uploadError;
      
      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio_images')
        .getPublicUrl(fileName);
        
      // 3. Insert into database
      const { error: dbError } = await supabase
        .from('portfolio_items')
        .insert({
          title,
          description,
          category,
          image_url: publicUrl
        });
        
      if (dbError) throw dbError;
      
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('PC_BUILD');
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
      // Refresh list
      fetchItems();
      alert('Portfolio item added successfully!');
      
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Error uploading item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      // 1. Delete from DB
      const { error: dbError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
        
      if (dbError) throw dbError;
      
      // Note: In a production app, you might also want to delete the image from storage here
      // using the fileName extracted from the imageUrl
      
      fetchItems();
    } catch (error: any) {
      console.error(error);
      alert('Error deleting item');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Manage Portfolio ("Our Work")</h1>
      
      {/* Upload Form */}
      <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#60a5fa' }}>Add New Work</h2>
        
        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', backgroundColor: '#111827', color: 'white' }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
            <textarea 
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', backgroundColor: '#111827', color: 'white' }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category (Sub-heading)</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #374151', backgroundColor: '#111827', color: 'white' }}
            >
              <option value="PC_BUILD">PC Build</option>
              <option value="REPAIR">Repair</option>
              <option value="UPGRADE">Upgrade</option>
              <option value="OFFICE_SETUP">Office Setup</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Image</label>
            <input 
              type="file" 
              accept="image/*"
              required
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ color: '#d1d5db' }}
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting} style={{ marginTop: '1rem' }}>
            {isSubmitting ? 'Uploading...' : 'Upload Item'}
          </Button>
        </form>
      </div>

      {/* List */}
      <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#60a5fa' }}>Current Portfolio Items</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {items.map(item => (
              <div key={item.id} style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '0.5rem', overflow: 'hidden' }}>
                <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontWeight: 'bold' }}>{item.title}</h3>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#374151', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>
                      {item.category.replace('_', ' ')}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1rem' }}>{item.description}</p>
                  
                  <button 
                    onClick={() => handleDelete(item.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#ef4444', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePortfolio;
