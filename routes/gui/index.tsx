import Layout from "../../components/Layout.tsx";
import LoginSignup from "../../islands/LoginSignup.tsx";

export default function index() {
  return (
    <Layout>
      <div className="w-full flex flex-row">
        <div className="flex flex-col w-full">
          <div className="flex flex-row h-full p-auto bg-white rounded relative">
            <img
              src="/background.png"
              alt="bg"
              class="absolute bottom-0 left-0 w-full z-0 h-full bg-gray-900 object-cover rounded"
            />
            <LoginSignup />
          </div>
        </div>
      </div>
    </Layout>
  );
}
