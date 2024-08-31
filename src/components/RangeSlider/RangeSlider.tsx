"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/shared";
import { useRef } from "react";
import ReactSlider from "react-slider";

type RangeSliderProps = {
  title: string;
  min: number;
  max: number;
  unit: string;

  values: [number, number];
  setValues: (values: [number, number]) => void;
};

export function RangeSlider(props: RangeSliderProps) {
  const { title, min, max, unit, values, setValues } = props;
  const noVariants = min === max;
  const timeout = useRef<NodeJS.Timeout>();

  const setNewValues = (newMin?: number, newMax?: number) => {
    if (newMin) {
      setValues([newMin, values[1]]);
    }
    if (newMax) {
      setValues([values[0], newMax]);
    }
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      if (values[0] >= min && values[1] <= max && values[0] <= values[1]) {
        return;
      }
      const allowedMin = Math.min(Math.max(values[0], min), max);
      const _allowedMax = Math.max(Math.min(values[1], max), min);
      const allowedMax = Math.max(_allowedMax, allowedMin);
      setValues([allowedMin, allowedMax]);
    }, 1500);
  };

  if (noVariants) {
    return (
      <div className="w-full">
        <div className="text-xl md:text-lg font-semibold tracking-tight">{title}</div>
        <div className="mt-2 text-lg font-light text-muted-foreground tracking-tight">
          {values[1]} {unit}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="text-xl md:text-lg font-semibold tracking-tight">
        {title}
        <span className="text-sm font-light">, {unit}</span>
      </div>

      <div className="mt-4 md:mt-1 flex flex-row justify-between  w-full items-center">
        <div>
          <Input
            type={"number"}
            className="hide-arrow h-10 md:h-8"
            value={values[0]}
            onChange={e => setNewValues(Number(e.target.value), undefined)}
          />
        </div>
        <div className="px-1">-</div>
        <div>
          <Input
            type={"number"}
            className="hide-arrow h-10 md:h-8 text-right"
            value={values[1]}
            onChange={e => setNewValues(undefined, Number(e.target.value))}
          />
        </div>
      </div>

      <ReactSlider
        onChange={a => setValues(a)}
        defaultValue={values}
        value={values}
        min={min}
        max={max}
        className={"mt-6 sm:mt-4 relative flex items-center  w-full h-[5px]"}
        thumbClassName={
          "relative border-primary bg-white border-[2px] w-8 h-8 md:w-4 md:h-4 rounded-full cursor-pointer"
        }
        trackClassName="h-[5px] bg-slate-200"
        renderTrack={(props, state) => (
          <div
            {...props}
            key={state.index}
            className={cn("h-[5px] bg-slate-200 rounded-sm", {
              "bg-primary": state.index === 1,
            })}
          />
        )}
      />
      <div className="mt-6 text-sm md:mt-2   text-primary tracking-tight flex flex-row justify-between">
        <div>{min}</div>
        <div>{max}</div>
      </div>
    </div>
  );
}
