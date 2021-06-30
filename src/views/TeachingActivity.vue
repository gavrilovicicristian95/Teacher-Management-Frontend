<template>
  <v-app>
    <div>
        <br>
        <h3>1. Evaluare studenţi :suma punctajelor anuale obtinute in perioada care face obiectul raportarii </h3>
       
      <div style="padding-left:2em;">
         
        <v-data-table
           :headers="headersPunctaje" 
          :items="punctajeEvaluareStudenti"
          :items-per-page="10"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersPunctaje" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',punctajeEvaluareStudenti)}}</th>
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
        <h3>Cursuri si manuale</h3>
       
          <v-btn filled class="primary " @click.once="addCourse()">
            Adaugă curs/manual
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewCourses == false" filled class="accent" small @click.once="viewCourses=true;">
            Vezi cursurile
          </v-btn> 
        </div>
        
        <v-btn v-if="viewCourses == true" filled class="accent" small @click.once="viewCourses=false;">
            Ascunde cursurile
        </v-btn>
        
      <div v-if="viewCourses == true" style="padding-left:2em;">
          <br>
        <h3>2. Cursuri si manuale universitare(pentru prima editie) </h3>
        <br>
        <h4>a)publicate la edituri acreditate:</h4>
        <br>
        <v-data-table
          :headers="headersCursuriSiManuale"
          :items="coursesPublicateEdituriAcreditate"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersCursuriSiManuale" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',coursesPublicateEdituriAcreditate)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <br>
        <h4>b)publicate la alte edituri :</h4>
        <br>
        <v-data-table
          :headers="headersCursuriSiManuale"
          :items="coursesPublicateAlteEdituri"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersCursuriSiManuale" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',coursesPublicateAlteEdituri)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <br>
        <h4>c)* pentru editiile revizuite si adaugite, se va acorda jumatate din punctaj</h4>
        <br>
        <v-data-table
          :headers="headersCursuriSiManuale"
          :items="coursesRevizuite"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersCursuriSiManuale" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',coursesRevizuite)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
    </div>
    <div>
        <br>
        <h3>3. Proiecte didactice( înfiinţare/dotare laboratoare, săli workspace, biblioteci proprii)</h3>
       
          <v-btn filled class="primary " @click.once="addActivity('proiecteDidactice')">
            Adauga proiect didactic
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewProiecteDidactice == false" filled class="accent" small @click.once="viewProiecteDidactice=true;">
            Vezi proiectele didactice
          </v-btn> 
        </div>
        
        <v-btn v-if="viewProiecteDidactice == true" filled class="accent" small @click.once="viewProiecteDidactice=false;">
            Ascunde proiectele didactice
        </v-btn>
        
      <div v-if="viewProiecteDidactice == true" style="padding-left:2em;">
         
        <v-data-table
          :headers="headersProiecteDidactice"
          :items="proiecteDidactice"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersProiecteDidactice" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',proiecteDidactice)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
      </div>
      <div>
        <br>
        <h3>4. Materiale suport curs, seminar, lucrari practice (se va puncta o singura data pentru fiecare perioada de 5 ani)</h3>
       
          <v-btn filled class="primary " @click.once="addActivity('materialeSuport')">
            Adauga material
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewMateriale == false" filled class="accent" small @click.once="viewMateriale=true;">
            Vezi materialele
          </v-btn> 
        </div>
        
        <v-btn v-if="viewMateriale == true" filled class="accent" small @click.once="viewMateriale=false;">
            Ascunde materialele
        </v-btn>
        
      <div v-if="viewMateriale == true" style="padding-left:2em;">
         
        <v-data-table
          :headers="headersMaterialeSuport"
          :items="materialeSuportCurs"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersMaterialeSuport" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',materialeSuportCurs)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
      </div>
      <div>
        <br>
        <h3>5. Indreptare practice,fise de lucru, ghiduri etc. publicate cu ISBN</h3>
       
          <v-btn filled class="primary " @click.once="addWorkActivity()">
            Adauga indreptate/fisa/ghid
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewFiseLucru == false" filled class="accent" small @click.once="viewFiseLucru=true;">
            Vezi indreptarile/fisele
          </v-btn> 
        </div>
        
        <v-btn v-if="viewFiseLucru == true" filled class="accent" small @click.once="viewFiseLucru=false;">
            Ascunde indreptarile/fisele
        </v-btn>
        
      <div v-if="viewFiseLucru == true" style="padding-left:2em;">
         
        <v-data-table
          :headers="headersFiseDeLucru"
          :items="fiseDeLucru"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersFiseDeLucru" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',fiseDeLucru)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
      </div>
      <div>
        <br>
        <h3>6. Organizare aplicaţii, practică de teren, laborator şi coopertari cu mediul de afaceri: 5 puncte pentru fiecare activitate</h3>
       
          <v-btn filled class="primary " @click.once="addActivity('organizari')">
            Adauga organizare
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewOrganizari == false" filled class="accent" small @click.once="viewOrganizari=true;">
            Vezi organizarile
          </v-btn> 
        </div>
        
        <v-btn v-if="viewOrganizari == true" filled class="accent" small @click.once="viewOrganizari=false;">
            Ascunde organizarile
        </v-btn>
        
      <div v-if="viewOrganizari == true" style="padding-left:2em;">
         
        <v-data-table
          :headers="headersOrganizareAplicatii"
          :items="organizareAplicatii"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersOrganizareAplicatii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',organizareAplicatii)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
      </div>
      <div>
        <br>
        <h3>Coordonari lucrari licente/disertatie/doctorat</h3>
       
          <v-btn filled class="primary " @click.once="addThesisCoord()">
            Adaugă coordonare
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewCoordonariTeza == false" filled class="accent" small @click.once="viewCoordonariTeza=true;">
            Vezi coordonarile
          </v-btn> 
        </div>
        
        <v-btn v-if="viewCoordonariTeza == true" filled class="accent" small @click.once="viewCoordonariTeza=false;">
            Ascunde coordonarile
        </v-btn>
        
      <div v-if="viewCoordonariTeza == true" style="padding-left:2em;">
          <br>
        <h3>7. Conducere de doctorat </h3>
        <h4>a) 20 puncte pentru fiecare doctorand care a finalizat teza</h4>
        <br>
        <v-data-table
          :headers="headersConducereDoctorat"
          :items="conduceriDoctorat"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersConducereDoctorat" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',conduceriDoctorat)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <br>
        <h3>8. Coordonarea lucrarilor de licenta/disertatie/lucrari de grad</h3>
        <h4>a) 2 puncte/lucrare de licenta finalizata</h4>
        <br>
        <v-data-table
          :headers="headersCoordonareLicenta"
          :items="coordonariLicenta"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersCoordonareLicenta" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',coordonariLicenta)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
        <br>
        <h4>b) 3 puncte/lucrare de disertatie sau de grad finalizata</h4>
        <br>
        <v-data-table
          :headers="headersCoordonareDisertatie"
          :items="coordonariDisertatie"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersCoordonareDisertatie" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',coordonariDisertatie)}}</th>
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
                    @click="editActivity(item)"
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
                    @click="deleteActivity(item)"
                    >mdi-delete
                  </v-icon>
                </template>
                <span>Sterge</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
    </div>
   
  </v-app> 
