import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";

export default function DevelopmentPage() {
  const h1 = "mx-auto max-w-screen-md font-bold text-3xl";
  const description = "mx-auto max-w-screen-md";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4 ...";

  return (
    <div class="min-h-screen min-w-screen text-white bg-gradient-to-b from-gray-600 to-gray-800">
      <div class="sticky top-0 z-50">
        <NavBar />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <aside class="self-start sticky h top-24 col-span-1">
          <DocsNav />
        </aside>
        <main class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <br />
          <h1 class={h1}>
            Under Development
          </h1>
          <br />
          <p class={description}>
            DenoGres contains some functionality that is still in development -
            including database sync functionality. The sync functionality:
            <br />
            <br />
            <ul class="list-disc">
              <li class={description}>
                Identifies instances within the models/model.ts file where user
                updates have caused the database and TypeScript models to be
                out-of-sync
              </li>
              <li class={description}>
                Creates and executes queries to update the database so all
                points of reference once again align
              </li>
            </ul>
          </p>
          <br />
          <div class={box}>
            denogres --db-sync
          </div>
          <br />
        </main>
      </div>
    </div>
  );
}
