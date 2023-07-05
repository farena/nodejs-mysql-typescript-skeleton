import { Secret, sign, SignOptions, verify, VerifyOptions } from "jsonwebtoken";
import { CustomError, HttpErrorCode } from "../Exceptions/CustomError";

const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY ?? "JWT_SECRET_TOKEN";

export class UserPayload {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;

  constructor({ user_id, first_name, last_name, email }: any) {
    this.user_id = user_id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }

  toPlain() {
    return { ...this };
  }
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
    expiresIn: "5h",
  };

  // generate JWT
  return sign(payload.toPlain(), SECRET_KEY, signInOptions);
}

/**
 * checks if JWT token is valid
 *
 * @param token expected token payload
 */
export function validateToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    try {
      const decoded = verify(token, SECRET_KEY) as TokenPayload;

      if (!decoded)
        reject(
          new CustomError("Token has expired", HttpErrorCode.UNAUTHORIZED)
        );
      else resolve(decoded);
    } catch (error) {
      reject(new CustomError("Token has expired", HttpErrorCode.UNAUTHORIZED));
    }
  });
}
