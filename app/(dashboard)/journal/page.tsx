import {getUserByClerkId} from '@/utils/auth';
import {prisma} from '@/utils/db';
import {EntryCard, NewEntryCard} from '@/components';
import Link from 'next/link';
import {analyze} from '@/utils/ai';

const getEntries = async () => {
  const user = await getUserByClerkId();

  await analyze(
    `I'm going to give you a journal entry, i want you to analyze it for a few things. I need the mood, a summary, what the subject is, and a color representing the mood. You need to respond back with formatted JSON like so: {"mood": "", "subject": "", "color": "", "negative": "", "summary": ""}. 
      entry:
      Today was a really great day. I finally was able to grab that pair of shoes I have been dying to get.
    `
  );

  return prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const JournalPage = async () => {
  const entries = await getEntries();

  return <div className={'p-10 bg-zinc-400/10 h-full'}>
    <h2 className={'text-3xl mb-8'}>Journal</h2>
    <div className={'grid grid-cols-3 gap-4'}>
      <NewEntryCard/>
      {entries.map(entry => (
        <Link href={`/journal/${entry.id}`} key={entry.id}>
          <EntryCard key={entry.id} entry={entry}/>
        </Link>
      ))}
    </div>
  </div>;
};

export default JournalPage;
