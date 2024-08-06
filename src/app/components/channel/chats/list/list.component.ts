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
import { SplitButtonModule } from 'primeng/splitbutton';
import {ConfirmationService, MenuItem} from "primeng/api";
import { TooltipModule } from 'primeng/tooltip';
import {TagModule} from "primeng/tag";
import {NgIf} from "@angular/common";
import {ConfirmDialogModule} from "primeng/confirmdialog";

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
        SplitButtonModule,
        TooltipModule,
        TagModule,
        NgIf,
        ConfirmDialogModule
    ],
    providers: [FormatterService, ConfirmationService],
    templateUrl: './list.component.html',
})
export class ListComponent  implements OnInit {

    chats: ChatResponse[] = []
    chat: ChatResponse | null = null
    showDialog: boolean = false
    menuItems: MenuItem[] = []

    constructor(private api: ApiService, protected formatterService: FormatterService, private confirmationService: ConfirmationService) {
        this.menuItems = [
            {
                label: 'Validate',
                iconClass: 'pi-check-circle',
                command: (e) => {
                    console.log(e)
                }
            },
            {
                label: 'Delete',
                command: (e) => {
                    console.log(e)
                }
            },
        ];
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

    onClickConfirmValidate(event: Event, chat: ChatResponse) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to validate this chat?',
            header: 'Confirmation Required!',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.api.patchValidateChat(chat.id).subscribe({
                    next: (data) => {
                        chat.validated = 1
                    }
                })
            },
            reject: () => {}
        });
    }

    onClickConfirmDelete(event: Event, chat: ChatResponse) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to delete this chat?',
            header: 'Confirmation Required!',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.api.deleteChat(chat.id).subscribe({
                    next: (data) => {
                        this.chats = this.chats.filter(c => c.id !== chat.id)
                    }
                })
            },
            reject: () => {}
        });
    }
}
