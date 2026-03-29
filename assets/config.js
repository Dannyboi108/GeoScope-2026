// ========== SUPABASE CREDENTIALS ==========
window.SUPABASE_URL = 'https://dugqwaugpkrorfrsgsnp.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1Z3F3YXVncGtyb3JmcnNnc25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3OTc0ODgsImV4cCI6MjA5MDM3MzQ4OH0.S7ljCEsehzeY1VWykG6Y9pT3GJ1zy4AALKXsf488cr0';

// Helper: check if user filled real keys (compare with placeholder strings)
window.isSupabaseConfigured = function() {
  return window.SUPABASE_URL !== 'https://your-project.supabase.co' &&
         window.SUPABASE_ANON_KEY !== 'your-anon-key';
};