import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function calculateDaysAgo(createdAt:Date) {
  const createdDate = new Date(createdAt);
  const today = new Date();
  
  // Her iki tarih arasındaki farkı gün cinsinden hesaplayalım
  const diffTime = Math.abs(today - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  
  return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
}
