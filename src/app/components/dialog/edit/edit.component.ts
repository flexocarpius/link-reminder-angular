import { Component, Inject, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Link } from '../../../models/link.model';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  linkUrl = new FormControl('');
  link: Link;
  tags: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditComponent>, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.link = this.data;
    this.linkUrl.setValue(this.link.link);

    if (!this.link.tags) {
      this.tags = [];
    }
    else {
      this.tags = this.link.tags;
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSave(event: Event) {
    this.snackBar.open('Changes saved.', '', {
      duration: 5000,
    });
    this.link.tags = this.tags;
    this.link.link = this.linkUrl.value;
    this.dialogRef.close(this.link);
  }
}
