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
        <h3> Responsabilităţi în cadrul Universităţii, facultăţilor şi în cadrul departamentelor conexe activităţilor de cercetare
 </h3>
        <v-data-table
          :headers="headersTipuriResponsabilitati"
          :items="responsabilityTypesUniv"
          :items-per-page="5"
          class="elevation-1"
        >
         <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="editResponsability(item)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editeaza</span>
            </v-tooltip>
            <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteResponsability(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <br>
        <h3> Responsabilitati în Senatul Universitatii, in Consiliul facultăţii, departamentului
</h3>
        <v-data-table
          :headers="headersTipuriResponsabilitati"
          :items="responsabilityTypesSenat"
          :items-per-page="5"
          class="elevation-1"
        >
           <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="editResponsability(item)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editeaza</span>
            </v-tooltip>
            <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="deleteResponsability(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
        </div>
      </div>
      <div >
        <v-dialog v-model="addResponsabilityClick" max-width="800px" >
          <v-card style="padding-left:2em; padding-right:2em;">
            <v-card-title class="text-h5">Adauga o noua responsabilitate</v-card-title>
             <form @submit="save" >
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                 <v-select
                    v-model="respType"
                    :items="respTypes"
                    :label="respSelect"
                    outlined
                    class="my-2"
                    ></v-select>
               
                <fieldset class="form-group" >
                    <label>Denumire responsabilitate</label>
                    <input type="text" class="form-control" required v-model="responsabilityType">
                </fieldset>
               <fieldset class="form-group" >
                    <label>Nr.puncte anual</label>
                    <input type="number" class="form-control" required v-model="nrPuncteAnual">
                </fieldset>
               
               <div style="display: flex;
	flex-direction: column;
	align-self: flex-start;">
                <button class="btn btn-success" type="submit" >Save</button>
                <v-btn filled  v-if="addResponsabilityClick == true" @click.once="toggle()"> Cancel
                   </v-btn>
                </div>
           
         
            </form>
            <br>
          
          </v-card>
          </v-dialog>
          
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
           {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
      ],
      respTypes: ['responsabilitatiUniversitate','responsabilitatiSenat'],
        respType: 'none',
        respSelect: 'Selecteaza tipul de responsabilitate',
      headersArticleFormulas: [
        {
        text: 'Formula', 
          align: 'start',
          value: 'formula' },
           { text: 'tipActivitate', value: 'tipActivitate' },
           {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
        
      ],
      articleFormulas:[],
      responsabilityTypesUniv: [],
      responsabilityTypesSenat: [],
      addResponsabilityClick: false
    };
  },
  methods:{
    refreshThesisCoordinations(){
          ResponsabilityTypeService.getAllResponsabilityTypes("responsabilitatiUniversitate").then(res =>{
          this.responsabilityTypesUniv=res.data;
          });
          ResponsabilityTypeService.getAllResponsabilityTypes("responsabilitatiSenat").then(res =>{
          this.responsabilityTypesSenat=res.data;
          });
         
        },
        refreshArticleFormulas(){
          ArticleFormulasService.getAllArticlesFormulas().then(res =>{
          this.articleFormulas=res.data;
          });
         
        },
        editResponsability(item){
          console.log(item)
        },
        deleteResponsability(item){

          console.log(item)
        },
        save(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var responsabilityObject={
             tipResponsabilitate: this.respType,
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
