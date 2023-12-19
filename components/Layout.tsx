import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { pathname } = router;
  return (
    <div className="w-screen relative h-fit overflow-x-hidden flex flex-col items-center justify-between lg:justify-center min-h-screen">
      {pathname != "/" && (
        <Link
          href="/"
          className="relative py-6 pl-6 lg:py-0 w-full lg:w-fit lg:fixed lg:left-8 lg:top-8 text-base font-semibold text-black"
        >
          ← Back to home
        </Link>
      )}
      {children}

      <Link
        href="https://github.com/socratesomiliadis"
        target="_blank"
        className="text-black pt-6 pb-10 lg:py-0 w-full lg:w-fit text-lg font-medium lg:left-16 lg:bottom-16 relative lg:fixed flex items-center justify-center  gap-2"
      >
        <span className="block relative w-5">
          <svg
            width="100%"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 12.9993C7.34732 13.6987 6.98919 14.6227 7 15.5793V18.9993M12 12.9993C12.6527 13.6987 13.0108 14.6227 13 15.5793V18.9993M7 17.0493C6.10549 17.4055 5.13532 17.5294 4.18 17.4093C2.66 16.8893 3.06 15.5093 2.28 14.9393C1.90518 14.6713 1.46037 14.5184 1 14.4993M17 7.74927C17 10.7493 15.05 12.9993 10 12.9993C4.95 12.9993 3 10.7493 3 7.74927C2.9753 6.70844 3.20893 5.67772 3.68 4.74927C3.34 3.27927 3.47 1.46927 4.2 1.10927C4.93 0.749267 6.47 1.40927 7.74 2.25927C8.48597 2.12615 9.24225 2.05922 10 2.05927C10.7572 2.05262 11.5134 2.11285 12.26 2.23927C13.53 1.38927 15.14 0.759267 15.8 1.08927C16.46 1.41927 16.66 3.25927 16.32 4.72927C16.7943 5.66371 17.028 6.70171 17 7.74927Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="underline underline-offset-4">
          Made by @socratesomiliadis
        </span>
      </Link>
    </div>
  );
}
