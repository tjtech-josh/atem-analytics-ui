import {Component, OnInit} from "@angular/core";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {TableModule} from "primeng/table";
import {ChatResponse} from "../../../../services/contracts/chat-response";
import {ApiService} from "../../../../services/api-service";
import {FormatterService} from "../../../../services/formatter-service";
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'chat-list',
    standalone: true,
    imports: [
        InputTextareaModule,
        FormsModule,
        ButtonModule,
        MessagesModule,
        TableModule,
        DialogModule,
    ],
    providers: [FormatterService],
    templateUrl: './list.component.html',
})
export class ListComponent  implements OnInit {

    chats: ChatResponse[] = []
    chat: ChatResponse | null = null
    showDialog: boolean = false

    constructor(private api: ApiService, protected formatterService: FormatterService) {

    }


    ngOnInit(): void {
        this.api.getChats().subscribe({
            next: (data) => {
                this.chats = [...data]
            },
            error: (error) => {
                console.error(error)
            }
        })
    }

    onClickView(chat: ChatResponse) {
        console.log(chat);
        this.api.getChat(chat.id).subscribe({
            next: (data) => {
                this.chat = data
                this.showDialog = true
            },
            error: (error) => {
                alert(error.detail)
            }
        })
    }
}
