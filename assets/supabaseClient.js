// Initialize Supabase client (depends on config.js)
window.supabaseClient = null;

function initSupabase() {
  if (!window.isSupabaseConfigured()) return null;
  window.supabaseClient = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  return window.supabaseClient;
}

initSupabase();