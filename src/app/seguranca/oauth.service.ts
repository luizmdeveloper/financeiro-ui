import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  private oauth2Url: string;
  public jwtPayLoad: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
    this.oauth2Url = `${this.oauth2Url}/oauth/token`;
  }

  private armazenarToken(token: string) {
    this.jwtPayLoad = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token_ir', token);
  }

  public login(email: string, senha: string): Promise<void>{
    const headers = new HttpHeaders().append('Authorization','Basic YW5ndWxhcjpAbmd1bEByMA==')
                                     .append('Content-Type','application/x-www-form-urlencoded');

    const body = `username=${email}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauth2Url,body, { headers, withCredentials: true }).toPromise()
              .then(response => {
                const token = response['access_token'];
                this.armazenarToken(token);
              })
              .catch(httpResponseErro => {
                if (httpResponseErro.status === 400) {
                  if (httpResponseErro.error.error === 'invalid_grant') {
                    return Promise.reject('Usuário e/ou senha inválida!');
                  }
                }

                return Promise.reject(httpResponseErro);
              });
  }
}
