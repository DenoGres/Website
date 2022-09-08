/** @jsx h */

import { h } from "preact";
import { tw } from "@twind";
import Layout from "../../components/Layout.tsx";
import NavBarGUI from "../../components/NavBarGUI.tsx";
import Console from "../../islands/Console.tsx";

export default function explorer() {
  return (
    <Layout>
      <NavBarGUI active="/explorer" />
      <Console />
    </Layout>
  );
}
