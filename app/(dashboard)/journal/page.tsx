import {getUserByClerkId} from '@/utils/auth';
import {prisma} from '@/utils/db';
import {EntryCard, NewEntryCard} from '@/components';
import Link from 'next/link';

const getEntries = async () => {
  const user = await getUserByClerkId();
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