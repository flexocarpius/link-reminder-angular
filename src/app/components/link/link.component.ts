import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { Link } from '../../models/link.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css'],
})
export class LinkComponent implements OnInit {
  @Input()
  link: Link;

  @Output()
  removed: EventEmitter<Link>;

  isHovered: boolean;

  constructor(private linkService: LinkService) {
    this.removed = new EventEmitter();
  }

  ngOnInit(): void {
    
  }

  onClicked(event: Event) {
    this.linkService.openLink(this.link);
  }

  onMouseEnter(event: Event) {
    this.isHovered = true;
  }

  onMouseLeave(event: Event) {
    this.isHovered = false;
  }

  onEdit(event: Event) {
    this.linkService.editLink(this.link);
  }

  async onRemove(event: Event) {
    await this.linkService.removeLink(this.link);
    
    this.removed.emit(this.link);
  }
}
