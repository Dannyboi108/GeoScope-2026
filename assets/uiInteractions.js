// UI helpers: tabs, switch links, attaching event listeners

window.initTabsAndSwitches = function() {
  const tabs = document.querySelectorAll('.tab');
  const panels = {
    login: document.getElementById('panel-login'),
    signup: document.getElementById('panel-signup')
  };
  function activateTab(name) {
    tabs.forEach(t => t.classList.remove('active'));
    const activeTab = Array.from(tabs).find(t => t.getAttribute('data-tab') === name);
    if (activeTab) activeTab.classList.add('active');
    if (panels.login && panels.signup) {
      panels.login.classList.toggle('active', name === 'login');
      panels.signup.classList.toggle('active', name === 'signup');
    }
  }
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      if (tabName === 'login') activateTab('login');
      else if (tabName === 'signup') activateTab('signup');
    });
  });
  const toSignup = document.getElementById('switch-to-signup');
  const toLogin = document.getElementById('switch-to-login');
  if (toSignup) toSignup.addEventListener('click', () => activateTab('signup'));
  if (toLogin) toLogin.addEventListener('click', () => activateTab('login'));
};

window.attachAuthEventListeners = function() {
  const loginBtn = document.getElementById('login-submit');
  if (loginBtn) loginBtn.addEventListener('click', window.handleLogin);
  const signupBtn = document.getElementById('signup-submit');
  if (signupBtn) signupBtn.addEventListener('click', window.handleSignup);
  const ssoBtns = document.querySelectorAll('.sso-btn');
  ssoBtns.forEach(btn => btn.addEventListener('click', window.handleSSO));
};