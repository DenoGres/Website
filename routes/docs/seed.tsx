import { Head } from "$fresh/runtime.ts";
import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";
import Gradient from "../../islands/Gradient.tsx";

export default function seed() {
  const h1 = "mx-auto max-w-screen-md font-bold text-3xl";
  const h2 = "mx-auto max-w-screen-md font-bold text-2xl";
  const description = "mx-auto max-w-screen-md";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4 ...";

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
            Seed data is stored within the seed.ts file as a collection of
            variables assigned to arrays of objects. The variable name used
            should correspond to the table within your database schema, and each
            object within the array is associated to a row of data to be
            inserted within your database. Each object contains properties which
            are tied to columns within those particular tables, and the property
            values are the desired values for those columns.
          </p>
          <br />
          <div class={box}>
            const people = {"["}
            <br />
            &nbsp;&nbsp;{"{"}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;name: "Anthony",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;species_id: 2<br />
            &nbsp;&nbsp;{"},"}
            <br />
            &nbsp;&nbsp;{"{"}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;name: "Eddie",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;species_id: 3<br />
            &nbsp;&nbsp;{"},"}
            <br />
            &nbsp;&nbsp;{"{"}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;name: "Carlos",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;species_id: 1<br />
            &nbsp;&nbsp;{"},"}
            <br />
            &nbsp;&nbsp;{"{"}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;name: "Henry",<br />
            &nbsp;&nbsp;&nbsp;&nbsp;species_id: 1<br />
            &nbsp;&nbsp;{"},"}
            <br />
            {"]"};
          </div>
        </main>
        <footer class="my-24">
        </footer>
      </div>
    </div>
  );
}
