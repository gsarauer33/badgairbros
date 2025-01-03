'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/utils/supabaseClient';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setFeedback(`Error: ${error.message}`);
            return;
        }

        // If email confirmations are OFF, data.user is defined, so you can log them in / redirect.
        // If confirmations are ON, data.user is null until they confirm via email.
        if (!data.user) {
            setFeedback('Registration successful! Please check your email to confirm your account.');
        } else {
            setFeedback('Registration successful! Redirecting...');
            router.push('/dashboard'); // or maybe prompt them to log in first, your choice
        }
    };

    return (
        <div style={{ margin: '2rem' }}>
            <h1>Register</h1>
            {feedback && <p>{feedback}</p>}
            <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}
            >
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" style={{ marginTop: '1rem' }}>Sign Up</button>
            </form>
        </div>
    );
}