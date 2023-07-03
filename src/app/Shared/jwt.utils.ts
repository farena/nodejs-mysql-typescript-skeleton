import { Secret, sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";

const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY ?? "JWT_SECRET_TOKEN";

interface UserPayload {
  user_id: number;
  first_name: number;
  last_name: number;
  email: number;
}

export interface TokenPayload extends UserPayload {
  exp: number;
}

/**
 * generates JWT token
 * @param payload User data to insert in the JWT token
 * @returns
 */
export function generateToken(payload: UserPayload) {
  const signInOptions: SignOptions = {
    algorithm: "RS256",
    expiresIn: "5h",
  };

  // generate JWT
  return sign(payload, SECRET_KEY, signInOptions);
}

/**
 * checks if JWT token is valid
 *
 * @param token expected token payload
 */
export function validateToken(token: string): Promise<TokenPayload> {
  const verifyOptions: VerifyOptions = {
    algorithms: ["RS256"],
  };

  return new Promise((resolve, reject) => {
    const decoded = verify(token, SECRET_KEY, verifyOptions) as TokenPayload;

    if (!decoded) reject();
    else resolve(decoded);
  });
}
