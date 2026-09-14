import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Check, X, Trash2, Star } from 'lucide-react';

export const ManageReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string, isApproved: boolean) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ is_approved: isApproved })
        .eq('id', id);
        
      if (error) throw error;
      fetchReviews();
    } catch (error: any) {
      console.error(error);
      alert('Error updating review status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      fetchReviews();
    } catch (error: any) {
      console.error(error);
      alert('Error deleting review');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Manage Customer Reviews</h1>
      
      <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.5rem' }}>
        {loading ? (
          <p>Loading...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reviews.map(review => (
              <div key={review.id} style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '0.5rem', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div style={{ flex: '1', minWidth: '250px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{review.customer_name}</h3>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} color={i < review.rating ? '#fbbf24' : '#4b5563'} fill={i < review.rating ? '#fbbf24' : 'none'} />
                      ))}
                    </div>
                  </div>
                  
                  <p style={{ color: '#d1d5db', marginBottom: '1rem', lineHeight: '1.5' }}>{review.comment}</p>
                  
                  <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginBottom: '1rem' }}>
                    Submitted on: {new Date(review.created_at).toLocaleDateString()}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {review.is_approved ? (
                      <Button size="sm" variant="outline" onClick={() => handleApprove(review.id, false)} icon={<X size={16} />}>
                        Hide Review
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => handleApprove(review.id, true)} icon={<Check size={16} />} style={{ backgroundColor: '#10b981' }}>
                        Approve Review
                      </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleDelete(review.id)} icon={<Trash2 size={16} />} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
                      Delete
                    </Button>
                  </div>
                </div>
                
                {review.image_url && (
                  <div style={{ width: '200px', flexShrink: 0 }}>
                    <img src={review.image_url} alt="Review" style={{ width: '100%', borderRadius: '0.375rem', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageReviews;
