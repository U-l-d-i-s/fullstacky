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
            };
          }
        }
        return {
          response: 400,
        };
      } catch (error) {
        throw new Error('something went wrong while query/mutation')
      }
    }
  })
  .mutation("AddPersonalDetails", {
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
        const addUserPersonalData = await ctx.prisma.personal.update({
          where: {
            userName: input.name,
          },
          data: {
            userName: input.name,
            address: input.address,
            city: input.city,
            country: input.country,
            postal: input.postal,
          },
        });

        if (!addUserPersonalData) {
          return {
            response: 400,
            data: addUserPersonalData,
            message: 'personal Details failed to change'
          };
        }
        return {
          response: 200,
          data: addUserPersonalData,
          message: 'personal details changed'
        };
      } catch (error) {
        throw new Error('something went wrong while query/mutation')
      }
    }
  })