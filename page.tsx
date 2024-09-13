/**
 * v0 by Vercel.
 * @see https://v0.dev/t/YiEfjw0uDno
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex h-screen w-full bg-[#181818] text-white">
      <aside className="flex flex-col items-start justify-between border-r border-[#2c2c2c] px-4 py-6 transition-all duration-300 data-[collapsed=true]:w-16 data-[collapsed=true]:items-center">
        <div className="flex flex-col items-start gap-6">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <YoutubeIcon className="h-6 w-6" />
            <span className="text-lg font-bold data-[collapsed=true]:hidden">
              YouTube
            </span>
          </Link>
          <nav className="flex flex-col items-start gap-2">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-[#2c2c2c] data-[collapsed=true]:px-0 data-[collapsed=true]:py-0"
              prefetch={false}
            >
              <HomeIcon className="h-5 w-5" />
              <span className="text-sm font-medium data-[collapsed=true]:hidden">
                Home
              </span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-[#2c2c2c] data-[collapsed=true]:px-0 data-[collapsed=true]:py-0"
              prefetch={false}
            >
              <TrendingUpIcon className="h-5 w-5" />
              <span className="text-sm font-medium data-[collapsed=true]:hidden">
                Trending
              </span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-[#2c2c2c] data-[collapsed=true]:px-0 data-[collapsed=true]:py-0"
              prefetch={false}
            >
              <ShoppingCartIcon className="h-5 w-5" />
              <span className="text-sm font-medium data-[collapsed=true]:hidden">
                Subscriptions
              </span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-[#2c2c2c] data-[collapsed=true]:px-0 data-[collapsed=true]:py-0"
              prefetch={false}
            >
              <LibraryIcon className="h-5 w-5" />
              <span className="text-sm font-medium data-[collapsed=true]:hidden">
                Library
              </span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-[#2c2c2c] data-[collapsed=true]:px-0 data-[collapsed=true]:py-0"
              prefetch={false}
            >
              <CalendarIcon className="h-5 w-5" />
              <span className="text-sm font-medium data-[collapsed=true]:hidden">
                History
              </span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-[#2c2c2c] hover:bg-[#2c2c2c]"
          >
            <SettingsIcon className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-[#2c2c2c] hover:bg-[#2c2c2c]"
          >
            <LogOutIcon className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to YouTube</h1>
        <p className="mt-2 text-muted-foreground">
          Explore the latest videos and trends on YouTube.
        </p>
      </main>
    </div>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function LibraryIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 6 4 14" />
      <path d="M12 6v14" />
      <path d="M8 8v12" />
      <path d="M4 4v16" />
    </svg>
  );
}

function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function TrendingUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
