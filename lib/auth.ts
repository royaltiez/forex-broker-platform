import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "replace-me";

export type JwtPayload = {
  userId: string;
  email: string;
  role: string;
};

export function signToken(user: { id: string; email: string; role: string }) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
