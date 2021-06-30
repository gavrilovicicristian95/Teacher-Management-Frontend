<template>
    <v-app>
        <div>
            <h3>Adauga comisii</h3>
            <form @submit="saveCommission">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="commissionType=='membruComisiiUniversitateAvizateSenat'" style="color:grey;">
                 Membru în comisii ale universitatii avizate de Senat(Comisia de Etica,
                Comisia pentru managementul calitatii ,Comisia de regulamente,etc.)</h6>
          
                <h6 v-if="commissionType=='membruComisiiConcursPostDidactic'" style="color:grey;">Membru în comisii de concurs in vederea ocuparii unui post didactic ori de cercetare in invatamantul universitar</h6>
              
               <h6 v-if="commissionType=='membruComisiiDoctoratStrainatate'" style="color:grey;">. Membru comisii de doctorat (admitere, indrumare si sustinere publica) - in strainatate</h6>
               <h6 v-if="commissionType=='membruComisiiDoctoratTara'" style="color:grey;">. Membru comisii de doctorat (admitere, indrumare si sustinere publica) - in tara </h6>
              
                <br>

                
                 <v-select 
                    v-model="commissionType"
                    :items="commissionTypes"
                    :label="commissionSelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Comisii</label>
                    <input type="text" class="form-control" required v-model="comisii">
                </fieldset>
               
              
        
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import CommissionsService from '../services/commissions.service'

export default {
    data () {
      return {
       comisii:"",
      idUser: this.$store.state.auth.user.id,
        commissionTypes: ['membruComisiiUniversitateAvizateSenat','membruComisiiConcursPostDidactic','membruComisiiDoctoratStrainatate','membruComisiiDoctoratTara'],
        commissionType: null,
        commissionSelect: 'Selecteaza :',
        punctaj: ""
      };
    },

    methods:{
      saveCommission(){
        
          var commissionObject={
             comisii: this.comisii,
             idUser: this.idUser,
              punctaj: this.punctaj,
              tipComisie: this.commissionType
          }

          CommissionsService.addCommission(commissionObject)
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
