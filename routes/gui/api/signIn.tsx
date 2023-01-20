import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Pool } from "pg/mod.ts";
import * as cookie from "cookie/cookie.ts";
import * as bcrypt from "bcrypt/mod.ts";
import { key } from "../../../utils/key.ts";
import { create, getNumericDate } from "djwt/mod.ts";
import { QueryObjectResult } from "pg/query/query.ts";
import { Ilogin } from "./signUp.tsx";

interface checkUser {
  id: number;
  username: string;
  password: string;
}

export const handler = {
  async POST(
    req: Request,
    _res: Response,
    _ctx: HandlerContext,
  ): Promise<Response> {
    try {
      const body: Ilogin = await req.json();
      const { username, password } = body;

      const POOL_CONNECTIONS = 3;
      const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
      const connection = await pool.connect();

      // check if user exists, if user does not exist - return 404
      const checkUser: QueryObjectResult<checkUser> = await connection
        .queryObject(
          "SELECT id, username, password FROM users WHERE username = $1",
          [username],
        );

      connection.end();

      // check the PW against the DB
      if (checkUser.rows.length > 0) {
        const checkPW: boolean = await bcrypt.compareSync(
          password,
          checkUser.rows[0].password,
        );

        if (checkPW) {
          const payload = {
            id: checkUser.rows[0].id,
            username: checkUser.rows[0].username,
            exp: getNumericDate(30 * 60),
          };

          // generate the JWT
          const jwt: string = await create(
            { alg: "HS512", typ: "JWT" },
            { payload },
            key,
          );

          // set the cookie and send the response
          if (jwt) {
            const res = new Response(
              JSON.stringify({
                id: checkUser.rows[0].id,
                username: checkUser.rows[0].username,
                token: jwt,
              }),
              { status: 200, headers: new Headers({}) },
            );

            cookie.setCookie(res.headers, {
              name: "jwt",
              value: jwt,
              path: "/",
              httpOnly: true,
            });

            cookie.setCookie(res.headers, {
              name: "userId",
              value: String(checkUser.rows[0].id),
              path: "/",
              httpOnly: true,
            });

            cookie.setCookie(res.headers, {
              name: "connectionId",
              value: "",
              path: "/",
              httpOnly: true,
            });

            return res;
          }
        }
      }

      return new Response(
        JSON.stringify({ err: "Login failed - invalid credentials." }),
        { status: 400 },
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ err }),
        { status: 500 },
      );
    }
  },
};
