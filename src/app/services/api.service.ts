import { Injectable } from '@angular/core';
import { Link } from '../models/link.model';
import { Pagination } from '../models/pagination.model';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private commonProps = {
    method: 'POST',
    crossDomain: true,
    mode: 'cors' as RequestMode,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  private authCommonProps(token) {
    return {
      ...this.commonProps,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include' as RequestCredentials,
    };
  }

  constructor(private config: ConfigService) {}

  async login(email: string, password: string) {
    return fetch(`${this.config.apiUrl}auth/login`, {
      ...this.commonProps,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => response.json())
    .catch(err => {
      throw new Error(err);
    });
  }

  async register(email: string, password: string) {
    return fetch(`${this.config.apiUrl}auth/register`, {
      ...this.commonProps,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => response.json());
  }

  async links(page: number, token?: string): Promise<Pagination> {
    // let retrievedToken;

    // if (token === undefined) {
    //   retrievedToken = await this.getToken();
    // } else {
    //   retrievedToken = token;
    // }

    // return fetch(`${this.config.apiUrl}links/all`, {
    //   ...this.authCommonProps(retrievedToken),
    //   body: JSON.stringify({
    //     page,
    //   }),
    // }).then((response) => response.json());
    return new Promise((resolve, reject) => {
      resolve({"docs":[{"link":"https://www.digitalocean.com/","date":1610920691063,"thumbnailUrl":"","tags":[],"id":"d0bf9df8-a67d-489b-a8dd-5000942bd906"},{"link":"https://aws.amazon.com/","date":1610920603186,"thumbnailUrl":"","tags":["Web Services"],"id":"e6599bd4-85f0-40c0-aa08-b9609cdb18b9"},{"link":"https://ubuntu.com/","date":1610920561980,"thumbnailUrl":"","tags":["Linux"],"id":"92d12f36-55ca-4293-8da5-496a3785e946"},{"link":"https://www.mongodb.com/","date":1610920461912,"thumbnailUrl":"","tags":["Databases"],"id":"18d3ca4f-a011-4ca1-9ff3-1a5583bb8f0e"},{"link":"https://www.postgresql.org/","date":1610920443415,"thumbnailUrl":"","tags":["Databases"],"id":"a9e3671c-9d44-4b84-aaeb-47972c3e870c"},{"link":"https://www.figma.com/","date":1610920430687,"thumbnailUrl":"","tags":["Design"],"id":"39bb921f-284f-4f55-ac17-798efccd20c9"},{"link":"https://unsplash.com/s/photos/dashboard-data","date":1610920405637,"thumbnailUrl":"","tags":["Photos"],"id":"e5382e28-5b45-49a0-a965-440fe5bd24ed"},{"link":"https://angular.io/","date":1610920386564,"thumbnailUrl":"","tags":["FrontEnd"],"id":"2f9ff3e7-8ba7-440c-bead-ac3eb58e9e7c"},{"link":"https://www.mapbox.com/","date":1610920373245,"thumbnailUrl":"","tags":["Services"],"id":"c72ac13c-ba35-4ae4-86f5-d81f0a8691b2"}],"total":9,"limit":30,"page":1,"pages":1});
    });
  }

  async update(link: Link) {
    // const token = await this.getToken();

    // return fetch(`${this.config.apiUrl}links/update`, {
    //   ...this.authCommonProps(token),
    //   body: JSON.stringify({
    //     ...link,
    //   }),
    // }).then((response) => response.json());
    return new Promise((resolve, reject) => {
      resolve(link);
    });
  }

  async remove(link: Link) {
    // const token = await this.getToken();

    // return fetch(`${this.config.apiUrl}links/delete`, {
    //   ...this.authCommonProps(token),
    //   body: JSON.stringify({
    //     ...link,
    //   }),
    // });
    return new Promise((resolve, reject) => {
      resolve(link);
    });
  }

  // Authentication functions
  async getToken() {
    return localStorage.getItem('accessToken');
  }

  async saveToken(token) {
    return this.saveDataAccess(token);
  }

  async saveDataAccess({ accessToken, id, expiresIn }) {
    await this.saveAccessToken(accessToken);
    await this.saveId(id);
    await this.saveExpiresAt(expiresIn);
  }

  async clearSession(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('id');
      localStorage.removeItem('expiresAt');
      resolve();
    });
  }

  /**
   * Gest the identifier of the user.
   */
  async getId() {
    if (await this.isTokenValid()) {
      return await localStorage.getItem('id');
    } else {
      this.logout();
      return null;
    }
  }

  async saveId(id: string) {
    localStorage.setItem('id', id);
  }

  async saveAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  /**
   * Obtains the access token for operations.
   */
  async getAccessToken() {
    if (await this.isTokenValid()) {
      return localStorage.getItem('accessToken');
    } else {
      // Clean if not valid
      this.logout();
      return null;
    }
  }

  async saveExpiresAt(duration: string) {
    const durationInt = parseInt(duration, 10) * 1000;
    const time = new Date().getTime();
    localStorage.setItem('expiresAt', time + durationInt + '');
  }

  getExpiresAt() {
    return localStorage.getItem('expiresAt');
  }

  /**
   * Checks if the token is valid.
   * @returns true if valid, otherwise false.
   */
  isTokenValid() {
    const expiresAtStr = this.getExpiresAt();
    if (!expiresAtStr) {
      localStorage.removeItem('expiresAt');
      return false;
    }
    const expiresAt = parseInt(expiresAtStr, 10);
    const time = new Date().getTime();
    return expiresAt > time;
  }

  async logout() {
    await this.clearSession();
  }
}
