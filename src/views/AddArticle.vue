<template>
    <v-app>
        <div>
            <h3>Adauga Articol</h3>
            <form @submit="saveArticle">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                <fieldset class="form-group">
                    <label>Anul publicarii</label>
                    <input type="text" class="form-control" required v-model="anulPublicarii">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu Articol</label>
                    <input type="text" class="form-control" required v-model="titluArticol">
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
                    <label>Titlu,Revista,VolumNr</label>
                    <input type="text" class="form-control" required v-model="titluRevistaVolumNr">
                </fieldset>
                <fieldset class="form-group">
                    <label>Factor Impact</label>
                    <input type="text" class="form-control"  v-model="factoriImpact">
                </fieldset>
                <fieldset class="form-group">
                    <label>SJR</label>
                    <input type="text" class="form-control"  v-model="sjr">
                </fieldset>
                <fieldset class="form-group">
                    <label>Punctaj</label>
                    <input type="text" class="form-control" required v-model="punctaj">
                </fieldset>
                    <v-select
                    v-model="articleType"
                    :items="articleTypes"
                    :label="articleSelect"
                    outlined
                    class="my-2"
                    ></v-select>
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import ArticleService from '../services/article.service'

export default {
    data () {
      return {
        anulPublicarii: "",
        titluArticol: "",
        autori: "",
        nrAutori:"",
        idUser: this.$store.state.auth.user.id,
        articleTypes: ['webScience','indexateScopus', 'indexateBDI', 'neindexate', 'publicateExtenso'],
        articleType: 'none',
        articleSelect: 'Selecteaza tipul articolului',
        titluRevistaVolumNr: "",
        factoriImpact: "",
        sjr: "",
        punctaj: ""
      };
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
              tipArticol: this.articleType
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
