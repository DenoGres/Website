import { render } from "preact";
import { apply, setup } from "twind";
import { style } from "twind/style";
import NavBar from "../islands/NavBar.tsx";
import Gradient from "../islands/Gradient.tsx";

export default function Home() {
  return (
    <div>
      <Gradient />
      <div class="sticky top-0">
        <NavBar />
      </div>
      <br />
      <img
        class="mx-auto"
        src="/logo.png"
        height="500px"
        width="500px"
        alt="the DenoGres logo: a blue elephant and a purple dinosaur"
      />
      <p class="text-2xl text-center text-white">
        <br />
        DenoGres is a new Object-Relationship Mapper (ORM) for the Deno runtime
        environment!
      </p>
      <p class=" text-center text-white mx-auto max-w-screen-md">
        <br />
        DenoGres implements a Model class which "models" (or represents) your
        database tables. This class contains functionality which allows you to
        interact with your database tables without the need for typed queries.
        Via the DenoGres CLI, it's possible to introspect your database -
        automatically generating Model sub-classes for each of your database
        tables in TypeScript! To learn more and get started, dive into our
        documentation.
      </p>
      <br />
    </div>
  );
}
