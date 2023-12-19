import SpeedForm from "@/components/SpeedForm";
import Head from "next/head";
import Link from "next/link";

export default function SpeedSolver() {
  return (
    <>
      <Head>
        <title>Communication System Solver - Speed Calculator</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-screen">
        <h1 className="text-black font-semibold text-3xl lg:text-5xl">
          Speed Calculator
        </h1>
        <SpeedForm />
      </main>
    </>
  );
}