</template>
  
<script>
    import CourseService from '../services/courses.service'
    import TeachingActivityService from '../services/teachingActivity.service'
    import WorkActivityService from '../services/workActivity.service'
    import ThesisCoordinationService from '../services/thesisCoordination.service'
    export default {
    data () {
      return {
        idUser: this.$store.state.auth.user.id,
        headersCursuriSiManuale:[
          {
            text: 'Anul Publicarii',
            align: 'start',
            sortable: false,
            value: 'anulPublicarii',
          },
          { text: 'Titlu manual/curs', value: 'titluManualCurs' },
          { text: 'Nr.pagini', value: 'nrPagini' },
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersProiecteDidactice: [
          {
            text: 'Denumire proiect',
            align: 'start',
            sortable: false,
            value: 'denumire',
          },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersPunctaje: [
          {
            text : 'An',
            align: 'start',
            sortable: false,
            value: 'tipActivitate',
          },
          { text: 'Punctaj',value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersMaterialeSuport: [
          {
            text: 'Disciplina',
            align: 'start',
            sortable: false,
            value: 'denumire',
          },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersOrganizareAplicatii: [
          {
            text: 'Activitate',
            align: 'start',
            sortable: false,
            value: 'denumire',
          },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersConducereDoctorat:[
          {
            text: 'Anul sustinerii tezei',
            align: 'start',
            value: 'anulSustinerii',
          },
          { text: 'Doctorand', value: 'student' },
          { text: 'Titlu teza de doctorat finalizata si sustinuta public', value: 'titluTeza' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersCoordonareLicenta:[
          {
            text: 'Anul sustinerii',
            align: 'start',
            value: 'anulSustinerii',
          },
          { text: 'Student', value: 'student' },
          { text: 'Titlu lucrarii de licenta', value: 'titluTeza' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersCoordonareDisertatie:[
          {
            text: 'Anul sustinerii',
            align: 'start',
            value: 'anulSustinerii',
          },
          { text: 'Student', value: 'student' },
          { text: 'Titlu lucrarii de disertatie', value: 'titluTeza' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersFiseDeLucru:[
          {
            text: 'Anul publicarii',
            align: 'start',
            value: 'anulPublicarii',
          },
          { text: 'Titlul', value: 'titlu' },
          { text: 'Nr.pagini', value: 'nrPagini' },
          { text: 'Autori', value: 'autori' },
          { text: 'Nr.autori', value: 'nrAutori' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        punctajeEvaluareStudenti: [
          {tipActivitate : 'Punctaj 2014-2015' , punctaj: 10},
          {tipActivitate : 'Punctaj 2015-2016' , punctaj: 10},
          {tipActivitate : 'Punctaj 2016-2017' , punctaj: 10},
          {tipActivitate : 'Punctaj 2017-2018' , punctaj: 10},
          {tipActivitate : 'Punctaj 2018-2019' , punctaj: 10},
          {tipActivitate : 'Punctaj 2019-2020' , punctaj: 10},
        ],
        conduceriDoctorat: [],
        coordonariLicenta: [],
        coordonariDisertatie: [],
        proiecteDidactice: [],
        materialeSuportCurs : [],
        fiseDeLucru: [],
        organizareAplicatii: [],
        coursesPublicateEdituriAcreditate :[],
        coursesPublicateAlteEdituri: [],
        coursesRevizuite: [],
        viewCourses: false,
        viewProiecteDidactice: false,
        viewMateriale: false,
        viewOrganizari: false,
        viewCoordonariTeza: false,
        viewFiseLucru: false
        }
      },
      methods:{
        refreshThesisCoordinations(){
            ThesisCoordinationService.getThesisCoordinationsByTipTezaAndUserId('conducereDoctorat',this.idUser).then(res =>{
          this.conduceriDoctorat=res.data;
          });
          ThesisCoordinationService.getThesisCoordinationsByTipTezaAndUserId('coordonareLicenta',this.idUser).then(res =>{
          this.coordonariLicenta=res.data;
          });
          ThesisCoordinationService.getThesisCoordinationsByTipTezaAndUserId('coordonareDisertatie',this.idUser).then(res =>{
          this.coordonariDisertatie=res.data;
          });
        },
        refreshCourses(){
          CourseService.getCoursesByTipCursAndUserId('publicateEdituriAcreditate',this.idUser).then(res =>{
          this.coursesPublicateEdituriAcreditate=res.data;
          });
          CourseService.getCoursesByTipCursAndUserId('publicateAlteEdituri',this.idUser).then(res =>{
          this.coursesPublicateAlteEdituri=res.data;
          });
          CourseService.getCoursesByTipCursAndUserId('editiiRevizuite',this.idUser).then(res =>{
          this.coursesRevizuite=res.data;
          });
        },
        refreshActivities(){
          WorkActivityService.getWorkActivitiesByUserId(this.idUser).then(res =>{
          this.fiseDeLucru=res.data;
          });
            TeachingActivityService.getTeachingActivitiesByTipTActivitateAndUserId('proiecteDidactice',this.idUser).then(res =>{
          this.proiecteDidactice=res.data;
          });
          TeachingActivityService.getTeachingActivitiesByTipTActivitateAndUserId('materialeSuport',this.idUser).then(res =>{
          this.materialeSuportCurs=res.data;
          });
          TeachingActivityService.getTeachingActivitiesByTipTActivitateAndUserId('organizari',this.idUser).then(res =>{
          this.organizareAplicatii=res.data;
          });
        },
        addCourse(){
          this.$router.push({
            name: 'addCourse',
          });
        },
        addActivity(tipActivitate){
          this.$router.push({
            name: 'addActivity',
            params: { tipActivitate: tipActivitate },
          });
        },
        addWorkActivity(){
          this.$router.push({
            name: 'addWorkActivity',
          });
        },
        addThesisCoord(){
          this.$router.push({
            name: 'addThesisCoord',
          });
        },
         sumField(key,data) {
        // sum data in give key (property)
        return data.reduce((a, b) => a + (b[key] || 0), 0)
        },
        editActivity(item){
          console.log(item)
        },
        deletectivity(item){

          console.log(item)
        }

      },
      created() {
      this.refreshCourses();
      this.refreshActivities();
      this.refreshThesisCoordinations();
     },
      mounted(){
        this.refreshCourses();
        this.refreshActivities();
        this.refreshThesisCoordinations();
      }
    }
</script>