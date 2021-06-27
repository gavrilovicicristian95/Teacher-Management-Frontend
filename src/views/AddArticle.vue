<template>
    <v-app>
        <div>
            
            <h3>Adauga Articol</h3>
            
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                <h6 v-if="articleType=='webScience'" style="color:grey;">Articole ştiintifice publicate în extenso în reviste cotate Web of Science cu factor de impact </h6>
          
                <h6 v-if="articleType=='indexateScopus'" style="color:grey;">Articole ştiintifice indexate Scopus</h6>
              
                <h6 v-if="articleType=='indexateBDI'" style="color:grey;">Articole ştiintifice publicate în extenso în reviste indexate BDI</h6>
           
                <h6 v-if="articleType=='neindexate'" style="color:grey;">Articole ştiintifice publicate în extenso în reviste de specialitate neindexate </h6>
          
                <h6 v-if="articleType=='volumeConferinte'" style="color:grey;">Articole ştiintifice publicate în extenso in volumele conferinţelor, în dicţionare şi enciclopedii de specialitate </h6>
                <br>
                <form @submit="saveArticle">
                <v-select
                    v-model="articleType"
                    :items="articleTypes"
                    :label="articleSelect"
                    outlined
                    class="my-2"
                    @change="isValid=true;"
                    ></v-select>
                    
                <fieldset class="form-group">
                    <label>Anul publicarii</label>
                    <input type="number" min="1999" step="1" max="2021" class="form-control" required v-model="anulPublicarii">
                </fieldset>
                <fieldset class="form-group" >
                    <label>Titlu Articol</label>
                <input type="text"  class="form-control" required v-model="titluArticol">
                </fieldset>
                <fieldset class="form-group">
                    <label>Autori</label>
                    <input type="text" pattern="([\w-]((\s)[\w-])?(,)?(\s)?)*" class="form-control" required v-model="autori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.Autori</label>
                    <input type="number" class="form-control" required v-model="nrAutori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu,Revista,VolumNr</label>
                    <input type="text" pattern="[\w\s]+,(\s)?[\w\s]+,(\s)?[\d]+(.[\d]+)*(,[\d]+)*"  class="form-control" required v-model="titluRevistaVolumNr" >
                </fieldset>
                <fieldset class="form-group" v-if="articleType=='webScience'">
                    <label>Factor Impact</label>
                    <input type="number" class="form-control"  v-model="factoriImpact">
                </fieldset>
                <fieldset class="form-group" v-if="articleType=='indexateScopus'">
                    <label>SJR</label>
                    <input type="number" class="form-control"  v-model="sjr">
                </fieldset>
                <fieldset class="form-group" v-if="articleType=='volumeConferinte'">
                    <label>Denumire volum conferinta</label>
                    <input type="text" class="form-control" required v-model="denumireVolumConferinta">
                </fieldset>
                <fieldset class="form-group" v-if="articleType=='volumeConferinte'">
                    <label>Categorie</label>
                    <input type="text" class="form-control" required v-model="categorie">
                </fieldset>
               
                <button  class="btn btn-success" :disabled="!this.isValid" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import ArticleService from '../services/article.service'

export default {
    data () {
      return {
        isValid: false,
        year: new Date().getFullYear(),
        anulPublicarii: "",
        titluArticol: "",
        autori: "",
        nrAutori:"",
        idUser: this.$store.state.auth.user.id,
        articleTypes: ['webScience','indexateScopus', 'indexateBDI', 'neindexate', 'volumeConferinte'],
        articleType: 'none',
        articleSelect: 'Selecteaza tipul articolului',
        titluRevistaVolumNr: "",
        factoriImpact: "",
        sjr: "",
        denumireVolumConferinta: "",
        categorie: "",
        punctaj: ""
      };
    },
    created() {
            this.id = this.$route.params.id;
        },
    methods:{
      saveArticle(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var articleObject={
              idUser: this.idUser,
              anulPublicarii: this.anulPublicarii,
              titluArticol: this.titluArticol,
              autori: this.autori,
              nrAutori: this.nrAutori,
              titluRevistaVolumNr: this.titluRevistaVolumNr,
              factoriImpact: this.factoriImpact,
              sjr: this.sjr,
              punctaj: this.punctaj,
              tipArticol: this.articleType,
              denumireVolumConferinta : this.denumireVolumConferinta,
              categorie: this.categorie
          }

          ArticleService.addArticle(articleObject)
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
