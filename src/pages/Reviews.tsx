import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useData } from '../context/DataContext';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Star, Image as ImageIcon } from 'lucide-react';
import './Reviews.css';

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  image_url: string | null;
  created_at: string;
}

const Reviews: React.FC = () => {
  const { business: businessConfig } = useData();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('is_approved', true)
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      let imageUrl = null;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('review_images')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error('Error uploading image. Please try again.');
        }

        const { data: { publicUrl } } = supabase.storage
          .from('review_images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const { error: insertError } = await supabase
        .from('reviews')
        .insert({
          customer_name: name,
          rating,
          comment,
          image_url: imageUrl,
          is_approved: false // Requires admin approval
        });

      if (insertError) throw insertError;

      setSubmitMessage({ type: 'success', text: 'Thank you for your review! It has been submitted and is pending approval.' });
      setName('');
      setRating(5);
      setComment('');
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

    } catch (error: any) {
      console.error(error);
      setSubmitMessage({ type: 'error', text: error.message || 'Failed to submit review.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Customer Reviews | {businessConfig.businessName}</title>
        <meta name="description" content="Read what our customers have to say about our computer repair and IT services." />
      </Helmet>

      <div className="section container page-header">
        <h1 className="page-title">Customer Reviews</h1>
        <p className="page-subtitle">Real feedback from our valued customers.</p>
      </div>

      <div className="container section pt-0 reviews-layout">
        
        {/* Reviews List */}
        <div className="reviews-list-container">
          <h2 className="section-title">What Our Customers Say</h2>
          
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="empty-reviews">
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <h3 className="reviewer-name">{review.customer_name}</h3>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < review.rating ? 'star-filled' : 'star-empty'} />
                      ))}
                    </div>
                  </div>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                  <p className="review-comment">{review.comment}</p>
                  
                  {review.image_url && (
                    <div className="review-image-container">
                      <img src={review.image_url} alt="Review attachment" className="review-image" loading="lazy" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="review-form-container">
          <div className="review-form-card">
            <h3>Leave a Review</h3>
            <p>We'd love to hear about your experience!</p>
            
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-control"
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label>Rating *</label>
                <div className="rating-select">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button 
                      key={num} 
                      type="button"
                      className={`rating-btn ${rating >= num ? 'active' : ''}`}
                      onClick={() => setRating(num)}
                    >
                      <Star size={24} className={rating >= num ? 'star-filled' : 'star-empty'} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comment">Your Experience *</label>
                <textarea 
                  id="comment" 
                  className="form-control"
                  value={comment} 
                  onChange={(e) => setComment(e.target.value)} 
                  required 
                  rows={4}
                  placeholder="Tell us about the service you received..."
                />
              </div>

              <div className="form-group">
                <label>Add a Photo (Optional)</label>
                <div className="file-upload-wrapper">
                  <input 
                    type="file" 
                    id="image" 
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="file-input"
                  />
                  <label htmlFor="image" className="file-upload-label">
                    <ImageIcon size={20} />
                    <span>{imageFile ? imageFile.name : 'Choose an image'}</span>
                  </label>
                </div>
              </div>

              {submitMessage.text && (
                <div className={`form-message ${submitMessage.type}`}>
                  {submitMessage.text}
                </div>
              )}

              <Button type="submit" variant="primary" disabled={isSubmitting} fullWidth>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </form>
          </div>
        </div>

      </div>
    </>
  );
};

export default Reviews;
