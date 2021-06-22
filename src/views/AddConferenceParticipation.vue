<template>
    <v-app>
        <div>
            <h3>Adauga participare</h3>
            <form @submit="saveConference">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="conferenceType=='invitedSpeaker'" style="color:grey;">Participare la conferinte stiintifice si scoli de vara 
                     in calitate de keynote /invited speaker </h6>
          
                <h6 v-if="conferenceType=='scoliVaraInternationale'" style="color:grey;">Participare la conferinte stiintifice si scoli de vara 
                     pentru scoli de vara internationale </h6>
              
                <h6 v-if="conferenceType=='scoliVaraNationale'" style="color:grey;">Participare la conferinte stiintifice si scoli de vara 
                     pentru scoli de vara nationale </h6>
                <br>

                
                 <v-select 
                    v-model="conferenceType"
                    :items="conferenceTypes"
                    :label="conferenceSelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Anul publicarii</label>
                    <input type="text" class="form-control" required v-model="anulPublicarii">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu lucrare stiintifica</label>
                    <input type="text" class="form-control" required v-model="titlu">
                </fieldset>
                <fieldset class="form-group">
                    <label>Autor lucrare</label>
                    <input type="text" class="form-control" required v-model="autor">
                </fieldset>
                <fieldset class="form-group">
                    <label>Denumire Conferinta</label>
                    <input type="text" class="form-control" required v-model="denumireConferinta">
                </fieldset>
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import ConferenceService from '../services/conference.service'

export default {
    data () {
      return {
        anulPublicarii: "",
        titlu: "",
        autor: "",
        denumireConferinta:"",
        idUser: this.$store.state.auth.user.id,
        conferenceTypes: ['invitedSpeaker','scoliVaraInternationale','scoliVaraNationale'],
        conferenceType: null,
        conferenceSelect: 'Selecteaza tipul participarii',
        punctaj: ""
      };
    },

    methods:{
      saveConference(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var conferenceObject={
              idUser: this.idUser,
              anulPublicarii: this.anulPublicarii,
              titlu: this.titlu,
              autor: this.autor,
              denumireConferinta: this.denumireConferinta,
              punctaj: this.punctaj,
              tipConferinta: this.conferenceType
          }

          ConferenceService.addConference(conferenceObject)
          .then(response => {
            console.log("AM INTRAT IN THEN RESPONSE");
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
