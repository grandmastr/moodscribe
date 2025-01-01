import {Editor} from '@/components';
import {getUserByClerkId} from '@/utils/auth';
import {prisma} from '@/utils/db';

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();

  return prisma.journalEntry.findUnique({
    where: {
      journalId: {
        userId: user.id,
        id,
      },
    },
  });
};

const EntryPage = async ({params}) => {
  const {id} = await params;
  const entry = await getEntry(id);

  return <div className={'h-full'}>
    <Editor entry={entry}/>
  </div>;
};

export default EntryPage;
