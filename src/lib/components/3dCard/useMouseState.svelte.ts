export function useMouseState() {
	let isMouseEntered = $state(false);

	function setMouseEntered(value: boolean) {
		isMouseEntered = value;
	}

	return {
		get isMouseEntered() {
			return isMouseEntered;
		},
		setMouseEntered
	};
}
