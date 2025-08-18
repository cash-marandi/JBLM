
import EditPortfolioForm from "@/components/dashboard/EditPortfolioForm";

export default async function EditPortfolioPage({ params }: { params: { portfolio_id: string } }) {
    const { portfolio_id } = params;

    let portfolioItem = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio?id=${portfolio_id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch portfolio item");
        }

        const data = await res.json();
        portfolioItem = data[0]; // Assuming the API returns an array with a single portfolio item
    } catch (error) {
        console.error("Error fetching portfolio item:", error);
    }

    if (!portfolioItem) {
        return <div>Loading...</div>; // Or a more sophisticated loading/error state
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl my-8">
                <EditPortfolioForm portfolio={portfolioItem} />
            </div>
        </div>
    );
}
