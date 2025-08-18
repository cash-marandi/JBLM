
"use client"
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter

const EditNewsForm = ({ post: initialPost }) => {
  const router = useRouter(); // Initialize useRouter
  const [form, setForm] = useState({
    title: "",
    subTitle: "",
    post: "",
    author: "",
    date: "",
  });
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialPost) {
      setForm({
        title: initialPost.title,
        subTitle: initialPost.subTitle,
        post: initialPost.post,
        author: initialPost.author,
        date: new Date(initialPost.date).toISOString().split('T')[0],
      });
    }
  }, [initialPost]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = initialPost.image;
    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          imageUrl = data.url;
        } else {
          const errorData = await res.json();
          alert(`Error uploading image: ${errorData.error}`);
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("An unexpected error occurred while uploading the image. Please try again.");
        return;
      }
    }

    try {
      const res = await fetch(`/api/news/${initialPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, image: imageUrl }),
      });

      if (res.ok) {
        alert("News post updated successfully!");
        router.push('/dashboard'); // Redirect to dashboard after successful update
      } else {
        const errorData = await res.json();
        alert(`Error updating news post: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating news post:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit News Post</CardTitle>
        <CardDescription>Fill out the form below to edit the news post.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter the title" value={form.title} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="subTitle">Sub Title</Label>
              <Input id="subTitle" placeholder="Enter the sub title" value={form.subTitle} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="post">Post</Label>
              <Textarea id="post" placeholder="Enter the post content" value={form.post} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="author">Author</Label>
              <Input id="author" placeholder="Enter the author's name" value={form.author} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" placeholder="Enter the date" value={form.date} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" /> Image
              </Label>
              <Input id="image" type="file" onChange={handleImageChange} accept="image/*" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={(e) => { e.preventDefault(); router.push('/dashboard'); }}>Cancel</Button>
          <Button type="submit" className="cursor-pointer">Update</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default EditNewsForm
