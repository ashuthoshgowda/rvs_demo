import { UserCreateResponse, AdminSettingsResponse, UserDisplayResponse } from "@/types/api";

const API_BASE_URL = process.env.API_BASE_URL
const API_SECRET_KEY = process.env.API_SECRET_KEY

const defaultHeaders = {
  "Content-Type": "application/json",
  "X-API-Key": API_SECRET_KEY || ''
}

export async function createUser(email: string, password: string): Promise<UserCreateResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(userId: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function getAdminSettings(): Promise<AdminSettingsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/settings`, {
      cache: 'no-store',
      headers: defaultHeaders,
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json()
    console.log('Raw Admin Settings Response:', data)
    return data
  } catch (error) {
    console.error("Error fetching admin settings:", error)
    return {
      secondPageComponents: "aboutMe",
      thirdPageComponents: "address"
    }
  }
}

export async function updateAdminSettings(settings: AdminSettingsResponse) {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/settings`, {
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify(settings),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error updating admin settings:", error);
    throw error;
  }
}

export async function getUsers(): Promise<UserDisplayResponse[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: defaultHeaders,
      next: {
        revalidate: 0
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.map((user: any) => ({
      id: user.id,
      email: user.email,
      aboutMe: user.aboutMe,
      address: user.address,
      birthdate: user.birthdate ? new Date(user.birthdate) : null
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.ok;
  } catch (error) {
    console.error("API health check failed:", error);
    return false;
  }
}

