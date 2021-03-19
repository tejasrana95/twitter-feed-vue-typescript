import { FeedModel } from "./FeedModel";

class LocalService {
  get(): Array<FeedModel> {
    let feeds = JSON.parse(localStorage.getItem("feeds"));
    return feeds ? feeds : [];
  }

  add(feed: FeedModel) {
    let feeds = this.get();
    if (!feeds) feeds = [];
    let maxId = Math.max(...feeds.map(t => t.id));

    const feedData = feed;
    feedData.id = maxId > 0 ? maxId + 1 : 1;
    feeds.push(feedData);
    this.save(feeds);
  }

  update(feedText: string, id: number) {
    let feeds = this.get();
    const index = feeds.findIndex(data => data.id === id);
    if (index !== -1) {
      feeds[index].feedText = feedText;
      this.save(feeds);
    }
  }

  like(id: number) {
    let feeds = this.get();
    const index = feeds.findIndex(data => data.id === id);
    if (index !== -1) {
      feeds[index].like = feeds[index].like + 1;
      this.save(feeds);
    }
  }

  remove(id: number) {
    let feeds = this.get();
    let indexToDelete = feeds.findIndex(t => t.id == id);
    feeds.splice(indexToDelete, 1);
    this.save(feeds);
  }

  save(feeds: Array<FeedModel>) {
    localStorage.setItem("feeds", JSON.stringify(feeds));
  }
}

export const localService = new LocalService();
