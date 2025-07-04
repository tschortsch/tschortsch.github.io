import { type ClassValue, clsx } from 'clsx';
import { differenceInYears } from 'date-fns/fp';
import { twMerge } from 'tailwind-merge';

export const getAge = (birthday: Date) => differenceInYears(birthday, Date.now());

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
