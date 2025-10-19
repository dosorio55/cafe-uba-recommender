"use server";

import MainAgent from "@/global/agents/main-agent";

class BaristaAgent extends MainAgent {
  async loadInstructions() {
    if (this.instructions) return this.instructions;
    return super.loadInstructions("barista-agent.instructions.md");
  }

  async runGenerateText(prompt: string) {
    return await super.runGenerateText(prompt, await this.loadInstructions());
  }
}

export default BaristaAgent;
