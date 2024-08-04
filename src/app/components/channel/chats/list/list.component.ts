import {Component, OnInit} from "@angular/core";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";
import {TableModule} from "primeng/table";
import {ChatResponse} from "../../../../services/contracts/chat-response";
import {ApiService} from "../../../../services/api-service";

@Component({
    selector: 'chat-list',
    standalone: true,
    imports: [
        InputTextareaModule,
        FormsModule,
        ButtonModule,
        MessagesModule,
        TableModule,
    ],
    templateUrl: './list.component.html',
})
export class ListComponent  implements OnInit {

    chats: ChatResponse[] = []

    constructor(private api: ApiService) {

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
}
