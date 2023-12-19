import { useForm, Controller } from "react-hook-form";
import { Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";
import { manrope } from "@/pages/_app";

export default function ShannonForm() {
  const [solution, setSolution] = useState<Record<string, number | null>>({
    watt: null,
    mWatt: null,
    dbm: null,
    dbw: null,
  });
  const [showSolution, setShowSolution] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  function ConvertWatt(w: number) {
    setSolution({
      watt: null,
      mWatt: w * 1000,
      dbm: 10 * Math.log10(w * 1000),
      dbw: 10 * Math.log10(w * 1000) - 30,
    });
  }

  function ConvertmWatt(mw: number) {
    setSolution({
      watt: mw / 1000,
      mWatt: null,
      dbm: 10 * Math.log10(mw),
      dbw: 10 * Math.log10(mw) - 30,
    });
  }

  function ConvertddBm(dbm: number) {
    setSolution({
      watt: Math.pow(10, dbm / 10),
      mWatt: Math.pow(10, (dbm - 30) / 10),
      dbm: null,
      dbw: dbm - 30,
    });
  }

  function ConvertddBw(dbw: number) {
    setSolution({
      watt: Math.pow(10, dbw / 10),
      mWatt: Math.pow(10, (dbw + 30) / 10),
      dbm: dbw + 30,
      dbw: null,
    });
  }

  const onSubmit = async (data: any, e: any) => {
    e.preventDefault();

    const { unit, value } = data;

    switch (unit) {
      case "watt":
        ConvertWatt(value);
        break;
      case "mWatt":
        ConvertmWatt(value);
        break;
      case "dbm":
        ConvertddBm(value);
        break;
      case "dbw":
        ConvertddBw(value);
        break;
    }

    setShowSolution(true);
  };

  return (
    <div className="flex flex-col items-center mt-8 lg:mt-16 w-full px-6 lg:px-0">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full lg:w-1/3 3xl:w-1/4 p-6 lg:p-12 border-[1px] border-black/40 rounded-xl gap-6"
      >
        <div className="flex flex-row gap-4 lg:gap-6">
          <div className="basis-[50%] lg:basis-[40%]">
            <Controller
              control={control}
              name="unit"
              rules={{ required: true, validate: (value) => value !== "" }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <Autocomplete
                  allowsCustomValue
                  label="Unit"
                  labelPlacement="outside"
                  size="lg"
                  className="spotlight-input"
                  onSelectionChange={onChange}
                  errorMessage={
                    errors.unit && "Το πεδίο unit είναι υποχρεωτικό"
                  }
                  isInvalid={!!errors.unit}
                  selectedKey={value}
                  placeholder="Select unit"
                  inputProps={{
                    classNames: {
                      label: ["text-black font-semibold text-lg"],
                      inputWrapper: [
                        "bg-white pl-5 border-[1px] border-[#E2E2E2] rounded-md",
                      ],
                      input: [
                        "font-medium text-sm placeholder:text-[#ACACAC] placeholder:font-normal",
                      ],
                    },
                  }}
                  classNames={{
                    popoverContent: [
                      "bg-white px-3 py-2 border-[1px] border-[#E2E2E2] rounded-md shadow",
                    ],
                  }}
                >
                  <AutocompleteItem
                    style={manrope.style}
                    className="px-2 data-[hover=true]:bg-[#F6F6F6] spotlight-select-item"
                    key="watt"
                  >
                    Watt
                  </AutocompleteItem>
                  <AutocompleteItem
                    style={manrope.style}
                    className="px-2 data-[hover=true]:bg-[#F6F6F6] spotlight-select-item"
                    key="mWatt"
                  >
                    mWatt
                  </AutocompleteItem>
                  <AutocompleteItem
                    style={manrope.style}
                    className="px-2 data-[hover=true]:bg-[#F6F6F6] spotlight-select-item"
                    key="dbm"
                  >
                    dBm
                  </AutocompleteItem>
                  <AutocompleteItem
                    style={manrope.style}
                    className="px-2 data-[hover=true]:bg-[#F6F6F6] spotlight-select-item"
                    key="dbw"
                  >
                    dBw
                  </AutocompleteItem>
                </Autocomplete>
              )}
            />
          </div>
          <div className="basis-[50%] lg:basis-[60%]">
            <Input
              type="number"
              label="Τιμή"
              size="lg"
              disableAnimation
              labelPlacement="outside"
              placeholder="Δώσε μια τιμή"
              errorMessage={errors.value && "Το πεδίο τιμή είναι υποχρεωτικό"}
              //   description="Δώσε μια τιμή γιά τη Φασματική Απόδοση"
              className="spotlight-input w-full"
              isInvalid={!!errors.value}
              classNames={{
                label: ["text-black font-semibold text-lg"],
                inputWrapper: ["px-0"],
                input: [
                  "bg-white placeholder:text-base placeholder:font-normal px-2 py-1 focus:outline-none border-[1px] border-[#E2E2E2] rounded-md font-medium text-lg",
                ],
                errorMessage: ["mt-2 text-red-500"],
              }}
              {...register("value", {
                required: true,
              })}
            />
          </div>
        </div>

        <button className="px-10 py-2 bg-black text-white rounded-md">
          Convert
        </button>
        {showSolution && (
          <div className="flex flex-col">
            {solution.watt && (
              <span>
                <span className="text-black font-semibold">Watt: </span>
                {solution.watt}
              </span>
            )}
            {solution.mWatt && (
              <span>
                <span className="text-black font-semibold">mWatt: </span>
                {solution.mWatt}
              </span>
            )}
            {solution.dbm && (
              <span>
                <span className="text-black font-semibold">dBm: </span>
                {solution.dbm}
              </span>
            )}
            {solution.dbw && (
              <span>
                <span className="text-black font-semibold">dBw: </span>
                {solution.dbw}
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
