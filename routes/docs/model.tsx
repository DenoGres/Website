import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";

export default function ModelPage() {
  const h1 = "mx-auto max-w-screen-md font-bold text-3xl";
  const h2 = "mx-auto max-w-screen-md font-bold text-2xl";
  const description = "mx-auto max-w-screen-md";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4";
  const list = "pl-5 mx-auto max-w-screen-md list-disc";

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
          <h1 class={h1}>How to Set Up Model Classes</h1>
          <p class={description}>
            <br />
            Models are object representations of tables present within your
            database schema. In order to create a new Model within DenoGres,
            users will need to declare an accompanying interface which has the
            same name as the Model. This step is necessary in order to addresses
            type-checking when you generate new instances of the particular
            model classes.
          </p>
          <br />
          <h2 class={h2}>Creating Models</h2>
          <br />
          <p class={description}>
            To create a new table within your PostgreSQL database, create a new
            class which extends the Model class, along with an accompanying
            Interface. Note that each newly created class{" "}
            <span class="fw-bold">MUST</span>{" "}
            have the following static properties.
            <br />
            <br />
            1. <span class="font-bold">Table:</span>{" "}
            Name of the table within your PostgreSQL database schema
            <br />
            <br />
            2. <span class="font-bold">Column:</span>{" "}
            This property should be assigned as an object, which contains
            properties corresponding to columns within the table. The values
            assigned to these properties should also be objects, which contain
            properties defining the attributes and constraints related to the
            particular column in question.
            <br />
            <br />
            Below is a list of properties/constraints that can be applied to a
            given column, as well as possible values that can be associated with
            those properties/constraints:
          </p>

          <ul class={list}>
            <br />
            <li>
              <span class="font-bold">primaryKey:</span> Boolean
            </li>
            <li>
              <span class="font-bold">notNull:</span> Boolean
            </li>
            <li>
              <span class="font-bold">unique:</span> Boolean
            </li>
            <li>
              <span class="font-bold">checks:</span>{" "}
              Object [key: string]: string
            </li>
            <li>
              <span class="font-bold">defaultVal:</span>{" "}
              string | number | boolean | Date
            </li>
            <li>
              <span class="font-bold">checks:</span>{" "}
              Object [key: string]: string
            </li>
            <li>
              <span class="font-bold">autoIncrement:</span> boolean
            </li>
            <li>
              <span class="font-bold">association:</span>{" "}
              {"{ name: string, mappedTable: string, mappedColumn: string }"}
            </li>
            <li>
              <span class="font-bold">(name of the check):</span>{" "}
              {"{ [(name of the check): string]: string }"}
            </li>
          </ul>
          <br />
          <p class={description}>
            Included below is a snippet of what a Model within your model.ts
            file should potentially look like:
          </p>
          <br />
          <div class={box}>
            import {"{"} Model {"}"}{" "}
            from 'https://deno.land/x/denogres/mod.ts'<br />
            <br />
            interface User {"{"}
            <br />
            &nbsp;&nbsp;id:string;<br />
            &nbsp;&nbsp;firstname:string;<br />
            &nbsp;&nbsp;lastname?:string;<br />
            &nbsp;&nbsp;points?: number;<br />
            &nbsp;&nbsp;team_id:number;<br />
            {"}"}
            <br />
            <br />
            class User extends Model {"{"}
            <br />
            &nbsp;&nbsp;static table = 'users';<br />
            &nbsp;&nbsp;static columns = {"{"}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;id: {"{"} type:'uuid', primaryKey: true{" "}
            {"}"},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;firstName: {"{"}{" "}
            type:'string', notNull: true {"}"},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;lastName: {"{"}{" "}
            type:'string', notNull: false {"}"},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;points: {"{"} type:'number', notNull: false
            {" "}
            {"}"},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;team_id: {"{"} type:'number', noNull: true
            {" "}
            {"}"}
            <br />
            &nbsp;&nbsp;{"}"}
            <br />
            {"}"}
          </div>
          <br />
          <h2 class={h2}>Updating Models</h2>
          <br />
          <p class={description}>
            To update tables within your database schema, simply make changes to
            the interface and the associated Model class within model.ts and run
            --db-sync to synchronize those changes to your database schema.
            DenoGres will delete the asssociated table from your database
            schema.
          </p>
          <br />
          <h2 class={h2}>Deleting Models</h2>
          <br />
          <p class={description}>
            Delete the interface and the associated Model class within model.ts
            and run --db-sync to synchronize those changes to your database
            schema. DenoGres will automatically delete the asssociated table
            from your database schema.
          </p>
          <br />
        </main>
        <footer class="my-24">
        </footer>
        <br />
      </div>
    </div>
  );
}
