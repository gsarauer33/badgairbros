'use client';

import { useState } from 'react';
import { supabase } from '@/app/utils/supabaseClient';
import { parseCSV } from '@/app/utils/csvParser';

export default function UploadPage() {
    const [csvText, setCsvText] = useState('');
    const [feedback, setFeedback] = useState(null);

    const handleCSVSubmit = async (e) => {
        e.preventDefault();
        const rows = parseCSV(csvText);

        // Optionally fetch the user to confirm authentication
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userData?.user?.id) {
            setFeedback('Error: Must be logged in to upload CSV.');
            return;
        }

        try {
            // Insert into "profit_data" (or your chosen table name)
            const { data, error } = await supabase
                .from('profit_data')
                .insert(rows.map(row => ({
                    field_name: row.fieldName,
                    yield_per_acre: parseFloat(row.yieldPerAcre),
                    cost_per_acre: parseFloat(row.costPerAcre),
                    owner_id: userData.user.id,
                })));

            if (error) throw error;
            setFeedback(`Inserted ${data.length} records successfully.`);
        } catch (err) {
            setFeedback(`Error: ${err.message}`);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Upload CSV</h1>
            <form onSubmit={handleCSVSubmit}>
        <textarea
            rows={5}
            cols={40}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            placeholder="Paste CSV content here"
        />
                <br/>
                <button type="submit">Parse & Insert</button>
            </form>
            {feedback && <p>{feedback}</p>}
        </div>
    );
}