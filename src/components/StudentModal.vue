<template>
  <div @click="checkClick" ref="studentWrap" class="student-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="student-content">
      <Loading v-show="loading" />
      <h1 v-if="!editStudent">New Student</h1>
      <h1 v-else>Edit Student</h1>

      <!-- Student From -->
      <div class="bill-from flex flex-column">
        <h4>Student Information</h4>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="firstName">First Name</label>
            <input required type="text" id="firstName" v-model="firstName" />
          </div>
          <div class="input flex flex-column">
            <label for="lastName">Last Name</label>
            <input required type="text" id="lastName" v-model="lastName" />
          </div>
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="nicPassport">Student NIC/Passport Number</label>
            <input required type="text" id="nicPassport" v-model="nicPassport" />
          </div>
          <div class="input flex flex-column">
            <label for="contactNumber">Contact Number</label>
            <input required type="tel" id="contactNumber" v-model="contactNumber" />
          </div>
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="dateOfBirth">Date of Birth</label>
            <input required type="date" id="dateOfBirth" v-model="dateOfBirth" />
          </div>
          <div class="input flex flex-column">
            <label for="gender">Gender</label>
            <select required id="gender" v-model="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="nationality">Nationality</label>
            <input required type="text" id="nationality" v-model="nationality" />
          </div>
          <div class="input flex flex-column">
            <label for="emergencyContact">Emergency Contact Information</label>
            <input required type="tel" id="emergencyContact" v-model="emergencyContact" />
          </div>
        </div>
      </div>

      <!-- Program Information -->
      <div class="bill-to flex flex-column">
        <h4>Program Information</h4>
        <div class="input flex flex-column">
          <label for="programName">Program Name</label>
          <select required id="programName" v-model="programName">
            <option value="IT">IT</option>
            <option value="Management">Management</option>
          </select>
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="programCode">Program Code</label>
            <select required id="programCode" v-model="programCode">
              <option value="0001">0001</option>
              <option value="0002">0002</option>
            </select>
          </div>
          <div class="input flex flex-column">
            <label for="startDate">Program Start Date</label>
            <input required type="date" id="startDate" v-model="startDate" />
          </div>
        </div>

        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="endDate">Program End Date</label>
            <input required type="date" id="endDate" v-model="endDate" />
          </div>
          <div class="input flex flex-column">
            <label for="degreeLevel">Degree Level</label>
            <select required id="degreeLevel" v-model="degreeLevel">
              <option value="Diploma">Diploma</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Enrollment Information -->
      <div class="bill-to flex flex-column">
        <h4>Enrollment Information</h4>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="enrollmentDate">Enrollment Date</label>
            <input required type="date" id="enrollmentDate" v-model="enrollmentDate" />
          </div>
          <div class="input flex flex-column">
            <label for="enrollmentStatus">Enrollment Status</label>
            <select required id="enrollmentStatus" v-model="enrollmentStatus">
              <option value="Enrolled">Enrolled</option>
              <option value="Graduated">Graduated</option>
              <option value="Withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="enrollmentType">Enrollment Type</label>
            <select required id="enrollmentType" v-model="enrollmentType">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
          <div class="input flex flex-column">
            <label for="applicationStatus">Application Status</label>
            <select required id="applicationStatus" v-model="applicationStatus">
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Save/Exit -->
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeStudent" class="red">Cancel</button>
        </div>
        <div class="right flex">
          <button v-if="!editStudent" type="submit" @click="saveDraft" class="dark-purple">Save Draft</button>
          <button v-if="!editStudent" type="submit" @click="publishStudent" class="purple">Create Student</button>
          <button v-if="editStudent" type="sumbit" class="purple">Update Student</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
