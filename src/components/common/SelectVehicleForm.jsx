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
  text-[12px] sm:text-[14px] xl:text-[16px] 3xl:text-[18px] leading-tight font-base3 font-light text-white placeholder:text-[#9f9f9f] data-[placeholder]:font-light data-[placeholder]:font-base3 data-[placeholder]:text-white w-full min-w-[168px] xl:min-w-[176px] 3xl:min-w-[240px] !h-[25px] sm:!h-[30px] 2xl:!h-[40px] bg-black px-0 border-0 border-b-[1px] border-[#dddddd] rounded-none focus:outline-none focus:ring-0 focus-visible:ring-0 selection:bg-blue-800 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`
  .replace(/\s+/g, " ")
  .trim();

export default function SelectVehicleForm({ testimonials = [], onChange }) {
  const form = useForm({});
  const carTypes = testimonials
    ?.flatMap((t) => t.car_type || [])
    .filter((v, i, arr) => arr.findIndex((o) => o.id === v.id) === i);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="carType"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  onChange?.(val); // 👈 notify parent
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className={inputStyle}>
                    <SelectValue placeholder="Car Model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border-0 z-0">
                  {carTypes.map((option) => (
                    <SelectItem key={option.id} value={option.slug}>
                      {option.name}
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
