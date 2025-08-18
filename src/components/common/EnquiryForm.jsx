"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StyledButton } from "../utils/Button";

// Form validation schema
const enquiryFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\+?[\d\s-()]+$/, "Invalid phone number")
    .min(10),
  message: z.string().optional(),
});

// Shared input styles
const inputStyle = `
  text-[12px] sm:text-[14px] xl:text-[16px] 3xl:text-[18px] leading-tight font-base1 font-semibold text-white placeholder:text-white data-[placeholder]:text-[#9f9f9f] w-full !h-[35px] sm:!h-[40px] 2xl:!h-[45px] bg-black px-[15px] sm:px-[15px] 2xl:px-[20px] border-[1px] border-white/60 rounded-[10px] focus:outline-none focus:ring-0 focus-visible:ring-2 selection:bg-blue-800 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-non`
  .replace(/\s+/g, " ")
  .trim();

const textareaStyle = `
  ${inputStyle} h-auto min-h-[80px] sm:min-h-[100px] xl:min-h-[140px]
  resize-none
`
  .replace(/\s+/g, " ")
  .trim();

export default function EnquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // TODO: Replace with your API endpoint
      console.log("Form data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form on success
      form.reset();
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-wrap items-start -mx-[6px] sm:-mx-[8px] xl:-mx-[8px] 2xl:-mx-[10px] [&>*]:p-[6px] sm:[&>*]:p-[8px] xl:[&>*]:p-[10px_8px] 2xl:[&>*]:p-[15px_10px]"
      >
        {/* Personal Information */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 lg:w-1/3">
              <FormLabel className="sr-only">Your Name</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Your Name*"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 lg:w-1/3">
              <FormLabel className="sr-only">Phone</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  type="tel"
                  placeholder="Phone*"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 lg:w-1/3">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  type="email"
                  placeholder="Email*"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Details */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Message</FormLabel>
              <FormControl>
                <Textarea
                  className={textareaStyle}
                  placeholder="Message"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <StyledButton
            variant="fill"
            size="button1"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </StyledButton>
        </div>
      </form>
    </Form>
  );
}
