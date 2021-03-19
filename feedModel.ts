export class FeedModel {
  id: number;
  name: string;
  userName: string;
  feedText: string;
  like: number;
  avatar: string;
  created: string;

  constructor(data) {
    this.id = data.id || null;
    this.name = data.name || "Demo User";
    this.feedText = data.feedText || null;
    this.like = data.like || 0;
    this.avatar = data.avatar || "";
    this.userName = data.userName || "DemoUser123";
    this.created = data.created || new Date().getTime();
  }
}
