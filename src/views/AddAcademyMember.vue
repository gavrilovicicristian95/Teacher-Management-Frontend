<template>
    <v-app>
        <div>
            <h3>Adauga</h3>
            <form @submit="saveMember">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="academyMemberType=='membruAcademiaRomana'" style="color:grey;">Membru al Academiei Române </h6>
          
                <h6 v-if="academyMemberType=='membruAcademiiNationale'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
              
                <br>

                
                 <v-select 
                    v-model="academyMemberType"
                    :items="academyMemberTypes"
                    :label="academyMemberSelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Numele si prenumele membrului</label>
                    <input type="text" class="form-control" required v-model="numePrenume">
                </fieldset>
                <fieldset class="form-group">
                    <label>Numele Academiei</label>
                    <input type="text" class="form-control" required v-model="numeAcademie">
                </fieldset>
           
              
        
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import AcademyMemberService from '../services/academyMember.service'

export default {
    data () {
      return {
        numePrenume: "",
       numeAcademie:"",
      
        idUser: this.$store.state.auth.user.id,
        
        academyMemberTypes: ['membruAcademiaRomana','membruAcademiiNationale'],
        academyMemberType: null,
        academyMemberSelect: 'Selecteaza tipul membrului',
        punctaj: ""
      };
    },

    methods:{
      saveMember(){
        
          var memberObject={
              idUser: this.idUser,
             numePrenume: this.numePrenume,
             numeAcademie: this.numeAcademie,
              punctaj: this.punctaj,
              tipMembru: this.academyMemberType
          }

          AcademyMemberService.addAcademyMember(memberObject)
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
