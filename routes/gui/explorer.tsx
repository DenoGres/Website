import Layout from "../../components/Layout.tsx";
import NavBarGUI from "../../components/NavBarGUI.tsx";
import Console from "../../islands/Console.tsx";

export default function explorer() {
  return (
    <Layout>
      <NavBarGUI active="/gui/explorer" />
      <Console />
    </Layout>
  );
}
