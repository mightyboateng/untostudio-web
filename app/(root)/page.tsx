import DefaultHeader from "@/components/DefaultHeader";
import Footer from "@/components/Footer";
// import PricingTableSection from "@/components/samples/PricingTableSection";
// import TechStackSection from "@/components/samples/TechStackSection";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col container mx-auto px-2 min-h-screen">
      <DefaultHeader />
      {/* Main page components */}
      <div className="flex-grow">
        <div className=" h-[calc(100vh-100px)] flex flex-col justify-center items-center border rounded">
          <div className="flex flex-col justify-center items-center text-center flex-grow">
            <h1 className="md:text-8xl text-4xl font-bold mb-8">
              Boiler plate starter kit
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              This is a landing page of Boiler plate
            </p>
            <div>
              <Button className="w-40 text-lg font-bold bg-teal-600 text-white hover:bg-teal-900">
                Log in
              </Button>
            </div>
          </div>
          {/* <TechStackSection /> */}
        </div>

        {/* <PricingTableSection /> */}

      </div>
      <Footer />
    </div>
  );
}
