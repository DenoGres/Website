// routes/methods.tsx

/** @jsx h */
import { h } from "preact";
import { Handlers } from "$fresh/server.ts";

import { css, tw } from 'twind/css'



export default function MethodsPage() {
  return (
    <main>
      <h1><b>How to use DenoGres Methods</b></h1>
      <p>
        Note: x represents a comparison operator (=,{" "}
        {">, <, >=, <=, <>"}, LIKE) NOT can be added before any arguments in the WHERE method
        <br/><br/>
        SAVE: insert created properties on instance object into database<br/>
        instance.save();
        <br/><br/>
        UPDATE: update the properties on instance object and the database<br/>
        instance.update();
        <br/><br/>
        INSERT INTO VALUES: add value(s) to column(s) in this table<br/>
        input: (column = value, ...)<br/>
        Model.prototype.insert(...rows: string[])
        <br/><br/>
        UPDATE: update existing records in database<br/>
        input: (column = value, ...)<br/>
        Model.prototype.edit(...rows: string[])
        <br/><br/>
        DELETE FROM: delete table<br/>
        input: none<br/>
        Model.prototype.delete()
        <br/><br/>
        SELECT FROM: select column(s) from this table<br/>
        input: (column, ...)<br/>
        Model.prototype.filter(...columns: string[])
        <br/><br/>
        WHERE: add condition(s) to query<br/>
        input: (column x value, AND/OR column x value, ...)<br/>
        Model.prototype.where(...condition: string[])
        <br/><br/>
        LIMIT: limit number of output rows<br/>
        input: (limitNumber)<br/>
        Model.prototype.limit(limit: number)
        <br/><br/>
        HAVING: add condition(s) involving aggregate functions to query<br/>
        input: (aggregateFn(column) x number); example: (COUNT(column) {'>'} 5)<br/>
        Model.prototype.having(...conditions: string[])
        <br/><br/>
        INNER JOIN: selects records with matching values on both table<br/>
        input: (column1, column2, table2)<br/>
        Model.prototype.innerJoin(column1: string, column2: string, table2: string)
        <br/><br/>
        LEFT JOIN: selects records from this table and matching values on table2<br/>
        input: (column1, column2, table2)<br/>
        Model.prototype.leftJoin(column1: string, column2: string, table2: string)
        <br/><br/>
        RIGHT JOIN: selects records from table2 and matching values on this table<br/>
        input: (column1, column2, table2)<br/>
        Model.prototype.innerJoin(column1: string, column2: string, table2: string)
        <br/><br/>
        FULL JOIN: selects all records when a match exists in either table<br/>
        input: (column1, column2, table2)<br/>
        Model.prototype.fullJoin(column1: string, column2: string, table2: string)
        <br/><br/>
        GROUP BY: group rows with same values into summary rows<br/>
        input: (column, ...)<br/>
        Model.prototype.group(...columns: string[])
        <br/><br/>
        ORDER BY: sort column(s) by ascending/descending order<br/>
        input: for (order: string), order should be either ASC or DESC<br/>
        Model.prototype.order(order: string, ...column: string[])
        <br/><br/>
        AVG-COUNT-SUM-MIN-MAX: calculate aggregate functions<br/>
        input: (column) Model.prototype.avg(column: string)<br/>
        Model.prototype.count(column: string)<br/>
        Model.prototype.sum(column: string)<br/>
        Model.prototype.min(column: string)<br/>
        Model.prototype.max(column: string)
        <br/><br/>
        Execute query in database<br/>
        Model.prototype.query();
      </p>
    </main>
  );
}
