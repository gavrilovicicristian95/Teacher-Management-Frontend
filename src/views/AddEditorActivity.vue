<template>
    <v-app>
        <div>
            <h3>Adauga activitate editoriala</h3>
            <form @submit="saveActivity">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="editorActivityType=='editorArticoleWebOfScience'" style="color:grey;">Membru al Academiei Române </h6>
          
                <h6 v-if="editorActivityType=='membruEchipaArticoleWebOfScience'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
               <h6 v-if="editorActivityType=='editorRevisteIndexateBDI'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
               <h6 v-if="editorActivityType=='membruEchipaRevisteIndexateBDI'" style="color:grey;">Membru al Academiilor nationale din străinătate </h6>
              
                <br>

                
                 <v-select 
                    v-model="editorActivityType"
                    :items="editorActivityTypes"
                    :label="editorActivitySelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Perioada editarii</label>
                    <input type="text" class="form-control" required v-model="perioadaEditarii">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu revista, volum, nr.</label>
                    <input type="text" class="form-control" required v-model="titluRevistaVolum">
                </fieldset>
                <fieldset class="form-group">
                    <label>Numele si prenumele membrului</label>
                    <input type="text" class="form-control" required v-model="numePrenume">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlul editurii</label>
                    <input type="text" class="form-control" required v-model="titlulEditurii">
                </fieldset>
              
        
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import EditorActivityService from '../services/editorActivity.service'

export default {
    data () {
      return {
       perioadaEditarii: "",
       titluRevistaVolum:"",
      numePrenume:"",
      idUser: this.$store.state.auth.user.id,
      titlulEditurii:"",
        
        editorActivityTypes: ['editorArticoleWebOfScience','membruEchipaArticoleWebOfScience','editorRevisteIndexateBDI','membruEchipaRevisteIndexateBDI'],
        editorActivityType: null,
        editorActivitySelect: 'Selecteaza tipul membrului',
        punctaj: ""
      };
    },

    methods:{
      saveActivity(){
        
          var activityObject={
              idUser: this.idUser,
             numePrenume: this.numePrenume,
             perioadaEditarii: this.perioadaEditarii,
             titlulEditurii: this.titlulEditurii,
             titluRevistaVolum: this.titluRevistaVolum,
              punctaj: this.punctaj,
              tipActivitateEditoriala: this.editorActivityType
          }

          EditorActivityService.addEditorActivity(activityObject)
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
