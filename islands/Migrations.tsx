import { useState } from "preact/hooks";

// list of saved Migrations
export default function Migrations() {
  return (
    <div className="w-full flex flex-row">
      <div className="w-5/12 bg-white rounded mx-3 p-3 items-center">
        <h2 className="mb-3 text-center">Migration History</h2>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col h-full bg-white p-3 rounded">
          <div>
            <h2>Migration Details</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
