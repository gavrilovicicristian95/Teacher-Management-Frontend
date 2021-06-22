<template>
    <v-app>
        <div>
            <h3 >Adauga produse/servicii </h3>
            <form @submit="savePatent">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                 <h6 v-if="produsType=='produseStrainatate'" style="color:grey;">Produse si/sau servicii inovative cu impact economic demonstrabil 
                   prin documente emise de autoritati legale(OSIM,RENAR,ASRO) - in strainatate:</h6>
          
                <h6 v-if="produsType=='produseInTara'" style="color:grey;">Produse si/sau servicii inovative cu impact economic demonstrabil 
                  prin documente emise de autoritati legale(OSIM,RENAR,ASRO) - in tara</h6>
                <br>
                  <v-select
                    v-model="produsType"
                    :items="produsTypes"
                    :label="produsSelect"
                    outlined
                    class="my-2"
                    ></v-select>
                <fieldset class="form-group">
                    <label>Anul obtinere brevet</label>
                    <input type="text" class="form-control" required v-model="anObtinere">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu brevet</label>
                    <input type="text" class="form-control" required v-model="titlu">
                </fieldset>
                <fieldset class="form-group">
                    <label>Autor brevet</label>
                    <input type="text" class="form-control" required v-model="autor">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.autori</label>
                    <input type="text" class="form-control" required v-model="nrAutori">
                </fieldset>
               
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import PatentService from '../services/patent.service'

export default {
    data () {
      return {
        anObtinere: "",
        titlu:"",
        autor: "",
        nrAutori: "",
        idUser: this.$store.state.auth.user.id,
        produsTypes: ['produseStrainatate','produseInTara'],
        produsType: 'none',
        produsSelect: 'Selecteaza tipul produsului',
        punctaj: ""
      };
    },

    methods:{
      savePatent(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var patentObject={
              idUser: this.idUser,
              anObtinere: this.anObtinere,
              titlu: this.titlu,
              autor: this.autor,
              nrAutori: this.nrAutori,
              punctaj: this.punctaj,
              tipBrevet: this.produsType
          }

          PatentService.addPatent(patentObject)
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
