import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';



@Injectable()
export class NotificationService {

    constructor(private matSnackBar: MatSnackBar) {

    }

    show(message: string) {
        this.matSnackBar.open(message, '', {
            duration: 2000
        });
    }


}