import Loading from "../components/Loading";
import { mapActions, mapMutations, mapState } from "vuex";
import { uid } from "uid";
export default {
  name: "studentModal",
  data() {
    return {
      studentItemList: [],
      docId: null,
      loading: null,
      firstName: null,
      lastName: null,
      nicPassport: null,
      contactNumber: null,
      dateOfBirth: null,
      gender: null,
      nationality: null,
      emergencyContact: null,
      programName: null,
      programCode: null,
      startDate: null,
      endDate: null,
      degreeLevel: null,
      enrollmentDate: null,
      enrollmentStatus: null,
      enrollmentType: null,
      applicationStatus: null,
    };
  },

  components: {
    Loading,
  },
  created() {

    if (this.editStudent) {
      const currentStudent = this.currentStudentArray[0];
      this.firstName = currentStudent.firstName;
      this.lastName = currentStudent.lastName;
      this.nicPassport = currentStudent.nicPassport;
      this.contactNumber = currentStudent.contactNumber;
      this.dateOfBirth = currentStudent.dateOfBirth;
      this.gender = currentStudent.gender;
      this.nationality = currentStudent.nationality;
      this.emergencyContact = currentStudent.emergencyContact;
      this.programName = currentStudent.programName;
      this.programCode = currentStudent.programCode;
      this.startDate = currentStudent.startDate;
      this.endDate = currentStudent.endDate;
      this.degreeLevel = currentStudent.degreeLevel;
      this.enrollmentDate = currentStudent.enrollmentDate;
      this.enrollmentStatus = currentStudent.enrollmentStatus;
      this.enrollmentType = currentStudent.enrollmentType;
      this.applicationStatus = currentStudent.applicationStatus;
      this.studentItemList = currentStudent.studentItemList;
    }
  },
  methods: {
    ...mapMutations(["TOGGLE_STUDENT", "TOGGLE_MODAL", "TOGGLE_EDIT_STUDENT"]),

    ...mapActions(["UPDATE_STUDENT", "GET_STUDENTS"]),

    checkClick(e) {
      if (e.target === this.$refs.studentWrap) {
        this.TOGGLE_MODAL();
      }
    },

    closeStudent() {
      this.TOGGLE_STUDENT();
      if (this.editStudent) {
        this.TOGGLE_EDIT_STUDENT();
      }
    },

    deleteStudentItem(id) {
      this.studentItemList = this.studentItemList.filter((item) => item.id !== id);
    },

    publishStudent() {
      this.studentPending = true;
    },

    saveDraft() {
      this.studentDraft = true;
    },

    async uploadStudent() {
     

      this.loading = true;

     

      const dataBase = db.collection("students").doc();

      await dataBase.set({
        studentId: uid(6),
        // Student Information
        firstName: this.firstName,
        lastName: this.lastName,
        nicPassport: this.nicPassport,
        contactNumber: this.contactNumber,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        nationality: this.nationality,
        emergencyContact: this.emergencyContact,
        // Program Information
        programName: this.programName,
        programCode: this.programCode,
        startDate: this.startDate,
        endDate: this.endDate,
        degreeLevel: this.degreeLevel,
        // Enrollment Information
        enrollmentDate: this.enrollmentDate,
        enrollmentStatus: this.enrollmentStatus,
        enrollmentType: this.enrollmentType,
        applicationStatus: this.applicationStatus,

        studentItemList: this.studentItemList,
      });

      this.loading = false;

      this.TOGGLE_STUDENT();

      this.GET_STUDENTS();
    },

    async updateStudent() {
      if (this.studentItemList.length <= 0) {
        alert("Please ensure you filled out work items!");
        return;
      }

      this.loading = true;

      this.calStudentTotal();

      const dataBase = db.collection("students").doc(this.docId);

      await dataBase.update({
        // Student Information
        firstName: this.firstName,
        lastName: this.lastName,
        nicPassport: this.nicPassport,
        contactNumber: this.contactNumber,
        dateOfBirth: this.dateOfBirth,
        gender: this.gender,
        nationality: this.nationality,
        emergencyContact: this.emergencyContact,
        // Program Information
        programName: this.programName,
        programCode: this.programCode,
        startDate: this.startDate,
        endDate: this.endDate,
        degreeLevel: this.degreeLevel,
        // Enrollment Information
        enrollmentDate: this.enrollmentDate,
        enrollmentStatus: this.enrollmentStatus,
        enrollmentType: this.enrollmentType,
        applicationStatus: this.applicationStatus,

        studentItemList: this.studentItemList,
      });

      this.loading = false;

      const data = {
        docId: this.docId,
        routeId: this.$route.params.studentId,
      };

      this.UPDATE_STUDENT(data);
    },

    submitForm() {
      if (this.editStudent) {
        this.updateStudent();
        return;
      }
      this.uploadStudent();
    },
  },
  computed: {
    ...mapState(["editStudent", "currentStudentArray"]),
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString("en-us", this.dateOptions);
    },
  },
};
</script>

<style lang="scss" scoped>
.student-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    left: 90px;
  }

  .student-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }

    // Bill To / Bill From
    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;

        div {
          flex: 1;
        }
      }
    }

    // Student Work

    .student-work {
      .payment {
        gap: 24px;

        div {
          flex: 1;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          // Item Table Styling
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;

            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }

        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }

    .save {
      margin-top: 60px;

      div {
        flex: 1;
      }

      .right {
        justify-content: flex-end;
      }
    }
  }

  .input {
    margin-bottom: 24px;
  }

  label {
    font-size: 12px;
    margin-bottom: 6px;
  }

  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 4px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>
