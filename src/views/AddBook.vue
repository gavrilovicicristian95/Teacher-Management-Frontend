<template>
    <v-app>
        <div>
            <h3>Adauga Carte</h3>
            <form @submit="saveBook">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                
                <h6 v-if="bookType=='strainatate'" style="color:grey;">Cărţi ştiinţifice de autor sau capitole de carti( monografii,tratate, indrumare,culegeri) publicate (pentru prima editie* ) 
                    în edituri in strainatate din listele A,B,C SI D din SENSE </h6>
          
                <h6 v-if="bookType=='taraAcreditatCNCS'" style="color:grey;">Cărţi ştiinţifice de autor sau capitole de carti( monografii,tratate, indrumare,culegeri) publicate (pentru prima editie* ) 
                    în edituri ) in tara acreditate de CNCS </h6>
              
                <h6 v-if="bookType=='alteEdituri'" style="color:grey;">Cărţi ştiinţifice de autor sau capitole de carti( monografii,tratate, indrumare,culegeri) publicate (pentru prima editie* ) 
                    în  alte edituri </h6>
           
                <h6 v-if="bookType=='coordStrainatate'" style="color:grey;">Coordonarea şi editarea de volume, competitii ori antologii, 
                    numere speciale de jurnale stiintifice în străinătate in listele A,B,C si D cu recenzare din SENSE si numere speciale in jurnale </h6>
          
                <h6 v-if="bookType=='coordTaraAcreditatCNCS'" style="color:grey;">Coordonarea şi editarea de volume, competitii ori antologii, 
                    numere speciale de jurnale stiintifice în tara in edituri acreditate CNCS </h6>
                <br>

                
                 <v-select 
                    v-model="bookType"
                    :items="bookTypes"
                    :label="bookSelect"
                 
                    outlined
                    class="my-2"
                    
                    ></v-select>
                
                <fieldset class="form-group">
                    <label>Anul publicarii</label>
                    <input type="text" class="form-control" required v-model="anulPublicarii">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.pagini</label>
                    <input type="text" class="form-control" required v-model="nrPagini">
                </fieldset>
                <fieldset class="form-group" v-if="bookType=='alteEdituri' ">
                    <label>Titlu Carte</label>
                    <input type="text" class="form-control" required v-model="titluCarte">
                </fieldset>
                <fieldset class="form-group" v-if="bookType=='strainatate' || bookType=='coordStrainatate'">
                    <label>Titlu Carte publicata in strainatate</label>
                    <input type="text" class="form-control" required v-model="titluCarte">
                </fieldset>
                <fieldset class="form-group" v-if="bookType=='taraAcreditatCNCS'">
                    <label>Titlu Carte recunoscuta CNSC</label>
                    <input type="text" class="form-control" required v-model="titluCarte">
                </fieldset>
                <fieldset class="form-group" v-if="bookType=='coordTaraAcreditatCNCS'">
                    <label>Titlu carte publicata in tara</label>
                    <input type="text" class="form-control" required v-model="titluCarte">
                </fieldset>
                <fieldset class="form-group">
                    <label>Autori</label>
                    <input type="text" class="form-control" required v-model="autori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.Autori</label>
                    <input type="text" class="form-control" required v-model="nrAutori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Editura</label>
                    <input type="text" class="form-control" required v-model="editura">
                </fieldset>
               
               
                
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import BookService from '../services/book.service'

export default {
    data () {
      return {
        anulPublicarii: "",
        nrPagini:"",
        titluCarte: "",
        autori: "",
        nrAutori:"",
        editura:"",
        idUser: this.$store.state.auth.user.id,
        bookTypes: ['strainatate','taraAcreditatCNCS','alteEdituri','coordStrainatate','coordTaraAcreditatCNCS'],
        bookType: null,
        bookSelect: 'Selecteaza tipul editurii',
        punctaj: ""
      };
    },

    methods:{
      saveBook(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var bookObject={
              idUser: this.idUser,
              anulPublicarii: this.anulPublicarii,
              nrPagini: this.nrPagini,
              titluCarte: this.titluCarte,
              autori: this.autori,
              nrAutori: this.nrAutori,
              editura: this.editura,
              punctaj: this.punctaj,
              tipCarte: this.bookType
          }

          BookService.addBook(bookObject)
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
