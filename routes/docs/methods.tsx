/** @jsx h */
import { h } from "preact";
import { tw } from '@twind'
import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";

export default function MethodsPage() {
  return (
    <div class={tw`min-h-screen text-white bg-gradient-to-b from-gray-500 via-gray-800 to-gray-900`}>
      <NavBar/> 
      <h1 class={tw`p-4 mx-auto max-w-screen-md`}><b>How to use DenoGres Methods</b></h1>
      <DocsNav/>
      <p class={tw`p-4 mx-auto max-w-screen-md`}>
        Note: x represents a comparison operator (=, {">, <, >=, <=, <>"}, LIKE) NOT can be added before any arguments in the WHERE method
        <br/><br/>
        <h2 class={tw`font-bold text-xl`}>SAVE</h2> insert created properties on instance object into database<br/>
        <div class={tw`border rounded shadow-md mx-auto box-content h-31 w-[45rem] bg-gray-100 text-black max-w-screen-md p-4 border-4 ...`}>instance.save()</div>
        <br/><br/>
        UPDATE: update the properties on instance object and the database<br/>
        instance.update();
        <br/><br/>
        INSERT INTO VALUES: add value(s) to column(s) in this table<br/>
        input: (column = value, ...)<br/>
        Model.insert(...rows: string[])
        <br/><br/>
        UPDATE: update existing records in database<br/>
        input: (column = value, ...)<br/>
        Model.edit(...rows: string[])
        <br/><br/>
        DELETE FROM: delete table<br/>
        input: none<br/>
        Model.delete()
        <br/><br/>
        SELECT FROM: select column(s) from this table<br/>
        input: (column, ...)<br/>
        Model.filter(...columns: string[])
        <br/><br/>
        WHERE: add condition(s) to query<br/>
        input: (column x value, AND/OR column x value, ...)<br/>
        Model.where(...condition: string[])
        <br/><br/>
        LIMIT: limit number of output rows<br/>
        input: (limitNumber)<br/>
        Model.limit(limit: number)
        <br/><br/>
        HAVING: add condition(s) involving aggregate functions to query<br/>
        input: (aggregateFn(column) x number); example: (COUNT(column) {'>'} 5)<br/>
        Model.having(...conditions: string[])
        <br/><br/>
        INNER JOIN: selects records with matching values on both table<br/>
        input: (column1, column2, table2)<br/>
        Model.innerJoin(column1: string, column2: string, table2: string)
        <br/><br/>
        LEFT JOIN: selects records from this table and matching values on table2<br/>
        input: (column1, column2, table2)<br/>
        Model.leftJoin(column1: string, column2: string, table2: string)
        <br/><br/>
        RIGHT JOIN: selects records from table2 and matching values on this table<br/>
        input: (column1, column2, table2)<br/>
        Model.innerJoin(column1: string, column2: string, table2: string)
        <br/><br/>
        FULL JOIN: selects all records when a match exists in either table<br/>
        input: (column1, column2, table2)<br/>
        Model.fullJoin(column1: string, column2: string, table2: string)
        <br/><br/>
        GROUP BY: group rows with same values into summary rows<br/>
        input: (column, ...)<br/>
        Model.group(...columns: string[])
        <br/><br/>
        ORDER BY: sort column(s) by ascending/descending order<br/>
        input: for (order: string), order should be either ASC or DESC<br/>
        Model.order(order: string, ...column: string[])
        <br/><br/>
        AVG-COUNT-SUM-MIN-MAX: calculate aggregate functions<br/>
        input: (column) Model.prototype.avg(column: string)<br/>
        Model.count(column: string)<br/>
        Model.sum(column: string)<br/>
        Model.min(column: string)<br/>
        Model.max(column: string)
        <br/><br/>
        Execute query in database<br/>
        Model.query();
      </p>
    </div>
  );
}
