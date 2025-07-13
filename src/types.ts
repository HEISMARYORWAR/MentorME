// src/types.ts

import { Request } from "express";

export interface AuthenticatedUser {
  id: string;
  role: "mentee" | "mentor" | "admin";
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}


