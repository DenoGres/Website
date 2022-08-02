/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import NavBar from "../../islands/NavBar.tsx";
import DocsBar from "../../islands/DocsNav.tsx"

export default function GettingStartedPage() {
  const h1 = tw`mx-auto max-w-screen-md font-bold text-3xl`;
  const h2 = tw`mx-auto max-w-screen-md font-bold text-1xl`;

  const description = tw`mx-auto max-w-screen-md`;

  return (
    <div class={tw`h-screen text-white bg-gradient-to-b from-gray-500 via-gray-800 to-gray-900`}>
      <NavBar />
      <DocsBar />
      {/* <a class={tw`flex justify-center mx-4 mb-10 text-2xl`} href="/docs/getting-started">Getting Started</a>
      <a class={tw`flex justify-center mx-4 mb-10 text-2xl`} href="/docs/methods">Methods</a>
      <a class={tw`flex justify-center mx-4 mb-10 text-2xl`} href="/docs/associations">Associations</a> */}
      <p class={tw`font-bold text-5xl text-center`}>Welcome To DenoGres</p>
      <h1 class ={h1}>Problem</h1>
      <ul class = {description}>
        <li> &nbsp;&nbsp;&nbsp;&nbsp; - No libraries for Deno which offer comprehensive Object-Relational Mapping (ORM) for PostgreSQL</li>
        <li> &nbsp;&nbsp;&nbsp;&nbsp; - Lack of rich packages in the space can hinder developers' willingness to explore this technology</li>
      </ul>
      <h1 class ={h1}>Solution</h1>
      <ul class = {description}>
        <li class = {h2}> &nbsp;&nbsp;&nbsp;&nbsp;- Abstraction</li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Create a Model class as an object representative of a database table</li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Implement methods to interact with the database without typed queries</li>
        <li class = {h2}> &nbsp;&nbsp;&nbsp;&nbsp;- Introspection</li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Auto-generate typescript models of existing database tables - reducing manual requirements for &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; setup</li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ Generate initial schema models based on stored PostgreSQL metadata within the database system &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; catalog tables</li>
      </ul>
    </div>
  );
}
