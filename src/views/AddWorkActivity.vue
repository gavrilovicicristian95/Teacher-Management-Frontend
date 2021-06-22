<template>
    <v-app>
        <div>
            <h3 >Adauga Indreptare practice,fise de lucru, ghiduri etc. publicate cu ISBN</h3>
            <form @submit="saveWorkActivity">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                <fieldset class="form-group">
                    <label>Anul publicarii</label>
                    <input type="text" class="form-control" required v-model="anulPublicarii">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu manual/curs</label>
                    <input type="text" class="form-control" required v-model="titlu">
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
import WorkActivityService from '../services/workActivity.service'

export default {
    data () {
      return {
        anulPublicarii: "",
        titlu:"",
        autori: "",
        nrAutori: "",
        nrPagini: "",
        idUser: this.$store.state.auth.user.id,
        punctaj: ""
      };
    },

    methods:{
      saveWorkActivity(){
         
          var activityObject={
              idUser: this.idUser,
              anulPublicarii: this.anulPublicarii,
              titluManualCurs: this.titluManualCurs,
              autori: this.autori,
              nrAutori: this.nrAutori,
              nrPagini: this.nrPagini,
              punctaj: this.punctaj,
              tipCursManual: this.courseType
          }

          WorkActivityService.addWorkActivity(activityObject)
          .then(response => {

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
