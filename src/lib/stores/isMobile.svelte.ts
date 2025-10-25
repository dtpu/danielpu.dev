let mobile = $state(typeof window !== 'undefined' ? window.innerWidth < 640 : false);

if (typeof window !== 'undefined') {
	const checkMobile = () => {
		mobile = window.innerWidth < 640;
	};
	checkMobile();
	window.addEventListener('resize', checkMobile);
}

export const isMobile = () => {
	return mobile;
};
