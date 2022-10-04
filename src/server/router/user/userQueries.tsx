import { createRouter } from "@/router/context";
import { z } from "zod";

export const userRouter = createRouter()
  .query("getUser", {
    input: z
      .object({
        name: z.string(),
      }),
    async resolve({ ctx, input }) {

      const apiCall = await ctx.prisma.user.findFirst({
        where: {
          name: input?.name,
        },
        include:{
          personal:{
            select:{
              userName: true,
              address: true,
              city: true,
              country: true,
              postal: true,
            }
          }
        },
      });

      if (apiCall) {
        return {
          response: 200,
          responseData: apiCall,
        };
      }
      return {
        response: 400,
        responseData: apiCall,
      };
    }
  })
  .mutation("AddUser", {
    input: z
      .object({
        email: z.string(),
        name: z.string(),
        image: z.string(),
      }),
    async resolve({ ctx, input }) {
      try {
        const ifUserExists = await ctx.prisma.user.findFirst({
          where: {
            name: input.name,
          }
        });
        if (!ifUserExists) {
          const addUser = await ctx.prisma.user.create({
            data: {
              name: input.name,
              email: input.email,
              image: input.image,
              personal: {
                create: {
                  address: '',
                  city: '',
                  country: '',
                  postal: '',
                }
              }
            }
          });
          if (addUser) {
            return {
              response: 200,
              message: 'User Added To DataBase'
            };
          }
        }
        return {
          response: 400,
          message: 'Existing User Found'
        };
      } catch (error) {
        throw new Error('something went wrong while query/mutation')
      }
    }
  });
 