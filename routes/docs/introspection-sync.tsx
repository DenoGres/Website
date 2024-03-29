import { Head } from "$fresh/runtime.ts";
import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";
import Gradient from "../../islands/Gradient.tsx";

export default function IntrospectionSync() {
  const h1 = "mx-auto max-w-screen-md font-bold lg:text-5xl md:text-4xl";
  const h2 = "mx-auto max-w-screen-md font-bold lg:text-4xl md:text-3xl";
  const description = "mx-auto max-w-screen-md lg:text-2xl md:text-xl";
  const box =
    "overflow-x-auto border rounded shadow-md mx-auto box-content bg-gray-100 text-black lg:text-xl md:text-lg font-mono max-w-screen-md p-4 border-4 ...";

  return (
    <div class="text-[#27272a] min-h-screen min-w-screen overflow-hidden">
      <Head>
        <title>DenoGres</title>
      </Head>
      <Gradient />
      <div class="sticky top-0">
        <NavBar />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-h-[80vh]">
        <aside class="self-start col-span-1 max-h-[80vh] overflow-y-auto mt-5">
          <DocsNav />
        </aside>
        <main class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 max-h-[80vh] overflow-y-auto">
          <br />
          <h1 class={h1}>Synchronizing Your Database</h1>
          <br />
          <p class={description}>
            Denogres features bi-directional synchronization that is designed to
            ensure that your database schema and your project Models in full
            alignment, maintaining a single, consistent source of truth. In this
            section we will cover two key functionalities: database
            introspection (--db-pull) and extrospection (--db-sync).
          </p>
          <br />
          <p class={description}>
            Before using DenoGres in a project please ensure that you initialize
            your project with the following CLI command:
          </p>
          <br />
          <div class={box}>
            denogres --init
          </div>
          <br />
          <p class={description}>
            In your project's root directory, you should now see a .env file for
            your database connection URI, a models folder where your model.ts
            file will be generated, and a migrations/log folder which will
            contain a historical reference to prior pull/sync requests.
          </p>
          <br />
          <p class={description}>
            After running the init command, update the .env file to contain your
            database's connection URI.
          </p>
          <br />
          <div class={box}>
            DATABASE_URI=driver://user:password@host:port/database_name
          </div>
          <br />
          <br />
          <h2 class={h2}>Database Introspection --db-pull</h2>
          <br />
          <p class={description}>
            Upon the initial configuration (project initialization, setting up
            the database URI) Database introspection will automatically generate
            TypeScript Models of your database tables into a models/model.ts
            file. Note that any subsequent changes to the model.ts file will
            require an additional sync to ensure the database schema is updated
            to reflect accordingly (see the following section.)
            <br />
            <br />
            To introspect and generate the associated models within the model.ts
            file, execute the the following CLI command:
          </p>
          <br />
          <div class={box}>
            denogres --db-pull
          </div>
          <br />
          <br />
          <h2 class={h2}>Database Synchronization --db-sync</h2>
          <br />
          <p class={description}>
            While database introspection (via --db-pull) provides users the
            capability to generate Models in alignment with a database schema,
            there are potentially instances where users may create additional
            Models and would like to ensure that the database is updated
            accordingly to maintain synchronicity between the two. In addition
            to --db-pull, Denogres also includes --db-sync functionality that
            will revise the PostgreSQL schema based on the DenoGres model.ts
            file.
            <br />
            <br />
            Once completed changes to your model have been made, execute the
            following CLI command:
          </p>
          <br />
          <div class={box}>
            denogres --db-sync
          </div>
          <br />
        </main>
        <footer class="my-24">
        </footer>
      </div>
    </div>
  );
}
