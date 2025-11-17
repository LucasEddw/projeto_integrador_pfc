const { createClient } = supabase;

let instance = null;
let supabaseUrl = 'https://exhcjuwjcdbkdjvycxvy.supabase.co';
let supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4aGNqdXdqY2Ria2RqdnljeHZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0ODQ3MzYsImV4cCI6MjA3MjA2MDczNn0.Ze7VweDElTJGgtwbH8Ytj_fxat_nglLcdZlFJQpjqL0';

function getSupabaseClient() {
    if (!instance) {
        instance = createClient(supabaseUrl, supabaseKey)
    }
    return instance
}

exports = {
    getSupabaseClient
};