import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Link } from '../../models/link.model';
import { PusherService } from '../../services/pusher.service';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RecentComponent implements OnInit, OnDestroy {
  sub: Subscription;

  links: Link[] = new Array();

  constructor(private pusher: PusherService) {}

  ngOnInit(): void {
    this.pusher.subscribe();
    this.sub = this.pusher.messages$.subscribe((link: Link) => {
      this.links = [link].concat(this.links);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
