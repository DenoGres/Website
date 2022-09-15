import { HandlerContext, Handlers } from "$fresh/server.ts";
import "https://deno.land/x/dotenv/load.ts";
import { Pool } from "https://deno.land/x/postgres/mod.ts";
import * as cookie from "https://deno.land/std/http/cookie.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { key } from "../../../utils/key.ts";
import { create } from "https://deno.land/x/djwt/mod.ts";
import { getNumericDate } from "https://deno.land/x/djwt@v2.7/mod.ts";
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.16.1/query/query.ts";

//import * as postgres from "https://deno.land/x/postgres/mod.ts";

// const POOL_CONNECTIONS = 3;
// const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
// const connection = await pool.connect();

interface Ilogin {
  username: string;
  password: string;
}

interface State {
  data: string;
}

export const handler = {
  async POST(
    req: Request,
    res: Response,
    ctx: HandlerContext,
  ): Promise<Response> {
    try {
      console.log("in signIn Handler");
      const body: Ilogin = await req.json();
      const { username, password } = body;
      // const body: any = ctx.state.data;
      // const { username, password } = { username: "ediWu", password: "password"};
      // console.log(body);

      const POOL_CONNECTIONS = 3;
      const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
      const connection = await pool.connect();

      // check if user exists, if user does not exist - return 404
      const checkUser: QueryObjectResult = await connection.queryObject(
        `
      SELECT id, username, password FROM users WHERE username = '${username}'
      `,
      );

      connection.end();

      // check the PW against the DB
      if (checkUser.rows.length > 0) {
        const checkPW: boolean = await bcrypt.compare(
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

            return res;
          }
        }
      }

      return new Response(
        JSON.stringify({ err: "Login failed - invalid credentials." }),
        { status: 404 },
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ err }),
        { status: 404 },
      );
    }
  },
};
