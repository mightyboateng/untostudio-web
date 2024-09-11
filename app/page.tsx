import DefaultHeader from "@/components/DefaultHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col container mx-auto px-2 min-h-screen">
      <DefaultHeader />
      {/* Main page components */}
      <div className="flex-grow">
        <div className=" h-[calc(100vh-100px)] flex flex-col justify-center items-center border rounded">
          <div className="flex flex-col justify-center items-center flex-grow text-center">
            <h1 className="md:text-8xl text-4xl font-bold mb-8">
            Boiler plate starter kit
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              This is a landing page of Boiler plate
            </p>
            <div>
              <Button className="w-40 font-bold bg-teal-600 text-white">Log in</Button>
            </div>
          </div>
          <div className="flex items-center gap-4">
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
          </div>
        </div>

        {/* <div className="pt-24 pb-60 flex flex-col items-center text-center">
          <h3 className="md:text-4xl text-2xl mb-3 font-bold md:w-[700px]">
            Boosting my app so I can{" "}
            <span className="text-teal-600">launch fast</span> and{" "}
            <span className="text-teal-600">earn big</span>
          </h3>
          <p className="text-xl text-muted-foreground">
            I won't waste time on designing a pricing section...
          </p>
        </div> */}

        {/* <div className="my-9">
          <h3 className="text-3xl">
            Save hours of repetitive code, ship fast, get profitable!
          </h3>
        </div> */}
      </div>
      <Footer />
    </div>
  );
}

const stacks = [
  "/stacks/next.png",
  "/stacks/redux.png",
  // "/stacks/firebase.png",
  // "/stacks/google.png",
  // "/stacks/paystack.png",
];
