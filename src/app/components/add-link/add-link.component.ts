import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PusherService } from '../../services/pusher.service';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.css'],
})
export class AddLinkComponent implements OnInit {
  @ViewChild('linkInput') linkInput: ElementRef;
  link: string;

  constructor(private pusher: PusherService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  linkUpdate(link: string) {
    this.link = link;
  }

  async onLinkAdd(event: Event) {
    await this.pusher.sendLink(this.link);
    this.linkInput.nativeElement.value = '';
    this.snackBar.open('Link created.', '', {
      duration: 5000,
    });
  }
}
