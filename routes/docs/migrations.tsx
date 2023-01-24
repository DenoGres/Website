import { Head } from "$fresh/runtime.ts";
import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";
import Gradient from "../../islands/Gradient.tsx";

export default function Migrations() {
  const h1 = "mx-auto max-w-screen-md font-bold text-3xl";
  const h2 = "mx-auto max-w-screen-md font-bold text-2xl";
  const h3 = "mx-auto max-w-screen-md font-bold text-xl";
  const comment = "text-[#386979]";
  const description = "mx-auto max-w-screen-md";
  const list = "pl-5 mx-auto max-w-screen-md list-disc";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4";
  const anchor = "absolute";

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
          <h1 class={h1}>Migrations</h1>
          <br />
          <h2 class={h2}>Automatic Backups of Model</h2>
          <br />
          <p class={description}>
            DenoGres has built-in functionality to automatically generate a
            backup of a model that was created whenever either of the the
            following commands are run:
          </p>
          <br />
          <div class={box}>
            denogres --db-pull
            <br />
            denogres --db-sync
          </div>
          <br />
          <p class={description}>
            Note that backups are listed in the order they were created.
          </p>
          <br />
          <h2 class={h2}>Backups: --db-pull</h2>
          <br />
          <p class={description}>
            Whenever a database pull is initiated, denogres will create a new
            backup of the models/model.ts that was generated from initiating
            db-pull and place a backup file in a directory with the following
            naming convention:
          </p>
          <br />
          <div class={box}>
            modelBuild_CURRENT_DATE_CURRENT_TIME
          </div>
          <br />
          <p class={description}>
            This directory will be subsequently stored within a Migrations
            folder which can be found within the root project directory. The
            path to the folder will be as follows:
          </p>
          <br />
          <div class={box}>
            Migrations/modelBuild_CURRENT_DATE_CURRENT_TIME
          </div>
          <br />
          <p class={description}>
            Within the folder the user will find three files:
            <br />
            <br />
            <ul class={list}>
              <li>
                <span class="font-bold">Build_model.ts</span>{" "}
                - The actual backup of the model when --db-pull was ran
              </li>
              <br />
              <li>
                <span class="font-bold">Build_model.txt</span>{" "}
                - Text file which will be needed later when invoking the
                -–compare cli command.
              </li>
              <br />
              <li>
                <span class="font-bold">Migration_log.txt</span>{" "}
                - A log that lists changes that have occurred from the model in
                the directory that sits above it. This log is essentially a
                linked list of changes from previous models.
              </li>
            </ul>
          </p>
          <br />

          <h2 class={h2}>Backups: --db-sync</h2>
          <br />
          <p class={description}>
            When the user invokes the -–db-sync command, denogres will create a
            backup of the model that was synced to the postGres DB. This
            directory will be stored in the Migrations directory with the
            following naming convention:
          </p>
          <br />
          <div class={box}>
            syncedModel_CURRENT_DATE_CURRENT_TIME
          </div>
          <br />
          <p class={description}>
            The path to the directory will look like:
          </p>
          <br />
          <div class={box}>
            Migrations/syncedModel_CURRENT_DATE_CURRENT_TIME
          </div>
          <br />
          <p class={description}>
            Within the folder the user will find three files:
            <br />
            <br />
            <ul class={list}>
              <li>
                <span class="font-bold">Model_changes.txt</span>{" "}
                - A log of changes that have occurred from the last time dbsync
                was ran.
              </li>
              <br />
              <li>
                <span class="font-bold">Synced_build.ts</span>{" "}
                - The actual Model file that was used to sync to the external
                database, based on the date and timestamp after --db-sync
                finishes running.
              </li>
              <br />
              <li>
                <span class="font-bold">Synced_build.txt</span>{" "}
                - Text file which will be needed later when invoking the
                -–compare cli command.
              </li>
            </ul>
          </p>
          <br />
          <h2 class={h2}>DenoGres Comment Logs</h2>
          <br />
          <p class={description}>
            Any time the user executes either --db-pull or --db-sync, Denogres
            will prompt the user to include a comment. This comment allows users
            to summarize any important changes that occurred as a result of the
            sync/pull, as well as any additional notes to be associated with the
            Model. When the cli command --log is ran, denogres will generate a
            historical log of all previous Model files, how those files were
            generated (either through pull or sync), the date and time of each
            creation, as well as any comments associated with those files.
          </p>
        </main>
        <footer class="my-24">
        </footer>
      </div>
    </div>
  );
}
