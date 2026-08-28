import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NUMBER_WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
  "Twenty",
];

/**
 * Spelled-out count for headline copy, so figures quoted in prose stay in
 * step with the content they describe. Falls back to digits past twenty.
 */
export function numberWord(count: number) {
  return NUMBER_WORDS[count] ?? String(count);
}

/** "Break Bulk Cargo" -> "break-bulk-cargo" */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/—|–/g, "-")
    .replace(/\//g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
