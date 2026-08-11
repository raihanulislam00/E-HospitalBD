import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ChatMessageDto, ChatRequestDto } from './dto/chat-message.dto';

type GeminiContentPart = { text: string };
type GeminiContent = {
	role: 'user' | 'model';
	parts: GeminiContentPart[];
};

type GeminiResponse = {
	candidates?: Array<{
		content?: {
			parts?: Array<{
				text?: string;
			}>;
		};
	}>;
};

const systemInstruction = `
You are a helpful and friendly healthcare assistant.

Rules:
- Provide general health information in simple English.
- Do not claim to diagnose.
- Encourage seeing a real doctor for severe, persistent, or worsening symptoms.
- If emergency symptoms are mentioned, urge immediate medical attention.
- Keep responses warm, concise, and practical.
`.trim();

@Injectable()
export class AiChatService {
	private readonly apiKey = process.env.GEMINI_API_KEY ?? '';
	private readonly model = process.env.GEMINI_MODEL ?? 'gemini-2.5-flash';
	private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
	private readonly sessions = new Map<string, ChatMessageDto[]>();

	async reply(request: ChatRequestDto) {
		const message = this.requireString(request.message, 'message');
		const sessionId = this.requireString(request.sessionId ?? 'default', 'sessionId');
		const history = request.history ?? this.sessions.get(sessionId) ?? [];

		if (!this.apiKey) {
			throw new InternalServerErrorException('GEMINI_API_KEY is not configured');
		}

		const payload = {
			systemInstruction: {
				parts: [{ text: systemInstruction }],
			},
			contents: [
				...history.slice(-10).map((item) => ({
					role: item.role === 'assistant' ? 'model' : 'user',
					parts: [{ text: item.content }],
				})),
				{
					role: 'user',
					parts: [{ text: message }],
				},
			] as GeminiContent[],
			generationConfig: {
				temperature: 0.7,
				maxOutputTokens: 512,
			},
		};

		const response = await fetch(
			`${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			},
		);

		if (!response.ok) {
			const details = await response.text();
			throw new InternalServerErrorException(
				`Gemini request failed (${response.status}): ${details.slice(0, 250)}`,
			);
		}

		const result = (await response.json()) as GeminiResponse;
		const answer =
			result.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('').trim() ||
			'Sorry, I could not generate a response right now.';

		const nextHistory: ChatMessageDto[] = [
			...history,
			{ role: 'user', content: message },
			{ role: 'assistant', content: answer },
		];
		this.sessions.set(sessionId, nextHistory.slice(-20));

		return {
			sessionId,
			reply: answer,
			history: nextHistory.slice(-20),
			disclaimer:
				'This response is for general information only and is not a substitute for professional medical advice.',
		};
	}

	clear(sessionId: string) {
		this.sessions.delete(this.requireString(sessionId, 'sessionId'));
		return { sessionId, cleared: true };
	}

	private requireString(value: string, fieldName: string): string {
		if (typeof value !== 'string' || value.trim() === '') {
			throw new BadRequestException(`${fieldName} is required`);
		}

		return value.trim();
	}
}
