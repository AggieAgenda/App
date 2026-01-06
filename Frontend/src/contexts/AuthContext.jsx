import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Keep localStorage in sync with token state
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const fetchMe = async (tkn) => {
    if (!tkn) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/me/`, {
        method: "GET",
        headers: {
          Authorization: `Token ${tkn}`,
        },
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        // expected shape: { success: true, user: {...} }
        setUser(data?.user ?? data);
      } else {
        // token invalid/expired
        setUser(null);
        setToken(null);
      }
    } catch (e) {
      console.error("Error fetching /me:", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // On mount + whenever token changes
  useEffect(() => {
    setLoading(true);
    fetchMe(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Email login (token-based)
  const loginWithEmail = async ({ email, password }) => {
    const res = await fetch(`${API_URL}/api/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      throw new Error(data?.error || data?.message || "Invalid credentials");
    }

    // expected: { success: true, token, user }
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  // If you still use Google OAuth via allauth redirect, keep this
  const loginWithGoogleRedirect = () => {
    // You usually want NEXT to be your FRONTEND callback route, not backend.
    const next = encodeURIComponent("/auth/callback");
    window.location.href = `${API_URL}/accounts/google/login/?next=${next}`;
  };

  // Called by your frontend callback page after it receives token
  const handleCallback = (authToken) => {
    setToken(authToken);
  };

  const logout = async () => {
    try {
      // If you implemented accounts/views.logout at /api/auth/logout/
      await fetch(`${API_URL}/api/auth/logout/`, {
        method: "POST",
        headers: token ? { Authorization: `Token ${token}` } : {},
      });
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  const updateProfile = async (profileData) => {
    if (!token) return { success: false, error: "Not authenticated" };

    try {
      const res = await fetch(`${API_URL}/api/auth/profile/`, {
        method: "PATCH",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        return { success: false, error: data?.error || "Failed to update profile" };
      }

      // expected: { success: true, user: {...} }
      setUser(data.user ?? data);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  };

  const uiUser = user
  ? {
      name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || user.username || user.email,
      email: user.email,
      isOrganization: !!user.is_organization,
      initials: `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase() || user.email?.[0]?.toUpperCase(),
    }
  : null;

  const value = useMemo(
    () => ({
      user,
      uiUser,
      token,
      loading,
      isAuthenticated: !!token && !!user,
      setToken, // sometimes useful
      loginWithEmail,
      loginWithGoogleRedirect,
      handleCallback,
      logout,
      updateProfile,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
