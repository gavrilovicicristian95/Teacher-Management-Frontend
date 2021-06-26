<template>
    <v-app>
        <div>
            <h3>Adauga invitatie</h3>
            <form @submit="saveUniInv">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="uniInvType=='profesorInvitatInStrainatate'" style="color:grey;">Profesor/cercetator invitat la universităţi, centre si institute de cercetare(la initiativa probata a institutiei 
gazda) cu identificarea temei de cercetare în străinatate </h6>
          
                <h6 v-if="uniInvType=='profesorInvitatInTara'" style="color:grey;">Profesor/cercetator invitat la universităţi, centre si institute de cercetare(la initiativa probata a institutiei 
gazda) cu identificarea temei de cercetare în tara </h6>
              
              
                <br>

                
                 <v-select 
                    v-model="uniInvType"
                    :items="uniInvTypes"
                    :label="univInvSelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Denumire Universitate</label>
                    <input type="text" class="form-control" required v-model="denumireUniversitate">
                </fieldset>
                <fieldset class="form-group">
                    <label>Denumire activitate</label>
                    <input type="text" class="form-control" required v-model="denumireActivitate">
                </fieldset>
                <fieldset class="form-group" v-if="uniInvType=='alteEdituri' ">
                    <label>Tema de cercetare</label>
                    <input type="text" class="form-control" required v-model="temaCercetare">
                </fieldset>
                
              
        
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import UniversityInvitationService from '../services/universityInvitations.service'

export default {
    data () {
      return {
       denumireUniversitate: "",
       denumireActivitate:"",
       temaCercetare: "",
        idUser: this.$store.state.auth.user.id,
        
        uniInvTypes: ['profesorInvitatInStrainatate','profesorInvitatInTara'],
        uniInvType: null,
        univInvSelect: 'Selecteaza tipul invitatiei',
        punctaj: ""
      };
    },

    methods:{
      saveUniInv(){
        
          var uniInvObject={
              idUser: this.idUser,
             denumireActivitate: this.denumireActivitate,
             denumireUniversitate: this.denumireUniversitate,
             temaCercetare: this.temaCercetare,
              punctaj: this.punctaj,
              tipLucrare: this.uniInvType
          }

          UniversityInvitationService.addUniversityInvitation(uniInvObject)
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
