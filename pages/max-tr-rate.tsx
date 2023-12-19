import MaxTrForm from "@/components/MaxTrForm";
import Head from "next/head";
import Link from "next/link";

export default function SpeedSolver() {
  return (
    <>
      <Head>
        <title>
          Communication System Solver - Max Transimission Rate Calculator
        </title>
      </Head>

      <main className="flex flex-col items-center justify-center w-screen">
        <h1 className="text-black font-semibold text-center text-3xl lg:text-5xl px-6 lg:px-0">
          Max Transimission Rate Calculator
        </h1>
        <MaxTrForm />
      </main>
    </>
  );
}
