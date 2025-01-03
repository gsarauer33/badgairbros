'use client';

import { useState } from 'react';
import { supabase } from '@/app/utils/supabaseClient';

export default function UpdateProfileForm({ initialProfile }) {
    const [fullName, setFullName] = useState(initialProfile.full_name || '');
    const [phone, setPhone] = useState(initialProfile.phone || '');
    const [feedback, setFeedback] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);

        // Get user ID from Supabase client
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
        if (!userId) {
            setFeedback('No user ID found—please log in again.');
            return;
        }

        // Insert or update row in "profiles" table
        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: userId,
                full_name: fullName,
                phone: phone,
            });
        // By default, 'upsert' merges on primary key (id).
        // Make sure the table is set to "id uuid primary key references auth.users (id)"

        if (error) {
            setFeedback(`Error: ${error.message}`);
        } else {
            setFeedback('Profile updated successfully!');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem', maxWidth: '300px' }}>
            {feedback && <p>{feedback}</p>}
            <div style={{ marginBottom: '0.5rem' }}>
                <label>Full Name</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
                <label>Phone</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button type="submit">Save Profile</button>
        </form>
    );
}