export const calculateMonthlyAverageFees = (
	formData: { [key: string]: string | boolean },
	feeFields: any[],
	setFormData: (data: any) => void,
	localStorageKey: string = "averageMonthlyFee"
): number => {
	let total = 0;
	let count = 0;

	feeFields.forEach((feeField) => {
		const isChecked =
			formData[`${feeField.id}_checkbox`] === true ||
			formData[`${feeField.id}_checkbox`] === "true";

		const amount = parseFloat(formData[feeField.id] as string);

		if (isChecked && !isNaN(amount)) {
			total += amount;
			count += 1;
		}
	});

	const totalFor10Months = total * 11;

	const finalAverage =
		count > 0 ? totalFor10Months / count : 0;

	// (Optional) Save in localStorage
	// localStorage.setItem(localStorageKey, JSON.stringify(finalAverage));

	return finalAverage;
};
