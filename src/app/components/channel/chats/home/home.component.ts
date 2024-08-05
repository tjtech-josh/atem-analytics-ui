import {Component, OnInit} from "@angular/core";
import {ApiService} from "../../../../services/api-service";
import { InputTextareaModule } from 'primeng/inputtextarea';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import { MessagesModule } from 'primeng/messages';
import {Message} from "primeng/api";
import {ChatResponse} from "../../../../services/contracts/chat-response";
import {TableModule} from "primeng/table";
import {ChatPayload} from "../../../../services/contracts/chat-payload";
import {NgIf} from "@angular/common";
import {ChatPrompt} from "../../../../services/contracts/chat-prompt";
import {DropdownModule} from "primeng/dropdown";
import {FormatterService} from "../../../../services/formatter-service";

@Component({
    selector: 'chat-home',
    standalone: true,
    imports: [
        InputTextareaModule,
        FormsModule,
        ButtonModule,
        MessagesModule,
        TableModule,
        NgIf,
        DropdownModule,
    ],
    providers: [FormatterService],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    prompts: ChatPrompt[] = []
    selectedPrompt: ChatPrompt | null = null
    messages: Message[] = []
    chatPrompt!: string | null
    chatText!: string | null
    loading: boolean = false
    chatResponse?: ChatResponse | null = null

    constructor(private api: ApiService, protected formatterService: FormatterService)  {

    }

    ngOnInit() {
        this.api.getChatsPrompts().subscribe({
            next: (data) => {
                data.map(p => {
                    p.displayName = this.formatterService.truncate(p.prompt, 150)
                })
                this.prompts = data
            },
            error: (error) => {
                this.messages = [{ severity: 'error', detail: error.message },]
            }
        })
    }

    submitChat() {
        this.loading = true
        const payload : ChatPayload = {
            prompt: this.chatPrompt ?? '',
            text: this.chatText ?? ''
        }
        this.api.postChats(payload).subscribe({
            next: (data) => {
                this.messages = [{ severity: 'success', detail: 'Chat created successfully' }]
                this.loading = false
                this.chatPrompt = ''
                this.chatText = ''
                this.chatResponse = data
            },
            error: (error) => {
                console.error(error)
                this.messages = [{ severity: 'error', detail: error.message },]
                this.loading = false
            }
        })
    }

}
