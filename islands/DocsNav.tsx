/** @jsx h */
import { h } from "preact";
import {tw} from "@twind"

export default function DocsNav() {
  return (
    <div class={tw`w-72 h-full absolute`} id="sidenavSecExample">
  <div class={tw`pt-4 pb-2 px-6`}>
      <div class={tw`flex items-center p-4`}>
        <div class={tw`shrink-0`}>
          <img src="/logo.png" class="rounded-full w-10" alt="Avatar"/>
        </div>
      </div>
  </div>
  <ul class={tw`relative px-1`}>
    <li class={tw`relative`}>
      <a class={tw`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out`} href="/docs/getting-started" data-mdb-ripple="true" data-mdb-ripple-color="primary">
        <span>Getting Started</span>
      </a>
    </li>
    <li class={tw`relative`} id="sidenavSecEx2">
      <a href="/docs/methods" class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="primary" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx2" aria-expanded="false" aria-controls="collapseSidenavSecEx2">
        <span>Methods</span>
      </a>
      <ul class={tw`relative accordion-collapse collapse`} id="collapseSidenavSecEx2" aria-labelledby="sidenavSecEx2" data-bs-parent="#sidenavSecExample">
        <li class={tw`relative`}>
          <a href="/docs/methods#instance" class={tw`flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out`} data-mdb-ripple="true" data-mdb-ripple-color="primary">Instance Methods</a>
        </li>
        <li class="relative">
          <a href="/docs/methods#model" class={tw`flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out`} data-mdb-ripple="true" data-mdb-ripple-color="primary">Model Methods</a>
        </li>
      </ul>
    </li>
    <li class="relative" id="sidenavSecEx3">
      <a href="/docs/associations" class={tw`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out cursor-pointer`} data-mdb-ripple="true" data-mdb-ripple-color="primary" data-bs-toggle="collapse" data-bs-target="#collapseSidenavSecEx3" aria-expanded="false" aria-controls="collapseSidenavSecEx3">
        <span>Associations</span>
      </a>
      <ul class={tw`relative accordion-collapse collapse`} id="collapseSidenavSecEx3" aria-labelledby="sidenavSecEx3" data-bs-parent="#sidenavSecExample">
        <li class="relative">
          <a href="/docs/associations#one-to-one" class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">One-to-One</a>
        </li>
        <li class="relative">
          <a href="/docs/associations#one-to-many" class={tw`flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out`} data-mdb-ripple="true" data-mdb-ripple-color="primary">One-to-Many</a>
        </li>
        <li class="relative">
          <a href="/docs/associations#many-to-many" class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-[#B293B6] hover:bg-blue-50 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="primary">Many-to-Many</a>
        </li>
      </ul>
    </li>
  </ul>
  {/* <hr class="my-2"/> */}
</div>
  );
}
//     <aside class={tw`w-64 aria-label="Sidebar"`}>
// <div class={tw`w-60 h-full shadow-md px-1 absolute`}>
//   <ul class="relative">
//     <li class="relative">
//       <a class={tw`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out`} href={tw`/docs/getting-started" data-mdb-ripple="true" data-mdb-ripple-color="dark"`}>Getting Started</a>
//     </li>
//     <li class="relative">
//       <a class={tw`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out`} href={tw`/docs/methods" data-mdb-ripple="true" data-mdb-ripple-color="dark"`}>Methods</a>
//     </li>
//     <li class="relative">
//       <a class={tw`flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out`} href={tw`/docs/data-instrospection" data-mdb-ripple="true" data-mdb-ripple-color="dark"`}>Data Introspection</a>
//     </li>
//   </ul>
// </div>
// </aside>
