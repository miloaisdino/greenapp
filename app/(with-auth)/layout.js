'use server'
import Header from "../component/header";
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function withAuthLayout({children}) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data) {
       redirect('/login');
    } else {
        return (
            <div>
                <Header/>
                {children}
            </div>
        );
    }
}