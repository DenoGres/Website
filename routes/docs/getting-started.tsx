import { Head } from "$fresh/runtime.ts";
import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";
import Gradient from "../../islands/Gradient.tsx";

export default function GettingStartedPage() {
  const h1 = "mx-auto max-w-screen-md font-bold lg:text-5xl md:text-4xl";
  const h2 = "mx-auto max-w-screen-md font-bold lg:text-4xl md:text-3xl";

  const description = "mx-auto max-w-screen-md lg:text-2xl md:text-xl";
  const box =
    "overflow-x-auto border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono lg:text-xl md:text-lg max-w-screen-md p-4 border-4 ...";

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
        <aside class="self-start col-span-1 max-h-[80vh] overflow-y-auto p-5">
          <DocsNav />
        </aside>
        <main class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 max-h-[80vh] overflow-y-auto">
          <br />
          <h1 class={h1}>Welcome To DenoGres</h1>
          <p class={description}>
            <br />
            To begin, let's download DenoGres! Execute the following CLI command
            in the terminal - this will give you access to DenoGres's CLI
            functionality.
            <br />
          </p>
          <br />
          <div class={box}>
            deno install --allow-read --allow-write --allow-net --allow-env
            --allow-run --name denogres https://deno.land/x/denogres/mod.ts
          </div>
          <br />
          <p class={description}>
            After installation is complete, ensure deno is added to PATH.
          </p>
          <br />
          <br />
          <h2 class={h2}>
            Using DenoGres
          </h2>
          <br />
          <p class={description}>
            Before using DenoGres in a project, run the command below. This will
            create the following in your project's root directory:
          </p>
          <br />
          <ul>
            <li class={description}>
              1. an .env file for your database connection URI
            </li>
            <li class={description}>
              2. a models folder for your model.ts file
            </li>
            <li class={description}>
              3. a Migrations folder for migration logs and model snapshots
            </li>
          </ul>
          <br />
          <div class={box}>
            denogres --init
          </div>
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
          <p class={description}>
            With all the set-up steps complete, you're ready to introspect your
            database! Database introspection will automatically create
            TypeScript models of your database tables in the .models/model.ts
            file.
          </p>
          <br />
          <div class={box}>
            denogres --db-pull
          </div>
          <br />
        </main>
        <footer class="my-24">
        </footer>
      </div>
    </div>
  );
}
