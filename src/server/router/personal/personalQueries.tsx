import { z } from "zod";
import { createRouter } from "@/router/context";

export const personalRouter = createRouter()
.mutation("updatePersonalDetails", {
  input: z
    .object({
      name: z.string(),
      address: z.string(),
      city: z.string(),
      postal: z.string(),
      country: z.string(),
    }),
  async resolve({ ctx, input }) {
    try {
      const updatePersonalDetails = await ctx.prisma.personal.update({
        where: {
          userName: input.name,
        },
        data: {
          address: input.address,
          city: input.city,
          country: input.country,
          postal: input.postal,
        },
      });

      if (!updatePersonalDetails) {
        return {
          response: 400,
          message: 'personal Details failed to change'
        };
      }
      return {
        response: 200,
        message: 'personal details changed'
      };
    } catch (error) {
      throw new Error('something went wrong while query/mutation')
    }
  }
});