'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/utils/supabaseClient';

export default function ProfitMapPage() {
    const [records, setRecords] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            const { data: userData } = await supabase.auth.getUser();
            if (!userData?.user?.id) {
                setError('No user logged in.');
                return;
            }

            const { data, error } = await supabase
                .from('profit_data')
                .select('*')
                .eq('owner_id', userData.user.id);

            if (error) {
                setError(error.message);
            } else {
                setRecords(data);
            }
        })();
    }, []);

    if (error) {
        return <p style={{ color: 'red' }}>Error: {error}</p>;
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Profit Map</h1>
            {records.length === 0 ? (
                <p>No data found for your account.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Field Name</th>
                        <th>Yield / Acre</th>
                        <th>Cost / Acre</th>
                        <th>Profit / Acre</th>
                    </tr>
                    </thead>
                    <tbody>
                    {records.map((row) => (
                        <tr key={row.id}>
                            <td>{row.field_name}</td>
                            <td>{row.yield_per_acre}</td>
                            <td>{row.cost_per_acre}</td>
                            <td>{(row.yield_per_acre - row.cost_per_acre).toFixed(2)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}