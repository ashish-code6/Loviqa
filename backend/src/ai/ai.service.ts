import { Injectable } from '@nestjs/common';
import { AiProfile } from './types/ai-profile.type';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {


    private readonly groq: Groq;
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

            model: 'llama-3.1-8b-instant',
            response_format: {type: 'json_object'},
            messages: [
                {
                    role: 'system',
                    content: `
                                You are a compatibility analysis assistant.

                                Return ONLY valid JSON.

                                The JSON must have exactly these fields:
                                {
                                "score": number,
                                "reasons": string[],
                                "strengths": string[],
                                "concerns": string[]
                                }

                                Score must be between 0 and 100.
                                Do not return markdown.
                                Do not return any explanation outside JSON.
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
        console.log(response.choices[0]?.message?.content);

        const aiResult = JSON.parse(response.choices[0]?.message?.content ?? '{}');
        // return {
        //     userProfileText,
        //     candidateProfileText,
        // };

        return aiResult;
    }
}
