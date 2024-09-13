import React from 'react'
import Image from 'next/image'

const TechStackSection = () => {
  return (
    <div>
      {/* <div className="flex items-center gap-4">
        {stacks.map((stack, index) => (
          <div key={index}>
            <Image
              src={stack}
              alt={`${index}+${stack}`}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
        ))}
      </div> */}

      <div className="container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10">
        <div className="space-y-3 text-center">
          {/* <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our Tech Stack
          </h2> */}
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I use these technologies to build my products.
          </p>
        </div>
        <div className="relative w-full overflow-hidden rounded-lg bg-muted/20 py-4">
          <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
            <div className="flex items-center gap-4">
              <img
                src="/stacks/next.png"
                width="80"
                height="80"
                alt="React"
                className="aspect-square rounded-md object-contain"
              />
              <span className="text-lg font-medium">React</span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/stacks/next.png"
                width="80"
                height="80"
                alt="Next.js"
                className="aspect-square rounded-md object-contain"
              />
              <span className="text-lg font-medium">Next.js</span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg"
                width="80"
                height="80"
                alt="Tailwind CSS"
                className="aspect-square rounded-md object-contain"
              />
              <span className="text-lg font-medium">Tailwind CSS</span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg"
                width="80"
                height="80"
                alt="TypeScript"
                className="aspect-square rounded-md object-contain"
              />
              <span className="text-lg font-medium">TypeScript</span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg"
                width="80"
                height="80"
                alt="Node.js"
                className="aspect-square rounded-md object-contain"
              />
              <span className="text-lg font-medium">Node.js</span>
            </div>
            <div className="flex items-center gap-4">
              <img
                src="/placeholder.svg"
                width="80"
                height="80"
                alt="MongoDB"
                className="aspect-square rounded-md object-contain"
              />
              <span className="text-lg font-medium">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TechStackSection


const stacks = [
  "/stacks/next.png",
  "/stacks/redux.png",
  // "/stacks/firebase.png",
  // "/stacks/google.png",
  // "/stacks/paystack.png",
];

// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/QsQqzdn2L8d
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// export default function Component() {
//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32">
//       <div className="container grid items-center justify-center gap-4 px-4 md:px-6 lg:gap-10">
//         <div className="space-y-3 text-center">
//           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Tech Stack</h2>
//           <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
//             We use the latest and greatest technologies to build our products.
//           </p>
//         </div>
//         <div className="relative w-full overflow-hidden rounded-lg bg-muted/20 py-4">
//           <div className="flex items-center gap-8 animate-marquee whitespace-nowrap">
//             <div className="flex items-center gap-4">
//               <img
//                 src="/placeholder.svg"
//                 width="80"
//                 height="80"
//                 alt="React"
//                 className="aspect-square rounded-md object-contain"
//               />
//               <span className="text-lg font-medium">React</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <img
//                 src="/placeholder.svg"
//                 width="80"
//                 height="80"
//                 alt="Next.js"
//                 className="aspect-square rounded-md object-contain"
//               />
//               <span className="text-lg font-medium">Next.js</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <img
//                 src="/placeholder.svg"
//                 width="80"
//                 height="80"
//                 alt="Tailwind CSS"
//                 className="aspect-square rounded-md object-contain"
//               />
//               <span className="text-lg font-medium">Tailwind CSS</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <img
//                 src="/placeholder.svg"
//                 width="80"
//                 height="80"
//                 alt="TypeScript"
//                 className="aspect-square rounded-md object-contain"
//               />
//               <span className="text-lg font-medium">TypeScript</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <img
//                 src="/placeholder.svg"
//                 width="80"
//                 height="80"
//                 alt="Node.js"
//                 className="aspect-square rounded-md object-contain"
//               />
//               <span className="text-lg font-medium">Node.js</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <img
//                 src="/placeholder.svg"
//                 width="80"
//                 height="80"
//                 alt="MongoDB"
//                 className="aspect-square rounded-md object-contain"
//               />
//               <span className="text-lg font-medium">MongoDB</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }