import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";

export default function seed() {
  const h1 = "mx-auto max-w-screen-md font-bold text-3xl";
  const h2 = "mx-auto max-w-screen-md font-bold text-2xl";
  const description = "mx-auto max-w-screen-md";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4 ...";

  return (
    <div class="min-h-screen min-w-screen text-white bg-gradient-to-b from-gray-600 to-gray-800">
      <div class="sticky top-0">
        <NavBar />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <aside class="self-start sticky top-24 col-span-1">
          <DocsNav />
        </aside>
        <main class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <br />
          <h1 class={h1}>Seeding Your Database</h1>
          <br />
          <p class={description}>
            DenoGres allows data to be populated to the PostgreSQL schema
            through data seeding. This is primarily useful during database
            design/development (i.e. an application requires a certain amount of
            data to function properly) Create a seed.ts within the project root
            directory, and execute the following CLI command:
          </p>
          <br />
          <div class={box}>
            denogres --db-seed
          </div>
          <br />
          <p class={description}>
            The associated database schema will be pre-populated based on the
            user's seed.ts file.
          </p>
          <br />
          <br />
          <h2 class={h2}>Seed.ts file structure</h2>
          <br />
          <p class={description}>
            After running the init command, update the .env file to contain your
            database's connection URI.
          </p>
        </main>
        <footer class="my-24">
        </footer>
      </div>
    </div>
  );
}
