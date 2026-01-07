import {
  createSession as dbCreateSession,
  getSession as dbGetSession,
  deleteSession as dbDeleteSession,
  validateUserCredentials,
  createUser,
} from "./db";

// Re-export database functions for use in the application
export function createSession(userId: number): string {
  return dbCreateSession(userId);
}

export function getSession(sessionId: string) {
  return dbGetSession(sessionId);
}

export function deleteSession(sessionId: string): void {
  dbDeleteSession(sessionId);
}

export function validateCredentials(
  username: string,
  password: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  return validateUserCredentials(username, password);
}

export function registerUser(
  username: string,
  email: string,
  password: string
): Promise<{ success: boolean; userId?: number; error?: string }> {
  return createUser(username, email, password);
}
