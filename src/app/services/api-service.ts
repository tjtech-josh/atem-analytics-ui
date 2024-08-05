import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ChatResponse} from "./contracts/chat-response";
import {ChatPayload} from "./contracts/chat-payload";
import {ChatPrompt} from "./contracts/chat-prompt";

@Injectable({
    providedIn: 'root',
})
export class ApiService {

    constructor(private http: HttpClient) { }

    getChat(id: string) {
        const url = environment.apiUrlChatService + '/' + id
        return this.http.get<ChatResponse>(url)
    }

    getChats() {
        const url = environment.apiUrlChatService
        return this.http.get<ChatResponse[]>(url)
    }

    getChatsPrompts() {
        const url = environment.apiUrlChatService + '/chat/prompts'
        return this.http.get<ChatPrompt[]>(url)
    }

    postChats(payload: ChatPayload) {
        const url = environment.apiUrlChatService + '/chat'
        return this.http.post<ChatResponse>(url, payload)
    }

}
