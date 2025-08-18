"use client"

import React, { useState, useEffect } from 'react'
import Header from './reusable-components/Header'
import { AnimatedTestimonials } from './ui/animated-testimonials'

export default function Team() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch('/api/team');
                if (!res.ok) {
                    throw new Error('Failed to fetch team data');
                }
                const data = await res.json();
                setTeam(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTeam();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const testimonials = team.map((member: any) => ({
        quote: member.qualification || '', 
        name: member.name || '', 
        designation: member.position || '', 
                src: (() => {
            const imageUrl = member.image;
            const isValidUrl = (url) => {
                try {
                    new URL(url);
                    return true;
                } catch (e) {
                    return false;
                }
            };
            return (imageUrl && isValidUrl(imageUrl)) ? imageUrl : "/image/teamlanding.png";
        })(),
        fill: true, 
    })).filter((member: any) => member.name !== '');

    return (
        <section id="team" className="min-h-screen items-center justify-center">
            <Header title='Our Team' />
            <AnimatedTestimonials testimonials={testimonials} />
        </section>
    )
}
