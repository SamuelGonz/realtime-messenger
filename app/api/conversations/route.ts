import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
   try {
      const currentUser = await getCurrentUser();
      const body = await request.json();

      const { userId, isGroup, members, name } = body;

      if (!currentUser?.id || !currentUser?.email) return new NextResponse("Unauthrozed", { status: 401 });

      // Valid data is group is correct
      if (isGroup && (!members || members.length < 2 || !name))
         return new NextResponse("Invalid data", { status: 400 });

      if (isGroup) {
         const newConversation = await prisma.conversation.create({
            data: {
               name,
               isGroup,
               users: {
                  connect: [
                     ...members.map((member: { value: string }) => ({
                        id: member.value,
                     })),
                     {
                        id: currentUser.id,
                     },
                  ],
               },
            },
            include: {
               users: true,
            },
         });

         return NextResponse.json(newConversation);
      }

      // Looking for all conversations with that user
      const existingConversations = await prisma.conversation.findMany({
         where: {
            OR: [
               {
                  userIds: {
                     equals: [currentUser.id, userId],
                  },
               },
               {
                  userIds: {
                     equals: [userId, currentUser.id],
                  },
               },
            ],
         },
      });

      // Select the first one and check if there is any conversation
      const singleConversation = existingConversations[0];
      if (singleConversation) return NextResponse.json(singleConversation);

      // Create a new conversation
      const newConversation = await prisma.conversation.create({
         data: {
            users: {
               connect: [
                  {
                     id: currentUser.id,
                  },
                  {
                     id: userId,
                  },
               ],
            },
         },
         include: {
            users: true,
         },
      });
      return NextResponse.json(newConversation);
   } catch (error: any) {
      return new NextResponse("Internal Error", { status: 500 });
   }
}
