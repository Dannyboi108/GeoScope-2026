// Auth logic (depends on supabaseClient and uiRenderer)

window.handleLogin = async function() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorDiv = document.getElementById('login-error');
  const btn = document.getElementById('login-submit');

  errorDiv.style.display = 'none';
  if (!email || !password) {
    errorDiv.innerText = 'Please enter email and password.';
    errorDiv.style.display = 'block';
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Signing in...';
  const { error } = await window.supabaseClient.auth.signInWithPassword({ email, password });
  btn.disabled = false;
  btn.textContent = 'Sign In';
  if (error) {
    errorDiv.innerText = error.message || 'Invalid credentials.';
    errorDiv.style.display = 'block';
  }
  // On success, bootstrap's onAuthStateChange will replace the UI
};

window.handleSignup = async function() {
  const fullName = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const errorDiv = document.getElementById('signup-error');
  const btn = document.getElementById('signup-submit');

  errorDiv.style.display = 'none';
  if (!fullName || !email || !password) {
    errorDiv.innerText = 'All fields are required.';
    errorDiv.style.display = 'block';
    return;
  }
  if (password.length < 6) {
    errorDiv.innerText = 'Password must be at least 6 characters.';
    errorDiv.style.display = 'block';
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Creating account...';
  const { data, error } = await window.supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });
  btn.disabled = false;
  btn.textContent = 'Create Account';
  if (error) {
    errorDiv.innerText = error.message;
    errorDiv.style.display = 'block';
    return;
  }
  if (data.user && data.session) {
    // Already logged in (email confirmation disabled)
    return;
  } else if (data.user && !data.session) {
    errorDiv.innerText = '✅ Signup successful! Please verify your email address before logging in.';
    errorDiv.style.background = '#e6f7e6';
    errorDiv.style.borderLeftColor = '#2b8c4e';
    errorDiv.style.color = '#1f6e3f';
    errorDiv.style.display = 'block';
  } else {
    errorDiv.innerText = 'Unexpected signup response. Try logging in.';
    errorDiv.style.display = 'block';
  }
};

window.handleSSO = function() {
  alert('SSO not configured. Please use email/password or configure your Supabase SSO provider.');
};

window.handleLogout = async function() {
  await window.supabaseClient.auth.signOut();
  window.location.reload();
};