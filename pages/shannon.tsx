import ShannonForm from "@/components/ShannonForm";
import Head from "next/head";
import Link from "next/link";

export default function Shannon() {
  return (
    <>
      <Head>
        <title>Communication System Solver - Shannon</title>
      </Head>

      <main className="flex flex-col items-center justify-center w-screen">
        <h1 className="text-black font-semibold text-3xl lg:text-5xl">
          Shannon Solver
        </h1>
        <ShannonForm />
      </main>
    </>
  );
}
