import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../components/dialog/edit/edit.component';
import { Link } from '../models/link.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  @Output()
  linkClick: EventEmitter<Link> = new EventEmitter();

  constructor(public dialog: MatDialog, public api: ApiService) {}

  openLink(link: Link) {
    window.open(link.link, '_blank');
  }

  editLink(link: Link) {
    const dialogRef = this.dialog.open(EditComponent, { data: link });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.api.update(link);
      }
    });
  }

  async removeLink(link: Link) {
    await this.api.remove(link);
  }
}
