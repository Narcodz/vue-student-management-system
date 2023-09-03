import { createStore } from "vuex";
import db from "../firebase/firebaseInit";

export default createStore({
  state: {
    studentData: [],
    studentModal: null,
    modalActive: null,
    studentsLoaded: null,
    currentStudentArray: null,
    editStudent: null,
  },
  mutations: {
    TOGGLE_STUDENT(state) {
      state.studentModal = !state.studentModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    SET_STUDENT_DATA(state, payload) {
      state.studentData.push(payload);
    },
    STUDENTS_LOADED(state) {
      state.studentsLoaded = true;
    },
    SET_CURRENT_STUDENT(state, payload) {
      state.currentStudentArray = state.studentData.filter((student) => {
        return student.studentId === payload;
      });
    },
    TOGGLE_EDIT_STUDENT(state) {
      state.editStudent = !state.editStudent;
    },
    DELETE_STUDENT(state, payload) {
      state.studentData = state.studentData.filter((student) => student.docId !== payload);
    },
    UPDATE_STATUS_TO_PAID(state, payload) {
      state.studentData.forEach((student) => {
        if (student.docId === payload) {
          student.studentPaid = true;
          student.studentPending = false;
        }
      });
    },
    UPDATE_STATUS_TO_PENDING(state, payload) {
      state.studentData.forEach((student) => {
        if (student.docId === payload) {
          student.studentPaid = false;
          student.studentPending = true;
          student.studentDraft = false;
        }
      });
    },
  },
  actions: {
    async GET_STUDENTS({ commit, state }) {
      const getData = db.collection("students");
      const results = await getData.get();
      results.forEach((doc) => {
        if (!state.studentData.some((student) => student.docId === doc.id)) {
          const data = {
            docId: doc.id,
            studentId: doc.data().studentId,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            nicPassport: doc.data().nicPassport,
            contactNumber: doc.data().contactNumber,
            dateOfBirth: doc.data().dateOfBirth,
            gender: doc.data().gender,
            nationality: doc.data().nationality,
            emergencyContact: doc.data().emergencyContact,
            programName: doc.data().programName,
            programCode: doc.data().programCode,
            startDate: doc.data().startDate,
            endDate: doc.data().endDate,
            degreeLevel: doc.data().degreeLevel,
            enrollmentDate: doc.data().enrollmentDate,
            enrollmentStatus: doc.data().enrollmentStatus,
            enrollmentType: doc.data().enrollmentType,
            applicationStatus: doc.data().applicationStatus,
          };
          commit("SET_STUDENT_DATA", data);
        }
      });
      commit("STUDENTS_LOADED");
    },
    async UPDATE_STUDENT({ commit, dispatch }, { docId, routeId }) {
      commit("DELETE_STUDENT", docId);
      await dispatch("GET_STUDENTS");
      commit("TOGGLE_STUDENT");
      commit("TOGGLE_EDIT_STUDENT");
      commit("SET_CURRENT_STUDENT", routeId);
    },
    async DELETE_STUDENT({ commit }, docId) {
      const getSTUDENT = db.collection("students").doc(docId);
      await getSTUDENT.delete();
      commit("DELETE_STUDENT", docId);
    },
    async UPDATE_STATUS_TO_PAID({ commit }, docId) {
      const getSTUDENT = db.collection("students").doc(docId);
      await getSTUDENT.update({
        studentPaid: true,
        studentPending: false,
      });
      commit("UPDATE_STATUS_TO_PAID", docId);
    },
    async UPDATE_STATUS_TO_PENDING({ commit }, docId) {
      const getSTUDENT = db.collection("students").doc(docId);
      await getSTUDENT.update({
        studentPaid: false,
        studentPending: true,
        studentDraft: false,
      });
      commit("UPDATE_STATUS_TO_PENDING", docId);
    },
  },
  modules: {},
});
