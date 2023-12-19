import { set, useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function MaxBEForm() {
  const [solution, setSolution] = useState<Record<string, string | null>>({
    EbN0: null,
    BE: null,
  });

  const [showSolution, setShowSolution] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function calculate(EbN0_db: number) {
    let EbN0 = Math.pow(10, EbN0_db / 10);
    let BE = 0.1;

    while (true) {
      if (BE <= Math.log2(1 + EbN0 * BE)) BE += 0.1;
      else {
        BE -= 0.1;
        setSolution({
          EbN0: EbN0.toFixed(2),
          BE: BE.toFixed(1),
        });
        break;
      }
    }
  }

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    const { EbN0_db } = data;

    calculate(EbN0_db);

    setShowSolution(true);
  };

  return (
    <div className="flex flex-col items-center mt-8 lg:mt-16 px-6 lg:px-0 w-full">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full lg:w-1/3 3xl:w-1/4 p-6 lg:p-12 border-[1px] border-black/40 rounded-xl gap-6"
      >
        <Input
          type="number"
          label="Eb/N0 (db)"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Δώσε μία τιμή για Eb/N0(σε db)"
          errorMessage={errors.EbN0_db && "Το πεδίο Eb/N0 είναι υποχρεωτικό"}
          //   description="Δώσε μια τιμή γιά τη Φασματική Απόδοση"
          className="spotlight-input w-full"
          isInvalid={!!errors.EbN0_db}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 mt-2 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("EbN0_db", {
            required: true,
          })}
        />

        <button className="px-10 py-2 bg-black text-white rounded-md">
          Calculate
        </button>
        {showSolution && (
          <p className="mt-8 text-lg">
            <span className="font-semibold">Eb/N0 (Καθαρός Αριθμός):</span>{" "}
            {solution.EbN0}
            <br />
            <span className="font-semibold">
              Άνω όριο της φασματικής απόδοσης:
            </span>{" "}
            {solution.BE} bps/Hz
          </p>
        )}
      </form>
    </div>
  );
}
