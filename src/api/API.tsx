// Helper function to get and validate the GitHub token
const getGitHubToken = () => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  if (!token) {
    console.error("Token is undefined or empty");
    throw new Error("GitHub token is not defined in environment variables");
  }

  if (!token.startsWith("github_pat_")) {
    console.error(
      "Token format is invalid. Token:",
      token.substring(0, 15) + "..."
    );
    throw new Error("Invalid GitHub token format");
  }

  return token;
};

const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const token = getGitHubToken();

    console.log(
      "Making API request with token:",
      token.substring(0, 15) + "..."
    );

    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
        headers: Object.fromEntries(response.headers.entries()),
      });
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error in searchGithub:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const token = getGitHubToken();

    // First get the user profile
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("GitHub API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    const userData = await response.json();

    // If email is not available in profile, try to get public email from events
    if (!userData.email) {
      try {
        const eventsResponse = await fetch(
          `https://api.github.com/users/${username}/events/public`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (eventsResponse.ok) {
          const events = await eventsResponse.json();
          // Look for push events which might contain email
          const pushEvent = events.find(
            (event: any) =>
              event.type === "PushEvent" &&
              event.payload?.commits?.[0]?.author?.email
          );
          if (pushEvent) {
            userData.email = pushEvent.payload.commits[0].author.email;
          }
        }
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    }

    // If company is not specified, try to get from organizations
    if (!userData.company) {
      try {
        const orgsResponse = await fetch(
          `https://api.github.com/users/${username}/orgs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (orgsResponse.ok) {
          const orgs = await orgsResponse.json();
          if (orgs.length > 0) {
            userData.company = orgs[0].login;
          }
        }
      } catch (error) {
        console.error("Error fetching user organizations:", error);
      }
    }

    // If location is not specified, try to get from recent activity
    if (!userData.location) {
      try {
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (reposResponse.ok) {
          const repos = await reposResponse.json();
          if (repos.length > 0 && repos[0].language) {
            userData.location = `Active in ${repos[0].language}`;
          }
        }
      } catch (error) {
        console.error("Error fetching user repositories:", error);
      }
    }

    return userData;
  } catch (err) {
    console.error("Error in searchGithubUser:", err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
