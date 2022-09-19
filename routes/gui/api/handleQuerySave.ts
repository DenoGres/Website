import { HandlerContext, Handlers } from "$fresh/server.ts";
import * as cookie from "cookie/cookie.ts";
import { QueryObjectResult } from "pg/query/query.ts";
import formatQueryText from "../../../utils/formatQueryToSave.ts";
import connectToDb from "../../../utils/connectToDb.ts";

export const handler: Handlers = {
  // GET REQUEST
  async GET(req: Request, _ctx: HandlerContext): Promise<any> {
    let connection;
    try {
      const { connectionId } = cookie.getCookies(req.headers);

      // Run query if a connection ID is defined, otherwise don't do anything
      if (connectionId) {
        connection = await connectToDb();

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
      }
    } catch (err) {
      return new Response(err, { status: 404 });
    } finally {
      if (connection) {
        connection.end();
      }
    }
  },

  // POST REQUEST
  async POST(req: Request, _ctx: HandlerContext): Promise<Response> {
    let connection;
    try {
      const { connectionId } = cookie.getCookies(req.headers);

      connection = await connectToDb();

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
    } finally {
      if (connection) {
        connection.end();
      }
    }
  },

  // PATCH REQUEST
  async PATCH(req: Request, _ctx: HandlerContext): Promise<Response> {
    let connection;
    try {
      const { queryName, queryText, queryId } = await req.json();
      const formattedQuery = formatQueryText(queryText);

      connection = await connectToDb();

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
    } finally {
      if (connection) {
        connection.end();
      }
    }
  },

  // DELETE REQUEST
  async DELETE(req: Request, _ctx: HandlerContext): Promise<Response> {
    let connection;
    try {
      const { queryId } = await req.json();

      connection = await connectToDb();

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
    } finally {
      if (connection) {
        connection.end();
      }
    }
  },
};
