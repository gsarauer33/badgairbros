import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/app/utils/supabaseServer';
import UpdateProfileForm from './updateForm';
// we can separate out the form logic into a client component

export const revalidate = 0;
// ensures no caching, so we always fetch fresh data

export default async function ProfilePage() {
    const supabase = createSupabaseServerClient();

    // 1) Get the current user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // If not logged in, redirect
    if (!user) {
        redirect('/auth/login');
    }

    // 2) Query the "profiles" table to get this user's profile
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    // If no row found, user can create one. Let's handle that gracefully:
    if (error) {
        // It's possible we just don't have a row yet
        return (
            <div style={{ margin: '2rem' }}>
                <h1>Profile</h1>
                <p>No profile found. Create one below:</p>
                <UpdateProfileForm initialProfile={{ full_name: '', phone: '' }} />
            </div>
        );
    }

    return (
        <div style={{ margin: '2rem' }}>
            <h1>Profile</h1>
            <p>User ID: {user.id}</p>
            <UpdateProfileForm initialProfile={profile} />
        </div>
    );
}