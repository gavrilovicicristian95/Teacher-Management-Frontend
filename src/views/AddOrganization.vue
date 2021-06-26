<template>
    <v-app>
        <div>
            <h3>Adauga organizare</h3>
            <form @submit="saveInstitutionalActivity">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="organizationType=='coordonatorOrganizareManifestariInternationale'" style="color:grey;">Membru al Academiei Române </h6>
          
                <h6 v-if="organizationType=='membruOrganizareManifestariInternationale'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
               <h6 v-if="organizationType=='coordonatorOrganizareManifestariNationale'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
               <h6 v-if="organizationType=='membruOrganizareManifestariNationale'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
                <br>

                
                 <v-select 
                    v-model="organizationType"
                    :items="organizationTypes"
                    :label="organizationSelect"
                 
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
import InstitutionalActivityService from '../services/organization.service'

export default {
    data () {
      return {
       linkPaginaWeb: "",
       activitati:"",
      idUser: this.$store.state.auth.user.id,
        organizationTypes: ['coordonatorOrganizareManifestariInternationale',
        'membruOrganizareManifestariInternationale',
        'coordonatorOrganizareManifestariNationale','membruOrganizareManifestariNationale'],
        organizationType: null,
        organizationSelect: 'Selecteaza tip organizare:',
        punctaj: ""
      };
    },

    methods:{
      saveInstitutionalActivity(){
        
          var organizationObject={
             linkPaginaWeb: this.linkPaginaWeb,
             activitati: this.activitati,
              punctaj: this.punctaj,
              tipActivitateInstitutionala: this.organizationType
          }

          InstitutionalActivityService.addInstitutionalActivity(organizationObject)
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
