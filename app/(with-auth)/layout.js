'use server'
import Header from "../component/header";
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function withAuthLayout({children}) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data) {
       redirect('/login');
    } else {
        return (
            <div>
                <Header auth={data} redirect={redirect} />
                {children}
                <ToastContainer />
            </div>
        );
    }
}