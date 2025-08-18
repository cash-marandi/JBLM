"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NewsPost from '@/components/newsPost';

export default function SingleNewsPage() {
  const params = useParams();
  const post_id = params?.post_id;
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post_id) {
      const fetchSingleNews = async () => {
        try {
          const res = await fetch(`/api/news/${post_id}`); // Assuming API endpoint for single post
          if (!res.ok) {
            throw new Error('Failed to fetch single news post');
          }
          const data = await res.json();
          setPost(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchSingleNews();
    }
  }, [post_id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Post not found.</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <button
        onClick={() => router.push('/news')}
        className="mb-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        &larr; Back to All News
      </button>
      <NewsPost post={post} />
    </div>
  );
}
