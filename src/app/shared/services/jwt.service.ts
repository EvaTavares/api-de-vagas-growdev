import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export class JwtService {
  // quando faz o login
  public createToken(data: any): string {
    const token = jwt.sign(data, process.env.JWT_SECRET!);
    return token;
  }

  // vai p o middleware - só p saber se é válido ou não
  public verifyToken(token: string): boolean {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return true;
    } catch {
      return false;
    }
  }

  // precisa da informação
  public decodeToken(token: string): any {
    const result = jwt.decode(token);

    if (!result) {
      return null;
    }

    return result;
  }
}
