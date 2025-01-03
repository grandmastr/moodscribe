import {z} from 'zod';
import {ChatOpenAI} from '@langchain/openai';

const schema = z.object({
  mood: z.string().describe('The mood of the journal entry.'),
  subject: z.string().describe('The subject of the journal entry.'),
  color: z.string().
    describe(
      'A hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'),
  summary: z.string().describe('The summary of the entire journal entry.'),
  negative: z.boolean().
    describe('Is the journal entry negative? (i.e. sad, angry, etc.)'),
});

export const analyze = async (prompt: string) => {
  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY,
  });
  const structuredModel = model.withStructuredOutput?.(schema);
  const result = await structuredModel?.invoke(prompt);
  console.log(result, 'gig');
};
