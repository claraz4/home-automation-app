import { jwtDecode } from "jwt-decode";

export function isJwtExpired(token: string) {
  try {
    const decoded: any = jwtDecode(token);

    if (!decoded?.exp) return true;

    return (
      decoded.exp * 1000 <=
      Date.now() + Number(process.env.EXPO_PUBLIC_REFRESH_TIMEOUT)
    );
  } catch {
    return true;
  }
}
