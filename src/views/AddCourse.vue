<template>
    <v-app>
        <div>
            <h3 >Adauga Curs</h3>
            <form @submit="saveCourse">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                 <h6 v-if="courseType=='publicateEdituriAcreditate'" style="color:grey;">. Cursuri si manuale universitare )publicate la edituri acreditate</h6>
          
                <h6 v-if="courseType=='publicateAlteEdituri'" style="color:grey;">Cursuri si manuale universitare publicate la alte edituri</h6>
                <h6 v-if="courseType=='editiiRevizuite'" style="color:grey;">Editii revizuite si adaugite</h6>
                <br>
                  <v-select
                    v-model="courseType"
                    :items="courseTypes"
                    :label="courseSelect"
                    outlined
                    class="my-2"
                    ></v-select>
                <fieldset class="form-group">
                    <label>Anul publicarii</label>
                    <input type="text" class="form-control" required v-model="anulPublicarii">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu manual/curs</label>
                    <input type="text" class="form-control" required v-model="titluManualCurs">
                </fieldset>
                <fieldset class="form-group">
                    <label>Autori</label>
                    <input type="text" class="form-control" required v-model="autori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.autori</label>
                    <input type="text" class="form-control" required v-model="nrAutori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.pagini</label>
                    <input type="text" class="form-control" required v-model="nrPagini">
                </fieldset>
               
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import CourseService from '../services/courses.service'

export default {
    data () {
      return {
        anulPublicarii: "",
        titluManualCurs:"",
        autori: "",
        nrAutori: "",
        nrPagini: "",
        idUser: this.$store.state.auth.user.id,
        courseTypes: ['publicateEdituriAcreditate','publicateAlteEdituri','editiiRevizuite'],
        courseType: 'none',
        courseSelect: 'Selecteaza tipul cursului/manualului',
        punctaj: ""
      };
    },

    methods:{
      saveCourse(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var courseObject={
              idUser: this.idUser,
              anulPublicarii: this.anulPublicarii,
              titluManualCurs: this.titluManualCurs,
              autori: this.autori,
              nrAutori: this.nrAutori,
              nrPagini: this.nrPagini,
              punctaj: this.punctaj,
              tipCursManual: this.courseType
          }

          CourseService.addCourse(courseObject)
          .then(response => {
            console.log("AM INTRAT IN THEN RESPONSE");
            this.$router.push(`/teachingActivity`);
            console.log(response.data);
          })
          .catch(e => {
             console.log(e);
             this.errors=e.message;
          });

            this.$router.push(`/teachingActivity`);
      }
    },
    mounted() {

    }
  }
</script>
