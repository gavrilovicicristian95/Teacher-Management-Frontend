<template>
  <v-app> 
    <div>
      <h3>Articole</h3>

        <v-btn filled class="primary" @click.once="addArticle()">
            Adaugă Articol
        </v-btn>
        
        <div>
          <br>
          <v-btn v-if="viewArticles == false" filled class="accent" small @click.once="viewArticles=true;">
            Vezi articolele
          </v-btn> 
        </div>
        
        <v-btn v-if="viewArticles == true" filled class="accent" small @click.once="viewArticles=false;">
            Ascunde articolele
        </v-btn>
        <div style="padding-left: 2em;" v-if="viewArticles == true">
        <br>
        <h4>1. Articole ştiintifice publicate în extenso în reviste cotate Web of Science cu factor de impact</h4>
        <br>
        <v-data-table
          :headers="headersWebScience"
          :items="articlesWebScience"
          :items-per-page="5"
          class="elevation-1">
          <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersWebScience" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',articlesWebScience)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        
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
                    >mdi-pencil
                  </v-icon>
                </template>
                <span>Editeaza</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <br>
        <h4>2. Articole ştiintifice indexate Scopus</h4>
        <br>
        <v-data-table
          :headers="headersScopus"
          :items="articlesIndexScopus"
          :items-per-page="5"
          class="elevation-1">
          <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersScopus" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',articlesIndexScopus)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        <br>
        <h4>3. Articole ştiintifice publicate în extenso în reviste indexate BDI</h4>
        <br>
        <v-data-table
          :headers="headersBDI"
          :items="articlesIndexBDI"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersBDI" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',articlesIndexBDI)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        <br>
        <h4>4. Articole ştiintifice publicate în extenso în reviste de specialitate neindexate</h4>
        <br>
        <v-data-table
          :headers="headersBDI"
          :items="articlesNonIndex"
          :items-per-page="5"
          class="elevation-1">
          <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersBDI" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',articlesNonIndex)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
          </v-data-table>
        <br>
        <h4>5. Articole ştiintifice publicate în extenso in volumele conferinţelor, în dicţionare şi enciclopedii de specialitate</h4>
        <br>
        <v-data-table
          :headers="headersEnciclopedii"
          :items="articlesExtenso"
          :items-per-page="5"
          class="elevation-1">
          <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersEnciclopedii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',articlesExtenso)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </div>
  
    <div>
        <br>
        <h3>Cărți</h3>
          <v-btn filled class="primary " @click.once="addBook()">
            Adaugă Carte
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewBooks == false" filled class="accent" small @click.once="viewBooks=true;">
            Vezi cartile
          </v-btn> 
        </div>
        
        <v-btn v-if="viewBooks == true" filled class="accent" small @click.once="viewBooks=false;">
            Ascunde cartile
        </v-btn>
        
        <div style="padding-left:2em;" v-if="viewBooks==true">
          <br>
        <h3>6.Cărţi ştiinţifice de autor sau capitole de carti( monografii,tratate, indrumare,culegeri) publicate (pentru prima editie* ) în edituri :</h3>
        <br>
        <h4>a) în străinătate din listele A,B,C SI D din SENSE : </h4>
        <br>
        <v-data-table
          :headers="headersStrainatate"
          :items="booksStrainatate"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersStrainatate" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',booksStrainatate)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="viewBook(item.idBook)"
                    
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
                  @click="editBook(item.idBook)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editeaza</span>
              </v-tooltip>
            </template>
        </v-data-table>
        <br>
        <h4>b) în țară acreditate de CNCS:</h4>
        <br>
        <v-data-table
          :headers="headersTaraAcreditatCNCS"
          :items="booksTara"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersTaraAcreditatCNCS" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',booksTara)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        <br>
        <h4>c) alte edituri:</h4>
        <br>
        <v-data-table
          :headers="headersAlteEdituri"
          :items="booksAlteEdituri"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersAlteEdituri" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',booksAlteEdituri)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
      <div style= "padding-left:2em;" v-if="viewBooks == true">
          <br>
        <h3>7. Coordonarea şi editarea de volume, competitii ori antologii,numere speciale de jurnale stiintifice: </h3>
        <br>
        <h4>a) în străinătate din listele A,B,C SI D din SENSE : </h4>
        <br>
        <v-data-table
          :headers="headersCoordStrainatate"
          :items="booksCoordStrainatate"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersCoordStrainatate" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',booksCoordStrainatate)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="viewBook(item.idBook)"
                    
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
                  @click="editBook(item.idBook)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editeaza</span>
              </v-tooltip>
            </template>
        </v-data-table>
        <br>
        <h4>b) în țară acreditate de CNCS:</h4>
        <br>
        <v-data-table
          :headers="headersPublicatTara"
          :items="booksCoordTara"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersPublicatTara" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',booksCoordTara)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
       
      </div>
    </div>
    
    <div>
        <br>
        <h3>Contracte</h3>
       
          <v-btn filled class="primary " @click.once="addContract()">
            Adaugă Contract
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewContracts == false" filled class="accent" small @click.once="viewContracts=true;">
            Vezi contractele
          </v-btn> 
        </div>
        
        <v-btn v-if="viewContracts == true" filled class="accent" small @click.once="viewContracts=false;">
            Ascunde contractele
        </v-btn>
        
      <div v-if="viewContracts == true" style="padding-left:2em;">
          <br>
        <h3>8. Contracte de cercetare ştiinţifică obtinute prin competitie derulate prin Universitate: </h3>
        <br>
        <h4>a) finanţare internationala: director:valoare lei contract UAIC anual/1000lei: </h4>
        <br>
        <v-data-table
          :headers="headersConFinDirector"
          :items="contractsFinInDir"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersConFinDirector" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',contractsFinInDir)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="viewContract(item.idContract)"
                    
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
                  @click="editContract(item.idContract)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editeaza</span>
              </v-tooltip>
            </template>
        </v-data-table>
        <br>
        <h4>b) )finanţare internationala: membru:valoare lei contract UAIC anual/1000lei/nr membrilor echipei de cercetare:</h4>
        <br>
        <v-data-table
          :headers="headersConFinMembru"
          :items="contractsFinInMem"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersConFinMembru" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',contractsFinInMem)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        <br>
        <h4>c) finanţare nationala: director:valoare lei contract UAIC anual/2000lei:</h4>
        <br>
        <v-data-table
          :headers="headersConFinDirector"
          :items="contractsFinNatDir"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersConFinDirector" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',contractsFinNatDir)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        <br>
        <h4>d) )finanţare nationala: membru:valoare lei contract UAIC anual/2000lei/nr membrilor echipei de cercetare:</h4>
        <br>
        <v-data-table
          :headers="headersConFinMembru"
          :items="contractsFinNatMem"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersConFinMembru" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',contractsFinNatMem)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
       
    </div>
    <div>
        <br>
        <h3>Brevete</h3>
       
          <v-btn filled class="primary " @click.once="addPatent()">
            Adaugă brevet
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewPatents == false" filled class="accent" small @click.once="viewPatents=true;">
            Vezi brevetele
          </v-btn> 
        </div>
        
        <v-btn v-if="viewPatents == true" filled class="accent" small @click.once="viewPatents=false;">
            Ascunde brevetele
        </v-btn>
        
      <div v-if="viewPatents == true" style="padding-left:2em;">
          <br>
        <h3>9. Brevete: </h3>
        <br>
        <h4>a) Internaţionale  </h4>
        <br>
        <v-data-table
          :headers="headersBrevete"
          :items="patentsInternationale"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersBrevete" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',patentsInternationale)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="viewBrevet(item.idBrevet)"
                    
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
                  @click="editBrevet(item.idBrevet)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editeaza</span>
              </v-tooltip>
            </template>
        </v-data-table>
        <br>
        <h4>b)Naţional</h4>
        <br>
        <v-data-table
          :headers="headersBrevete"
          :items="patentsNationale"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersBrevete" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',patentsNationale)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </div>
  <div>
        <br>
        <h3>Produse si/sau servicii</h3>
       
          <v-btn filled class="primary " @click.once="addProduct()">
            Adaugă produs
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewProducts == false" filled class="accent" small @click.once="viewProducts=true;">
            Vezi produsele
          </v-btn> 
        </div>
        
        <v-btn v-if="viewProducts == true" filled class="accent" small @click.once="viewProducts=false;">
            Ascunde produsele
        </v-btn>
        
      <div v-if="viewProducts == true" style="padding-left:2em;">
          <br>
        <h3>10. Produse si/sau servicii inovative cu impact economic demonstrabil prin documente emise de autoritati legale(OSIM,RENAR,ASRO) </h3>
        <br>
        <h4>a) in strainatate  </h4>
        <br>
        <v-data-table
          :headers="headersProduse"
          :items="productStrainatate"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersProduse" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',productStrainatate)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="viewProduct(item.idProduct)"
                    
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
                  @click="editProduct(item.idProduct)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editeaza</span>
              </v-tooltip>
            </template>
        </v-data-table>
        <br>
        <h4>b) in tara</h4>
        <br>
        <v-data-table
          :headers="headersProduse"
          :items="productInTara"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersProduse" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',productInTara)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </div>
    <div>
        <br>
        <h3>Citari</h3>
          <v-btn filled class="primary " @click.once="addCitation()">
            Adaugă Citare
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewCitations == false" filled class="accent" small @click.once="viewCitations=true;">
            Vezi citarile
          </v-btn> 
        </div>
        
        <v-btn v-if="viewCitations == true" filled class="accent" small @click.once="viewCitations=false;">
            Ascunde citarile
        </v-btn>
        
        <div style="padding-left:2em;" v-if="viewCitations==true">
          <br>
        <h3>11. Citări şi recenzii in ultimii 5 ani ale creaţiei de autor pentru lucrarile publicate(2) 
          (exclus autocitari directe si indirecte /o citare se va cuantifica o singura data)</h3>
        <br>
        <h4>a)în reviste cotate Web of Science: </h4>
        <br>
        <v-data-table
          :headers="headersRevisteScopusWeb"
          :items="citationsWebScience"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersRevisteScopusWeb" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',citationsWebScience)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="viewCitation(item.idCitation)"
                    
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
                  @click="editCitation(item.idCitation)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editeaza</span>
              </v-tooltip>
            </template>
        </v-data-table>
        <br>
        <h4>b)în reviste indexate Scopus :(</h4>
        <br>
        <v-data-table
          :headers="headersRevisteScopusWeb"
          :items="citationsIndexateScopus"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersRevisteScopusWeb" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',citationsIndexateScopus)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        <br>
        <h4>c)Citare in carti din strainatate sau in reviste BDI:</h4>
        <br>
        <v-data-table
          :headers="headersOtherCitations"
          :items="citationsCartiStrainatate"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersOtherCitations" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',citationsCartiStrainatate)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
         <h4>d)Citare in carti din tara sau in reviste neindexate:</h4>
        <br>
        <v-data-table
          :headers="headersOtherCitations"
          :items="citationsCartiTara"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersOtherCitations" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',citationsCartiTara)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        <br>
        <h4>e) in volumele conferintelor:</h4>
        <br>
        <v-data-table
          :headers="headersOtherCitations"
          :items="citationsVolumeConferinta"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersOtherCitations" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',citationsVolumeConferinta)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        </div>
    </div>
        <div>
        <br>
        <h3>Participari</h3>
          <v-btn filled class="primary " @click.once="addConferenceParticipation()">
            Adaugă participare
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewParticipations == false" filled class="accent" small @click.once="viewParticipations=true;">
            Vezi participarile
          </v-btn> 
        </div>
        
        <v-btn v-if="viewParticipations == true" filled class="accent" small @click.once="viewParticipations=false;">
            Ascunde participarile
        </v-btn>
        
        <div style="padding-left:2em;" v-if="viewParticipations==true">
          <br>
        <h3>12. Participare la conferinte stiintifice si scoli de vara</h3>
        <br>
        <h4>a) in calitate de keynote /invited speaker : </h4>
        <br>
        <v-data-table
          :headers="headersParticipations"
          :items="participationInvitedSpeaker"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersParticipations" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',participationInvitedSpeaker)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="viewParticipation(item.idParticipation)"
                    
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
                  @click="editParticipation(item.idParticipation)"
                    >mdi-pencil</v-icon
                  >
                </template>
                <span>Editeaza</span>
              </v-tooltip>
            </template>
        </v-data-table>
        <br>
        <h4>b) pentru scoli de vara internationale :</h4>
        <br>
        <v-data-table
          :headers="headersParticipations"
          :items="participationScoliVaraInter"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersParticipations" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',participationScoliVaraInter)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        <br>
        <h4>c) pentru scoli de vara nationale:</h4>
        <br>
        <v-data-table
          :headers="headersParticipations"
          :items="participationScoliVaraNat"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersParticipations" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',participationScoliVaraNat)}}</th>
                  </div>
                  <div v-else-if=" i == 0">
                      <th>Total</th>
                  </div>
                  <div v-else>
                      <!-- empty table cells for columns that don't need a sum -->
                  </div>

              </td>
            </tr>
          </template>
        </v-data-table>
        </div>
    </div>
  </v-app> 
