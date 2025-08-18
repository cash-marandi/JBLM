import React from 'react';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react'; // Import icons for date and author

interface NewsPostProps {
  post: {
    image?: string;
    title?: string;
    subtitle?: string;
    content?: string; // Main content field
    post?: string; // Alternative main content field (from previous News.tsx)
    date?: string; // Date of the post
    author?: string; // Author of the post
  };
}

const NewsPost: React.FC<NewsPostProps> = ({ post }) => {
  const mainContent = post.content || post.post; // Use 'content' or 'post' for main body

  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      {post.image && (
        <div className="relative w-full h-96 mb-8">
          <Image
            src={post.image}
            alt={post.title || "News Image"}
            fill
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}
      <h1 className="text-5xl font-bold mb-4">{post.title || "No Title"}</h1>
      {post.subtitle && (
        <h2 className="text-2xl text-gray-600 mb-8">{post.subtitle}</h2>
      )}

      <div className="flex justify-center items-center text-sm text-gray-500 mb-8">
        {post.date && (
          <div className="flex items-center mr-4">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(post.date).toLocaleDateString()}
          </div>
        )}
        {post.author && (
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            {post.author}
          </div>
        )}
      </div>

      <div className="text-lg leading-relaxed text-left mx-auto" style={{ maxWidth: '800px' }}>
        <p>{mainContent || "No content available."}</p>
      </div>
    </div>
  );
};

export default NewsPost;