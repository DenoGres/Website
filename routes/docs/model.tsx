/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";

export default function ModelPage() {
  const h1 = tw`mx-auto max-w-screen-md font-bold text-3xl`;
  const description = tw`mx-auto max-w-screen-md`;
  const box = tw`border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4 ...`;

  return (
    <div class={tw`min-h-screen min-w-screen text-white bg-gradient-to-b from-gray-600 to-gray-800`}>
      <div class={tw`sticky top-0`}>
        <NavBar />
      </div>
      <div class={tw`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}>
        <aside class={tw`self-start sticky top-24 col-span-1`}>
          <DocsNav />
        </aside>
        <main class={tw`col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4`}>
          <br />
          <h1 class={h1}>How to Set Up Model Class</h1>
          <p class={description}><br />
            Model’s are representation of tables in the database. In DenoGres, to create a new Model, you also need to declare interface with the same name as the Model. This makes type-checking easily integrated when you create new instances of the particular model classes. <br /><br />
            For each new class you’re creating (in addition to auto-generated models through “db-pull”), it must have ‘table’ and ‘columns’ as static properties. ‘table’ should be the name of the table in the database, ‘columns’ property should contain all the fields in that table. In the ‘columns’ you will need to specify each field’s name, type, and additional attributes such as ‘notNull’, and constraint such as ‘primaryKey’. 
          </p>
          <br />
          <div class={box}>
            import {'{'} Model {'}'} from 'https://deno.land/x/denogres/mod.ts'<br />
            <br />
            interface User {'{'}<br />
            &nbsp;&nbsp;id:string;<br />
            &nbsp;&nbsp;firstname:string;<br />
            &nbsp;&nbsp;lastname?:string;<br />
            &nbsp;&nbsp;points?: number;<br />
            &nbsp;&nbsp;team_id:number;<br />
            {'}'}<br />
            <br/>
            class User extends Model {'{'}<br />
            &nbsp;&nbsp;static table = 'users';<br />
            &nbsp;&nbsp;static columns = {'{'}<br />
            &nbsp;&nbsp;&nbsp;&nbsp;id: {'{'} type:'uuid', primaryKey: true {'}'},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;firstName: {'{'} type:'string', notNull: true {'}'},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;lastName: {'{'} type:'string', notNull: false {'}'},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;points: {'{'} type:'number', notNull: false {'}'},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;team_id: {'{'} type:'number', noNull: true {'}'}<br />
            &nbsp;&nbsp;{'}'}<br />
            {'}'}
          </div>
        </main>
        <br />
      </div>
    </div>
  );
}
