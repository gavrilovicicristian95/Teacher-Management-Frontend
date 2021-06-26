<template>
    <v-app>
        <div>
            <h3>Adauga</h3>
            <h3>Coordonator,Membru in comitetul stiintific al conferintelor,congreselor, scolilor de vara</h3>
            <form @submit="saveCommittee">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="committeeMemberType=='coordonatorEvenimenteInternationale'" style="color:grey;">Membru al Academiei Române </h6>
          
                <h6 v-if="committeeMemberType=='membruEvenimenteInternationale'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
               <h6 v-if="committeeMemberType=='coordonatorEvenimenteNationale'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
               <h6 v-if="committeeMemberType=='membruEvenimenteNationale'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
                <br>

                
                 <v-select 
                    v-model="committeeMemberType"
                    :items="committeeMemberTypes"
                    :label="committeeMemberSelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Perioada evenimentului</label>
                    <input type="text" class="form-control" required v-model="perioadaEvenimentului">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu conferintei</label>
                    <input type="text" class="form-control" required v-model="titluConferintei">
                </fieldset>
                <fieldset class="form-group">
                    <label>Rang conferinta</label>
                    <input type="text" class="form-control" required v-model="rangConferinta">
                </fieldset>
                <fieldset class="form-group">
                    <label>Numele si prenumele membrului</label>
                    <input type="text" class="form-control" required v-model="numePrenume">
                </fieldset>
               
        
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import CommitteeService from '../services/scientificCommitte.service'

export default {
    data () {
      return {
       perioadaEvenimentului: "",
       titlulConferintei:"",
      numePrenume:"",
      idUser: this.$store.state.auth.user.id,
      rangConferinta:"",
        
        committeeMemberTypes: ['coordonatorEvenimenteInternationale','membruEvenimenteInternationale','coordonatorEvenimenteNationale','membruEvenimenteNationale'],
        committeeMemberType: null,
        committeeMemberSelect: 'Selecteaza :',
        punctaj: ""
      };
    },

    methods:{
      saveCommittee(){
        
          var committeeObject={
              idUser: this.idUser,
             numePrenume: this.numePrenume,
             perioadaEvenimentului: this.perioadaEvenimentului,
             titlulConferintei: this.titlulConferintei,
             rangConferinta: this.rangConferinta,
              punctaj: this.punctaj,
              tipMembruComitet: this.committeeMemberType
          }

          CommitteeService.addScientificCommittee(committeeObject)
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
