<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="6" sm="6">
          <TableComponent :tasks="tasks" />
        </v-col>
        <v-col cols="6" sm="6">
          <FormComponent />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import TableComponent from "@/components/TableComponent.vue";
import FormComponent from "@/components/FormComponent.vue";
import { db } from "@/firebase";

export default {
  name: "Home",
  components: {
    TableComponent,
    FormComponent
  },
  data() {
    return {
      tasks: []
    };
  },
  firestore() {
    return {
      tasks: db.collection("tasks")
    };
  }
};
</script>
