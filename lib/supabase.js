// lib/supabase.js
console.log("Supabase.js loading...");
const SUPABASE_URL = 'https://uhmismvbetbnmivtcwrl.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVobWlzbXZiZXRibm1pdnRjd3JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NzczODEsImV4cCI6MjA1NzA1MzM4MX0.VFdBsTQIx9zFuMO_PevQU8y0gNXS4i0zpNWgTwDKVM4'

// Log configuration (don't do this in production)
console.log("Supabase URL configured as:", SUPABASE_URL);
console.log("Supabase key first 5 chars:", SUPABASE_ANON_KEY.substring(0, 5) + "...");

// Initialize the Supabase client
function createSupabaseClient() {
    console.log("createSupabaseClient called");
    
    if (typeof supabase === 'undefined') {
        console.error("Supabase library not loaded! Check your script tag.");
        throw new Error("Supabase library not loaded");
    }
    
    try {
        return supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (error) {
        console.error("Error creating Supabase client:", error);
        throw error;
    }
}

console.log("Supabase.js loaded successfully");

