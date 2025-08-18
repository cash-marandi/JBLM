
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ActionsButtonsProps {
    itemId: string;
    resource: 'news' | 'portfolio' | 'team';
}

export default function ActionsButtons({ itemId, resource }: ActionsButtonsProps) {
    const router = useRouter();

    const onEdit = () => {
        router.push(`/dashboard/${resource}/${itemId}/edit`);
    };

    const onDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (confirmed) {
            const res = await fetch(`/api/${resource}?id=${itemId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            }
        }
    };

    return (
        <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit}>Edit</Button>
            <Button variant="destructive" onClick={onDelete}>Delete</Button>
        </div>
    );
}
