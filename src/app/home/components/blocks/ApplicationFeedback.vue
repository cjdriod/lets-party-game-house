<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-capitalize text-h4">Feedback</h2>
      <div class="text--secondary">
        Let us know what's your experience with <b class="font-italic">Let's Party</b>. We would like to hear your
        ideas. 😀
      </div>
    </div>

    <div>
      <v-card rounded="lg" outlined>
        <v-card-text>
          <v-form>
            <v-row>
              <v-col cols="12">
                <div>How you feel:</div>
                <v-rating
                  hover
                  large
                  color="primary"
                  v-model="feedbackFormData.rating"
                  :readonly="feedbackFormData.isSubmitted"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  rows="3"
                  outlined
                  auto-grow
                  label="Comment"
                  :counter="maxFeedbackChar"
                  :maxlength="maxFeedbackChar"
                  v-model="feedbackFormData.comment"
                  :readonly="feedbackFormData.isSubmitted"
                  :clearable="!feedbackFormData.isSubmitted"
                  :hide-details="feedbackFormData.isSubmitted"
                />
              </v-col>

              <v-col cols="12" class="text-right">
                <v-btn
                  v-if="!feedbackFormData.isSubmitted"
                  class="px-5"
                  color="primary"
                  @click="sendFeedback"
                  :disabled="!feedbackFormData.rating"
                >
                  Send Feedback
                </v-btn>

                <div v-else class="primary--text">Thank you for the review, we will look into it soon!</div>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApplicationFeedback',
  data() {
    return {
      maxFeedbackChar: 1000,
      feedbackFormData: {
        rating: null,
        comment: '',
        isSubmitted: false,
      },
    }
  },
  methods: {
    sendFeedback() {
      alert('Thank you for your submission.')
      this.feedbackFormData = {
        ...this.feedbackFormData,
        isSubmitted: true,
        comment: this.feedbackFormData.comment || '-',
      }
    },
  },
}
</script>
