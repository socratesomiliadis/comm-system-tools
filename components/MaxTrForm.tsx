import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";

/*
var P,Pn;
var d;
var C;
var Pt;
var d0;
var Bmax,Bmin,B;
		Pt= prompt("Δωσε ισχυ εκπομπης κομβου σε mWatt :");
		d0 = prompt("Σε ποσα μετρα απο την κεραια εχεις τοσο ισχυ :");
		Pn = prompt("Δωσε ισχυς θορυβου σε mWatt :");
		Bmin = prompt("Δωσε ελαχιστη συχνοτητα λειτουργειας σε GΗz :");
		Bmax = prompt("Δωσε μεγιστη συχνοτητα λειτουργειας σε GΗz :");
		d= prompt("Δωσε αποσταση δέκτη απο κεραια σε μετρα :");
		B=(Bmax-Bmin)*1000;
		
			P = Pt * ((d0/d)* (d0/d));
			C = B * Math.log2(1+(P/Pn));
			C=C.toFixed(2);
			alert("Mέγιστος ρυθμός μετάδοσης για απόσταση "+d+" μετρα είναι ίση με "+C+" Mbps");
	    
*/

export default function MaxTrForm() {
  const [solution, setSolution] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function calculate(
    pt: number,
    d0: number,
    pn: number,
    bmin: number,
    bmax: number,
    d: number
  ) {
    let b = (bmax - bmin) * 1000;
    let p = pt * ((d0 / d) * (d0 / d));
    let c = b * Math.log2(1 + p / pn);
    setSolution(c.toFixed(2));
  }

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    const { pt, d0, pn, bmin, bmax, d } = data;

    calculate(pt, d0, pn, bmin, bmax, d);

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
          label="Ισχύς Εκπομπής κόμβου (mWatt)"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Δώσε ισχύ εκπομπής κόμβου σε mWatt"
          errorMessage={
            errors.pt && "To πεδίο Ισχύς Εκπομπής κόμβου είναι υποχρεωτικό"
          }
          className="spotlight-input w-full"
          isInvalid={!!errors.pt}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("pt", {
            required: true,
          })}
        />
        <Input
          type="number"
          label="Απόσταση από κεραία"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Σε πόσα μέτρα από την κεραία έχεις τόσο ισχύ"
          errorMessage={
            errors.d0 && "To πεδίο Απόσταση από κεραία είναι υποχρεωτικό"
          }
          className="spotlight-input w-full"
          isInvalid={!!errors.d0}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("d0", {
            required: true,
          })}
        />
        <Input
          type="number"
          label="Ισχύς θορύβου (mWatt)"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Δώσε ισχύ θορύβου σε mWatt"
          errorMessage={errors.pn && "To πεδίο Ισχύς θορύβου είναι υποχρεωτικό"}
          className="spotlight-input w-full"
          isInvalid={!!errors.pn}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("pn", {
            required: true,
          })}
        />
        <Input
          type="number"
          label="Ελάχιστη συχνότητα λειτουργίας (GHz)"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Δώσε ελάχιστη συχνότητα λειτουργίας σε GHz"
          errorMessage={
            errors.bmin &&
            "To πεδίο Ελάχιστη συχνότητα λειτουργίας είναι υποχρεωτικό"
          }
          className="spotlight-input w-full py-6 lg:py-0  "
          isInvalid={!!errors.bmin}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("bmin", {
            required: true,
          })}
        />
        <Input
          type="number"
          label="Μέγιστη συχνότητα λειτουργίας (GHz)"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Δώσε μέγιστη συχνότητα λειτουργίας σε GHz"
          errorMessage={
            errors.bmax &&
            "To πεδίο Μέγιστη συχνότητα λειτουργίας είναι υποχρεωτικό"
          }
          className="spotlight-input w-full"
          isInvalid={!!errors.bmax}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("bmax", {
            required: true,
          })}
        />
        <Input
          type="number"
          label="Δεκτή απόσταση από κεραία (m)"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Δώσε δεκτή απόσταση από κεραία σε μέτρα (m)"
          errorMessage={
            errors.d && "To πεδίο Δεκτή απόσταση από κεραία είναι υποχρεωτικό"
          }
          className="spotlight-input w-full"
          isInvalid={!!errors.d}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("d", {
            required: true,
          })}
        />

        <div className="flex flex-row gap-6">
          <button
            type="submit"
            className="basis-1/2 py-2 bg-black text-white rounded-md"
          >
            Solve
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="basis-1/2 py-2 bg-black text-white rounded-md"
          >
            Clear
          </button>
        </div>
        {showSolution && (
          <p className="mt-8 text-lg">
            <span className="font-semibold">Mέγιστος ρυθμός μετάδοσης:</span>{" "}
            {solution} Mbps
          </p>
        )}
      </form>
    </div>
  );
}
