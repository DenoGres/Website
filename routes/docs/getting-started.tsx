import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";

export default function GettingStartedPage() {
  const h1 = "mx-auto max-w-screen-md font-bold text-5xl";
  const h2 = "mx-auto max-w-screen-md font-bold text-3xl";

  const description = "mx-auto max-w-screen-md";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4 ...";

  return (
    <div class="text-white min-h-screen min-w-screen bg-gradient-to-b from-gray-600 to-gray-800">
      <div class="sticky top-0">
        <NavBar />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <aside class="self-start sticky top-24 col-span-1">
          <DocsNav />
        </aside>
        <main class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <br />
          <h1 class={h1}>Welcome To DenoGres</h1>
          <p class={description}>
            <br />
            To begin, let's download DenoGres! Execute the below in the terminal
            - this will give you access to DenoGres's CLI functionality.
            <br />
          </p>
          <br />
          <div class={box}>
            deno install --allow-read --allow-write --allow-net --allow-env
            --name denogres https://deno.land/x/denogres/mod.ts
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
            Before using DenoGres in a project, run the below. In your project's
            root directory, a .env file, for your database connection URI, and a
            models folder, for your model.ts file, will be created.
          </p>
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
      </div>
    </div>
  );
}
