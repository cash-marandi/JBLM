
import EditTeamForm from "@/components/dashboard/EditTeamForm";

interface EditTeamPageProps {
    params: {
        team_id: string;
    };
}

export default async function EditTeamPage({ params }: EditTeamPageProps) {
    const { team_id } = params;

    let teamMember = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team?id=${team_id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch team member");
        }

        const data = await res.json();
        teamMember = data[0]; // Assuming the API returns an array with a single team member
    } catch (error) {
        console.error("Error fetching team member:", error);
    }

    if (!teamMember) {
        return <div>Loading...</div>; // Or a more sophisticated loading/error state
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl my-8">
                <EditTeamForm team={teamMember} />
            </div>
        </div>
    );
}
