<template>
  <v-app> 
    <div>
      <h4>1. Articole ştiintifice publicate în extenso în reviste cotate Web of Science cu factor de impact</h4>
      <v-data-table
        :headers="headersWebScience"
        :items="articles"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>

      <h4>2. Articole ştiintifice indexate Scopus</h4>
      <v-data-table
        :headers="headersScopus"
        :items="articlesEmpty"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>

      <h4>3. Articole ştiintifice publicate în extenso în reviste indexate BDI</h4>
      <v-data-table
        :headers="headersScopus"
        :items="articlesEmpty"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>

      <h4>4. Articole ştiintifice publicate în extenso în reviste de specialitate neindexate</h4>
      <v-data-table
        :headers="headersScopus"
        :items="articlesEmpty"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
      
      <h4>5. Articole ştiintifice publicate în extenso in volumele conferinţelor, în dicţionare şi enciclopedii de specialitate</h4>
      <v-data-table
        :headers="headersEnciclopedii"
        :items="articlesEmpty"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </div>
  </v-app> 
</template>

<script>
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
          { text: 'Titlu Arcticol', value: 'titluArticol' },
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Titlu Revista, volum, nr', value: 'titluRevista' },
          { text: 'SJR', value: 'SJR' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersExtenso:[
           {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Titlu Arcticol', value: 'titluArticol' },
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
          { text: 'Titlu Arcticol', value: 'titluArticol' },
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
          { text: 'Titlu Arcticol', value: 'titluArticol' },
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
          { text: 'Titlu Arcticol', value: 'titluArticol' },
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Titlu Revista, volum, nr', value: 'titluRevista' },
          { text: 'Factor de impact', value: 'factorImpact' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        articlesEmpty:[],
        articles: [
          {
            anulPublicarii: 1995,
            titluArticol: 'Articol Nr 1',
            autori: 'Autor Nr 1',
            nrAutori: 2,
            titluRevista: "Titlu Nr 1",
            factorImpact: 'Factor Impact nr 1',
            punctaj: 28,
          },
          {
            anulPublicarii: 2001,
            titluArticol: 'Articol Nr 2',
            autori: 'Autor Nr 2',
            nrAutori: 1,
            titluRevista: "Titlu Nr 2",
            factorImpact: 'Factor Impact nr 2',
            punctaj: 35,
          },
         {
            anulPublicarii: 2003,
            titluArticol: 'Articol Nr 3',
            autori: 'Autor Nr 3',
            nrAutori: 1,
            titluRevista: "Titlu Nr 3",
            factorImpact: 'Factor Impact nr 3',
            punctaj: 42,
          },
          {
            anulPublicarii: 1990,
            titluArticol: 'Articol Nr 4',
            autori: 'Autor Nr 4',
            nrAutori: 2,
            titluRevista: "Titlu Nr 4",
            factorImpact: 'Factor Impact nr 4',
            punctaj: 12,
          },
          {
            anulPublicarii: 1995,
            titluArticol: 'Articol Nr 5',
            autori: 'Autor Nr 5',
            nrAutori: 4,
            titluRevista: "Titlu Nr 5",
            factorImpact: 'Factor Impact nr 5',
            punctaj: 80,
          },
          {
            anulPublicarii: 2010,
            titluArticol: 'Articol Nr 6',
            autori: 'Autor Nr 6',
            nrAutori: 2,
            titluRevista: "Titlu Nr 6",
            factorImpact: 'Factor Impact nr 6',
            punctaj: 50,
          },
          {
            anulPublicarii: 2007,
            titluArticol: 'Articol Nr 7',
            autori: 'Autor Nr 7',
            nrAutori: 2,
            titluRevista: "Titlu Nr 7",
            factorImpact: 'Factor Impact nr 7',
            punctaj: 17,
          },
          {
            anulPublicarii: 2013,
            titluArticol: 'Articol Nr 8',
            autori: 'Autor Nr 8',
            nrAutori: 1,
            titluRevista: "Titlu Nr 8",
            factorImpact: 'Factor Impact nr 8',
            punctaj: 92,
          },
          {
            anulPublicarii: 2016,
            titluArticol: 'Articol Nr 9',
            autori: 'Autor Nr 9',
            nrAutori:3,
            titluRevista: "Titlu Nr 9",
            factorImpact: 'Factor Impact nr 9',
            punctaj: 28,
          },
          {
            anulPublicarii: 2010,
            titluArticol: 'Articol Nr 10',
            autori: 'Autor Nr 10',
            nrAutori: 2,
            titluRevista: "Titlu Nr 10",
            factorImpact: 'Factor Impact nr 10',
            punctaj: 58,
          },
        ],
      }
    },
  }
</script>