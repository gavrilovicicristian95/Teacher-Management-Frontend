<template>
    <v-app>
        <div>
            <h3 v-if="tipActivitate=='proiecteDidactice'" >Adauga proiect didactic</h3>
            <h3 v-if="tipActivitate=='materialeSuport'" >Adauga material suport curs, seminar, lucrari practice l</h3>
            <h3 v-if="tipActivitate=='organizari'" >Organizare aplicaţii, practică de teren, laborator şi coopertari cu mediul de afaceri</h3>
            <form @submit="saveActivity">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                <fieldset class="form-group" v-if="tipActivitate=='proiecteDidactice'">
                    <label>Denumire proiect</label>
                    <input type="text" class="form-control" required v-model="denumire">
                </fieldset>
                <fieldset class="form-group" v-if="tipActivitate=='materialeSuport'">
                    <label>Disciplina</label>
                    <input type="text" class="form-control" required v-model="denumire">
                </fieldset>
                <fieldset class="form-group" v-if="tipActivitate=='organizari'">
                    <label>Activiati</label>
                    <input type="text" class="form-control" required v-model="denumire">
                </fieldset>
               
               
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import TeachingActivityService from '../services/teachingActivity.service'

export default {
    data () {
      return {
        tipActivitate:"",
        idUser: this.$store.state.auth.user.id,
        denumire:"",
        punctaj: ""
      };
    },
    created(){
        this.tipActivitate = this.$route.params.tipActivitate;
    },

    methods:{
      saveActivity(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          if(this.tipActivitate == "proiecteDidactice")
            this.punctaj = 40
          else if(this.tipActivitate=="materialeSuport")
            this.punctaj = 10
          else
            this.punctaj = 5
          var activityObject={
              idUser: this.idUser,
              denumire: this.denumire,
              tipActivitate : this.tipActivitate,
              punctaj: this.punctaj
          }

          TeachingActivityService.addTeachingActivity(activityObject)
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
