import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";

export default function Migrations() {
  const h1 = "mx-auto max-w-screen-md font-bold text-3xl";
  const description = "mx-auto max-w-screen-md";
  const box =
    "border rounded shadow-md mx-auto box-content bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4";

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
          <h1 class={h1}>Migrations</h1>
          <br />
          <p class={description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            velit accusamus magnam voluptate quidem, provident et? Delectus,
            quae? Quaerat rem odit itaque et nemo necessitatibus doloribus ex
            rerum, aspernatur nulla.
          </p>
        </main>
        <br />
      </div>
    </div>
  );
}
