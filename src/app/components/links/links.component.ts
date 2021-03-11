import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Link } from '../../models/link.model';
import { Pagination } from 'src/app/models/pagination.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LinksComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewport: CdkVirtualScrollViewport;

  @Input()
  links: Link[] = new Array();

  requested: boolean = false;
  currentPage: number = 0;
  totalLinks: number = 0;

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getLinks();
  }

  async getLinks() {
    const pagination = await this.api.links(this.currentPage + 1);

    this.requested = true;

    if (pagination) {
      this.links = pagination.docs;
      this.currentPage += 1;
      this.totalLinks = pagination.total;
    }
  }

  onLinkRemoved(link: Link) {
    this.snackBar.open('Link removed.', '', {
      duration: 5000
    });
    this.links = this.links.filter(l => l.id !== link.id);
  }
}
