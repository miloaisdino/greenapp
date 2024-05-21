import apiLinks from "../pages/api";

export async function fetchCurrentUser() {
  try {
    const response = await fetch(`/${apiLinks.main}/current-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies if API requires authentication
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current user");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
