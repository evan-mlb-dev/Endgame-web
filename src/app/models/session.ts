export class Session {
  public token: string;
  public username: string;
  public role: string;

  constructor(token: string, username: string, role: string) {
    this.token = token;
    this.username = username;
    this.role = role;
  }

  public static fromJson(json: any): Session {
    return new Session(json.token || '', json.username || '', json.role || '');
  }
}
