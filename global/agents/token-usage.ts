type UsageMap = Record<
  string,
  {
    inputTokens: number
    outputTokens: number
    totalTokens: number
  }
>

export class TokenUsageTracker {
  private usageBySource: UsageMap = {}
  private totalCost = 0

  addUsage(
    source: string,
    inputTokens: number,
    outputTokens: number,
    inputCostPerToken: number,
    outputCostPerToken: number
  ) {
    if (!inputTokens && !outputTokens) return
    const prev = this.usageBySource[source] || {
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
    }
    const newInput = (prev.inputTokens || 0) + (inputTokens || 0)
    const newOutput = (prev.outputTokens || 0) + (outputTokens || 0)
    this.usageBySource[source] = {
      inputTokens: newInput,
      outputTokens: newOutput,
      totalTokens: newInput + newOutput,
    }

    this.totalCost +=
      inputTokens * inputCostPerToken + outputTokens * outputCostPerToken
  }

  getAndResetUsage(): {
    perSource: UsageMap
    total: {
      inputTokens: number
      outputTokens: number
      totalTokens: number
      price: number
    }
  } {
    const perSource: UsageMap = { ...this.usageBySource }
    const aggregate = Object.values(perSource).reduce(
      (acc, { inputTokens, outputTokens, totalTokens }) => ({
        inputTokens: acc.inputTokens + inputTokens,
        outputTokens: acc.outputTokens + outputTokens,
        totalTokens: acc.totalTokens + totalTokens,
      }),
      { inputTokens: 0, outputTokens: 0, totalTokens: 0 }
    )

    const price = this.totalCost

    this.usageBySource = {}
    this.totalCost = 0

    return {
      perSource,
      total: {
        ...aggregate,
        price,
      },
    }
  }
}

export const tokenUsage = new TokenUsageTracker()
