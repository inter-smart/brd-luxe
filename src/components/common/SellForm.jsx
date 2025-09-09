"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StyledButton } from "../utils/Button";
import { Button } from "../ui/button";

// Form validation schema
const sellFormSchema = z.object({
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


  registeredCity: z
    .string()
    .min(2, "Registered City must be at least 2 characters")
    .max(50, "Registered City cannot exceed 50 characters")
    .refine((value) => /^[\p{L}\s'-]+$/u.test(value.trim()), "Invalid city name"),
  brandName: z
    .string()
    .min(1, "Brand Name is required")
    .max(50, "Brand Name cannot exceed 50 characters")
    .refine((value) => /^[\p{L}\d\s'-]+$/u.test(value.trim()), "Invalid brand name"),
  modelName: z
    .string()
    .min(1, "Model Name is required")
    .max(50, "Model Name cannot exceed 50 characters")
    .refine((value) => /^[\p{L}\d\s'-]+$/u.test(value.trim()), "Invalid model name"),
  transmissionType: z.string().min(1, "Please select transmission type"),
  color: z
    .string()
    .min(3, "Color must be at least 3 characters")
    .max(30, "Color cannot exceed 30 characters")
    .refine((value) => /^[\p{L}\s'-]+$/u.test(value.trim()), "Invalid color name"),
  fuelType: z.string().min(1, "Please select fuel type"),
  engineCC: z.coerce.number().positive("Engine CC must be positive"),
  yearOfRegistration: z.coerce
    .number()
    .min(1900, "Year must be after 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  price: z.coerce.number().positive("Price must be positive"),
  location: z
    .string()
    .min(2, "Location is required")
    .max(100, "Location cannot exceed 100 characters")
    .refine((value) => /^[\p{L}\s',.-]+$/u.test(value.trim()), "Invalid location"),
  additionalDetails: z
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

  images: z.any().optional(),
  insuranceValidity: z.date({
    required_error: "Insurance validity date is required",
  }),
});


// Shared input styles
const inputStyle = `
  text-[12px] sm:text-[14px] xl:text-[16px] 3xl:text-[18px] leading-tight font-base1 font-semibold text-white placeholder:text-white data-[placeholder]:text-white w-full !h-[35px] sm:!h-[40px] 2xl:!h-[45px] bg-black px-[15px] sm:px-[15px] 2xl:px-[20px] border-[1px] border-white/60 rounded-[10px] focus:outline-none focus:ring-0 focus-visible:ring-2 selection:bg-blue-800 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-non`
  .replace(/\s+/g, " ")
  .trim();

const textareaStyle = `
  ${inputStyle} h-auto min-h-[80px] sm:min-h-[100px] xl:min-h-[140px]
  resize-none
`
  .replace(/\s+/g, " ")
  .trim();

export default function SellForm() {
  const [transmissionOptions, setTransmissionOptions] = useState([]);
  const [fuelTypeOptions, setFuelTypeOptions] = useState([]);

  useEffect(() => {
    async function fetchTaxonomies() {
      try {
        const [transRes, fuelRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/transmissions`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/wp-json/wp/v2/fuel-type`
          ),
        ]);

        if (!transRes.ok || !fuelRes.ok) {
          throw new Error("Failed to fetch taxonomies");
        }

        const [transData, fuelData] = await Promise.all([
          transRes.json(),
          fuelRes.json(),
        ]);

        setTransmissionOptions(
          transData.map((item) => ({ value: item.slug, label: item.name }))
        );
        setFuelTypeOptions(
          fuelData.map((item) => ({ value: item.slug, label: item.name }))
        );
      } catch (error) {
        console.error("Error fetching taxonomies:", error);
      }
    }

    fetchTaxonomies();
  }, []);

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

  return value
    // Convert literal "\n" into actual newline (if typed as text)
    .replace(/\\n/g, "\n")
    // Convert literal "\t" into 4 spaces (if typed as text)
    .replace(/\\t/g, "    ")
    // Convert actual tabs to 4 spaces
    .replace(/\t+/g, "    ")
    // Normalize CRLF or \r to \n
    .replace(/\r\n|\r/g, "\n")
    // Collapse multiple spaces (but not newlines!)
    .replace(/ {2,}/g, " ")
    // Trim only spaces at start/end, keep newlines
    .replace(/^[ \t]+|[ \t]+$/gm, "");
};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(sellFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      registeredCity: "",
      brandName: "",
      modelName: "",
      transmissionType: "",
      color: "",
      fuelType: "",
      engineCC: "",
      yearOfRegistration: "",
      price: "",
      location: "",
      additionalDetails: "",
    },
  });

  const handleFileChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files && files.length > 0 ? files : null);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Append all form fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (value instanceof Date) {
            // format dates properly
            const localDate = value.toLocaleDateString("en-CA"); // YYYY-MM-DD
            formData.append(key, localDate);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      // Append files if selected
      if (selectedFiles) {
        Array.from(selectedFiles).forEach((file, index) => {
          formData.append(`images[]`, file);
        });
      }

      // 🔥 Post to WordPress REST endpoint
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/wp-json/brd/v1/sell-form`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result?.message || "Submission failed");
        throw new Error(result?.message || "Submission failed");
      }

      toast.success(result.message || "Form submitted successfully!");

      // TODO: Replace with your API endpoint
      console.log("Form data:", data);
      console.log("Files:", selectedFiles);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset form on success
      form.reset();
      setSelectedFiles(null);
    } catch (error) {
      console.error("Submission error:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFileDisplayText = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return "Images*";
    }
    return selectedFiles.length === 1
      ? selectedFiles[0].name
      : `${selectedFiles.length} files selected`;
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
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Full Name</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Full Name*"
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
          name="email"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  type="email"
                  placeholder="Email"
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

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
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
          name="registeredCity"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Registered City</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Registered City*"
                  disabled={isSubmitting}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlurTrim("registeredCity");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Vehicle Information */}
        <FormField
          control={form.control}
          name="brandName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Brand Name</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Brand Name*"
                  disabled={isSubmitting}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlurTrim("brandName");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="modelName"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Model Name</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Model Name*"
                  disabled={isSubmitting}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlurTrim("modelName");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transmissionType"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Transmission*</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className={inputStyle}>
                    <SelectValue placeholder="Transmission *" />
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

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Color</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Color*"
                  disabled={isSubmitting}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlurTrim("color");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fuelType"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Fuel Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger className={inputStyle}>
                    <SelectValue placeholder="Fuel Type*" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border-0">
                  {fuelTypeOptions.map((option) => (
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

        <FormField
          control={form.control}
          name="engineCC"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Engine CC</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  type="number"
                  placeholder="Engine CC*"
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
          name="insuranceValidity"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className={"sr-only"}>Insurance Validity *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        inputStyle,
                        !field.value && "text-white",
                        "hover:bg-transparent hover:text-[#9f9f9f] !px-[15px] sm:!px-[15px] 2xl:!px-[20px]"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Insurance Validity *</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-100" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    // disabled={(date) =>
                    //   date > new Date() || date < new Date("1900-01-01")
                    // }
                    captionLayout="dropdown"
                    buttonVariant=""
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearOfRegistration"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Year of Registration</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Year of Registration"
                  disabled={isSubmitting}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlurTrim("yearOfRegistration");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="yearOfRegistration"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/4">
              <FormLabel className="sr-only">Year of Registration</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  type="number"
                  placeholder="Year of Registration*"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Pricing and Location */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/3">
              <FormLabel className="sr-only">Price</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  type="number"
                  placeholder="Price*"
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
          name="location"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/3">
              <FormLabel className="sr-only">Location</FormLabel>
              <FormControl>
                <Input
                  className={inputStyle}
                  placeholder="Location*"
                  disabled={isSubmitting}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    handleBlurTrim("location");
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="w-full sm:w-1/2 xl:w-1/3">
              <FormLabel className="sr-only">Images</FormLabel>
              <FormControl>
                <div
                  className={`${inputStyle} flex items-center justify-between cursor-pointer`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                  />
                  <span
                    className={`flex-1 truncate ${selectedFiles && selectedFiles.length > 0
                      ? "text-white"
                      : "text-white"
                      }`}
                  >
                    {getFileDisplayText()}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                    className="text-[10px] xl:text-xs 3xl:text-sm font-semibold 
                             px-3 py-1 bg-[#242424] text-white rounded-full
                             hover:bg-gray-700 transition-colors duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Choose Files
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Details */}
        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Additional Details</FormLabel>
              <FormControl>
                <Textarea
                  className={textareaStyle}
                  placeholder="Additional Details"
                  disabled={isSubmitting}
                  {...field}
                  onBlur={(e) => {
                    field.onBlur(); // trigger RHF blur first

                    
                    // Normalize multiple spaces/tabs/newlines to single space
                    const normalized = normalizeText(field.value);
                    form.setValue("additionalDetails", normalized);
                    form.trigger("additionalDetails"); // re-validate

                    // Optional: trim spaces/tabs/newlines
                    handleBlurTrim("additionalDetails");

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
            className="min-w-[120px] sm:min-w-[100px] xl:min-w-[120px] 2xl:min-w-[130px] cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </StyledButton>
        </div>
      </form>
    </Form>
  );
}
