import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Upgrade failed</h1>
      <p>Please try again</p>
      <Link
        href="/upgrade"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Go to upgrade
      </Link>
    </div>
  );
};

export default page;
