<template>
  <v-form v-model="valid">
    <v-container>
      <h2 class="title">Add a new Task</h2>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="task.content"
            label="Task name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="task.tag"
            label="Select a tag"
            :items="tags"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-btn color="success" class="mr-4" @click="submit">
          Add Task
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { db } from "@/firebase";
export default {
  name: "FormComponent",
  data: () => ({
    valid: false,
    task: {
      content: "",
      tag: "",
      done: false
    },
    tags: ["Work", "Home", "Hobby"]
  }),
  methods: {
    submit() {
      db.collection("tasks")
        .add({
          content: this.task.content,
          tag: this.task.tag,
          done: this.task.done
        })
        .then(docRef => {
          console.log("Document añadido correctamente con ID: ", docRef.id);
        });
      this.task.content = "";
      this.task.tag = "";
      this.task.done = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
