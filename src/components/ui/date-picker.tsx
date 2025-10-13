import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { format } from "date-fns";
import { useState } from "react";

export default function DatePicker({
  value,
  onChange,
}: {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] pl-3 text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          {value ? format(value, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            setOpen(false);
            onChange(date);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
