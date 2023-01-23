import { Head } from "$fresh/runtime.ts";
import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";
import Gradient from "../../islands/Gradient.tsx";

export default function Gui() {
  const h1 = "mx-auto max-w-screen-md font-bold text-3xl";
  const h2 = "mx-auto max-w-screen-md font-bold text-2xl";
  const description = "mx-auto max-w-screen-md";
  const gif = "max-w-screen-md mx-auto";
  const anchor = "absolute";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4";

  return (
    <div class="min-h-screen min-w-screen text-[#27272a]">
      <Head>
        <title>DenoGres</title>
      </Head>
      <Gradient />
      <div class="sticky top-0">
        <NavBar />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <aside class="self-start sticky top-24 col-span-1">
          <DocsNav />
        </aside>
        <main class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <br />
          <h1 class={h1}>Navigating the GUI</h1>
          <br />
          <p class={description}>
            DenoGres now includes a GUI that allows the user to introspect
            database schema and run queries. Furthermore, users can save
            database connections and previous queries to their accounts for
            later access.
          </p>
          <br />
          <h2 class={h2}>Getting Started</h2>
          <br />
          <p class={description}>
            To use the DenoGres app, make sure that DenoGres is installed in
            your project directory. Run the following command to launch the
            application:
          </p>
          <br />
          <div class={box}>
            denogres --gui
          </div>
          <br />
          <p class={description}>
            Upon opening the GUI, users are directed to the login page where
            users can create an account or log in to an existing account. Once
            signed in, users will be then be redirected to the app home page.
          </p>
          <br />
          <img class={gif} src="../login.gif"></img>
          <br />
          <p class={description}>
            The nav bar displays the different functionalities available at this
            time:
          </p>
          <br />
          <a class={anchor} name="database"></a>
          <img class={gif} src="../navbar_icons.jpeg" width="300px"></img>
          <br />
          <br />
          <h2 class={h2}>Working with Database Connections</h2>
          <br />
          <p class={description}>
            If you are a first-time user, please enter your database connection
            details and click “Create” to save the connection to your account.
          </p>
          <br />
          <img class={gif} src="../add_connection.gif"></img>
          <br />
          <p class={description}>
            Afterward, you can access saved connections from the list in order
            to update or delete its details. When you are ready, simply click
            “Connect” to connect to the database. You will be redirected to the
            query explorer upon successful connection.
          </p>
          <a class={anchor} name="queries"></a>
          <br />
          <img class={gif} src="../connect_and_redirect.gif"></img>
          <br />
          <h2 class={h2}>Working with Queries</h2>
          <br />
          <p class={description}>
            Upon successful connection, a list of your database models will be
            available for reference.
          </p>
          <br />
          <img class={gif} src="../model_modal.gif"></img>
          <br />
          <p class={description}>
            Now you can start running queries! Please refer to the “Model
            Methods” section for correct query syntax in DenoGres.
          </p>
          <br />
          <img class={gif} src="../sample query.gif"></img>
          <br />
          <p class={description}>
            Furthermore, you can save queries for later access as well as
            updating or deleting any previously saved queries. These queries
            will be associated with the active database connection at time of
            query creation.
          </p>
          <br />
          <img class={gif} src="../saving_query.gif"></img>
        </main>
        <br />
      </div>
    </div>
  );
}
