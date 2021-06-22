<template>
    <v-app>
       <v-form ref="form" lazy-validation>
      
         <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                     
                        v-model="this.article.anulPublicarii"
                        label="Dessert name"
                      ></v-text-field>
                    </v-col>
                    
                  </v-row>
                </v-container>
              </v-card-text>
      <v-text-field
        v-model="article.anulPublicarii"
        label="Description"
        
      ></v-text-field>

     

      <v-divider class="my-5"></v-divider>

    

    </v-form>
        <div>
            <h1>your id is {{ id }}</h1>
            <h3>Modifica articol</h3>
            
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
              
            
               
        </div>
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
        id: 0,
        article : null,
        myValue: {
        anulPublicarii: '111',
        titluArticol: "1111",
        autori: "111",
        nrAutori: "111",
        
      },
       mySchema: {
        anulPublicarii: { type: 'text', label: 'Name' },
        titluArticol: { type: 'text', label: 'Password' },
        autori: { type: 'text', label: 'Email' },
        nrAutori: { type: 'text', label: 'Checkbox' }
         }
      
      };
    },
    created() {
            this.id = this.$route.params.id;
            this.article=this.getArticleById();
            this.myValue.anulPublicarii=this.article.anulPublicarii;
            
        },
    methods:{
        getArticleById(){
            var article  = ArticleService.getArticleByIdArticol(this.id)
            return article

        },
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
