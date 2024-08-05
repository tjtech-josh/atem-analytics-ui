export interface ChatPrompt {
    id: string,
    prompt: string,
    inputText?: string,
    responseText?: string,
    createdAt: Date,
    createdById: string
    createdByName: string,
    displayName: string,
}
