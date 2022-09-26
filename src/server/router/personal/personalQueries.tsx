import { z } from "zod";
import { createRouter } from "@/router/context";

export const personalRouter = createRouter()
.query("getPersonalByUserId", {
  input: z
    .object({
      userId: z.number(),
    })
    .nullish(),
  async resolve({ input, ctx }) {

    const apiCall = await ctx.prisma.personal.findFirst({
      where:{
        id:{
          equals: input?.userId
        }
      }
    });

    return {
      wtf: apiCall,
    };
  },
});