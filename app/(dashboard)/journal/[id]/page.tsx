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
  const analysisData = [
    {name: 'Summary', value: ''},
    {name: 'Subject', value: ''},
    {name: 'Mood', value: ''},
    {name: 'Negative', value: 'False'},
  ];

  return <div
    className={'h-full w-full grid grid-cols-3 divide-x divide-black/10'}>
    <div className={'col-span-2'}>
      <Editor entry={entry}/>
    </div>
    <div>
      <div className={'bg-[orange] px-6 py-10'}>
        analysis
      </div>
      <ul>
        {analysisData.map((data) => (
          <li
            className={'px-2 py-4 flex items-center justify-between border-t border-b border-black/10'}
            key={data.name}>
            <span className={'text-lg font-semibold'}>{data.name}</span>
            <span>{data.value}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>;
};

export default EntryPage;
