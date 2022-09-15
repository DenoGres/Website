import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Pool } from "https://deno.land/x/postgres/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import * as cookie from "https://deno.land/std/http/cookie.ts";
import { decode } from "https://deno.land/x/djwt/mod.ts";
import { QueryObjectResult } from "https://deno.land/x/postgres@v0.16.1/query/query.ts";
import "https://deno.land/x/dotenv/load.ts";

interface payloadObj {
  id: number;
  username: string;
  exp: number;
}

interface payload {
  payload: payloadObj;
}

export const handler: Handlers = {
  // GET REQUEST
  async GET(req: Request): Promise<Response> {
    try {
      const cookies = cookie.getCookies(req.headers);

      // if jwt exists, get user id from jwt, insert connection record
      if (cookies.jwt) {
        const payload = decode(cookies.jwt)[1] as payload;

        const POOL_CONNECTIONS = 3;
        const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
        const connection = await pool.connect();

        const getUser: QueryObjectResult = await connection.queryObject(
          `
        SELECT id FROM users WHERE username = '${payload.payload.username}'
        ;`,
        );

        const userId = getUser.rows[0].id;

        const getData: QueryObjectResult = await connection.queryObject(
          `
          SELECT * FROM connections WHERE user_id = '${userId}'
        ;`,
        );

        // close connection
        connection.end();

        return new Response(JSON.stringify(getData.rows), {
          status: 200,
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ err }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "Error in middleware" }), {
      status: 404,
    });
  },

  // POST REQUEST
  async POST(req: Request): Promise<Response> {
    console.log("in POST: handleConnectionSave - POST");
    try {
      const cookies = cookie.getCookies(req.headers);

      // if jwt exists, get user id from jwt, insert connection record
      if (cookies.jwt) {
        const payload = decode(cookies.jwt)[1] as payload;

        const body = await req.json();
        const { connectionName, address, port, username, defaultDB, password } =
          body;

        const POOL_CONNECTIONS = 3;
        const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
        const connection = await pool.connect();

        const getUser: QueryObjectResult = await connection.queryObject(
          `
        SELECT id, username, password FROM users WHERE username = '${payload.payload.username}'
        ;`,
        );

        const userId = getUser.rows[0].id;
        await connection.queryObject(
          `
          INSERT INTO connections (user_id, connection_name, connection_address, port_number, default_db, db_username, db_password)
          VALUES (${userId}, '${connectionName}', '${address}', ${port}, '${defaultDB}', '${username}', '${password}')
        ;`,
        );

        connection.end();

        return new Response("Successfully saved new connection", {
          status: 200,
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ err }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "Error in middleware" }), {
      status: 404,
    });
  },

  // PATCH REQUEST
  async PATCH(req: Request): Promise<Response> {
    console.log("in POST: handleConnectionSave - PATCH");
    try {
      const cookies = cookie.getCookies(req.headers);

      // if jwt exists, get user id from jwt, insert connection record
      if (cookies.jwt) {
        const body = await req.json();
        const {
          connectionId,
          connectionName,
          address,
          port,
          username,
          defaultDB,
          password,
        } = body;

        const POOL_CONNECTIONS = 3;
        const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
        const connection = await pool.connect();

        await connection.queryObject(
          `
        UPDATE connections SET 
        connection_name = '${connectionName}', connection_address ='${address}', port_number = ${port}, default_db = '${defaultDB}', db_username = '${username}', db_password = '${password}'
        WHERE id = ${connectionId};`,
        );

        connection.end();

        return new Response("Successfully updated connection", {
          status: 200,
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ err }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "error in middleware" }), {
      status: 404,
    });
  },

  // POST REQUEST
  async DELETE(req: Request): Promise<Response> {
    console.log("in POST: handleConnectionSave - DELETE");
    try {
      const cookies = cookie.getCookies(req.headers);

      // if jwt exists, get user id from jwt, insert connection record
      if (cookies.jwt) {
        const body = await req.json();
        const { connectionId } = body;

        const POOL_CONNECTIONS = 3;
        const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
        const connection = await pool.connect();

        await connection.queryObject(
          `
          DELETE FROM connections WHERE id = '${connectionId}'
        ;`,
        );

        connection.end();

        return new Response("Successfully deleted new connection", {
          status: 200,
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ err }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "error in middleware" }), {
      status: 404,
    });
  },
};
