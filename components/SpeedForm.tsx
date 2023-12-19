import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function SpeedForm() {
  const [solution, setSolution] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function Calculate(pr: number, prl: number, d: number, n: number, t: number) {
    let d1 = Math.pow(10, Math.log10(d) + Math.log10(pr / prl) / n) - d;
    let speed = d1 / t;
    setSolution(speed);
  }

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    const { pr, prl, d, n, t } = data;

    Calculate(pr, prl, d, n, t);

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
          label="Initial Receiver Power"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Give the receiver power in initial position"
          errorMessage={
            errors.pr && "The Initial Receiver Power field is required"
          }
          className="spotlight-input w-full"
          isInvalid={!!errors.pr}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("pr", {
            required: true,
          })}
        />
        <Input
          type="number"
          label="Final Receiver Power"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Give the receiver power in fnail position"
          errorMessage={
            errors.prl && "The Final Receiver Power field is required"
          }
          className="spotlight-input w-full"
          isInvalid={!!errors.prl}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("prl", {
            required: true,
          })}
        />
        <Input
          type="number"
          label="Initial Distance"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Give the initial distance from transmitter"
          errorMessage={
            errors.d && "Please provide a valid initial distance (d >= 0)"
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
            validate: (value) => value >= 0,
          })}
        />
        <Input
          type="number"
          label="Signal Loss"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Give the signal loss"
          errorMessage={errors.n && "Please provide a valid signal loss (3-5)"}
          className="spotlight-input w-full"
          isInvalid={!!errors.n}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("n", {
            required: true,
            validate: (value) => value >= 3 && value <= 5,
          })}
        />
        <Input
          type="number"
          label="Time"
          size="lg"
          disableAnimation
          labelPlacement="outside"
          placeholder="Give the time"
          errorMessage={errors.t && "Please provide a valid time"}
          className="spotlight-input w-full"
          isInvalid={!!errors.t}
          classNames={{
            label: ["text-black font-semibold text-lg"],
            inputWrapper: ["px-0"],
            input: [
              "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
            ],
            errorMessage: ["mt-2 text-red-500"],
          }}
          {...register("t", {
            required: true,
            validate: (value) => value >= 0,
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
            The speed is <span className="font-semibold">{solution} m/s</span>
          </p>
        )}
      </form>
    </div>
  );
}
