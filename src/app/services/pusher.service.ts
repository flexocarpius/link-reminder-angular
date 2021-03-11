import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { Subject } from 'rxjs';
import { Link } from '../models/link.model';
import { ApiService } from './api.service';
import { ConfigService } from './config.service';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private client: Pusher;
  public subscribed: boolean;
  onMessageSubject = new Subject();
  onMessageDeleteSubject = new Subject();
  messages$ = this.onMessageSubject.asObservable();
  deleteMessages$ = this.onMessageDeleteSubject.asObservable();

  constructor(private config: ConfigService, private api: ApiService) {
    this.client = new Pusher('909ff542494cf60e3c4d', {
      cluster: 'us3',
      forceTLS: true,
      authEndpoint: `${this.config.apiUrl}auth/pusher`,
    });
  }

  async sendLink(linkUrl) {
    return new Promise((resolve, reject) => {
      const link = {"id": uuid(), "link":linkUrl, "date": new Date().valueOf(), "thumbnailUrl":"", "tags":[]};
      this.onMessageSubject.next(link);
      resolve(link);
    });
    
    // const token = await this.api.getAccessToken();
    // const updatedMsg = { message: linkUrl };
    // try {
    //   const response = await fetch(`${this.config.apiUrl}messages/create`, {
    //     method: 'POST',
    //     mode: 'cors',
    //     body: JSON.stringify(updatedMsg),
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //     credentials: 'include',
    //   });

    //   // Do a POST to wake up server
    //   setTimeout(async () => {
    //     await fetch(`${this.config.apiUrl}messages/create`, {
    //       method: 'POST',
    //       mode: 'cors',
    //       body: JSON.stringify({ message: '' }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //       credentials: 'include',
    //     });
    //   }, 100);

    //   return await response.json();
    // } catch (err) {
    //   this.api.logout();
    // }
  }

  async deleteMessage(token: string, msg: Link) {
    // const updatedMsg = { ...msg };
    // try {
    //   const response = await fetch(`${this.config.apiUrl}messages/delete`, {
    //     method: 'POST',
    //     mode: 'cors',
    //     body: JSON.stringify(updatedMsg),
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${token}`,
    //     },
    //     credentials: 'include',
    //   });

    //   // Do a POST to wake up server
    //   setTimeout(async () => {
    //     await fetch(`${this.config.apiUrl}messages/create`, {
    //       method: 'POST',
    //       mode: 'cors',
    //       body: JSON.stringify({ message: '' }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`,
    //       },
    //       credentials: 'include',
    //     });
    //   }, 100);

    //   return await response.json();
    // } catch (err) {
    //   this.api.logout();
    // }
  }

  async subscribe(id?: string) {
    // let usrId = '';

    // if (id === undefined) {
    //   usrId = await this.api.getId();
    // } else {
    //   usrId = id;
    // }

    // this.subscribed = true;
    // const channel = this.client.subscribe(`private-${usrId}`);

    // channel.bind('message-event', (data) => {
    //   if (data.link !== '') {
    //     this.onMessageSubject.next(data);
    //   }
    // });

    // channel.bind('message-delete-event', (data: any) => {
    //   if (data.link !== '') {
    //     this.onMessageDeleteSubject.next(data);
    //   }
    // });

    // const token = await this.api.getAccessToken();
    // this.sendLink({ message: '' });
  }

  isSubscribed = () => true;
}
