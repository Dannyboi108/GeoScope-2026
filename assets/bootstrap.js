// bootstrap.js – Main startup logic

window.showConfigError = function () {
  const root = document.getElementById('app-root');
  root.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:center; height:100vh; background:#f4f7fa;">
      <div style="background:#fff; padding:32px; border-radius:20px; max-width:500px; text-align:center;">
        <h2 style="color:#1a6baa;">🔧 Supabase credentials missing</h2>
        <p style="margin-top:12px;">Please replace <strong>SUPABASE_URL</strong> and <strong>SUPABASE_ANON_KEY</strong> in config.js with your own Supabase project keys.</p>
      </div>
    </div>
  `;
};

async function bootstrap() {
  if (!window.isSupabaseConfigured()) {
    window.showConfigError();
    return;
  }

  if (!window.supabaseClient) {
    console.error('Supabase client not initialized');
    return;
  }

  const isStartPage = window.location.pathname.includes('start.html');
  const { data: { session } } = await window.supabaseClient.auth.getSession();

  // If already logged in and not on the auth page, go straight to the app
  if (session && !isStartPage) {
    window.location.href = '/';
    return;
  }

  // Render the auth UI (on start.html always, or on any page without a session)
  document.getElementById('app-root').innerHTML = window.renderAuthUI();
  window.initTabsAndSwitches();
  window.attachAuthEventListeners();

  // Listen for auth state changes
  window.supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      // Redirect to main app after login or signup
      window.location.href = '/';
    } else if (event === 'SIGNED_OUT') {
      window.location.reload();
    }
  });
}

window.addEventListener('DOMContentLoaded', bootstrap);