/**
 * v0 by Vercel.
 * @see https://v0.dev/t/I64GvxjIu6A
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingTableSection() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto py-12 px-4 md:px-0">
        <div className="border-4 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-muted py-6 text-center">
            <h3 className="text-xl font-bold">Starter</h3>
            <p className="md:text-8xl text-4xl font-bold text-primary">$9</p>
            <p className="text-muted-foreground">per month</p>
          </div>
          <div className="p-6 space-y-4">
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary" />1 user
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary" />5 GB storage
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary" />
                Basic analytics
              </li>
            </ul>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
        <div className="border-4 border-teal-600 text-teal-600 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary-foreground py-6 text-center">
            <h3 className="text-xl font-bold">Pro</h3>
            <p className="md:text-8xl text-4xl font-bold">$19</p>
            <p className="text-teal-500">per month</p>
          </div>
          <div className="p-6 space-y-4">
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary-foreground" />5 users
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary-foreground" />
                50 GB storage
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary-foreground" />
                Advanced analytics
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary-foreground" />
                Custom domain
              </li>
            </ul>
            <Button className="w-full bg-teal-600 text-white hover:bg-teal-900">
              Get Started
            </Button>
          </div>
        </div>
        <div className="border-4 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-muted py-6 text-center">
            <h3 className="text-xl font-bold">Enterprise</h3>
            <p className="md:text-8xl text-4xl font-bold text-primary">$49</p>
            <p className="text-muted-foreground">per month</p>
          </div>
          <div className="p-6 space-y-4">
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary" />
                Unlimited users
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary" />1 TB storage
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary" />
                Enterprise analytics
              </li>
              <li className="flex items-center gap-2 pb-2">
                <Check className="w-5 h-5 fill-primary" />
                Dedicated support
              </li>
            </ul>
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
