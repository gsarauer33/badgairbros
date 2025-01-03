'use client';

import { useState } from 'react';
import { supabase } from '@/app/utils/supabaseClient';
import { parseCSV } from '@/app/utils/csvParser';

export default function UploadPage() {
    const [csvText, setCsvText] = useState('');
    const [cropType, setCropType] = useState(''); // “corn” or “soybeans”
    const [feedback, setFeedback] = useState(null);

    const handleCSVSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);

        // 1) Confirm user is logged in
        const { data: userData, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userData?.user?.id) {
            setFeedback('Error: Must be logged in to upload CSV.');
            return;
        }

        // 2) Parse the CSV text into an array of objects
        const rows = parseCSV(csvText);

        // 3) Insert each row into the "yield_data" table, including cropType & user_id
        try {
            const { data, error } = await supabase
                .from('yield_data')
                .insert(
                    rows.map((row) => ({
                        user_id: userData.user.id,
                        longitude: row.longitude,
                        latitude: row.latitude,
                        field_name: row.fieldName,
                        yield_per_acre: row.yieldVolume,   // from parseCSV
                        crop_type: cropType, // from dropdown
                    }))
                );

            if (error) throw error;
            setFeedback(`Inserted ${data.length} record(s) successfully.`);
        } catch (err) {
            setFeedback(`Error: ${err.message}`);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Upload CSV</h1>
            <form onSubmit={handleCSVSubmit} style={{ maxWidth: '400px' }}>
                <label>Crop Type</label>
                <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: '1rem' }}
                >
                    <option value="">-- Select a Crop --</option>
                    <option value="corn">Corn</option>
                    <option value="soybeans">Soybeans</option>
                </select>

                <label>CSV Data</label>
                <textarea
                    rows={5}
                    cols={40}
                    value={csvText}
                    onChange={(e) => setCsvText(e.target.value)}
                    placeholder="Paste CSV content here"
                    style={{ display: 'block', width: '100%', marginBottom: '1rem' }}
                    required
                />

                <button type="submit">Parse &amp; Insert</button>
            </form>

            {feedback && <p style={{ marginTop: '1rem' }}>{feedback}</p>}
        </div>
    );
}