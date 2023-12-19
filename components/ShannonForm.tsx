import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { useState } from "react";

export default function ShannonForm() {
  const [solution, setSolution] = useState({
    SNRdb2: 0,
    BE_2: "0",
    BE: 0,
    SNR_db: "0",
  });
  const [showSolution, setShowSolution] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /*var BE;
  var SNR;
  var SNR_db;
  var SNR_db_2;
  var BE_2;
  var SNR_2;

  BE = prompt("Δώσε μια τιμή γιά τη Φασματική Απόδοση bps/Hz:");
  SNR_db_2 = prompt("Δώσε μια τιμή για το SNRdb:");
  SNR = Math.pow(2, BE) - 1;

  SNR_db = 10 * Math.log10(SNR);

  SNR_2 = Math.pow(10, SNR_db_2 / 10);

  BE_2 = Math.log2(SNR_2 + 1);
  alert(
    "Η Φασματική Απόδοση για SNRdb ίσο με " +
      SNR_db_2 +
      ", είναι ίση με " +
      BE_2.toFixed(2) +
      " bps/Hz, και το SNRdb, για Φασματική Απόδοση ίση με " +
      BE +
      ", είναι ίσο με " +
      SNR_db.toFixed(2) +
      " db"
  );*/

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    const { be, SNRdb2 } = data;

    let SNR = Math.pow(2, be) - 1;

    let SNR_db = 10 * Math.log10(SNR);

    let SNR_2 = Math.pow(10, SNRdb2 / 10);

    let BE_2 = Math.log2(SNR_2 + 1);

    setSolution({
      SNRdb2: SNRdb2,
      BE_2: BE_2.toFixed(2),
      BE: be,
      SNR_db: SNR_db.toFixed(2),
    });

    setShowSolution(true);
  };

  return (
    <div className="flex flex-col items-center mt-8 lg:mt-16 w-full px-6 lg:px-0">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full lg:w-1/3 3xl:w-1/4 p-6 lg:p-12 border-[1px] border-black/40 rounded-xl gap-6"
      >
        <Input
          type="number"
          label="Φασματική Απόδοση (bps/Hz)"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Δώσε μια τιμή γιά τη Φασματική Απόδοση"
          errorMessage={
            errors.be && "Το πεδίο Φασματική Απόδοση είναι υποχρεωτικό"
          }
          //   description="Δώσε μια τιμή γιά τη Φασματική Απόδοση"
          className="spotlight-input w-full"
          isInvalid={!!errors.be}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 mt-2 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("be", {
            required: true,
          })}
        />
        <Input
          type="number"
          label="SNRdb"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          errorMessage={errors.be && "Το πεδίο SNRdb είναι υποχρεωτικό"}
          //   description="Δώσε μια τιμή γιά τη Φασματική Απόδοση"
          placeholder="Δώσε μια τιμή για το SNRdb"
          className="spotlight-input w-full"
          isInvalid={!!errors.SNRdb2}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 mt-2 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("SNRdb2", {
            required: true,
          })}
        />
        <button className="px-10 py-2 bg-black text-white rounded-md">
          Λύση
        </button>
        {showSolution && (
          <p className="mt-8 text-lg">
            H <span className="font-semibold">Φασματική Απόδοση</span> για SNRdb
            ίσο με {solution.SNRdb2}, είναι ίση με{" "}
            <span className="font-semibold">{solution.BE_2} bps/Hz</span>, και
            το <span className="font-semibold">SNRdb</span>, για Φασματική
            Απόδοση ίση με {solution.BE}, είναι ίσο με{" "}
            <span className="font-semibold">{solution.SNR_db} db</span>
          </p>
        )}
      </form>
    </div>
  );
}
