/** @format */

interface IRandomUserId {
	array: string[];
	amount: number;
}

export default function randomUserIdFormat(option: IRandomUserId): string {
    if(!option.array){
        return "no entries";
		console.log('no entries array is undefined')
    }

    if (!Array.isArray(option.array)) {
		console.warn("typeof oprion.array must be array");

		return "none";
	}

	if (option.array.length <= 0) {
		console.log("no entries lenght is 0")
		return "no entries";
	}

	let randomNumber = Math.floor(Math.random() * option.array.length);
	const value: string[] = [];
    let winners: string[];
	for (let index = 0; index < option.amount; index++) {

		const element = option.array[randomNumber];
        winners = [element]
		value.push(`<@${element}>`);
	}
	return value.join(" ");
}
