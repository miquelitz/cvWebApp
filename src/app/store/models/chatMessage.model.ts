export interface ChatMessage {
	type: string;
	from: string;
	message: string;
	newDate?: string;
}