"use server";

import BaristaAgent from "@/global/agents/barista-agent/barista-agent";

export const generateBaristaReply = async (query: string) => {
  const agent = new BaristaAgent();

  const reply = await agent.runGenerateText(query);
  return reply;
};
