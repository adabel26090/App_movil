import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://esrvojiudtxwalmsdycb.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzcnZvaml1ZHR4d2FsbXNkeWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNTAwMTMsImV4cCI6MjA1OTYyNjAxM30.Di-dsii7xojN9RwemhsnrL8wc-X8cTEfcoCslEqPCB4' 
export const supabase = createClient(supabaseUrl, supabaseAnonKey, { 
auth: { 
//storage: AsyncStorage, 
autoRefreshToken: true, 
persistSession: true, 
detectSessionInUrl: false, 
}, 
})