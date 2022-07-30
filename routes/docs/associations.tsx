/** @jsx h */
import { h } from "preact";
import { tw } from '@twind'
import NavBar from "../../islands/NavBar.tsx";
import DocsNav from "../../islands/DocsNav.tsx";

export default function MethodsPage() {

  const h1 = tw`mx-auto max-w-screen-md font-bold text-3xl`;
  const h2 = tw`mx-auto max-w-screen-md font-bold text-2xl`;
  const h3 = tw`mx-auto max-w-screen-md font-bold text-xl`;
  const comment = tw`text-[#97C2DB]`;
  const description = tw`mx-auto max-w-screen-md`;
  const box = tw`border rounded shadow-md mx-auto box-content w-[45rem] bg-gray-100 text-black font-mono max-w-screen-md p-4 border-4 ...`;

  return (
    <div class={tw`min-h-screen text-white bg-gradient-to-b from-gray-600 to-gray-800`}>
      <NavBar/>
      <DocsNav/>
      <h1 class={tw`mx-auto max-w-screen-md font-bold text-3xl`}>How to use DenoGres Methods</h1><br/>
      <p class={tw`mx-auto max-w-screen-md`}>
 
        <h2 class={tw`mx-auto max-w-screen-md font-bold text-2xl`} id="instance">Instance Methods</h2>
        <br/>
        <h3 class={tw`mx-auto max-w-screen-md font-bold text-xl`}>save</h3>
        <p class={tw`mx-auto max-w-screen-md`}>Insert created properties on an instance object into the database.</p><br/>
        <div class={box}>
          const person = new Person(); <span class={comment}>// create new instance of model</span><br/>
          <br/>
          <span class={comment}>// create properties</span><br/>
          person.name = 'Deno';<br/>
          person.hair_color = 'purple';<br/>
          person.age = '100';<br/>
          <br/>
          await person.save(); <span class={comment}>// inserts created properties</span>
          </div>
        <br/>
        <h3 class={tw`mx-auto max-w-screen-md font-bold text-xl`}>update</h3>
        <p class={tw`mx-auto max-w-screen-md`}>Update properties on an instance object in the database.</p><br/>
        <div class={box}>
          person.hair_color = 'blue'; <span class={comment}>// reassign property value</span><br/>
          await person.update(); <span class={comment}>// updates reassigned value in database</span>
          </div>
        <br/><br/>
</p>
</div>

  )
  }