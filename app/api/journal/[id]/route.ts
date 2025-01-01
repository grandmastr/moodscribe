import {getUserByClerkId} from '@/utils/auth';
import {prisma} from '@/utils/db';
import {NextResponse} from 'next/server';

export const PATCH = async (request: Request, {params}) => {
  const {content} = await request.json();
  const id = (await params).id;

  const user = await getUserByClerkId();
  const updateEntry = await prisma.journalEntry.update({
    where: {
      journalId: {
        userId: user.id,
        id,
      },
    },
    data: {
      content,
    },
  });

  return NextResponse.json({data: updateEntry});
};
