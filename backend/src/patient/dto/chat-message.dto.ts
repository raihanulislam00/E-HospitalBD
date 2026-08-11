export type ChatRole = 'user' | 'assistant';

export class ChatMessageDto {
	role: ChatRole;
	content: string;
}

export class ChatRequestDto {
	sessionId?: string;
	message: string;
	history?: ChatMessageDto[];
}
