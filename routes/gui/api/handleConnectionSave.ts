import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Pool } from "https://deno.land/x/postgres/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import * as cookie from "https://deno.land/std/http/cookie.ts";
import { decode } from "https://deno.land/x/djwt/mod.ts";
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.16.1/query/query.ts";

// obtain connection details from front-end and update local connections.json
// TODO: add functionality to save to DB once set up

const POOL_CONNECTIONS = 3;
const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
const connection = await pool.connect();

interface Connection {
  connectionName: string;
  address: string;
  port: string;
  username: string;
  defaultDB: string;
  password: string;
}

export const handler: Handlers = {
  async POST(req: Request, ctx: HandlerContext): Promise<Response> {
    try {
      const cookies = cookie.getCookies(req.headers);

      // if jwt exists, get user id from jwt, insert connection record
      if (cookies.jwt) {
        const [header, payload, signature] = decode(cookies.jwt);
        const body: Connection = await req.json();
        const { connectionName, address, port, username, defaultDB, password } =
          body;

        const getUser: QueryObjectResult = await connection.queryObject(
          `
        SELECT id, username, password FROM users WHERE username = '${payload.payload.username}'
        ;`,
        );

        const userId = getUser.rows[0].id;
        const salt: string = await bcrypt.genSalt(8);
        const hashedURIPw: string = await bcrypt.hash(password, salt);
        const insertData: QueryObjectResult = await connection.queryObject(
          `
          INSERT INTO connections (user_id, connection_name, connection_address, port_number, default_db, db_username, db_password)
          VALUES (${userId}, '${connectionName}', '${address}', ${port}, '${defaultDB}', '${username}', '${hashedURIPw}')
        ;`,
        );

        return new Response("Successfully saved new connection", {
          status: 200,
        });
      }
    } catch (err) {
      return new Response(err, { status: 404 });
    }
  },
};
