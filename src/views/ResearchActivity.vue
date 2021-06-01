<template>
  <v-app> 
    <div>
      <h4>1. Articole ştiintifice publicate în extenso în reviste cotate Web of Science cu factor de impact</h4>
      <v-col cols="2">
        <v-btn filled class="primary info--text my-3" @click.once="addArticle()">
          Adauga Articol
        </v-btn>
      </v-col>
      <v-data-table
        :headers="headersWebScience"
        :items="articlesWebScience"
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
                  @click="viewArticle(item.idArticol)"
                  >mdi-file-eye</v-icon
                >
              </template>
              <span>Vizualizeaza</span>
            </v-tooltip>
            <v-tooltip>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  @click="editArticle(item.idArticol)"
                  >mdi-pencil</v-icon
                >
              </template>
              <span>Editeaza</span>
            </v-tooltip>
          </template>
      </v-data-table>

      <h4>2. Articole ştiintifice indexate Scopus</h4>
      <v-data-table
        :headers="headersScopus"
        :items="articlesIndexScopus"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>

      <h4>3. Articole ştiintifice publicate în extenso în reviste indexate BDI</h4>
      <v-data-table
        :headers="headersExtenso"
        :items="articlesIndexBDI"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>

      <h4>4. Articole ştiintifice publicate în extenso în reviste de specialitate neindexate</h4>
      <v-data-table
        :headers="headersExtenso"
        :items="articlesNonIndex"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
      
      <h4>5. Articole ştiintifice publicate în extenso in volumele conferinţelor, în dicţionare şi enciclopedii de specialitate</h4>
      <v-data-table
        :headers="headersEnciclopedii"
        :items="articlesExtenso"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </div>
  </v-app> 
</template>

<script>
  import ArticleService from '../services/article.service'

  export default {
    data () {
      return {
        headersScopus:[
          {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Titlu Articol', value: 'titluArticol' },
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Titlu Revista, volum, nr', value: 'titluRevistaVolumNr' },
          { text: 'SJR', value: 'sjr' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersExtenso:[
           {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Titlu Articol', value: 'titluArticol' },
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Titlu Revista, volum, nr', value: 'titluRevista' },
          { text: 'SJR', value: 'SJR' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersEnciclopedii:[
           {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Titlu Articol', value: 'titluArticol' },
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Denumire volum conferinta', value: 'titluRevista' },
          { text: 'Categorie', value: 'titluRevista' },
          { text: '', value: 'SJR' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersBDI:[
           {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Titlu Articol', value: 'titluArticol' },
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Titlu Revista, volum, nr', value: 'titluRevista' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersWebScience: [
          {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Titlu Articol', value: 'titluArticol' },
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Titlu Revista, volum, nr', value: 'titluRevistaVolumNr' },
          { text: 'Factor de impact', value: 'factoriImpact' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
        ],
        articlesEmpty: [],
        articlesWebScience: [],
        articlesIndexScopus: [],
        articlesIndexBDI: [],
        articlesNonIndex: [],
        articlesExtenso: []
      }
    },

    methods:{
      refreshArticles(){
        ArticleService.getArticlesByTipArticol("webScience").then(res => {
        this.articlesWebScience = res.data;
        console.log('Inainte de articles');
        console.log(this.articlesWebScience);
         });

        ArticleService.getArticlesByTipArticol("indexateScopus").then(res => {
        this.articlesIndexScopus = res.data;
        console.log('Inainte de articles');
        console.log(this.articlesIndexScopus);
         });

        ArticleService.getArticlesByTipArticol("indexateBDI").then(res => {
        this.articlesIndexBDI = res.data;
        console.log('Inainte de articles');
        console.log(this.articlesIndexBDI);
         });
        
        ArticleService.getArticlesByTipArticol("neindexate").then(res => {
        this.articlesNonIndex = res.data;
        console.log('Inainte de articles');
        console.log(this.articlesNonIndex);
         });
        
        ArticleService.getArticlesByTipArticol("publicateExtenso").then(res => {
        this.articlesExtenso = res.data;
        console.log('Inainte de articles');
        console.log(this.articlesExtenso);
         });
      },

      viewArticle(idArticol){
        console.log(idArticol);
        this.$router.push(`/editArticle/${idArticol}`);
      },
      editArticle(idArticol){
        console.log(idArticol);
        this.$router.push(`/editArticle/${idArticol}`)
      },

      addArticle(){
        this.$router.push({
        name: 'addArticle',
      });
      }
    },

    created() {
      this.refreshArticles();
    },
    mounted(){
      this.refreshArticles();
    }
  }
</script>