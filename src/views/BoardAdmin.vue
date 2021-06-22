<template>
<v-app>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
  <div>
        <br>
        <h3>Tipuri de responsabilitati</h3>
       
          <v-btn filled class="primary " v-if="addResponsabilityClick == false" @click.once="toggle()">
            Adaugă nou tip de responsabilitate
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewResponsabilities == false" filled class="accent" small @click.once="viewResponsabilities=true;">
            Vezi tipurile de responsabilitati
          </v-btn> 
        </div>
        
        <v-btn v-if="viewResponsabilities == true" filled class="accent" small @click.once="viewResponsabilities=false;">
            Ascunde tipurile de responsabilitati
        </v-btn>
        
      <div v-if="viewResponsabilities == true" style="padding-left:2em;">
        <br>

        <v-data-table
          :headers="headersTipuriResponsabilitati"
          :items="responsabilityTypes"
          :items-per-page="5"
          class="elevation-1"
        >
        </v-data-table>
        </div>
      </div>
      <div v-if="addResponsabilityClick == true">
             <form @submit="save">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                
                <fieldset class="form-group" >
                    <label>Tip responsabilitate</label>
                    <input type="text" class="form-control" required v-model="responsabilityType">
                </fieldset>
               <fieldset class="form-group" >
                    <label>Nr.puncte anual</label>
                    <input type="text" class="form-control" required v-model="nrPuncteAnual">
                </fieldset>
               
               
                <button class="btn btn-success" type="submit">Save</button>
            </form>
            <br>
          <v-btn filled class="primary " x-small v-if="addResponsabilityClick == true" @click.once="toggle()">
            hide
          </v-btn>
          
      </div>
     <div>
        <br>
        <h3>Formule articole</h3>
      
          <div>
          <br>
          <v-btn v-if="viewArticleFormulas == false" filled class="accent" small @click.once="viewArticleFormulas=true;">
            Vezi formulele
          </v-btn> 
        </div>
        
        <v-btn v-if="viewArticleFormulas == true" filled class="accent" small @click.once="viewArticleFormulas=false;">
            Ascunde formulele
        </v-btn>
        
      <div v-if="viewArticleFormulas == true" style="padding-left:2em;">
        <br>

        <v-data-table
          :headers="headersArticleFormulas"
          :items="articleFormulas"
          :items-per-page="5"
          class="elevation-1"
        >
        </v-data-table>
        </div>
      </div>
      
  </v-app>
  
</template>

<script>
import UserService from '../services/user.service';
import ResponsabilityTypeService from '../services/responsabilityType.service';
import ArticleFormulasService from '../services/articleFormulas.service';
export default {
  name: 'Admin',
  data() {
    return {
      content: '',
      responsabilityType: "",
      nrPuncteAnual: "",
      viewResponsabilities : false,
      viewArticleFormulas : false,
      headersTipuriResponsabilitati: [
        { text: 'Tip responsabilitate', 
          align: 'start',
          value: 'responsabilityType' },
           { text: 'Nr.puncte anual', value: 'nrPuncteAnual' },
      ],
      headersArticleFormulas: [
        {
        text: 'Formula', 
          align: 'start',
          value: 'formula' },
           { text: 'tipArticol', value: 'tipArticol' },
        { text: 'coeficientInmultireFactorImpact', value: 'coeficientInmultireFactorImpact' },
        { text: 'coeficientInmultireSJR', value: 'coeficientInmultireSJR' },
        { text: 'coeficientScadereNrAutori', value: 'coeficientScadereNrAutori' },
        { text: 'maxSecondArgument', value: 'maxSecondArgument' },
        { text: 'puncte', value: 'puncte' },
        
      ],
      articleFormulas:[],
      responsabilityTypes: [],
      addResponsabilityClick: false
    };
  },
  methods:{
    refreshThesisCoordinations(){
          ResponsabilityTypeService.getAllResponsabilityTypes().then(res =>{
          this.responsabilityTypes=res.data;
          });
         
        },
        refreshArticleFormulas(){
          ArticleFormulasService.getAllArticlesFormulas().then(res =>{
          this.articleFormulas=res.data;
          });
         
        },
        save(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var responsabilityObject={
             
              responsabilityType: this.responsabilityType,
              nrPuncteAnual: this.nrPuncteAnual
          }

          ResponsabilityTypeService.addResponsabilityType(responsabilityObject)
          .then(response => {
            console.log("AM INTRAT IN THEN RESPONSE");
        
            console.log(response.data);
          })
          .catch(e => {
             console.log(e);
             this.errors=e.message;
          });

       
      },
      toggle(){
        console.log("AM INTRAT IN toggle");
        if(this.addResponsabilityClick == false) 
          this.addResponsabilityClick = true; 
        else 
          this.addResponsabilityClick = false;
      }
         
    }
  ,
  created() {
        this.refreshThesisCoordinations();
        this.refreshArticleFormulas();
     },
  mounted() {
    this.refreshThesisCoordinations();
     this.refreshArticleFormulas();
    UserService.getAdminBoard().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>
