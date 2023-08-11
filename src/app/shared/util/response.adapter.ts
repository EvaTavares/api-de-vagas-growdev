import { Result } from "./result.contract";

export class UsecaseResponse {
  public static notFound(field: string): Result {
    return {
      ok: false,
      message: `${field} not found`,
      code: 404,
    };
  }

  public static unauthorized(): Result {
    return {
      ok: false,
      message: `Invalid credentials`,
      code: 401,
    };
  }

  public static invalidField(field: string, reason: string): Result {
    return {
      ok: false,
      message: `${field} is invalid: ${reason} `,
      code: 400,
    };
  }

  public static success(message: string, data: any): Result {
    return {
      ok: true,
      message,
      code: 200,
      data,
    };
  }
}
