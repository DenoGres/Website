import Layout from "../../components/Layout.tsx";
import NavBar from "../../components/NavBarGUI.tsx";
import Migrations from "../../islands/Migrations.tsx";

export default function migrations() {
  return (
    <Layout>
      <NavBar active="/gui/migrations" />
      <Migrations />
    </Layout>
  );
}
