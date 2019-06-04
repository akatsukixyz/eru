import { Usage } from './Usage';
import { Command } from '../Structures/Eru/Bot/Command';
import { Help } from './Help';

const toExport = [Usage, Help].map(x => new x()) as Command[];

export default toExport;

export const CommandsMap = () => {
	const categories = toExport.map(c => c.category);

	const categoriesMap: { [key: string]: Command[] } = {};

	for (const category of categories) {
		categoriesMap[category] = toExport.filter(
			c => c.category === category && !(category in categoriesMap)
		);
		toExport
			.filter(c => !categoriesMap[category].includes(c))
			.map(c => categoriesMap[category].push(c));
	}
	return categoriesMap;
};
export const current = CommandsMap();
