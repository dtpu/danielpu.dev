export type Theme = [number, number, number][];

// themeName: [primary, secondary, background]
export const themes: { [key: string]: Theme } = {
	graphite: [
		[45, 55, 72],
		[176, 190, 210],
		[255, 255, 255]
	],
	synthwave: [
		[255, 20, 147],
		[255, 140, 0],
		[15, 15, 20]
	],
	ocean: [
		[0, 230, 200],
		[30, 144, 255],
		[10, 35, 65]
	],
	matcha: [
		[136, 176, 75],
		[80, 130, 60],
		[240, 240, 234]
	]
};

export const filterSettings: { [key: string]: string } = {
	graphite: '',
	synthwave: 'sepia(1) brightness(0.8) saturate(1.4) contrast(1.6) hue-rotate(-80deg)',
	ocean: 'sepia(1) brightness(0.7) saturate(1.7) contrast(1.6) hue-rotate(-180deg)',
	matcha: 'sepia(0.9) brightness(1) saturate(1.3) contrast(1.2) hue-rotate(50deg)'
};
