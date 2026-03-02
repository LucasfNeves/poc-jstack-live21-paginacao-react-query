import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateElipsisPagination(
  currentPage: number,
  totalPages: number,
  surroundingPages: number = 2,
): (number | string)[] {
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    const isFirstPage = i === 1;
    const isLastPage = i === totalPages;
    const isWithinLowerBound = i >= currentPage - surroundingPages;
    const isWithinUpperBound = i <= currentPage + surroundingPages;
    const isEllipsis =
      i === currentPage - surroundingPages - 1 ||
      i === currentPage + surroundingPages + 1;

    if (isEllipsis && !isFirstPage && !isLastPage) {
      pages.push("...");
      continue;
    }

    if (
      isFirstPage ||
      isLastPage ||
      (isWithinLowerBound && isWithinUpperBound)
    ) {
      pages.push(i);
    }
  }

  return pages;
}
