export interface Ability {
	id: number;
	name: string;
	description: string;
	level: number;
	child_of: Ability;
}