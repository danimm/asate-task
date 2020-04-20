<template>
  <v-data-table
    :headers="headers"
    :items="tasks"
    sort-by="tag"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Task APP</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Task</v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="headline">Edit Task</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.content"
                      label="Task content"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.tag"
                      label="Select a tag"
                      :items="tags"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox
                      v-model="editedItem.done"
                      label="is Done"
                      required
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { db } from "@/firebase";
export default {
  props: {
    tasks: {
      type: Array
    }
  },
  data: () => ({
    dialog: false,
    headers: [
      // {
      //   text: '#',
      //   value: 'id'
      // },
      {
        text: "Task",
        align: "start",
        sortable: true,
        value: "content"
      },
      { text: "Tag", value: "tag" },
      { text: "done", value: "done" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    tags: ["Work", "Home", "Hobby"],
    editedItem: {
      id: "",
      content: "",
      tag: 0,
      done: false
    },
    defaultItem: {
      content: "",
      tag: 0,
      done: false
    }
  }),

  methods: {
    editItem(item) {
      this.dialog = true;
      this.editedItem.id = item.id;
      this.editedItem.content = item.content;
      this.editedItem.tag = item.tag;
      this.editedItem.done = item.done;
    },

    deleteItem(item) {
      db.collection("tasks")
        .doc(item.id)
        .delete()
        .then(() => {
          console.log("Datos actualizados correctamente");
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      console.log(this.editedItem);
      db.collection("tasks")
        .doc(this.editedItem.id)
        .set({
          content: this.editedItem.content,
          tag: this.editedItem.tag,
          done: this.editedItem.done
        })
        .then(() => {
          console.log("Datos actualizados correctamente");
        });
      this.editedItem.id = "";
      this.editedItem.content = "";
      this.editedItem.tag = "";
      this.editedItem.done = false;
      this.dialog = false;
    }
  }
};
</script>
<style lang="scss" scoped></style>
