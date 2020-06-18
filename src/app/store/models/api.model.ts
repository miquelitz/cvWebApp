export interface Cv {
	title: string;
    name   : string;
    surname : string;
    address  : string;
	location: string;
	birthDate: number;
	telf: string;
	email: string;

	cvAbilities: Ability[];
	experiences: any[];
}

export interface Ability {
	id: number;
	name: string;
	description: string;
	level: number;
	child_of: Ability;
}

export interface Skills {
	id: number;
	name: string;
	description: string;
	level: number;
	child_of: Ability;
}