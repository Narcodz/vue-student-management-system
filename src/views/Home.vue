<template>
  <div class="home container">
    <!-- Header -->
    <div class="header flex">
      <div class="left flex flex-column">
        <h1>Students</h1>
        <span>There are {{ studentData.length }} total students</span>
      </div>
      <div class="right flex">
        <div @click="newStudent" class="button flex">
          <div class="inner-button flex">
            <img src="@/assets/icon-plus.svg" alt="" />
          </div>
          <span>New Student</span>
        </div>
      </div>
    </div>
    <!-- Students -->
    <div v-if="studentData.length > 0">
      <Student v-for="(student, index) in filteredData" :student="student" :key="index" />
    </div>
    <div v-else class="empty flex flex-column">
      <img src="@/assets/illustration-empty.svg" alt="" />
      <h3>There is nothing here</h3>
      <p>Create a new student by clicking the New Student button and get started</p>
    </div>
  </div>
</template>

<script>
import Student from "../components/Student";
import { mapMutations, mapState } from "vuex";
export default {
  name: "HomePage",
  data() {
    return {
      filterMenu: null,
      filteredStudent: null,
    };
  },
  components: {
    Student,
  },
  methods: {
    ...mapMutations(["TOGGLE_STUDENT"]),
    newStudent() {
      this.TOGGLE_STUDENT();
    },

    toggleFilterMenu() {
      this.filterMenu = !this.filterMenu;
    },

    filteredStudents(e) {
      if (e.target.innerText === "Clear Filter") {
        this.filteredStudent = null;
        return;
      }
      this.filteredStudent = e.target.innerText;
    },
  },
  computed: {
    ...mapState(["studentData"]),

    filteredData() {
      return this.studentData.filter((student) => {
        if (this.filteredStudent === "Draft") {
          return student.studentDraft === true;
        }
        if (this.filteredStudent === "Pending") {
          return student.studentPending === true;
        }
        if (this.filteredStudent === "Paid") {
          return student.studentPaid === true;
        }
        return student;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  color: #fff;

  .header {
    margin-bottom: 65px;

    .left,
    .right {
      flex: 1;
    }

    .right {
      justify-content: flex-end;
      align-items: center;

      .button,
      .filter {
        align-items: center;

        span {
          font-size: 12px;
        }
      }

      .filter {
        position: relative;
        margin-right: 40px;
        cursor: pointer;

        img {
          margin-left: 12px;
          width: 9px;
          height: 5px;
        }

        .filter-menu {
          width: 120px;
          position: absolute;
          top: 25px;
          list-style: none;
          background-color: #1e2139;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

          li {
            cursor: pointer;
            font-size: 12px;
            padding: 10px 20px;

            &:hover {
              color: #1e2139;
              background-color: #fff;
            }
          }
        }
      }

      .button {
        padding: 8px 10px;
        background-color: #7c5dfa;
        border-radius: 40px;

        .inner-button {
          margin-right: 8px;
          border-radius: 50%;
          padding: 8px;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          img {
            width: 10px;
            height: 10px;
          }
        }
      }
    }
  }

  .empty {
    margin-top: 160px;
    align-items: center;

    img {
      width: 214px;
      height: 200px;
    }

    h3 {
      font-size: 20px;
      margin-top: 40px;
    }

    p {
      text-align: center;
      max-width: 224px;
      font-size: 12px;
      font-weight: 300;
      margin-top: 16px;
    }
  }
}
</style>
