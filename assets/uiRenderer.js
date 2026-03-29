// Functions that return HTML strings (depends on nothing else)

window.renderAuthUI = function() {
  return `
    <div class="full-layout">
      <div class="left">
        <a href="#" class="logo">
          <div class="logo-mark"><svg viewBox="0 0 20 20" fill="none"><path d="M3 10L10 3L17 10L10 17L3 10Z" stroke="white" stroke-width="1.5" fill="rgba(255,255,255,0.1)"/><circle cx="10" cy="10" r="2.5" fill="white"/></svg></div>
          <div class="logo-text"><span class="logo-name">GeoScope</span><span class="logo-sub">Immersion Data Solutions</span></div>
        </a>
        <div class="hero-copy">
          <div class="eyebrow">Building Intelligence Platform</div>
          <h1 class="hero-title">Map every building.<br>Track every <em>system.</em></h1>
          <p class="hero-desc">GeoScope gives IDS teams precise building outline mapping and automated HVAC detection — powered by aerial imagery analysis.</p>
          <div class="map-card">
            <div class="map-area"><div class="scan-line"></div><svg class="map-svg" viewBox="0 0 420 180" preserveAspectRatio="xMidYMid slice"><rect class="roof" x="28"  y="22"  width="95"  height="68" rx="2"/><rect class="roof" x="148" y="35"  width="68"  height="52" rx="2"/><rect class="roof" x="250" y="18"  width="130" height="85" rx="2"/><rect class="roof" x="26"  y="112" width="120" height="56" rx="2"/><rect class="roof" x="205" y="118" width="95"  height="54" rx="2"/><rect class="outline" x="28"  y="22"  width="95"  height="68" rx="2"/><rect class="outline" x="148" y="35"  width="68"  height="52" rx="2"/><rect class="outline" x="250" y="18"  width="130" height="85" rx="2"/><rect class="outline" x="26"  y="112" width="120" height="56" rx="2"/><rect class="outline" x="205" y="118" width="95"  height="54" rx="2"/><rect class="hvac-unit" x="54"  y="44"  width="7" height="7" rx="1"/><rect class="hvac-unit" x="82"  y="60"  width="7" height="7" rx="1"/><rect class="hvac-unit" x="168" y="52"  width="7" height="7" rx="1"/><rect class="hvac-unit" x="278" y="38"  width="7" height="7" rx="1"/><rect class="hvac-unit" x="318" y="55"  width="7" height="7" rx="1"/><rect class="hvac-unit" x="68"  y="130" width="7" height="7" rx="1"/><rect class="hvac-unit" x="232" y="135" width="7" height="7" rx="1"/></svg></div>
            <div class="map-stats"><div class="stat"><div class="stat-n">5</div><div class="stat-l">Buildings</div></div><div class="stat"><div class="stat-n">7</div><div class="stat-l">HVAC Units</div></div><div class="stat"><div class="stat-n">98%</div><div class="stat-l">Confidence</div></div></div>
          </div>
        </div>
        <div class="left-footer">© 2025 Immersion Data Solutions. All rights reserved.</div>
      </div>
      <div class="right">
        <div class="tabs"><button class="tab active" data-tab="login">Sign In</button><button class="tab" data-tab="signup">Create Account</button></div>
        <div class="form-panel active" id="panel-login">
          <div class="form-title">Welcome back</div><div class="form-sub">Sign in to your GeoScope workspace.</div>
          <div class="field"><label>Email address</label><div class="input-wrap"><input type="email" id="login-email" placeholder="you@immersiondata.com"/><svg class="field-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg></div></div>
          <div class="field"><label>Password</label><div class="input-wrap"><input type="password" id="login-password" placeholder="Enter your password"/><svg class="field-icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div><a href="#" class="forgot">Forgot your password?</a></div>
          <button class="submit-btn" id="login-submit">Sign In</button>
          <div id="login-error" class="form-error" style="display:none;"></div>
          <div class="divider"><span>or</span></div>
          <button class="sso-btn" id="sso-login"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Continue with Single Sign-On</button>
          <div class="switch">Don't have an account? <a id="switch-to-signup">Create one</a></div>
        </div>
        <div class="form-panel" id="panel-signup">
          <div class="form-title">Get started</div><div class="form-sub">Create your GeoScope account to get started.</div>
          <div class="field"><label>Full name</label><div class="input-wrap"><input type="text" id="signup-name" placeholder="Your full name"/><svg class="field-icon" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg></div></div>
          <div class="field"><label>Work email</label><div class="input-wrap"><input type="email" id="signup-email" placeholder="you@immersiondata.com"/><svg class="field-icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg></div></div>
          <div class="field"><label>Password</label><div class="input-wrap"><input type="password" id="signup-password" placeholder="Minimum 8 characters"/><svg class="field-icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div></div>
          <button class="submit-btn" id="signup-submit">Create Account</button>
          <div id="signup-error" class="form-error" style="display:none;"></div>
          <div class="divider"><span>or</span></div>
          <button class="sso-btn" id="sso-signup"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Continue with Single Sign-On</button>
          <div class="switch">Already have an account? <a id="switch-to-login">Sign in</a></div>
        </div>
        <div class="ids-strip"><div class="ids-logo-sm"><svg viewBox="0 0 14 14" fill="none"><path d="M2 7L7 2L12 7L7 12L2 7Z" stroke="white" stroke-width="1.2" fill="rgba(255,255,255,0.15)"/><circle cx="7" cy="7" r="1.8" fill="white"/></svg></div><div class="ids-text"><strong>Immersion Data Solutions</strong>Secure platform access · Enterprise grade</div></div>
      </div>
    </div>
  `;
};

window.renderEmptyDashboard = function() {
  return `
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; background:var(--bg); font-family:var(--sans);">
      <div style="background:white; border-radius:28px; padding:48px 56px; box-shadow:0 20px 35px -12px rgba(0,0,0,0.1); text-align:center; max-width:500px;">
        <div style="background:var(--blue-lt); width:56px; height:56px; border-radius:20px; display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none"><path d="M3 10L10 3L17 10L10 17L3 10Z" stroke="white" stroke-width="1.5" fill="rgba(255,255,255,0.2)"/><circle cx="10" cy="10" r="2.5" fill="white"/></svg>
        </div>
        <h2 style="font-family:var(--serif); font-weight:600; font-size:1.9rem; color:var(--navy);">Empty dashboard</h2>
        <p style="margin: 12px 0 24px; color:var(--slate);">You are now logged into GeoScope. Your workspace will appear here.</p>
        <button id="logout-btn" style="background:var(--blue); border:none; padding:12px 24px; border-radius:40px; color:white; font-weight:600; font-family:var(--sans); cursor:pointer; transition:0.2s;">Sign out →</button>
      </div>
    </div>
  `;
};