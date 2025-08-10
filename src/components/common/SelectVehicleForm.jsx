import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Shared input styles
const inputStyle = `
  text-[12px] sm:text-[14px] xl:text-[16px] 3xl:text-[18px] leading-tight font-base1 font-semibold text-white placeholder:text-[#9f9f9f] data-[placeholder]:text-[#9f9f9f] w-full min-w-[168px] xl:min-w-[176px] 3xl:min-w-[240px] !h-[25px] sm:!h-[30px] 2xl:!h-[40px] bg-black px-0 border-0 border-b-[1px] border-white/60 rounded-none focus:outline-none focus:ring-0 focus-visible:ring-0 selection:bg-blue-800 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`
  .replace(/\s+/g, " ")
  .trim();

const transmissionOptions = [
  { value: "manual", label: "Manual" },
  { value: "automatic", label: "Automatic" },
  { value: "cvt", label: "CVT" },
];

export default function SelectVehicleForm() {
  const form = useForm({});

  const onSubmit = async (data) => {
    setIsSubmitting(true);
  };

  return (
    <Form {...form}>
      <form>
        {/* Vehicle Information */}
        <FormField
          control={form.control}
          name="transmissionType"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Transmission Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={false}
              >
                <FormControl>
                  <SelectTrigger className={inputStyle}>
                    <SelectValue placeholder="Car Model*" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border-0">
                  {transmissionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
