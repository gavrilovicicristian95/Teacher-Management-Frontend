<template>
    <v-app>
        <div>
            <h3>Adauga organizare</h3>
            <form @submit="saveInstitutionalActivity">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="institutionalActivityType=='organizariManiferstariInternationaleCoord'" style="color:grey;">Organizare manifestări ştiinţifice(conferinte,congrese) şi şcoli de vară, demonstrabile cu link la pagina web - internationale - coordonator </h6>
                <h6 v-if="institutionalActivityType=='organizariManiferstariInternationaleMembru'" style="color:grey;">Organizare manifestări ştiinţifice(conferinte,congrese) şi şcoli de vară, demonstrabile cu link la pagina web - internationale - membru </h6>
                <h6 v-if="institutionalActivityType=='organizariManiferstariNationaleCoord'" style="color:grey;">Organizare manifestări ştiinţifice(conferinte,congrese) şi şcoli de vară, demonstrabile cu link la pagina web - nationale - coordonator</h6>
                <h6 v-if="institutionalActivityType=='organizariManiferstariNationaleMembru'" style="color:grey;">Organizare manifestări ştiinţifice(conferinte,congrese) şi şcoli de vară, demonstrabile cu link la pagina web - nationale - membru</h6>
                <br>

                
                 <v-select 
                    v-model="institutionalActivityType"
                    :items="institutionalActivityTypes"
                    :label="institutionalActivitySelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Activitati</label>
                    <input type="text" class="form-control" required v-model="activitati">
                </fieldset>
                <fieldset class="form-group">
                    <label>Link la pagina web</label>
                    <input type="text" class="form-control" required v-model="linkPaginaWeb">
                </fieldset>
              
        
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import InstitutionalActivityService from '../services/institutionalActivity.service'

export default {
    data () {
      return {
       linkPaginaWeb: "",
       activitati:"",
      idUser: this.$store.state.auth.user.id,
        institutionalActivityTypes: ['organizariManiferstariInternationaleCoord','organizariManiferstariInternationaleMembru',
        'organizariManiferstariNationaleCoord','organizariManiferstariNationaleMembru'],
        institutionalActivityType: null,
        institutionalActivitySelect: 'Selecteaza :',
        punctaj: ""
      };
    },

    methods:{
      saveInstitutionalActivity(){
        
          var activityObject={
             linkPaginaWeb: this.linkPaginaWeb,
             activitati: this.activitati,
             idUser: this.idUser,
              punctaj: this.punctaj,
              tipActivitateInstitutionala: this.institutionalActivityType
          }

          InstitutionalActivityService.addInstitutionalActivity(activityObject)
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
