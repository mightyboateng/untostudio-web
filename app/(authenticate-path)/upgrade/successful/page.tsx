import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Upgrade successful</h1>
      <p>You have successfully upgraded to the pro plan</p>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Go to home
      </Link>
    </div>
  );
};

export default page;
