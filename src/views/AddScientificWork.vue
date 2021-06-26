<template>
    <v-app>
        <div>
            <h3>Adauga lucrare stiintifica</h3>
            <form @submit="saveScientificWork">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="scientificWorkType=='lucrariRevisteWebOfScience'" style="color:grey;">Lucrări ştiinţifice în rezumat(se va puncta o singura data publicarea in rezumat ori in extenso)
                     în reviste cotate Web of Science cu factor de impact </h6>
          
                <h6 v-if="scientificWorkType=='lucrariVolumeStrainatate'" style="color:grey;">Lucrări ştiinţifice în rezumat(se va puncta o singura data publicarea in rezumat ori in extenso)
                    în volume din strainatate fara factor de impact </h6>
              
              
                <br>

                
                 <v-select 
                    v-model="scientificWorkType"
                    :items="scientificWorkTypes"
                    :label="scifSelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Anul publicarii</label>
                    <input type="text" class="form-control" required v-model="anulPublicarii">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu lucrare stiintifica</label>
                    <input type="text" class="form-control" required v-model="titluLucrare">
                </fieldset>
                <fieldset class="form-group" v-if="scientificWorkType=='alteEdituri' ">
                    <label>Autor lucrare</label>
                    <input type="text" class="form-control" required v-model="autorLucrare">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.Autori</label>
                    <input type="text" class="form-control" required v-model="nrAutori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu revista</label>
                    <input type="text" class="form-control" required v-model="titluRevista">
                </fieldset>
                <fieldset class="form-group" >
                    <label>Factor de impact</label>
                    <input type="text" class="form-control" required v-model="factorImpact">
                </fieldset>
                <fieldset class="form-group">
                    <label>Denumire volum</label>
                    <input type="text" class="form-control" required v-model="denumireVolum">
                </fieldset>
                <fieldset class="form-group">
                    <label>Categorie Conferinta CORE</label>
                    <input type="text" class="form-control" required v-model="categorie">
                </fieldset>
              
               
               
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import ScientificWorkService from '../services/scientificWork.service'

export default {
    data () {
      return {
        anulPublicarii: "",
        titluLucrare:"",
        autorLucrare: "",
        nrAutori: "",
        titluRevista:"",
        factorImpact:"",
        idUser: this.$store.state.auth.user.id,
        denumireVolum:"",
        categorie:"",
        scientificWorkTypes: ['lucrariRevisteWebOfScience','lucrariVolumeStrainatate'],
        scientificWorkType: null,
        scifSelect: 'Selecteaza tipul lucrarii stiintifice',
        punctaj: ""
      };
    },

    methods:{
      saveScientificWork(){
        
          var scientificWorkObject={
              idUser: this.idUser,
              anulPublicarii: this.anulPublicarii,
              nrAutori: this.nrAutori,
              titluRevista: this.titluRevista,
              titluLucrare: this.titluLucrare,
              autorLucrare: this.autorLucrare,
              categorie: this.categorie,
              denumireVolum: this.denumireVolum,
              factorImpact: this.factorImpact,
              punctaj: this.punctaj,
              tipLucrare: this.scientificWorkType
          }

          ScientificWorkService.addScientificWork(scientificWorkObject)
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
