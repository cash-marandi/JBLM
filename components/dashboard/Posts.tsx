import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import ActionsButtons from './ActionsButtons';

interface PostProps {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

const Posts: React.FC<{ posts: PostProps[], resource: 'news' | 'portfolio' | 'team' }> = ({ posts, resource }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {posts.map((post) => (
        <Card key={post._id}>
          <CardHeader>
            {post.imageUrl && (
              <div className="relative h-40 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            )}
            <CardTitle className="mt-4">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
          <CardFooter>
            <ActionsButtons itemId={post._id} resource={resource} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
