
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
import { Button } from "@/components/ui/button"
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter

const EditTeamForm = ({ team: initialTeam }) => {
  const router = useRouter(); // Initialize useRouter
  const [form, setForm] = useState({
    name: "",
    qualification: "",
    post: "",
    position: "",
    category: "",
  });
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialTeam) {
      setForm({
        name: initialTeam.name,
        qualification: initialTeam.qualification,
        post: initialTeam.post,
        position: initialTeam.position,
        category: initialTeam.category,
      });
    }
  }, [initialTeam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = initialTeam.image;
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
      const res = await fetch(`/api/team?id=${initialTeam._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, image: imageUrl }),
      });

      if (res.ok) {
        alert("Team member updated successfully!");
        router.push('/dashboard'); // Redirect to dashboard after successful update
      } else {
        const errorData = await res.json();
        alert(`Error updating team member: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error updating team member:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Team Member</CardTitle>
        <CardDescription>Fill out the form below to edit the team member.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter the name" value={form.name} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="qualification">Qualification</Label>
              <Input id="qualification" placeholder="Enter the qualification" value={form.qualification} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="post">Post</Label>
              <Input id="post" placeholder="Enter the post" value={form.post} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="position">Position</Label>
              <Input id="position" placeholder="Enter the position" value={form.position} onChange={handleChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Input id="category" placeholder="Enter the category" value={form.category} onChange={handleChange} />
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
          <Button type="submit">Update</Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default EditTeamForm
