import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Communication System Solver</title>
      </Head>
      <div />
      <main className="flex flex-col items-center justify-center w-screen ">
        <h1 className="text-black font-semibold text-5xl mb-6">Tools:</h1>
        <div className="flex flex-col items-center gap-4">
          <Link
            href="/shannon"
            className="px-12 text-center w-full py-2 rounded-md bg-black text-white"
          >
            Shannon Solver
          </Link>
          <Link
            href="/converter"
            className="px-12 w-full text-center py-2 rounded-md bg-black text-white"
          >
            Converter
          </Link>
          <Link
            href="/speed-solver"
            className="px-12 w-full text-center py-2 rounded-md bg-black text-white"
          >
            Speed Calculator
          </Link>
          <Link
            href="/max-be"
            className="px-12 w-full text-center py-2 rounded-md bg-black text-white"
          >
            Max BE Calculator
          </Link>
          <Link
            href="/max-tr-rate"
            className="px-12 text-center py-2 rounded-md bg-black text-white"
          >
            Max Transimission Rate Calculator
          </Link>
        </div>
      </main>
    </>
  );
}
