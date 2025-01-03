// src/app/utils/supabaseServer.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export function createSupabaseServerClient() {
    // This automatically reads the auth cookie and returns a Supabase client for SSR
    return createServerComponentClient({ cookies });
}