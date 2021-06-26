<template>
    <v-app>
        <div>
            <h3>Adauga activitate</h3>
            <form @submit="saveInstitutionalActivity">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="institutionalActivityType=='contributiiOrganizareActivitati'" style="color:grey;">Membru al Academiei Române </h6>
          
                <h6 v-if="institutionalActivityType=='activitatiPromovareUAICStrainatate'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
               <h6 v-if="institutionalActivityType=='activitatiPromovareUAICInTara'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
               <h6 v-if="institutionalActivityType=='responsabilEvaluari'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
                <br>

                
                 <v-select 
                    v-model="institutionalActivityType"
                    :items="institutionalActivityTypes"
                    :label="institutionalActivitySelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Anul</label>
                    <input type="text" class="form-control" required v-model="anul">
                </fieldset>
                <fieldset class="form-group">
                    <label>Activitati</label>
                    <input type="text" class="form-control" required v-model="activitati">
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
       anul: "",
       activitati:"",
      idUser: this.$store.state.auth.user.id,
        institutionalActivityTypes: ['contributiiOrganizareActivitati','activitatiPromovareUAICStrainatate','activitatiPromovareUAICInTara','responsabilEvaluari'],
        institutionalActivityType: null,
        institutionalActivitySelect: 'Selecteaza :',
        punctaj: ""
      };
    },

    methods:{
      saveInstitutionalActivity(){
        
          var activityObject={
             anul: this.anul,
             activitati: this.activitati,
              punctaj: this.punctaj,
              tipActivitateInstitutionala: this.institutionalActivityType
          }

          InstitutionalActivityService.addInstitutionalActivity(activityObject)
          .then(response => {
    
            this.$router.push(`/researchActivity`);
            console.log(response.data);
          })
          .catch(e => {
             console.log(e);
             this.errors=e.message;
          });


            this.$router.push(`/researchActivity`);
      }
    },
    mounted() {

    }
  }
</script>
