<template>
    <v-app>
        <div>
            <h3 >Adauga Citare/Recenzie</h3>
            <form @submit="saveCitation">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                 <h6 v-if="citationType=='revisteWebOfScience'" style="color:grey;">Citări şi recenzii in ultimii 5 ani ale 
                     creaţiei de autor pentru lucrarile publicate în reviste cotate Web of Science</h6>
          
                <h6 v-if="citationType=='revisteIndexateScopus'" style="color:grey;">Citări şi recenzii in ultimii 5 ani ale 
                     creaţiei de autor pentru lucrarile publicate în reviste Indexate Scopus</h6>
                <h6 v-if="citationType=='citariCartiStrainatate'" style="color:grey;">Citare in carti din strainatate sau in reviste BDI</h6>
                <h6 v-if="citationType=='citariCartiInTara'" style="color:grey;">Citare in carti din tara sau in reviste neindexate</h6>
                <h6 v-if="citationType=='volumeConferinte'" style="color:grey;">Citări şi recenzii in ultimii 5 ani ale 
                     creaţiei de autor pentru lucrarile publicate în volumele conferintelor</h6>
                <br>
                  <v-select
                    v-model="citationType"
                    :items="citationTypes"
                    :label="citationSelect"
                    outlined
                    class="my-2"
                    ></v-select>
                <fieldset class="form-group">
                    <label>Anul citarii</label>
                    <input type="text" class="form-control" required v-model="anulCitarii">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu articol</label>
                    <input type="text" class="form-control" required v-model="titluArticol">
                </fieldset>
                <fieldset class="form-group">
                    <label>Autori</label>
                    <input type="text" class="form-control" required v-model="autori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.autori</label>
                    <input type="text" class="form-control" required v-model="nrAutori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlul revistei, 
                            volum, număr, 
                            unde este citat 
                            articolul
                    </label>
                    <input type="text" class="form-control" required v-model="titluVolumNr">
                </fieldset>
                <fieldset v-if="citationType == 'revisteWebOfScience' || citationType=='revisteIndexateScopus'" class="form-group">
                    <label>Factor impact</label>
                    <input type="text" class="form-control" required v-model="factorImpact">
                </fieldset>
               
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import CitationService from '../services/citation.service'

export default {
    data () {
      return {
        anulCitarii: "",
        titluArticol:"",
        autori: "",
        nrAutori: "",
        idUser: this.$store.state.auth.user.id,
        titluVolumNr : "",
        factorImpact :"",
        citationTypes: ['revisteWebOfScience','revisteIndexateScopus','citariCartiStrainatate','citariCartiInTara','volumeConferinte'],
        citationType: 'none',
        citationSelect: 'Selecteaza tipul brevetului',
        punctaj: ""
      };
    },

    methods:{
      saveCitation(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var citationObject={
              idUser: this.idUser,
              anulCitarii: this.anulCitarii,
              titluArticol: this.titluArticol,
              autori: this.autori,
              nrAutori: this.nrAutori,
              titluVolumNr : this.titluVolumNr,
              factorImpact : this.factorImpact,
              punctaj: this.punctaj,
              tipCitatie: this.citationType
          }

          CitationService.addCitation(citationObject)
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
