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
            DenoGres is continually evolving. Features currently in development
            include:
            <br />
            <br />
            <ul class="list-disc">
              <li class={description}>
                Database sync method (denogres --db-sync) will account for
                multiple associations and composite unique keys.
              </li>
              <li class={description}>
                "Compare" command (denogres --compare) will be implemented to
                display side-by-side diff between previous models.
              </li>
              <li class={description}>
                Migrations log will be visible within the GUI, so that users can
                track/view/compare model versions.
              </li>
              <li class={description}>
                ERD-style diagrams will be generated within the GUI, so users
                have a comprehensive view of the data model.
              </li>
              <li class={description}>
                Additional support for MySQL, SQL Server, etc.
              </li>
            </ul>
          </p>
          <br />
        </main>
      </div>
    </div>
  );
}
