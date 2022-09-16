import { HandlerContext, Handlers } from "$fresh/server.ts";
import { Pool, PoolClient } from "pg/mod.ts";
import * as cookie from "cookie/cookie.ts";
import { QueryObjectResult } from "pg/query/query.ts";
import formatQueryText from "../../../utils/formatQueryTextToSave.ts";

const connectToDb = async (): Promise<PoolClient> => {
  const POOL_CONNECTIONS = 3;
  const pool = new Pool(Deno.env.get("DB_URI"), POOL_CONNECTIONS, true);
  const connection = await pool.connect();
  return connection;
}

export const handler: Handlers = {
  // GET REQUEST
  async GET(req: Request, _ctx: HandlerContext): Promise<Response> {
    try {
      const { connectionId } = cookie.getCookies(req.headers);

      const connection = await connectToDb();

      const queryList: QueryObjectResult = await connection.queryObject(
        `
        SELECT * FROM queries WHERE connection_id = '${connectionId}'
      ;`,
      );
      // close connection
      connection.end();

      return new Response(
        JSON.stringify(queryList.rows),
        { status: 200 },
      );
    } catch (err) {
      return new Response(err, { status: 404 });
    }
  },

  // POST REQUEST
  async POST(req: Request, _ctx: HandlerContext): Promise<Response> {
    console.log("in POST: handleQuerySave - POST");
    try {
      const { connectionId } = cookie.getCookies(req.headers);

      const connection = await connectToDb();

      const { queryName, queryText } = await req.json();
      const formattedQuery = formatQueryText(queryText);
      await connection.queryObject(
        `
        INSERT INTO queries (connection_id, query_name, query_text)
        VALUES ('${connectionId}', '${queryName}', (E'${formattedQuery}')::text)
      ;`,
      );

      connection.end();

      return new Response("Successfully saved new query", {
        status: 200,
      });
    } catch (err) {
      return new Response(err, { status: 404 });
    }
  },

  // PATCH REQUEST
  async PATCH(req: Request, _ctx: HandlerContext): Promise<Response> {
    console.log("in PATCH: handleQuerySave - PATCH");
    try {
      const { queryName, queryText, queryId } = await req.json();
      const formattedQuery = formatQueryText(queryText);

      const connection = await connectToDb();

      await connection.queryObject(
        `
        UPDATE queries SET
        query_name = '${queryName}', query_text = (E'${formattedQuery}')::text
        WHERE id = ${queryId}
      ;`,
      );

      connection.end();

      return new Response("Successfully updated old query", {
        status: 200,
      });
    } catch (err) {
      return new Response(err, { status: 404 });
    }
  },

  // DELETE REQUEST
  async DELETE(req: Request, _ctx: HandlerContext): Promise<Response> {
    console.log("in POST: handleQuerySave - DELETE");
    try {
      const { queryId } = await req.json();

      const connection = await connectToDb();

      await connection.queryObject(
        `
        DELETE FROM queries WHERE id = '${queryId}'
      ;`,
      );

      connection.end();

      return new Response("Successfully deleted saved query", {
        status: 200,
      });
    } catch (err) {
      return new Response(err, { status: 404 });
    }
  }
};
