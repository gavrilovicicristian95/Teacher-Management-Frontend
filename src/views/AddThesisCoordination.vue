<template>
    <v-app>
        <div>
            <h3 >Adauga coordonare </h3>
            <form @submit="saveThesisCoord">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                 <h6 v-if="coordinationType=='conducereDoctorat'" style="color:grey;">Conducere de doctorat</h6>
          
                <h6 v-if="coordinationType=='coordonareLicenta'" style="color:grey;"> Coordonarea lucrarilor de licenta</h6>
                 <h6 v-if="coordinationType=='coordonareDisertatie'" style="color:grey;"> Coordonarea lucrarilor de disertatie/lucrari de grad</h6>
                <br>
                  <v-select
                    v-model="coordinationType"
                    :items="coordinationTypes"
                    :label="coordinationSelect"
                    outlined
                    class="my-2"
                    ></v-select>
                <fieldset class="form-group">
                    <label>Anul sustinerii</label>
                    <input type="text" class="form-control" required v-model="anulSustinerii">
                </fieldset>
                <fieldset class="form-group" v-if="coordinationType != 'conducereDoctorat'">
                    <label>Student</label>
                    <input type="text" class="form-control" required v-model="student">
                </fieldset>
                 <fieldset class="form-group" v-if="coordinationType == 'conducereDoctorat'">
                    <label>Doctorand</label>
                    <input type="text" class="form-control" required v-model="student">
                </fieldset>
                 <fieldset class="form-group" v-if="coordinationType == 'conducereDoctorat'">
                    <label>Titlul lucrarii de doctorat</label>
                    <input type="text" class="form-control" required v-model="titluTeza">
                </fieldset>
               <fieldset class="form-group" v-if="coordinationType == 'coordonareLicenta'">
                    <label>Titlul lucrarii de licenta</label>
                    <input type="text" class="form-control" required v-model="titluTeza">
                </fieldset>
               <fieldset class="form-group" v-if="coordinationType == 'coordonareDisertatie'">
                    <label>Titlul lucrarii de disertatie</label>
                    <input type="text" class="form-control" required v-model="titluTeza">
                </fieldset>
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import ThesisCoordinationService from '../services/thesisCoordination.service'

export default {
    data () {
      return {
        anulSustinerii: "",
        titluTeza:"",
        student: "",
        idUser: this.$store.state.auth.user.id,
        coordinationTypes: ['conducereDoctorat','coordonareLicenta','coordonareDisertatie'],
        coordinationType: 'none',
        coordinationSelect: 'Selecteaza tipul coordonarii',
        punctaj: ""
      };
    },

    methods:{
      saveThesisCoord(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var thesisObject={
              idUser: this.idUser,
              anulSustinerii: this.anulSustinerii,
              titluTeza: this.titluTeza,
              student: this.student,
              punctaj: this.punctaj,
              tipTeza: this.coordinationType
          }

          ThesisCoordinationService.addThesisCoordination(thesisObject)
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
