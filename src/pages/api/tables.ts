// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await prisma.user;
  res.status(200).json(response);
};
const personal = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await prisma.personal;
  res.status(200).json(response);
};

export default {
  users,
  personal,
};