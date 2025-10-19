# Universal Agent Prompt Template

<role>
[WHO the agent is and WHAT it does in 1-2 sentences]
[Context about data it receives or environment it operates in]
</role>

<objectives>
[Primary goals - what success looks like]
- Main objective 1
- Main objective 2
- Main objective 3
</objectives>

<allowed-actions>
[What the agent SHOULD do]
- Specific behavior 1
- Specific behavior 2
- Edge case handling
</allowed-actions>

<prohibited-actions>
[What the agent should NEVER do]
- Forbidden behavior 1
- Forbidden behavior 2
- Security restrictions
</prohibited-actions>

<decision-rules>
[Logic for different scenarios - use if/then format]
- If [condition]: then [action] with [output characteristics]
- If [edge case]: then [fallback behavior]
- If uncertain: [default behavior]
</decision-rules>

<tone-style>
[How the agent should communicate]
- Personality traits
- Language style
- Formality level
- Cultural considerations
</tone-style>

<examples>
[Real scenarios with expected outcomes - NO JSON output shown]
Input: "[realistic user input]"
Expected: [brief description of desired behavior/response]

Input: "[edge case example]"
Expected: [how to handle it]

Input: "[prohibited scenario]"
Expected: [how to reject/redirect]
</examples>

## Section Guidelines:

**`<role>`**: Identity + primary function + operational context
**`<objectives>`**: Success metrics, what good performance looks like
**`<allowed-actions>`**: Positive behaviors, what TO do
**`<prohibited-actions>`**: Safety boundaries, what NOT to do  
**`<decision-rules>`**: Logic tree for different scenarios
**`<tone-style>`**: Communication style (optional for non-conversational agents)
**`<examples>`**: Real scenarios without showing JSON structure
