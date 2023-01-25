import { Head } from "$fresh/runtime.ts";
import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";
import Gradient from "../../islands/Gradient.tsx";

export default function AssociationsPage() {
  const h1 = "mx-auto max-w-screen-md font-bold lg:text-5xl md:text-4xl";
  const h2 = "mx-auto max-w-screen-md font-bold lg:text-4xl md:text-3xl";
  const h3 = "mx-auto max-w-screen-md font-bold lg:text-3xl md:text-2xl";
  const comment = "text-[#97C2DB] lg:text-xl md:text-lg";
  const description = "mx-auto max-w-screen-md lg:text-2xl md:text-xl";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4 lg:text-xl md:text-lg";
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
        <a class={anchor} name="one-to-one"></a>
        <main class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <br />
          <h1 class={h1}>Associations</h1>
          <br />
          <p class={description}>
            <br />
            <h2 class={h2}>One-to-One</h2>
            <br />
            <h3 class={h3}>hasOne(B)</h3>
            <p class={description}>
              - Utilize (or create if not exist) foreign key in model B’s
              table<br />
              - Create ‘getter’ instance method in model A (named as “getB”)
            </p>
            <br />
            <h3 class={h3}>belongsTo(A)</h3>
            <p class={description}>
              - Utilize (or creating if not exist) foreign key in model B’s
              table<br />
              - Create ‘getter’ instance method in model B (named as
              “getA”)<br />
              <br />
              1. For existing relationships (when relevant table constraint
              already exists in the database)
            </p>
            <br />
            <div class={box}>
              await Country.hasOne(Capital);<br />
              const canada = await Country.where('name =
              Canada').queryInstance();<br />
              const canadaCapital = await canada.getCapital();<br />
              <br />
              console.log(canada); <br />
              [<br />
              &nbsp;&nbsp;{"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;_id: '00xyz',<br />
              &nbsp;&nbsp;&nbsp;&nbsp;name: 'Ottawa',<br />
              &nbsp;&nbsp;&nbsp;&nbsp;population: '994,837',<br />
              &nbsp;&nbsp;&nbsp;&nbsp;province: 'Ontario',<br />
              &nbsp;&nbsp;&nbsp;&nbsp;country_id: 'canada'<br />
              &nbsp;&nbsp;{"}"}
              <br />
              ]<br />
            </div>
            <br />
            <div class={box}>
              await Capital.belongsTo(Country);<br />
              const ottawa = await Capital.where('name =
              Ottawa').queryInstance();<br />
              const ottawaCountry = await ottawa.getCountry();<br />
            </div>
            <br />
            <p class={description}>
              2. Forming new relationships (when you want to make changes to
              your schema)
            </p>
            <br />
            <div class={box}>
              import {"{"} Model {"}"}{" "}
              from 'https://deno.land/x/denogres/mod.ts'<br />
              <br />
              <p class={comment}>
                // forming a new relationship between this User and Profile
                model
              </p>
              interface User {"{"}
              <br />
              &nbsp;&nbsp;id:string;<br />
              &nbsp;&nbsp;firstName:string;<br />
              &nbsp;&nbsp;lastName?:string;<br />
              {"}"}
              <br />
              class User extends Model {"{"}
              <br />
              &nbsp;&nbsp;static table = 'users';<br />
              &nbsp;&nbsp;static columns = {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;id: {"{"} type:'uuid', primaryKey: true
              {" "}
              {"}"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;firstName: {"{"}{" "}
              type:'string', notNull: true {"}"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;lastName: {"{"}{" "}
              type:'string', notNull: false {"}"},<br />
              &nbsp;&nbsp;{"}"}
              <br />
              {"}"}
              <br />
              <br />
              interface Profile {"{"}
              <br />
              &nbsp;&nbsp;id:number;<br />
              &nbsp;&nbsp;email:string;<br />
              &nbsp;&nbsp;address?:string;<br />
              {"}"}
              <br />
              class Profile extends Model {"{"}
              <br />
              &nbsp;&nbsp;static table = 'profiles';<br />
              &nbsp;&nbsp;static columns = {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;id: {"{"}{" "}
              type:'number', primaryKey: true, autoIncrement:true {"}"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;email: {"{"} type:'string', notNull: true
              {" "}
              {"}"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;address: {"{"}{" "}
              type:'string', notNull: false {"}"},<br />
              &nbsp;&nbsp;{"}"}
              <br />
              {"}"}
              <br />
            </div>
            <br />
            <div class={box}>
              <p class={comment}>
                // belongsTo method returns out new association instance
              </p>
              const userProfileAssociation = await
              Profile.belongsTo(User);<br />
            </div>
            <br />
            <p class={description}>
              At this point, database tables are not synced yet. Invoking
              syncAssociation() method on newly created association instance
              will execute table altering query in database.<br />
              Foreign key will be created in 'profiles' table with the default
              name of 'user_id'.
            </p>
            <div class={box}>
              userProfileAssociation.syncAssociation();<br />
            </div>
            <br />
            <p class={description}>
              This will execute following command to your database:
            </p>
            <div class={box}>
              ALTER TABLE profiles ADD user_id UUID;<br />
              ALTER TABLE profiles ADD CONSTRAINT fk_user_id<br />
              FOREIGN KEY (user_id) REFERENCES users<br />
              ON DELETE SET NULL ON UPDATE CASCADE;
            </div>
            <br />
            <p class={description}>Creating new association record (beta)</p>
            <div class={box}>
              const foo = await User.where('firstname =
              foo').queryInstance();<br />
              <br />
              const p1 = new Profile();<br />
              p1.email = 'foo@foo.com';<br />
              p1.address = 'foo Main St';<br />
              <br />
              await foo.addProfile(p1);
            </div>
            <br />
            <p class={description}>
              This will create new record in profiles table and set the foreign
              key 'user_id' as the user instances id.
            </p>
            <p class={description}>
              Alternate flow: for existing profile instance when you're aware of
              the profile's id
            </p>
            <a class={anchor} name="one-to-many"></a>
            <div class={box}>
              await foo.addProfile({"{ id: 3 }"})
            </div>
            <p class={description}>
              This will update profile table's 'user_id' foreign key field with
              the user instance's id.
            </p>
            <br />
            <h2 class={h2}>One-to-Many</h2>
            <p class={description}>
              One-To-Many association can be formed with 'belongsTo' or 'hasOne'
              method. For existing association in the database (e.g. existing
              foreign key constraints), invoking these method will create
              ‘getter’ method to the model.
            </p>
            <br />
            <h3 class={h3}>belongsTo example</h3>
            <div class={box}>
              await Person.belongsTo(Species);<br />
              const luke = await Person.where('name = Luke
              Skywalker').queryInstance();<br />
              const lukeSpecies = await luke.getSpecies();<br />
              <p class={comment}>
                // getter method name will be by default : get + target model's
                name
              </p>
              console.log(lukeSpecies);
              {"["}
              <br />
              &nbsp;&nbsp;{"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;_id: 1,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;name: "Human",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;classification: "mammal",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;average_height: "180",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;average_lifespan: "120",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;hair_colors: "blonde, brown, black,
              red",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;skin_colors: "caucasian, black, asian,
              hispanic",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;eye_colors: "brown, blue, green, hazel,
              grey, amber",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;language: "Galactic Basic",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;homeworld_id: 9n<br />
              &nbsp;&nbsp;{"}"}
              <br />
              {"]"}
            </div>
            <br />
            <h3 class={h3}>hasMany example</h3>
            <p class={description}>
              Update existing rows in the database for the current model.<br />
              Input: (...rows: string[ ])
            </p>
            <br />
            <div class={box}>
              await Species.hasMany(Person);<br />
              const droid = await Species.where('name =
              Droid').queryInstance();<br />
              const droidCharacters = await droid.getPersons();<br />
              <p class={comment}>
                // getter method name will be by default : get + target model's
                name + 's' (for plural)
              </p>
              console.log(droidCharacters);<br />
              {"["}
              <br />
              &nbsp;&nbsp;{"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;_id: 2,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;name: "C-3PO",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;mass: "75",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;hair_color: "n/a",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;skin_color: "gold",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;eye_color: "yellow",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;birth_year: "112BBY",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;gender: "n/a",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;species_id: 2n,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;homeworld_id: 1n,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;height: 167<br />
              &nbsp;&nbsp;{"}"},<br />
              &nbsp;&nbsp;{"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;_id: 3,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;name: "R2-D2",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;mass: "32",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;hair_color: "n/a",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;skin_color: "white, blue",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;eye_color: "red",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;birth_year: "33BBY",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;gender: "n/a",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;species_id: 2n,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;homeworld_id: 8n,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;height: 96<br />
              &nbsp;&nbsp;{"}"},<br />
              &nbsp;&nbsp;{"{.....(more records...)....}"}
              <br />
              {"]"}
            </div>
            <br />
            <h3 class={h3}>Forming a new one-to-many association:</h3>
            <p class={description}>
              - Execute belongsTo method first and execute syncAssociation to
              make call to the database that will alter existing table schema in
              your database.
            </p>
            <br />
            <div class={box}>
              import {"{"} Model {"}"}{" "}
              from 'https://deno.land/x/denogres/mod.ts'<br />
              <br />
              interface User {"{ ... }"}
              <br />
              class User extends Model {"{"}
              <br />
              &nbsp;&nbsp;static table = 'users';<br />
              &nbsp;&nbsp;static columns = {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;id: {"{"} type:'uuid', primaryKey: true
              {" "}
              {"}"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;firstName: {"{"}{" "}
              type:'string', notNull: true {"}"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;lastName: {"{"}{" "}
              type:'string', notNull: false {"}"},<br />
              &nbsp;&nbsp;{"}"}
              <br />
              {"}"}
              <br />
              interface Team {"{ ... }"}
              <br />
              class Team extends Model {"{"}
              <br />
              &nbsp;&nbsp;static table = 'teams';<br />
              &nbsp;&nbsp;static columns = {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;id: {"{"}{" "}
              type:'number', primaryKey: true, autoIncrement:true {"}"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;teamName: {"{"}{" "}
              type:'string', notNull: true {"}"},<br />
              &nbsp;&nbsp;&nbsp;&nbsp;teamRole: {"{"}{" "}
              type:'string', notNull: false {"}"},<br />
              &nbsp;&nbsp;{"}"};<br />
              {"}"}
            </div>
            <br />
            <p class={description}>
              Create belongsTo association first. This will attach 'getTeam()'
              instance method to the User model.
            </p>
            <div class={box}>
              const userTeamAssociation = await User.belongsTo(Team);
            </div>
            <br />
            <p class={description}>
              Executing syncAssociation() will make an asynchronous call to the
              database.
            </p>
            <div class={box}>userTeamAssociation.syncAssociation();</div>
            <br />
            <p class={description}>
              This will execute following SQL query on your database:
            </p>
            <div class={box}>
              ALTER TABLE users ADD team_id INT<br />
              ALTER TABLE users ADD CONSTRAINT fk_team_id FOREIGN KEY
              (team_id)<br />
              REFERENCES teams ON DELETE SET NULL ON UPDATE CASCADE
            </div>
            <br />
            <a class={anchor} name="many-to-many"></a>
            <p class={description}>
              Then invoke hasMany() method. This will attach 'getUsers()'
              instance method to the Team model.
            </p>
            <div class={box}>await Team.hasMany(User);</div>
            <br />

            <h2 class={h2}>Many-to-Many</h2>
            <p class={description}>
              Unlike other association methods, manyToMany is not a
              functionality inside the model class, so you need to import to use
              it. Many-To-Many relationship between two models is through a
              cross-table (aka. pivot table, through table). For existing
              Many-To-Many association in the database, you need to specify the
              model representing the cross-table.
            </p>
            <div class={box}>
              import {"{"} manyToMany {"}"}{" "}
              from 'https://deno.land/x/denogres/mod.ts'<br />
              <br />
              await manyToMany(Person, Film,{" "}
              {"{ through: PeopleInFilm }"});<br />
              <br />
              const luke = await Person.where('name = Luke
              Skywalker').queryInstance();<br />
              const lukeFilms = await luke.getFilms();<br />
              <br />
              const newHope = await Film.where('title = A New
              Hope').queryInstance();<br />
              const newHopeCharacters = await newHope.getPersons();<br />
            </div>
            <br />
            <p class={description}>
              Getter method name will be by default:<br />
              Get + target model's name + 's' (for plural)
            </p>
            <div class={box}>
              console.log(lukeFilms)<br />
              [<br />
              &nbsp;&nbsp;{"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;_id: 1,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;title: "A New Hope",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;episode_id: 4,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;opening_crawl: "It is a period of civil
              war.\nRebel spaceships, striking\nfrom a hidden base, have
              won\ntheir first vic...",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;director: "George Lucas",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;producer: "Gary Kurtz, Rick
              McCallum",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;release_date:
              1977-05-25T07:00:00.000Z<br />
              &nbsp;&nbsp;{"}"},<br />
              &nbsp;&nbsp;{"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;_id: 2,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;title: "The Empire Strikes Back",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;episode_id: 5,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;opening_crawl: "It is a dark time for
              the\nRebellion. Although the Death\nStar has been
              destroyed,\nImperial troops hav...",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;director: "Irvin Kershner",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;producer: "Gary Kurtz, Rick
              McCallum",<br />
              &nbsp;&nbsp;&nbsp;&nbsp;release_date:
              1980-05-17T07:00:00.000Z<br />
              &nbsp;&nbsp;{"}"},<br />
              &nbsp;&nbsp;{"{ .... (more records...) ... }"}
              <br />
              ]
            </div>
            <br />
          </p>
        </main>
      </div>
    </div>
  );
}
