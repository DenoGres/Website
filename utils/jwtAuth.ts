import * as cookie from "https://deno.land/std/http/cookie.ts";
import { decode } from "https://deno.land/x/djwt/mod.ts";
import { HandlerContext } from "$fresh/server.ts";

export default function jwtAuth(req: Request) {
  const cookies = cookie.getCookies(req.headers);
  // validate JWT
  if (!cookies.jwt) {
    return false;
  }

  const [header, payload, signature] = decode(cookies.jwt);
  // if JWT is valid, render page else render error
  if (payload.payload.username) {
    return true;
  } else {
    false;
  }
}
