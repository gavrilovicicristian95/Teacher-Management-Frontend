<template>
    <v-app>
        <div>
            <h3>Adauga referent</h3>
            <h3>Referent (peer-reviewer)-cu prezentarea unei dovezi</h3>
            <form @submit="saveReferent">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="peerReviewerType=='referentCartiSpecialitateInStrainatate'" style="color:grey;">Membru al Academiei Române </h6>
          
                <h6 v-if="peerReviewerType=='referentCartiSpecialitateInTara'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
               <h6 v-if="peerReviewerType=='referentRevisteSpecialitate'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
               <h6 v-if="peerReviewerType=='referentConferinteIndexateCORE'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
                <br>

                
                 <v-select 
                    v-model="peerReviewerType"
                    :items="peerReviewerTypes"
                    :label="peerReviewerSelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Titlul cartii</label>
                    <input type="text" class="form-control" required v-model="titlulCartiiRevistei">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlul revistei</label>
                    <input type="text" class="form-control" required v-model="titlulCartiiRevistei">
                </fieldset>
                <fieldset class="form-group">
                    <label>Anul publicarii</label>
                    <input type="text" class="form-control" required v-model="anulPublicarii">
                </fieldset>
         
               
        
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import PeerReviewerService from '../services/peerReviewer.service'

export default {
    data () {
      return {
       titlulCartiiRevistei: "",
       anulPublicarii:"",
      idUser: this.$store.state.auth.user.id,
        peerReviewerTypes: ['referentCartiSpecialitateInStrainatate','referentCartiSpecialitateInTara','referentRevisteSpecialitate','referentConferinteIndexateCORE'],
        peerReviewerType: null,
        peerReviewerSelect: 'Selecteaza :',
        punctaj: ""
      };
    },

    methods:{
      saveReferent(){
        
          var peerReviewerObject={
              idUser: this.idUser,
             titlulCartiiRevistei: this.titlulCartiiRevistei,
             anulPublicarii: this.anulPublicarii,
              punctaj: this.punctaj,
              tipReferent: this.peerReviewerType
          }

          PeerReviewerService.addPeerReviewer(peerReviewerObject)
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
