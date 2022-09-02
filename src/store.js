import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
//Vuex === Simple state management library

const errorSystem = {
  state: {
    show: false,
    text: "Error",
  },
  mutations: {
    showError(state, message) {
      state.show = true;
      state.text = message;
    },
  },
};

export default new Vuex.Store({
  // Current state of the application
  state: {
    students: [],
  },
  // Computed state based on the current state
  getters: {
    students: (state) =>
      state.students.map((s) => ({
        ...s,
        fullName: s.firstName + " " + s.lastName,
      })),
    findStudent: (state) => (id) => state.students.find((s) => s.id == id),
    isLoaded: (state) => !!state.students.length,
  },
  //Mutates the current state
  //Only object that has proper right to mutate the state
  //Two arguments state & payload

  //Don't mutate the state directly
  //store.state.students="NOOOO"
  //Won't know which component changed it, will make it hard to debug/track
  mutations: {
    setStudents(state, students) {
      state.students = students;
    },
    addStudent(state, student) {
      state.students.push(student);
    },
    editStudent(state, student) {
      const index = state.students.findIndex((s) => s.id == student.id);
      Vue.set(state.students, index, student);
    },
  },
  //Get data from server and send it to mutations
  //Commits mutations after asynchronous operations
  actions: {
    async getStudents(context) {
      //optional payload
      try {
        //Recive data from server
        const students = (await axios.get("http://localhost:3000/students"))
          .data;
        //Context has the reference for a store
        //Commit to mutate the state
        context.commit("setStudents", students);
      } catch (error) {
        context.commit("showError", error);
      }
    },
    async createStudent(context, names) {
      const student = (await axios.post(
        "http://localhost:3000/students",
        names
      )).data;
      context.commit("addStudent", student);
    },
    async editStudent(context, { id, names }) {
      const student = (await axios.put(
        `http://localhost:3000/students/${id}`,
        names
      )).data;
      context.commit("editStudent", student);
    },
  },
  modules: {
    error: errorSystem,
  },
});
