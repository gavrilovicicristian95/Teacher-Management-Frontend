<template>
    <v-app>
        <div>
            
            <h3>Editeaza articolul</h3>
           
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                <h6 v-if="article.tipArticol=='webScience'" style="color:grey;">Articole ştiintifice publicate în extenso în reviste cotate Web of Science cu factor de impact </h6>
          
                <h6 v-if="article.tipArticol=='indexateScopus'" style="color:grey;">Articole ştiintifice indexate Scopus</h6>
              
                <h6 v-if="article.tipArticol=='indexateBDI'" style="color:grey;">Articole ştiintifice publicate în extenso în reviste indexate BDI</h6>
           
                <h6 v-if="article.tipArticol=='neindexate'" style="color:grey;">Articole ştiintifice publicate în extenso în reviste de specialitate neindexate </h6>
          
                <h6 v-if="article.tipArticol=='volumeConferinte'" style="color:grey;">Articole ştiintifice publicate în extenso in volumele conferinţelor, în dicţionare şi enciclopedii de specialitate </h6>
                
                <v-btn  @click="resetData">Reset data </v-btn>
              
                <br>
          
                <form @submit="updateArticle"  @change="infoChanged=true;">
               
                    
                <fieldset class="form-group" >
                    <label>Anul publicarii</label>
                    <input type="number" min="1999" step="1" max="2021" class="form-control" required v-model="article.anulPublicarii">
                </fieldset>
                <fieldset class="form-group" >
                    <label>Titlu Articol</label>
                <input type="text"  class="form-control" required v-model="article.titluArticol">
                </fieldset>
                <fieldset class="form-group">
                    <label>Autori</label>
                    <input type="text" pattern="([\w-]((\s)[\w-])?(,)?(\s)?)*" class="form-control" required v-model="article.autori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.Autori</label>
                    <input type="number" class="form-control" required v-model="article.nrAutori">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu,Revista,VolumNr</label>
                    <input type="text" pattern="[\w\s]+,(\s)?[\w\s]+,(\s)?[\d]+(.[\d]+)*(,[\d]+)*"  class="form-control" required v-model="article.titluRevistaVolumNr" >
                </fieldset>
                <fieldset class="form-group" v-if="article.tipArticol=='webScience'">
                    <label>Factor Impact</label>
                    <input type="number" class="form-control"  v-model="article.factoriImpact">
                </fieldset>
                <fieldset class="form-group" v-if="article.tipArticol=='indexateScopus'">
                    <label>SJR</label>
                    <input type="number" class="form-control"  v-model="article.sjr">
                </fieldset>
                <fieldset class="form-group" v-if="article.tipArticol=='volumeConferinte'">
                    <label>Denumire volum conferinta</label>
                    <input type="text" class="form-control" required v-model="article.denumireVolumConferinta">
                </fieldset>
                <fieldset class="form-group" v-if="article.tipArticol=='volumeConferinte'">
                    <label>Categorie</label>
                    <input type="text" class="form-control" required v-model="article.categorie">
                </fieldset>
               
                <button  class="btn btn-success" :disabled="!this.infoChanged"  type="submit">Update</button>
                
                
              
            </form>
        </div>
    </v-app>
</template>

<script>

import ArticleService from '../services/article.service'
//import VFormBase from 'vuetify-form-base'; 

export default {
    //components:{ VFormBase },
    data () {
      return {
        infoChanged: false,
        id: this.$route.params.id,
       
        article: {},
        articleCopy: {}
      
      };
    },
    created() {
           console.log(this.id)
            ArticleService.getArticleByIdArticol(this.id).then(res => {
              this.article = res.data;
              this.articleCopy=JSON.parse(JSON.stringify(res.data));
             
         });
         console.log(this.article)
         
        
            
        },
    methods:{
      
      resetData(){
          
          this.article=JSON.parse(JSON.stringify(this.articleCopy));
          this.infoChanged=false;
          console.log(this.articleCopy.anulPublicarii)
      },
       
      updateArticle(){
       
          var articleObject={
              idArticol: this.article.idArticol,
              idUser: this.article.idUser,
              anulPublicarii: this.article.anulPublicarii,
              titluArticol: this.article.titluArticol,
              autori: this.article.autori,
              nrAutori: this.article.nrAutori,
              titluRevistaVolumNr: this.article.titluRevistaVolumNr,
              factoriImpact: this.article.factoriImpact,
              sjr: this.article.sjr,
              punctaj: this.article.punctaj,
              tipArticol: this.article.tipArticol,
              denumireVolumConferinta : this.article.denumireVolumConferinta,
              categorie: this.article.categorie
          }

          ArticleService.addArticle(articleObject)
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
