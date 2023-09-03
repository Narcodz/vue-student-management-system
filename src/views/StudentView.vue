<template>
  <div v-if="currentStudent" class="student-view container">
    <router-link class="nav-link flex" :to="{ name: 'Home' }">
      <img src="@/assets/icon-arrow-left.svg" alt="" /> Go Back
    </router-link>
    <!-- Header -->
    <div class="header flex">
      <div class="left flex">
        <span>Status</span>
        <div class="status-button flex">{{ currentStudent.applicationStatus }}</div>
      </div>
      <div class="right flex">
        <button @click="toggleEditStudent" class="dark-purple">Edit</button>
        <button @click="deleteStudent(currentStudent.docId)" class="red">Delete</button>
        <button @click="updateStatusToPaid(currentStudent.docId)" v-if="currentStudent.studentPending" class="green">
          Mark as Paid
        </button>
        <button v-if="currentStudent.studentDraft || currentStudent.studentPaid"
          @click="updateStatusToPending(currentStudent.docId)" class="orange">
          Mark as Pending
        </button>
      </div>
    </div>

    <!-- Student Details -->
    <div class="student-details flex flex-column">
      <div class="top flex">
        <div class="left flex flex-column">
          <p>Student ID - <span>#</span>{{ currentStudent.studentId }}</p>
        </div>
      </div>
      <div class="student flex flex-column">
        <div class="info">
          <span>First Name</span>
          <span>-</span>
          <span>{{ currentStudent.firstName }}</span>
        </div>
        <div class="info">
          <span>Last Name</span>
          <span>-</span>
          <span>{{ currentStudent.lastName }}</span>
        </div>
        <div class="info">
          <span>NIC / Passport</span>
          <span>-</span>
          <span>{{ currentStudent.nicPassport }}</span>
        </div>
        <div class="info">
          <span>Contact Number</span>
          <span>-</span>
          <span>{{ currentStudent.contactNumber }}</span>
        </div>
        <div class="info">
          <span>Date Of Birth</span>
          <span>-</span>
          <span>{{ currentStudent.dateOfBirth }}</span>
        </div>
        <div class="info">
          <span>Gender</span>
          <span>-</span>
          <span>{{ currentStudent.gender }}</span>
        </div>
        <div class="info">
          <span>Nationality</span>
          <span>-</span>
          <span>{{ currentStudent.nationality }}</span>
        </div>
        <div class="info">
          <span>Emergency Contact</span>
          <span>-</span>
          <span>{{ currentStudent.emergencyContact }}</span>
        </div>
        <div class="info">
          <span>Program Name</span>
          <span>-</span>
          <span>{{ currentStudent.programName }}</span>
        </div>
        <div class="info">
          <span>Program Code</span>
          <span>-</span>
          <span>{{ currentStudent.programCode }}</span>
        </div>
        <div class="info">
          <span>Start Date</span>
          <span>-</span>
          <span>{{ currentStudent.startDate }}</span>
        </div>

        <div class="info">
          <span>End Date</span>
          <span>-</span>
          <span>{{ currentStudent.endDate }}</span>
        </div>
        <div class="info">
          <span>Degree Level</span>
          <span>-</span>
          <span>{{ currentStudent.degreeLevel }}</span>
        </div>
        <div class="info">
          <span>Enrollment Date</span>
          <span>-</span>
          <span>{{ currentStudent.enrollmentDate }}</span>
        </div>
        <div class="info">
          <span>Enrollment Status</span>
          <span>-</span>
          <span>{{ currentStudent.enrollmentStatus }}</span>
        </div>
        <div class="info">
          <span>Enrollment Type</span>
          <span>-</span>
          <span>{{ currentStudent.enrollmentType }}</span>
        </div>
        <div class="info">
          <span>Application Status</span>
          <span>-</span>
          <span>{{ currentStudent.applicationStatus }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "studentView",
  data() {
    return {
      currentStudent: null,
    };
  },
  created() {
    this.getCurrentStudent();
  },
  methods: {
    ...mapMutations(["SET_CURRENT_STUDENT", "TOGGLE_EDIT_STUDENT", "TOGGLE_STUDENT"]),

    ...mapActions(["DELETE_STUDENT", "UPDATE_STATUS_TO_PENDING", "UPDATE_STATUS_TO_PAID"]),

    getCurrentStudent() {
      this.SET_CURRENT_STUDENT(this.$route.params.studentId);
      this.currentStudent = this.currentStudentArray[0];
    },

    toggleEditStudent() {
      this.TOGGLE_EDIT_STUDENT();
      this.TOGGLE_STUDENT();
    },

    async deleteStudent(docId) {
      await this.DELETE_STUDENT(docId);
      this.$router.push({ name: "Home" });
    },

    updateStatusToPaid(docId) {
      this.UPDATE_STATUS_TO_PAID(docId);
    },

    updateStatusToPending(docId) {
      this.UPDATE_STATUS_TO_PENDING(docId);
    },
  },
  computed: {
    ...mapState(["currentStudentArray", "editStudent"]),
  },
  watch: {
    editStudent() {
      if (!this.editStudent) {
        this.currentStudent = this.currentStudentArray[0];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.student-view {
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    color: #fff;
    font-size: 12px;

    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }

  .header,
  .student-details {
    background-color: #1e2139;
    border-radius: 20px;
  }

  .header {
    align-items: center;
    color: #dfe3fa;
    padding: 24px 32px;
    font-size: 12px;

    .left {
      align-items: center;

      span {
        color: #dfe3fa;
        margin-right: 16px;
      }
    }

    .right {
      flex: 1;
      justify-content: flex-end;

      button {
        color: #fff;
      }
    }
  }

  .student-details {
    padding: 48px;
    margin-top: 24px;

    .top {
      div {
        color: #dfe3fa;
        flex: 1;
      }

      .left {
        font-size: 12px;

        p:first-child {
          font-size: 24px;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 8px;
        }

        p:nth-child(2) {
          font-size: 16px;
        }

        span {
          color: #888eb0;
        }
      }

      .right {
        font-size: 12px;
        align-items: flex-end;
      }
    }


    .student {
      display: flex;
      flex-direction: column;
      color: #dfe3fa;

      .info {
        display: flex;
        justify-content: space-between;

        span {
          margin-right: 16px;
          flex: 1;
          text-align: left;
        }

        span:nth-child(2) {
          text-align: center;
        }

        span:last-child {
          text-align: right;
        }

        p {
          flex: 1;
          text-align: right;
        }
      }
    }
  }
}
</style>
