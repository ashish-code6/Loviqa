import { Injectable } from '@nestjs/common';
import { AiProfile } from './types/ai-profile.type';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
    private readonly groq: Groq;
    private readonly model = process.env.GROQ_MODEL ?? 'openai/gpt-oss-20b';

    constructor() {
        this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY, });

    }

    createProfileText(user: AiProfile) {
        return `
        Age: ${user.age ?? 'Not provided'}
        Gender: ${user.gender ?? 'Not provided'}
        Location: ${user.location ?? 'Not provided'}
        Bio: ${user.bio ?? 'Not provided'}
        Interests: ${user.interests.join(', ') || 'Not provided'}
            `.trim();
    }

    async compareProfiles(userProfileText: string, candidateProfileText: string) {

        const response = await this.groq.chat.completions.create({

            model: this.model,
            // Strict schema mode uses constrained decoding, so Groq can always
            // finish a valid response instead of rejecting an incomplete JSON object.
            response_format: {
                type: 'json_schema',
                json_schema: {
                    name: 'compatibility_analysis',
                    strict: true,
                    schema: {
                        type: 'object',
                        properties: {
                            score: { type: 'integer', minimum: 0, maximum: 100 },
                            reasons: { type: 'array', items: { type: 'string' } },
                            strengths: { type: 'array', items: { type: 'string' } },
                            concerns: { type: 'array', items: { type: 'string' } },
                        },
                        required: ['score', 'reasons', 'strengths', 'concerns'],
                        additionalProperties: false,
                    },
                },
            },
            reasoning_effort: 'low',
            max_completion_tokens: 512,
            temperature: 0.1,
            messages: [
                {
                    role: 'system',
                    content: `
                                You are a compatibility analysis assistant.

                                Give a practical compatibility score.
                                Keep each array to at most two concise phrases (six words each).
                                Score must be between 0 and 100.
                                `,
                },
                {
                    role: 'user',
                    content: `
                Compare these two profiles.

                USER:
                ${userProfileText}

                CANDIDATE:
                ${candidateProfileText}
            `,
                },
            ],
        });
        const content = response.choices[0]?.message?.content;
        if (!content) {
            throw new Error('Groq returned an empty compatibility response');
        }

        return JSON.parse(content);
    }
}
