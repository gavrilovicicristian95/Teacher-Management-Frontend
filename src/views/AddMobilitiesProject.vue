<template>
    <v-app>
        <div>
            <h3>Adauga </h3>
            <form @submit="saveProject">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="projectType=='coordonatorProiecteMobilitati'" style="color:grey;">Proiecte pentru mobilităţi şi tip grant - coordonator </h6>
                <h6 v-if="projectType=='membruProiecteMobilitati'" style="color:grey;">Proiecte pentru mobilităţi şi tip grant - membru </h6>
                
                <br>

                
                 <v-select 
                    v-model="projectType"
                    :items="projectTypes"
                    :label="projectSelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Denumire proiect</label>
                    <input type="text" class="form-control" required v-model="denumireProiect">
                </fieldset>
                 <fieldset class="form-group" v-if="projectType == 'membruProiecteMobilitati'">
                    <label>Director de proiect</label>
                    <input type="text" class="form-control" required v-model="directorProiect">
                </fieldset>
                <fieldset class="form-group">
                    <label>Valoarea proiectului (euro)</label>
                    <input type="text" class="form-control" required v-model="valoareProiectEuro">
                </fieldset>
                <fieldset class="form-group" v-if="projectType == 'membruProiecteMobilitati'">
                    <label>Nr. membrilor echipei</label>
                    <input type="text" class="form-control" required v-model="nrMembriEchipa">
                </fieldset>
              
        
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import MobilitiesProjectsService from '../services/mobilities.service'

export default {
    data () {
      return {
    denumireProiect: "",
    valoareProiectEuro: "",
    directorProiect:"",
    nrMembriEchipa: "",
      idUser: this.$store.state.auth.user.id,
        projectTypes: ['coordonatorProiecteMobilitati','membruProiecteMobilitati'],
        projectType: null,
        projectSelect: 'Selecteaza :',
        punctaj: ""
      };
    },

    methods:{
      saveProject(){
        
          var projectObject={
             denumireProiect: this.denumireProiect,
             valoareProiectEuro: this.valoareProiectEuro,
             directorProiect: this.directorProiect,
             nrMembriEchipa: this.nrMembriEchipa,
             idUser: this.idUser,
              punctaj: this.punctaj,
              tipProiect: this.projectType
          }

          MobilitiesProjectsService.addMobility(projectObject)
          .then(response => {
    
            this.$router.push(`/institutionalActivity`);
            console.log(response.data);
          })
          .catch(e => {
             console.log(e);
             this.errors=e.message;
          });


            this.$router.push(`/institutionalActivity`);
      }
    },
    mounted() {

    }
  }
</script>
