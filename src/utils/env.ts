export const validateEnv = () => {
  const requiredEnvVars = ["VITE_GITHUB_TOKEN"];

  const missingVars = requiredEnvVars.filter(
    (envVar) => !import.meta.env[envVar]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }

  // Validate GitHub token format
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
  if (!githubToken.startsWith("github_pat_")) {
    throw new Error(
      'Invalid GitHub token format. Token should start with "github_pat_"'
    );
  }

  return true;
};