</template>

<script>
  import ArticleService from '../services/article.service'
  import BookService from '../services/book.service'
  import ContractService from '../services/contract.service'
  import PatentService from '../services/patent.service'
  import CitationService from '../services/citation.service'
  import ConferenceService from '../services/conference.service'

  export default {
    data () {
      return {
        idUser: this.$store.state.auth.user.id,
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
          { text: 'Titlu Revista, volum, nr', value: 'titluRevistaVolumNr' },
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
          { text: 'Denumire volum conferinta', value: 'denumireVolumConferinta' },
          { text: 'Categorie', value: 'categorie' },
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
          { text: 'Titlu Revista, volum, nr', value: 'titluRevistaVolumNr' },
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
        headersStrainatate:[
           {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Nr.pagini', value: 'nrPagini'},
          { text: 'Titlu carte publicata in strainatate', value: 'titluCarte'},
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori in strainatate', value: 'nrAutori' },
          { text: 'Editura', value: 'editura' },
          { text: 'Punctaj (in strainatate)', value: 'punctaj' },
           {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
        ],
        headersCoordStrainatate:[
           {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Nr.pagini', value: 'nrPagini'},
          { text: 'Titlu carte publicata in strainatate', value: 'titluCarte'},
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori in strainatate', value: 'nrAutori' },
          { text: 'Editura', value: 'editura' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersTaraAcreditatCNCS:[
           {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Nr.pagini', value: 'nrPagini'},
          { text: 'Titlu carte recunoscuta CNCS', value: 'titluCarte'},
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori in strainatate', value: 'nrAutori' },
          { text: 'Editura', value: 'editura' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersPublicatTara:[
           {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Nr.pagini', value: 'nrPagini'},
          { text: 'Titlu carte publicata in tara', value: 'titluCarte'},
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori in strainatate', value: 'nrAutori' },
          { text: 'Editura', value: 'editura' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersAlteEdituri:[
           {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Nr.pagini', value: 'nrPagini'},
          { text: 'Titlu carte', value: 'titluCarte'},
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori in strainatate', value: 'nrAutori' },
          { text: 'Editura', value: 'editura' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersConFinMembru:[
           {
            text: 'Anul obtinerii/ derularii',
            align: 'start',
            sortable: false,
            value: 'anulObtinerii',
          },
          { text: 'Nr.Contract', value: 'nrContract'},
          { text: 'Denumire Contract', value: 'denumireContract'},
          { text: 'Director', value: 'director'},
          { text: 'Nr. membrilor echipei de cercetare', value: 'nrMembrilor'},
          { text: 'Valoare lei contract anual', value: 'valoareLeiContract' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersConFinDirector:[
           {
            text: 'Anul obtinerii/ derularii',
            align: 'start',
            sortable: false,
            value: 'anulObtinerii',
          },
          { text: 'Nr.Contract', value: 'nrContract'},
          { text: 'Denumire Contract', value: 'denumireContract'},
          { text: 'Valoare lei contract anual', value: 'valoareLeiContract' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersBrevete:[
           {
            text: 'An obtinere brevet',
            align: 'start',
            sortable: false,
            value: 'anObtinere',
          },
          { text: 'Titlu brevet', value: 'titlu'},
          { text: 'Autor brevet', value: 'autor'},
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersProduse:[
           {
            text: 'An obtinere produs',
            align: 'start',
            sortable: false,
            value: 'anObtinere',
          },
          { text: 'Titlu produs', value: 'titlu'},
          { text: 'Autor produs/servicii', value: 'autor'},
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersRevisteScopusWeb:[
           {
            text: 'Anul citarii',
            align: 'start',
            sortable: false,
            value: 'anulCitarii',
          },
          { text: 'Titlu articol citat', value: 'titluArticol'},
          { text: 'Autori', value: 'autori'},
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Titlul revistei, volum, numar, unde este citat articolul', value: 'titluVolumNr' },
          { text: 'Factor de impact', value: 'factorImpact' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersOtherCitations:[
            {
            text: 'Anul citarii',
            align: 'start',
            sortable: false,
            value: 'anulCitarii',
          },
          { text: 'Titlu articol citat', value: 'titluArticol'},
          { text: 'Autori', value: 'autori'},
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Titlul monografiei, volum, numar, unde este citat articolul', value: 'titluVolumNr' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        headersParticipations:[
            {
            text: 'Anul publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Titlu lucrare stiintifica', value: 'titlu'},
          { text: 'Autor lucrare', value: 'autor'},
          { text: 'Denumire Conferinta', value: 'denumireConferinta' },
          { text: 'Punctaj', value: 'punctaj' },
        ],
        participationInvitedSpeaker: [],
        participationScoliVaraInter: [],
        participationScoliVaraNat: [],
        articlesEmpty: [],
        articlesWebScience: [],
        articlesIndexScopus: [],
        articlesIndexBDI: [],
        articlesNonIndex: [],
        articlesExtenso: [],
        booksStrainatate: [],
        booksTara: [],
        booksAlteEdituri: [],
        booksCoordStrainatate: [],
        booksCoordTara: [],
        contractsFinInDir: [],
        contractsFinInMem : [],
        contractsFinNatDir: [],
        contractsFinNatMem: [],
        patentsInternationale: [],
        patentsNationale: [],
        productStrainatate: [],
        productInTara: [],
        citationsWebScience: [],
        citationsStrainatate: [],
        citationsIndexateScopus: [],
        citationsCartiStrainatate: [],
        citationsCartiTara: [],
        citationsVolumeConferinta:[],
        viewArticles : false,
        viewBooks : false,
        viewContracts : false,
        viewPatents : false,
        viewProducts : false,
        viewCitations: false,
        viewParticipations: false
      }
    },

    methods:{
      refreshParticipations(){
        ConferenceService.getConferencesByTipConference("invitedSpeaker").then(res =>{
          this.participationInvitedSpeaker=res.data;
        });
        ConferenceService.getConferencesByTipConference("scoliVaraInternationale").then(res =>{
          this.participationScoliVaraInter=res.data;
        });
        ConferenceService.getConferencesByTipConference("scoliVaraNationale").then(res =>{
          this.participationScoliVaraNat=res.data;
        });
      
      },
      refreshCitations(){
        CitationService.getCitationsByTipCitatie("revisteWebOfScience").then(res =>{
          this.citationsWebScience=res.data;
        });
        CitationService.getCitationsByTipCitatie("revisteIndexateScopus").then(res =>{
          this.citationsIndexateScopus=res.data;
        });
        CitationService.getCitationsByTipCitatie("citariCartiStrainatate").then(res =>{
          this.citationsCartiStrainatate=res.data;
        });
        CitationService.getCitationsByTipCitatie("citariCartiInTara").then(res =>{
          this.citationsCartiTara=res.data;
        });
        CitationService.getCitationsByTipCitatie("volumeConferinte").then(res =>{
          this.citationsVolumeConferinta=res.data;
        });
      },
      refreshPatents(){
          PatentService.getPatentsByTipBrevet("breveteInternationale").then(res => {
            this.patentsInternationale = res.data;
         });
         PatentService.getPatentsByTipBrevet("breveteNationale").then(res => {
            this.patentsNationale = res.data;
         });
         PatentService.getPatentsByTipBrevet("produseInTara").then(res => {
            this.productInTara = res.data;
         });
         PatentService.getPatentsByTipBrevet("produseStrainatate").then(res => {
            this.productStrainatate = res.data;
         });
      },
      
      refreshBooks(){
        BookService.getBooksByTipCarte("strainatate").then(res => {
        this.booksStrainatate = res.data;
         });
         BookService.getBooksByTipCarte("taraAcreditatCNCS").then(res => {
        this.booksTara = res.data;
         });
         BookService.getBooksByTipCarte("alteEdituri").then(res => {
        this.booksAlteEdituri = res.data;
         });
         BookService.getBooksByTipCarte("coordStrainatate").then(res => {
        this.booksCoordStrainatate = res.data;
         });
         BookService.getBooksByTipCarte("coordTaraAcreditatCNCS").then(res => {
        this.booksCoordTara = res.data;
         });
      },
      refresContracts(){
        ContractService.getContractByTipContract("finantareInternationalaDirector").then(res => {
          this.contractsFinInDir = res.data;
        });
        ContractService.getContractByTipContract("finantareInternationalaMembru").then(res => {
          this.contractsFinInMem = res.data;
        });
        ContractService.getContractByTipContract("finantareNationalaDirector").then(res => {
          this.contractsFinNatDir = res.data;
        });
        ContractService.getContractByTipContract("finantareNationalaMembru").then(res => {
          this.contractsFinNatMem = res.data;
        });
      },
      refreshArticles(){
        ArticleService.getArticlesByTipArticolAndUserId("webScience",this.idUser).then(res => {
        this.articlesWebScience = res.data;
        console.log('Inainte de articles');
        console.log(this.articlesWebScience);
         });

        ArticleService.getArticlesByTipArticolAndUserId("indexateScopus",this.idUser).then(res => {
        this.articlesIndexScopus = res.data;
        console.log('Inainte de articles');
        console.log(this.articlesIndexScopus);
         });

        ArticleService.getArticlesByTipArticolAndUserId("indexateBDI",this.idUser).then(res => {
        this.articlesIndexBDI = res.data;
        console.log('Inainte de articles');
        console.log(this.articlesIndexBDI);
         });
        
        ArticleService.getArticlesByTipArticolAndUserId("neindexate",this.idUser).then(res => {
        this.articlesNonIndex = res.data;
        console.log('Inainte de articles');
        console.log(this.articlesNonIndex);
         });
        
        ArticleService.getArticlesByTipArticolAndUserId("volumeConferinte",this.idUser).then(res => {
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
      viewBook(idBook){
        console.log(idBook);
        this.$router.push(`/editBook/${idBook}`);
      },
      editBook(idBook){
        console.log(idBook);
        this.$router.push(`/editBook/${idBook}`)
      },

      addArticle(){
        this.$router.push({
        name: 'addArticle',
      });
      },
      addBook(){
        this.$router.push({
        name: 'addBook',
      });
      },
      addContract(){
        this.$router.push({
        name: 'addContract',
      });
      },
      addPatent(){
        this.$router.push({
        name: 'addPatent',
      });
      },
      addProduct(){
        this.$router.push({
        name: 'addProduct',
      });
      },
      addCitation(){
        this.$router.push({
        name: 'addCitation',
      });
      },
      addConferenceParticipation(){
         this.$router.push({
        name: 'addConferenceParticipation',
      });
      },
      sumField(key,data) {
        // sum data in give key (property)
        return data.reduce((a, b) => a + (b[key] || 0), 0)
    }
    
    },

    created() {
      this.refreshArticles();
      this.refreshBooks();
      this.refresContracts();
      this.refreshPatents();
      this.refreshCitations();
      this.refreshParticipations();
    },
    mounted(){
      this.refreshArticles();
      this.refreshBooks();
      this.refresContracts();
      this.refreshPatents();
      this.refreshCitations();
      this.refreshParticipations();
    }
  }
</script>
