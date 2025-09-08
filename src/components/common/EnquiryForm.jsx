"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

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
  .max(50, "Full name cannot exceed 50 characters")
  .refine((value) => {
    const trimmed = value.trim();
    if (!trimmed) return false;
    if (/[\t\n]/.test(trimmed)) return false;
    if (/\d/.test(trimmed)) return false;
    if (/<script[\s\S]*?>[\s\S]*?<\/script>/i.test(trimmed)) return false;
    if (/<img[\s\S]*?>/i.test(trimmed)) return false;
    if (/javascript:/i.test(trimmed)) return false;
    const sqlPattern = /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|TRUNCATE|EXEC|UNION)\b/i;
    if (sqlPattern.test(trimmed)) return false;
    if (!/^[^\d!@#$%^&*()_+=\[\]{};:"\\|,.<>\/?`~]+$/u.test(trimmed)) return false;
    return true;
  }, "Invalid full name"),
  email: z
  .string()
  .min(5, "Email is required")
  .max(254, "Email is too long") // max length per RFC
  .refine((value) => {
    const trimmed = value.trim();

    // Basic email regex: allows +, subdomains, long domains, simple TLD
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

    if (!trimmed) return false; // empty
    if (!emailRegex.test(trimmed)) return false; // invalid structure
    if (/<script[\s\S]*?>[\s\S]*?<\/script>/i.test(trimmed)) return false; // XSS
    if (/["'`;]|--/.test(trimmed)) return false; // basic SQL injection chars
    if ((trimmed.match(/@/g) || []).length !== 1) return false; // multiple @
    return true;
  }, "Invalid email address"),  
  phone: z
  .string()
  .min(10, "Phone number is required")
  .max(20, "Phone number is too long") // max length including formatting
  .refine((value) => {
    const trimmed = value.trim();

    // Only allow digits, spaces, parentheses, dashes, optional single + at start
    const validPattern = /^\+?\d[\d\s()-]{7,19}$/;
    if (!validPattern.test(trimmed)) return false;

    // Must not contain multiple +
    if ((trimmed.match(/\+/g) || []).length > 1) return false;

    // Must not be all zeros
    const digitsOnly = trimmed.replace(/\D/g, "");
    if (/^0+$/.test(digitsOnly)) return false;

    // Limit digits only to 15
    if (digitsOnly.length > 15) return false;

    // Must not contain letters or XSS/SQL patterns
    if (/[a-zA-Z<>"'`;]|--|\)\s*;/.test(trimmed)) return false;

    return true;
  }, "Invalid phone number, max 15 digits allowed"),
  message: z
  .string()
  .optional()
  .refine((value) => {
    if (!value) return true; // optional field can be empty

    const trimmed = value.replace(/\s+/g, " ").trim(); // normalize whitespace

    // Reject if too short meaningful content
    if (trimmed.length < 2) return false;

    // Reject obvious scripts, HTML tags, or SQL injections
    const forbiddenPatterns = [
      /<script[\s\S]*?>[\s\S]*?<\/script>/i,
      /<img[\s\S]*?>/i,
      /<iframe[\s\S]*?>/i,
      /{{.*?constructor.*?}}/i,
      /['";]?\s*DROP\s+TABLE/i,
      /javascript:/i,
      /[@#!$%^&*()]/ // only symbols not part of meaningful text
    ];

    for (const pattern of forbiddenPatterns) {
      if (pattern.test(trimmed)) return false;
    }

    // Reject if input is all non-alphabetic (like only symbols or numbers)
    if (!/[a-zA-Z0-9]/.test(trimmed)) return false;

    // Reject if input is extremely long (example: > 2000 chars)
    if (trimmed.length > 2000) return false;

    return true;
  }, "Please enter a valid message"),
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

  // const onSubmit = async (data) => {
  //   setIsSubmitting(true);

  //   try {
  //     // Create FormData for file upload
  //     const formData = new FormData();

  //     // TODO: Replace with your API endpoint
  //     console.log("Form data:", data);

  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     // Reset form on success
  //     form.reset();
  //   } catch (error) {
  //     console.error("Submission error:", error);
  //     // Handle error (show toast, etc.)
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Trim spaces on blur and trigger validation
const handleBlurTrim = (fieldName) => {
  const value = form.getValues(fieldName);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed !== value) {
      // Update value in form
      form.setValue(fieldName, trimmed, { shouldValidate: true, shouldDirty: true });
    } else {
      // still trigger validation if value didn't change
      form.trigger(fieldName);
    }
  } else {
    form.trigger(fieldName);
  }
};

// Function to normalize input
const normalizeText = (value) => {
  if (!value) return "";
  // Replace multiple spaces, tabs, and newlines with a single space
  return value.replace(/[\s\t\n\r]+/g, " ").trim();
};

const onSubmit = async (data) => {
  setIsSubmitting(true);

  try {
    // Map `fullName` to `name` so backend matches
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/enquiry`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (result.success) {
        toast.success("Enquiry submitted successfully!");
        form.reset();
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("⚠️ Failed to submit enquiry. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }

};




  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} noValidate
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
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlurTrim("fullName");
                  }}
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
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlurTrim("phone");
                  }}
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
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlurTrim("email");
                  }}
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
                  onBlur={(e) => {
                    field.onBlur(); // trigger RHF blur first

                    // Optional: trim spaces/tabs/newlines
                    handleBlurTrim("message");

                    // Normalize multiple spaces/tabs/newlines to single space
                    const normalized = normalizeText(field.value);
                    form.setValue("message", normalized);
                    form.trigger("message"); // re-validate
                  }}
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
