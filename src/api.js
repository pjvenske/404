const API_BASE = "http://localhost:5000/api"; 
// 🔁 change this if your backend uses another port or prefix

// Helper to get token from localStorage
export function getAuthToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ---------- USER / AUTH ----------

export async function registerUser({ username, password, role }) {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, role }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
}

export async function loginUser({ username, password }) {
  const res = await fetch(`${API_BASE}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  // backend returns { token }
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
}

// ---------- ARTICLES ----------

export async function browseByCategory(category) {
  const res = await fetch(`${API_BASE}/articles/category/${category}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Could not load articles");
  // backend sends { articles: [...] }
  return data.articles;
}

export async function searchArticles(keyword) {
  const params = new URLSearchParams({ keyword });
  const res = await fetch(`${API_BASE}/articles/search?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Search failed");
  return data.articles;
}

export async function addArticle(articleBody) {
  const res = await fetch(`${API_BASE}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(articleBody),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Add article failed");
  return data;
}
