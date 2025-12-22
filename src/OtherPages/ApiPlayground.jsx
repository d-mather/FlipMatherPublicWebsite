import React, { useEffect, useState } from 'react';

export default function ApiPlayground() {
  // ---------- config ----------
  const [base, setBase] = useState('/api'); // change if your API lives elsewhere
  const [csrf, setCsrf] = useState(null);   // filled by /api/me if you implemented CSRF

  // ---------- state (forms) ----------
  const [createForm, setCreateForm] = useState({
    first_name: 'Flip',
    last_name: 'Mather',
    email: 'flipmather@gmail.com',
    phone_e164: '+27612376060',
    password: '',
    marketing_opt_in: true,
  });

  const [loginForm, setLoginForm] = useState({
    email: 'flipmather@gmail.com',
    password: '',
  });

  const [updateForm, setUpdateForm] = useState({
    first_name: 'Flip',
    last_name: 'Mather',
    phone_e164: '+27612376060',
    locale: 'en-ZA',
    timezone: 'Africa/Johannesburg',
    marketing_opt_in: true,
    new_password: '',
  });

  const [lookupId, setLookupId] = useState('');

  // ---------- returned data ----------
  const [me, setMe] = useState(null);             // /api/me -> { user, csrf? }
  const isAdmin = !!(me && me.user && me.user.role === 'admin');
  // hasVerified is derived from email_verified_at when available (from GET /api/users/{id} or future /me)
  const [fetchedUser, setFetchedUser] = useState(null);
  const fetchedHasVerified = !!(fetchedUser && fetchedUser.email_verified_at);

  const [lastStatus, setLastStatus] = useState(null);
  const [lastJson, setLastJson] = useState(null);
  const [busy, setBusy] = useState(false);

  // ---------- helpers ----------
  function pretty(v) { return JSON.stringify(v, null, 2); }

  async function api(path, { method = 'GET', body, headers } = {}) {
    setBusy(true);
    setLastStatus(null);
    setLastJson(null);
    try {
      const opts = {
        method,
        credentials: 'include', // keep session cookie
        headers: { 'Content-Type': 'application/json', ...(headers || {}) },
      };
      if (csrf && /^(POST|PUT|PATCH|DELETE)$/i.test(method)) {
        opts.headers['X-CSRF-Token'] = csrf; // only matters if you added CSRF to server
      }
      if (body != null) opts.body = JSON.stringify(body);
      const res = await fetch(base.replace(/\/$/, '') + path, opts);
      const text = await res.text();
      let json;
      try { json = text ? JSON.parse(text) : null; } catch { json = { raw: text }; }
      setLastStatus(res.status);
      setLastJson(json);
      return { res, json };
    } catch (e) {
      setLastStatus(-1);
      setLastJson({ error: e.message });
      return { res: null, json: null, error: e };
    } finally {
      setBusy(false);
    }
  }

  // ---------- actions ----------
  async function doCreate() {
    await api('/users', { method: 'POST', body: createForm });
  }

  async function doLogin() {
    const out = await api('/login', { method: 'POST', body: loginForm });
    if (out?.json?.ok) await doMe();
  }

  async function doLogout() {
    await api('/logout', { method: 'POST' });
    setMe({ user: null, csrf: null });
    setCsrf(null);
  }

  async function doMe() {
    const out = await api('/me');
    if (out?.json) {
      setMe(out.json);
      if (out.json.csrf) setCsrf(out.json.csrf);
      // seed update form from returned user if present
      if (out.json.user) {
        setUpdateForm(f => ({
          ...f,
          first_name: out.json.user.first_name || f.first_name,
          last_name: out.json.user.last_name || f.last_name,
          phone_e164: out.json.user.phone_e164 || f.phone_e164,
        }));
      }
    }
  }

  async function doGetUser() {
    if (!lookupId) return;
    const out = await api(`/users/${encodeURIComponent(lookupId)}`);
    if (out?.json && !out.json.error) {
      setFetchedUser(out.json);
    }
  }

  async function doUpdate() {
    if (!me || !me.user) {
      setLastJson({ error: 'Not logged in' });
      return;
    }
    await api(`/users/${me.user.id}`, { method: 'PATCH', body: updateForm });
    await doMe(); // refresh
  }

  // ---------- on mount, try to get current session ----------
  useEffect(() => {
    doMe(); 
    /* eslint-disable-next-line */ }
  , []);

  // ---------- ui bits ----------
  const s = {
    page: { fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial', background: '#f6f7fb', minHeight: '100vh', color: '#0f172a' },
    wrap: { maxWidth: 1100, margin: '0 auto', padding: 16 },
    h1: { fontSize: 22, margin: '10px 0' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
    grid1: { display: 'grid', gridTemplateColumns: '1fr', gap: 12 },
    panel: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 14 },
    label: { display: 'block', fontSize: 12, color: '#475569', marginBottom: 6 },
    input: { width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #cbd5e1' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
    btnRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
    button: { padding: '10px 14px', borderRadius: 10, border: 'none', fontWeight: 700, background: '#0ea5e9', color: '#fff', cursor: 'pointer' },
    ghost: { padding: '10px 14px', borderRadius: 10, border: '1px solid #0ea5e9', fontWeight: 700, background: 'transparent', color: '#0ea5e9', cursor: 'pointer' },
    pre: { background: '#0f172a', color: '#e2e8f0', padding: 12, borderRadius: 10, overflow: 'auto', fontSize: 12 },
    chip: { display: 'inline-block', background: '#eef6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', padding: '4px 8px', borderRadius: 999, fontSize: 12, fontWeight: 700 },
    badge: { display: 'inline-block', background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', padding: '4px 8px', borderRadius: 999, fontSize: 12, fontWeight: 700 },
    danger: { display: 'inline-block', background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '4px 8px', borderRadius: 999, fontSize: 12, fontWeight: 700 },
  };

  // mobile tweaks
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 860;
  const grid = isMobile ? s.grid1 : s.grid;

  return (
    <main style={s.page}>
      <div style={s.wrap}>
        <h1 style={s.h1}>API Playground</h1>

        <div style={{ ...s.panel, marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr auto', gap: 8, alignItems: 'center' }}>
            <div>
              <label style={s.label}>API Base URL</label>
              <input style={s.input} value={base} onChange={e => setBase(e.target.value)} placeholder="/api" />
            </div>
            <div>
              <div style={{ marginTop: isMobile ? 8 : 0 }}>
                <span style={s.chip}>Session: {me && me.user ? 'Logged in' : 'Guest'}</span>{' '}
                <span style={isAdmin ? s.badge : s.chip}>isAdmin: {isAdmin ? 'true' : 'false'}</span>{' '}
                <span style={fetchedHasVerified ? s.badge : s.chip}>hasVerified: {String(fetchedHasVerified)}</span>{' '}
                {csrf ? <span style={s.badge}>CSRF ready</span> : <span style={s.danger}>CSRF not set</span>}
              </div>
            </div>
          </div>
        </div>

        <div style={grid}>
          {/* CREATE USER */}
          <section style={s.panel}>
            <h3>Create User (POST /users)</h3>
            <Field label="First name">
              <input style={s.input} value={createForm.first_name} onChange={e => setCreateForm({ ...createForm, first_name: e.target.value })} />
            </Field>
            <Field label="Last name">
              <input style={s.input} value={createForm.last_name} onChange={e => setCreateForm({ ...createForm, last_name: e.target.value })} />
            </Field>
            <Field label="Email">
              <input style={s.input} value={createForm.email} onChange={e => setCreateForm({ ...createForm, email: e.target.value })} />
            </Field>
            <Field label="Phone (E.164)">
              <input style={s.input} value={createForm.phone_e164} onChange={e => setCreateForm({ ...createForm, phone_e164: e.target.value })} />
            </Field>
            <Field label="Password">
              <input style={s.input} type="password" value={createForm.password} onChange={e => setCreateForm({ ...createForm, password: e.target.value })} />
            </Field>
            <label style={s.label}>
              <input type="checkbox" checked={createForm.marketing_opt_in} onChange={e => setCreateForm({ ...createForm, marketing_opt_in: e.target.checked })} />
              {' '}Marketing opt-in
            </label>
            <div style={s.btnRow}>
              <button style={s.button} onClick={doCreate} disabled={busy}>Create</button>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
              Note: admin/verified flags aren’t set at signup in this API. <em>isAdmin</em> derives from <code>role</code>, and <em>hasVerified</em> from <code>email_verified_at</code> when the server returns it.
            </p>
          </section>

          {/* LOGIN / LOGOUT */}
          <section style={s.panel}>
            <h3>Auth (POST /login, /logout)</h3>
            <Field label="Email">
              <input style={s.input} value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} />
            </Field>
            <Field label="Password">
              <input style={s.input} type="password" value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} />
            </Field>
            <div style={s.btnRow}>
              <button style={s.button} onClick={doLogin} disabled={busy}>Login</button>
              <button style={s.ghost} onClick={doLogout} disabled={busy}>Logout</button>
              <button style={s.ghost} onClick={doMe} disabled={busy}>Refresh /me</button>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
              After login, session cookie is stored (same-origin). Click “Refresh /me” to fetch the current user and CSRF token (if enabled).
            </p>
          </section>

          {/* GET USER BY ID */}
          <section style={s.panel}>
            <h3>Get User (GET /users/:id)</h3>
            <Field label="User ID">
              <input style={s.input} value={lookupId} onChange={e => setLookupId(e.target.value)} placeholder="e.g. 1" />
            </Field>
            <div style={s.btnRow}>
              <button style={s.button} onClick={doGetUser} disabled={busy || !lookupId}>Fetch user</button>
            </div>
            {fetchedUser && (
              <div style={{ marginTop: 8, fontSize: 12, color: '#334155' }}>
                Role: <strong>{fetchedUser.role || '—'}</strong> ·
                {' '}Verified: <strong>{fetchedUser.email_verified_at ? 'true' : 'false'}</strong>
              </div>
            )}
          </section>

          {/* UPDATE SELF */}
          <section style={s.panel}>
            <h3>Update Profile (PATCH /users/:id)</h3>
            <Field label="First name">
              <input style={s.input} value={updateForm.first_name} onChange={e => setUpdateForm({ ...updateForm, first_name: e.target.value })} />
            </Field>
            <Field label="Last name">
              <input style={s.input} value={updateForm.last_name} onChange={e => setUpdateForm({ ...updateForm, last_name: e.target.value })} />
            </Field>
            <Field label="Phone (E.164)">
              <input style={s.input} value={updateForm.phone_e164} onChange={e => setUpdateForm({ ...updateForm, phone_e164: e.target.value })} />
            </Field>
            <div style={s.row}>
              <Field label="Locale">
                <input style={s.input} value={updateForm.locale} onChange={e => setUpdateForm({ ...updateForm, locale: e.target.value })} />
              </Field>
              <Field label="Timezone">
                <input style={s.input} value={updateForm.timezone} onChange={e => setUpdateForm({ ...updateForm, timezone: e.target.value })} />
              </Field>
            </div>
            <label style={s.label}>
              <input type="checkbox" checked={!!updateForm.marketing_opt_in} onChange={e => setUpdateForm({ ...updateForm, marketing_opt_in: e.target.checked })} />
              {' '}Marketing opt-in
            </label>
            <Field label="New password (optional)">
              <input style={s.input} type="password" value={updateForm.new_password} onChange={e => setUpdateForm({ ...updateForm, new_password: e.target.value })} />
            </Field>
            <div style={s.btnRow}>
              <button style={s.button} onClick={doUpdate} disabled={busy || !me || !me.user}>Update me</button>
              <button style={s.ghost} onClick={() => setUpdateForm(f => ({ ...f, new_password: '' }))}>Clear new password</button>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
              This endpoint (as written) lets users update themselves (name/phone/locale/timezone/marketing, and optionally password).
              Admin/verified toggles aren’t implemented server-side in your current `update_user.php`.
            </p>
          </section>
        </div>

        {/* RESPONSE VIEWER */}
        <section style={{ ...s.panel, marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
            <h3 style={{ margin: 0 }}>Last response</h3>
            <div>
              <span style={s.chip}>HTTP: {lastStatus == null ? '—' : lastStatus}</span>{' '}
              {busy ? <span style={s.danger}>Working…</span> : null}
            </div>
          </div>
          <pre style={s.pre}>{pretty(lastJson)}</pre>
        </section>
      </div>
    </main>
  );
}

// small presentational helper
function Field({ label, children }) {
  return (
    <label>
      <div style={{ fontSize: 12, color: '#475569', marginBottom: 6 }}>{label}</div>
      {children}
    </label>
  );
}
