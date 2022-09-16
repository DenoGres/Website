import Layout from "../../components/Layout.tsx";
import NavBar from "../../components/NavBarGUI.tsx";
import Migrations from "../../islands/Migrations.tsx";
import { HandlerContext } from "$fresh/server.ts";
import jwtAuth from "../../utils/jwtAuth.ts";

export const handler = {
  GET(req: Request, ctx: HandlerContext) {
    const checkJWT = jwtAuth(req);
    // if JWT is valid, render page else render error
    if (checkJWT) {
      const res = ctx.render();
      return res;
    } else {
      return new Response("Error in authentication", { status: 404 });
    }
  },
};

export default function migrations() {
  return (
    <Layout>
      <NavBar active="/gui/migrations" />
      <Migrations />
    </Layout>
  );
}
