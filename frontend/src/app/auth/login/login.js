'use client';

import { useState } from 'react';
import { supabase } from '@/app/utils/supabaseClient';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) {
            setFeedback(`Error: ${error.message}`);
        } else {
            setFeedback('Login successful! You may proceed to the dashboard.');
        }
    };

    return (
        <div style={{ margin: '2rem' }}>
            <h1>Login</h1>
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
                <button type="submit" style={{ marginTop: '1rem' }}>Sign In</button>
            </form>
        </div>
    );
}