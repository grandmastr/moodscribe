import {auth} from '@clerk/nextjs/server';
import {prisma} from '@/utils/db';

export const getUserByClerkId = async ({include = {}, select = {}}: {
  select?: unknown,
  include?: unknown
} = {}) => {
  const {userId} = await auth();

  const extraConfig: any = include ? { include } : { select };

  return prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    ...extraConfig,
  });
};
