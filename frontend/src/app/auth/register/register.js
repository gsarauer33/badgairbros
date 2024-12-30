'use client';

import { useState } from 'react';
import { supabase } from '@/app/utils/supabaseClient';

export default function RegisterPage() {
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
        } else {
            setFeedback('Registration successful! Check your email or proceed to login.');
        }
    };

    return (
        <div style={{ margin: '2rem' }}>
            <h1>Register</h1>
            {feedback && <p>{feedback}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit" style={{ marginTop: '1rem' }}>Sign Up</button>
            </form>
        </div>
    );
}