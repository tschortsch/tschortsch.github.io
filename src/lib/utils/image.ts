import { uniq } from 'lodash-es';

export const addWidthsForHigherDprs = (widths: number[]): number[] => {
	const widthsWithHigherDprs = widths.reduce(
		(combinedWidths: number[], width: number) => [...combinedWidths, width, width * 2],
		[],
	);
	return uniq(widthsWithHigherDprs).sort((a, b) => a - b);
};

export const getResizedGravatarImageSrcSet = (hashedEmail: string, widths: number[]): string =>
	addWidthsForHigherDprs(widths)
		.map((width) => `${getResizedGravatarImageSrc(hashedEmail, width)} ${width}w`)
		.join(', ');

export const getResizedGravatarImageSrc = (hashedEmail: string, width: number): string =>
	`${getGravatarUrl(hashedEmail)}?s=${width}`;

export const getGravatarUrl = (hasedEmail: string): string =>
	`https://www.gravatar.com/avatar/${hasedEmail}`;
