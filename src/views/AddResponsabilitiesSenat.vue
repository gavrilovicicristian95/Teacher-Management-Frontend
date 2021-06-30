<template>
    <v-app>
        <div>
            <h3>Adauga responsabilitate</h3>
            <form @submit="saveInstitutionalActivity">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
              
                
                 <v-select 
                    v-model="responsabilityType"
                    :items="responsabilityTypes"
                    :label="responsabilitySelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
               
                <fieldset class="form-group">
                    <label>Nr ani</label>
                    <input type="number" class="form-control" required v-model="nrAni">
                </fieldset>
               
        
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import ResponsabilityTypeService from '../services/responsabilityType.service';
import ResponsabilitiesService from '../services/responsabilites.service';

export default {
    data () {
      return {
       nrAni:"",
      idUser: this.$store.state.auth.user.id,
        responsabilityTypes: [],
        responsabilityType: null,
        responsabilitySelect: 'Selecteaza tip responsabilitate:',
        punctaj: ""
      };
    },

    methods:{
     getResponsabilitiesTypes(){
        ResponsabilityTypeService.getAllResponsabilityTypes("responsabilitatiSenat").then(res =>{
        
          res.data.forEach(element => {
            this.responsabilityTypes.push(element.responsabilityType);
            
          });
          });
         
     },
      saveInstitutionalActivity(){
        
          var responsabilityObject={
            idUser: this.idUser,
             nrAni: this.nrAni,
             responsabilityType: this.responsabilityType,
              punctaj: this.punctaj,
              tipResponsabilitate: "responsabilitatiSenat"
          }

          ResponsabilitiesService.addResponsability(responsabilityObject)
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
    created(){
      this.getResponsabilitiesTypes();
    },
    mounted() {
        this.getResponsabilitiesTypes();
    }
  }
</script>
