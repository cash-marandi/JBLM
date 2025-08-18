
import EditNewsForm from "@/components/dashboard/EditNewsForm";

interface EditNewsPageProps {
    params: {
        post_id: string;
    };
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
    const { post_id } = await params; // Await params
    console.log("Fetching news post with ID:", post_id);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Provide a fallback
    const apiUrl = `${baseUrl}/api/news/${post_id}`;
    console.log("Full API URL:", apiUrl); // Log the full URL

    let newsPost = null;
    try {
        const res = await fetch(apiUrl, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error(`Failed to fetch news post: ${res.status} ${res.statusText}`);
            const errorBody = await res.text();
            console.error("Response body:", errorBody);
            throw new Error("Failed to fetch news post");
        }

        const rawResponse = await res.text();
        console.log("Raw API response:", rawResponse);
        newsPost = JSON.parse(rawResponse);
    } catch (error) {
        console.error("Error fetching news post:", error);
    }

    if (!newsPost) {
        return <div>Loading...</div>; // Or a more sophisticated loading/error state
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl my-8">
                <EditNewsForm post={newsPost} />
            </div>
        </div>
    );
}
