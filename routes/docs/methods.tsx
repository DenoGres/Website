import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";

export default function MethodsPage() {
  const h1 = "mx-auto max-w-screen-md font-bold text-3xl";
  const h2 = "mx-auto max-w-screen-md font-bold text-2xl";
  const h3 = "mx-auto max-w-screen-md font-bold text-xl";
  const comment = "text-[#97C2DB]";
  const description = "mx-auto max-w-screen-md";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4 ...";
  const anchor = "absolute";

  return (
    <div class="min-h-screen min-w-screen text-white bg-gradient-to-b from-gray-600 to-gray-800">
      <div class="sticky top-0 z-50">
        <NavBar />
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <aside class="self-start sticky top-24 col-span-1">
          <DocsNav />
        </aside>
        <a class={anchor} name="instance"></a>
        <main class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <br />
          <h1 class={h1}>How to use DenoGres Methods</h1>
          <br />
          <div class={description}>
            Note: all methods in this section are asynchronous methods. It is
            encouraged to use ES6 async/await syntax but promise chaining and
            callbacks are valid ways to invoke these methods as well.
          </div>
          <p class={description}>
            <br />
            <h2 class={h2}>Instance Methods</h2>
            <br />
            <h3 class={h3}>save</h3>
            <p class={description}>
              Insert created properties on an instance object into the database.
            </p>
            <br />
            <div class={box}>
              <p class={comment}>// create new instance of model</p>
              const person = new Person(); <br />
              <br />
              <p class={comment}>// create properties</p>
              person.name = 'Deno';<br />
              person.hair_color = 'purple';<br />
              person.age = '100';<br />
              <br />
              <p class={comment}>// inserts created properties</p>
              person.save();
            </div>
            <br />
            <h3 class={h3}>update</h3>
            <p class={description}>
              Update properties on an instance object in the database.
            </p>
            <br />
            <div class={box}>
              <a class={anchor} name="model"></a>
              <p class={comment}>// reassign property value</p>
              person.hair_color = 'blue'; <br />
              <br />
              <p class={comment}>// updates reassigned value in database</p>
              person.update();
            </div>
            <br />
            <br />
            <h2 class={h2}>Model Methods</h2>
            <p class={description}>
              Note: ensure single spaces are entered around comparison operators
              ( =, {">, <, >=, <=, <>"} )
            </p>
            <br />
            <h3 class={h3}>insert</h3>
            <p class={description}>
              Insert row(s) into the database for the current model.<br />
              Input: (...rows: string[ ])
            </p>
            <br />
            <div class={box}>
              <p class={comment}>// inserts a new row in the database</p>
              Person.insert('name = Deno', 'hair_color = purple').query();
            </div>
            <br />
            <h3 class={h3}>edit</h3>
            <p class={description}>
              Update existing rows in the database for the current model.<br />
              Input: (...rows: string[ ])
            </p>
            <br />
            <div class={box}>
              <p class={comment}>// edits all values in a column</p>
              Person.edit('hair_color = blue').query();
            </div>
            <br />
            <h3 class={h3}>delete</h3>
            <p class={description}>
              Delete the current model (can be chained with where method).
            </p>
            <br />
            <div class={box}>
              <p class={comment}>// deletes entire model</p>
              Person.delete().query();<br />
              <br />
              <p class={comment}>// deletes where condition is met</p>
              Person.delete().where('name = Deno').query();{" "}
            </div>
            <br />
            <h3 class={h3}>select</h3>
            <p class={description}>
              Select column(s) from current model.<br />
              Input: (...columns: string[ ])
            </p>
            <br />
            <div class={box}>
              <p class={comment}>
                // either will return all columns in current model
              </p>
              Person.select().query();
              <br />
              Person.select('*').query(); <br />
              <br />
              <p class={comment}>// returns selected columns</p>
              Person.select('name', 'hair_color').query(); <br />
              <br />
              <p class={comment}>
                // returns selected column where condition is met
              </p>
              Person.select('name').where('hair_color = black').query();
            </div>
            <br />
            <h3 class={h3}>where</h3>
            <p class={description}>
              Add condition(s) to the current query (using without 'select'
              method will select all columns).<br />
              AND/OR, NOT and LIKE can be added to the beginning of any
              arguments.<br />
              Input: (...condition: string[ ])
            </p>
            <br />
            <div class={box}>
              <p class={comment}>
                // return selected column where conditions are met
              </p>
              Person.select('name').where('NOT age {"<"}{" "}
              100', 'AND gender = male').query();
              <br />
              <br />
              <p class={comment}>
                // returns all columns where conditions are met
              </p>
              Person.where('hair_color = black', 'OR eye_color = blue').query();
            </div>
            <br />
            <h3 class={h3}>limit</h3>
            <p class={description}>
              Limit the number of returned rows from the current query.<br />
              Input: (limit: number)
            </p>
            <br />
            <div class={box}>
              <p class={comment}>
                // returns 5 columns where conditions are met
              </p>
              Person.select('name').where('hair_color =
              black').limit(5).query();
            </div>
            <br />
            <h3 class={h3}>having</h3>
            <p class={description}>
              Add condition(s) involving aggregate functions to the current
              query.<br />
              Input: (...conditions: string[ ])
            </p>
            <br />
            <div class={box}>
              <p class={comment}></p>
              Person.select('name').group('name', 'height').having('SUM(height)
              {" "}
              {"<"} 100').query();
            </div>
            <br />
            <h3 class={h3}>innerJoin</h3>
            <p class={description}>
              Selects records with matching values on both tables.<br />
              Input: (column1: string, column2: string, table2: string)
            </p>
            <br />
            <div class={box}>
              Person.select('name', 's.name').innerJoin('person.s_id', 'id',
              's').query();
            </div>
            <br />
            <h3 class={h3}>leftJoin</h3>
            <p class={description}>
              Selects records from the current table and matching values on
              another table.<br />
              Input: (column1: string, column2: string, table2: string)
            </p>
            <br />
            <div class={box}>
              Person.select('name', 's.name').leftJoin('person.s_id', 'id',
              's').query();
            </div>
            <br />
            <h3 class={h3}>rightjoin</h3>
            <p class={description}>
              Selects records from another table and matching values on the
              current table.<br />
              Input: (column1: string, column2: string, table2: string)
            </p>
            <br />
            <div class={box}>
              Person.select('name', 's.name').rightJoin('person.s_id', 'id',
              's').query();
            </div>
            <br />
            <h3 class={h3}>fullJoin</h3>
            <p class={description}>
              Selects all records when a match exists in either table.<br />
              Input: (column1: string, column2: string, table2: string)
            </p>
            <br />
            <div class={box}>
              Person.select('name', 's.name').innerJoin('person.s_id', 'id',
              's').query();
            </div>
            <br />
            <h3 class={h3}>group</h3>
            <p class={description}>
              Group rows with the same values into summary rows.<br />
              Input: (...columns: string[ ])
            </p>
            <br />
            <div class={box}>
              Person.select('name').group('people.name').query();
            </div>
            <br />
            <h3 class={h3}>order</h3>
            <p class={description}>
              Order column(s) by ascending or descending order.<br />
              Input: (order: string, ...column: string[ ]) order must be ASC or
              DESC
            </p>
            <br />
            <div class={box}>
              <p class={comment}>
                // returns all columns ordered by ascending age, then id
              </p>
              Person.select('*').order('ASC', 'age', 'id').query();<br />
              <br />
              <p class={comment}>
                // returns selected columns ordered by descending age
              </p>
              Person.select('name', 'age').order('DESC', 'age').query();
            </div>
            <br />
            <h3 class={h3}>avg-count-sum-min-max</h3>
            <p class={description}>
              Calculate aggregate functions (can be chained with 'where'
              method).<br />
              Input: (column: string)
            </p>
            <br />
            <div class={box}>
              Person.avg('cost').query();{" "}
              <span class={comment}>// returns average of selected column</span>
              <br />
              Person.count('cost').query();{" "}
              <span class={comment}>// returns count of selected column</span>
              <br />
              Person.sum('cost').query();{" "}
              <span class={comment}>// returns sum of selected column</span>
              <br />
              Person.min('cost').query();{" "}
              <span class={comment}>
                // returns min value of selected column
              </span>
              <br />
              Person.max('cost').query();{" "}
              <span class={comment}>
                // returns max value of selected column
              </span>
            </div>
            <br />
            <a class={anchor} name="queries-and-transaction"></a>
            <h3 class={h3}>query</h3>
            <p class={description}>
              Chain with other methods to send current query to database
            </p>
            <br />
            <div class={box}>
              Person.select('*').query();
            </div>
            <br />
            <br />
            <h3 class={h3}>transaction | endTransaction</h3>
            <p class={description}>
              Chain at the end of other model methods to create or continue a
              transaction. Transactions can be used across several models to
              group queries together.
              <br />
              <br />
              When a single query in the transaction chain fails, all of the
              queries will be rolledback so the database state is never
              changed.To complete the transaction you can invoke endTransaction
              directly on the model, or chain endTransaction onto your last
              query.
            </p>
            <br />
            <div class={box}>
              Person.insert('name = Alex').transaction(); <br />
              Animals.delete().where('name = Spot').transaction(); <br />
              Person.insert('nae = Rachel').endTransaction();
              <span class={comment}>
                // throws an error since 'nae' isn't a column, rollsback all
                previous queries and returns the error for the query that failed
              </span>
            </div>
            <br />
          </p>
        </main>
      </div>
    </div>
  );
}
