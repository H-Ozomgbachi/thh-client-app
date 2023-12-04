export const frontendUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.thehaulagehub.com";

export const backendUrl =
  process.env.NODE_ENV === "development"
    ? "https://localhost:44377/api/v1"
    : "https://analytics-api.thehaulagehub.com/api/v1";

export const thhOrgId = process.env.NODE_ENV === "development" ? 1 : 4;

// MICROSERVICES URL
export const transTrackerBackendUrl =
  process.env.NODE_ENV === "development" ? "https://localhost:7278/api/v1" : "";
