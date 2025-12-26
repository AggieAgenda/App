import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:8000'; // Your Django backend URL

  // Fetch current user data
  const fetchUser = async () => {
  try {
    const res = await fetch(`${API_URL}/dj-rest-auth/user/`, {
      method: "GET",
      credentials: "include",   // IMPORTANT
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const userData = await res.json();
      setUser(userData);
    } else {
      setUser(null);
    }
  } catch (e) {
    console.error("Error fetching user:", e);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUser();
}, []);

  // Load user on mount or when token changes
  useEffect(() => {
    fetchUser();
  }, [token]);

  // Login function - redirects to Google OAuth
  const login = () => {
  const next = encodeURIComponent("http://localhost:5173/dashboard/overview");
  window.location.href = `${API_URL}/accounts/google/login/?next=${next}`;
};

  // Handle OAuth callback (called from callback page)
  const handleCallback = (authToken) => {
    localStorage.setItem('token', authToken);
    setToken(authToken);
  };

  // Logout function
  const logout = async () => {
  try {
    await fetch(`${API_URL}/dj-rest-auth/logout/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error logging out:", e);
  } finally {
    setUser(null);
    localStorage.removeItem("token");
    setToken(null);
  }
};


  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile/update/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        return { success: true };
      } else {
        return { success: false, error: 'Failed to update profile' };
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    handleCallback,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};