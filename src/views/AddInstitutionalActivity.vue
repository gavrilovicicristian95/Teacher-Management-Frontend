<template>
    <v-app>
        <div>
            <h3>Adauga activitate</h3>
            <form @submit="saveInstitutionalActivity">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="institutionalActivityType=='contributiiOrganizareActivitati'" style="color:grey;">Contribuţii la organizarea activităţii didactice şi administrative: orar, comisie de licenta/disertatie, comisie de admitere,coordonare programe de 
studii,tutoriat, coordonare cercuri, conferinte studentesti, membru permanent/secretar comisii de licenta ori disertatie </h6>
          
                <h6 v-if="institutionalActivityType=='activitatiPromovareUAICStrainatate'" style="color:grey;">Activitati de promovare UAIC;Caravana UAIC;participare targuri,expozitii,evenimente institutionale. 
- in strainatate </h6>
              
               <h6 v-if="institutionalActivityType=='activitatiPromovareUAICInTara'" style="color:grey;">Activitati de promovare UAIC;Caravana UAIC;participare targuri,expozitii,evenimente institutionale. 
 - in tara</h6>
               <h6 v-if="institutionalActivityType=='responsabilEvaluari'" style="color:grey;">responsabil evaluari ARACIS,UEFISCDI,CNECSDTI,CNATDCU </h6>
              
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
