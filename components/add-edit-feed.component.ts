import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { FeedModel } from "../feedModel";
import { localService } from "../local.service";

@Component({
  name: "add-edit-feed",
  props: ["editFeedObj"],
  watch: {
    editFeedObj(newValue) {
      this.handleFeed(newValue);
    }
  },
  template: `
    <div class="row col-sm-12">
      <div class="col-sm-2"><img v-bind:src="avatar" class="avatar"/></div>
       <div class="col-sm-10"> 
       <b-form-textarea
          v-model="feedText"
          placeholder="What's happening?"
           rows="6"
        maxlength="280"
        ></b-form-textarea>
      </b-form-group>
      <div class="tweet-button">
        <b-button class="ml-auto"  :disabled='isSubmitted' class="feed-post-button" variant="primary" @click="addUpdateFeed()" 
          >Tweet</b-button
        >
      </div>
      </div>
    </div>
   
  `
})
export class AddEditFeed extends Vue {
  feedData: FeedModel = null;
  feedText: string = "";
  isInvalid: boolean = false;
  isSubmitted: boolean = false;
  avatar = "https://i.pravatar.cc/150?img=6";
  emits: ["feedAdded"];
  @Prop() public editFeedObj = null;
  addUpdateFeed() {
    this.isSubmitted = true;
    if (
      this.feedData &&
      this.feedData.hasOwnProperty("id") &&
      this.feedData.id !== null
    ) {
      localService.update(this.feedText, this.feedData.id);
      this.feedData = null;
    } else {
      const feedData = new FeedModel({
        feedText: this.feedText,
        avatar: this.avatar
      });
      localService.add(feedData);
    }
    this.isInvalid = null;
    this.feedText = "";
    this.isSubmitted = false;
    this.$emit("feedAdded", new Date().getTime());
  }

  handleFeed(feedData) {
    this.feedData = feedData;
    this.feedText = feedData.feedText;
  }
}
