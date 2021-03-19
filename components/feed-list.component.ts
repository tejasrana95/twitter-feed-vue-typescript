import Vue from "vue";
import { Component } from "vue-property-decorator";
import { localService } from "../local.service";
import { FeedModel } from "../FeedModel";

import { AddEditFeed } from "./add-edit-feed.component";
@Component({
  name: "feed-list",
  components: {
    AddEditFeed
  },
  template: `
    <div>
      <add-edit-feed
        @feedAdded="feedAdded"
        v-bind:editFeedObj="editFeedObj"
      ></add-edit-feed>
      <div class="feed-wrapper">
        <b-list-group>
          <b-list-group-item v-for="(feed, i) in feeds">
            <div class="d-flex flex-row">
              <div class="col-xs-2">
                <img v-bind:src="feed.avatar" class="avatar" />
              </div>
              <div class="d-flex flex-column col-xs-10 feed-data-wrapper">
                <div class="feed-meta d-flex flex-row">
                  <div class="user-name">
                    <strong>{{ feed.name }}</strong>
                    <span>@{{ feed.userName }}</span>
                  </div>
                  <div class="time">
                    <timeago
                      :datetime="feed.created"
                      :auto-update="60"
                    ></timeago>
                  </div>
                </div>
                <div class="feed">{{ feed.feedText }}</div>
                <div class="d-flex justify-content-start action-button">
                  <b-button variant="btn btn-link" @click="editFeed(feed)">
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                  </b-button>

                  <b-button
                    variant="btn btn-link"
                    @click="showDeleteConfirm(feed.id)"
                    v-b-modal.modal-center
                  >
                    <i class="fa fa-trash"></i>
                  </b-button>

                  <b-button
                    variant="btn btn-link feed-like"
                    @click="likeFeed(feed.id)"
                  >
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                    <span>{{ feed.like }}</span>
                  </b-button>
                </div>
              </div>
            </div>
          </b-list-group-item>
          <b-list-group-item
            v-if="feeds.length == 0"
            class="d-flex justify-content-center"
          >
            No feeds to display
          </b-list-group-item>
        </b-list-group>

        <b-modal id="modal-center" centered title="Delete" @ok="onDelete">
          <div class="p-3" v-html="deleteMessage"></div>
        </b-modal>
      </div>
    </div>
  `
})
export class FeedList extends Vue {
  feeds: Array<FeedModel> = [];
  deleteMessage: string = "";
  idToDelete: number = null;
  editFeedObj: FeedModel = null;
  mounted() {
    this.init();
  }

  init() {
    this.feeds = localService.get();
  }

  feedAdded() {
    this.init();
  }

  showDeleteConfirm(id: number) {
    this.idToDelete = id;
    let todo = this.feeds.find(t => t.id == id);
    this.deleteMessage = `Do you want to delete feed <b>${todo.feedText}</b>?`;
  }

  editFeed(feedData) {
    this.editFeedObj = feedData;
  }

  likeFeed(feedId) {
    localService.like(feedId);
    this.init();
  }

  onDelete() {
    localService.remove(this.idToDelete);
    this.init();
  }

  goToAdd() {
    this.$router.push("add");
  }
}
