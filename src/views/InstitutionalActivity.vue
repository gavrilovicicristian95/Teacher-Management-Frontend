<template>
  <v-app>
       <div>
        <br>
        <h3>1.Activitati</h3>
       
          <v-btn filled class="primary " @click.once="addInstitutionalActivity()">
            Adaugă activitate
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewActivities == false" filled class="accent" small @click.once="viewActivities=true;">
            Vezi activitatile
          </v-btn> 
        </div>
        
        <v-btn v-if="viewActivities == true" filled class="accent" small @click.once="viewActivities=false;">
            Ascunde activitatile
        </v-btn>
        
      <div v-if="viewActivities == true" style="padding-left:2em;">
          <br>
        <h3>1.1. Contribuţii la organizarea activităţii didactice şi administrative: orar, comisie de licenta/disertatie, comisie de admitere,coordonare programe de 
        studii,tutoriat, coordonare cercuri, conferinte studentesti, membru permanent/secretar comisii de licenta ori disertatie.
        </h3>
        <br>

        <v-data-table
          :headers="headersActivitatiContributii"
          :items="contributiiOrganizare"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersActivitatiContributii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',contributiiOrganizare)}}</th>
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
        <h3>1.2 Activitati de promovare UAIC;Caravana UAIC;participare targuri,expozitii,evenimente institutionale. </h3>
        <br>
        <h4>in tara</h4>
        <v-data-table
          :headers="headersActivitatiContributii"
          :items="activitatiPromovareInTara"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersActivitatiContributii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',activitatiPromovareInTara)}}</th>
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
        <br>
        <h4>in strainatate</h4>
        <v-data-table
          :headers="headersActivitatiContributii"
          :items="activitatiPromovareInStrainatate"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersActivitatiContributii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',activitatiPromovareInStrainatate)}}</th>
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
        <h3>1.3. responsabil evaluari ARACIS,UEFISCDI,CNECSDTI,CNATDCU</h3>
        <br>
        <v-data-table
          :headers="headersActivitatiContributii"
          :items="responsabilEvaluari"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersActivitatiContributii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',responsabilEvaluari)}}</th>
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
        <h3>2. Organizare manifestări ştiinţifice(conferinte,congrese) şi şcoli de vară, demonstrabile cu link la pagina web</h3>
       
          <v-btn filled class="primary " @click.once="addOrganization()">
            Adaugă organizare
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
          <br>
        <h3>a) internaţionale</h3>
        <br>
        <h6>coordonator</h6>
        <br>
        <v-data-table
          :headers="headersOrganizari"
          :items="organizariInternationaleCoord"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersOrganizari" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',organizariInternationaleCoord)}}</th>
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
        <h6>membru comitet organizare</h6>
        <br>
        <v-data-table
          :headers="headersOrganizari"
          :items="organizariInternationaleMembru"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersOrganizari" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',organizariInternationaleMembru)}}</th>
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
        <h3>b) naţionale </h3>
        <br>
        <h6>coordonator</h6>
        <br>
        <v-data-table
          :headers="headersOrganizari"
          :items="organizariInternationaleCoord"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersOrganizari" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',organizariNationaleCoord)}}</th>
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
        <h6>membru comitet organizare</h6>
        <br>
        <v-data-table
          :headers="headersOrganizari"
          :items="organizariNationaleMembru"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersOrganizari" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',organizariNationaleMembru)}}</th>
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
        <h3>Responsabilitati</h3>
       
         
          <div>
          <br>
          <v-btn v-if="viewResponsabilities == false" filled class="accent" small @click.once="viewResponsabilities=true;">
            Vezi responsabilitatile
          </v-btn> 
        </div>
        
        <v-btn v-if="viewResponsabilities == true" filled class="accent" small @click.once="viewResponsabilities=false;">
            Ascunde responsabilitatile
        </v-btn>
        
      <div v-if="viewResponsabilities == true" style="padding-left:2em;">
          <br>
        <h4>3. Responsabilităţi în cadrul Universităţii, facultăţilor şi în cadrul departamentelor conexe activităţilor de cercetare</h4>
        <br>
         <v-btn filled class="primary " @click.once="addResponsability('univ')">
            Adaugă responsabilitate universitate
          </v-btn>
          <br>
        <v-data-table
          :headers="headersResponsabilitati"
          :items="responsabilitatiUniversitate"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersResponsabilitati" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',responsabilitatiUniversitate)}}</th>
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
         <h4>4. Responsabilitati în Senatul Universitatii, in Consiliul facultăţii, departamentului</h4>
        <br>
        <v-btn filled class="primary " @click.once="addResponsability('senat')">
            Adaugă responsabilitate senat
          </v-btn>
          <br>
        <v-data-table
          :headers="headersResponsabilitati"
          :items="responsabilitatiSenat"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersResponsabilitati" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',responsabilitatiSenat)}}</th>
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
        <h3>Comisii</h3>
       
          <v-btn filled class="primary " @click.once="addCommission()">
            Adaugă comisie
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewCommissions == false" filled class="accent" small @click.once="viewCommissions=true;">
            Vezi comisiile
          </v-btn> 
        </div>
        
        <v-btn v-if="viewCommissions == true" filled class="accent" small @click.once="viewCommissions=false;">
            Ascunde comisiile
        </v-btn>
        
      <div v-if="viewCommissions == true" style="padding-left:2em;">
          <br>
        <h4>5. Membru în comisii ale universitatii avizate de Senat(Comisia de Etica,
        Comisia pentru managementul calitatii ,Comisia de regulamente,etc.)</h4>
        <br>
        <v-data-table
          :headers="headersComisii"
          :items="membruComisiiUniversitate"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersComisii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',membruComisiiUniversitate)}}</th>
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
        <h4>6. Membru în comisii de concurs in vederea ocuparii unui post didactic ori de cercetare in invatamantul universitar</h4>
        <br>
        <v-data-table
          :headers="headersComisii"
          :items="membruComisiiConcurs"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersComisii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',membruComisiiConcurs)}}</th>
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
        <h3>7. Membru comisii de doctorat (admitere, indrumare si sustinere publica)</h3>
        <br>
        <h4>a) strainatate</h4>
        <br>
        <v-data-table
          :headers="headersComisii"
          :items="membruComisiiDoctoratStrainatate"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersComisii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',membruComisiiDoctoratStrainatate)}}</th>
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
        <h4>b) tara </h4>
        <br>
        <v-data-table
          :headers="headersComisii"
          :items="membruComisiiDoctoratTara"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersComisii" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',membruComisiiDoctoratTara)}}</th>
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
        <h3>8. Proiecte pentru mobilităţi şi tip grant </h3>
       
          <v-btn filled class="primary " @click.once="addProject()">
            Adaugă proiect
          </v-btn>
          <div>
          <br>
          <v-btn v-if="viewProjects == false" filled class="accent" small @click.once="viewProjects=true;">
            Vezi proiectele
          </v-btn> 
        </div>
        
        <v-btn v-if="viewProjects == true" filled class="accent" small @click.once="viewProjects=false;">
            Ascunde proiectele
        </v-btn>
        
      <div v-if="viewProjects == true" style="padding-left:2em;">
          <br>
        <h4>coordonator : </h4>
        <br>
        <v-data-table
          :headers="headersProiecteMobilitatiCoord"
          :items="proiecteMobilitatiCoord"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersProiecteMobilitatiCoord" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',proiecteMobilitatiCoord)}}</th>
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
        <h4>membru :</h4>
        <br>
        <v-data-table
          :headers="headersProiecteMobilitatiMembru"
          :items="proiectMobilitatiMembru"
          :items-per-page="5"
          class="elevation-1"
        >
        <template slot="body.append">
            <tr>
              <td v-for="(header,i) in headersProiecteMobilitatiMembru" :key="i">
                  <div v-if="header.value == 'punctaj'">
                      <th>{{sumField('punctaj',proiectMobilitatiMembru)}}</th>
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
import MobilitiesProjectsService from '../services/mobilities.service'
   import InstitutionalActivityService from '../services/institutionalActivity.service'
   import CommissionsService from '../services/commissions.service'
   import ResponsabilitiesService from '../services/responsabilites.service';
    export default {
    data () {
      return {
        idUser: this.$store.state.auth.user.id,
        headersActivitatiContributii:[
          {
            text: 'Anul',
            align: 'start',
            value: 'anul',
          },
          { text: 'Activitati', value: 'activitati' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersOrganizari:[
          
          { text: 'Activitati', 
          align: 'start',
          value: 'activitati' },
           { text: 'Link la pagina web', value: 'linkPaginaWeb' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersResponsabilitati:[
          
          { text: 'Responsabilitati', 
          align: 'start',
          value: 'responsabilityType' },
           { text: 'Nr ani', value: 'nrAni' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersComisii:[
          
          { text: 'Comisii', 
          align: 'start',
          value: 'comisii' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersProiecteMobilitatiCoord:[
          
          { text: 'Denumire proiect', 
          align: 'start',
          value: 'denumireProiect' },
           { text: 'Valoarea proiectului (Euro)', value: 'valoareProiectEuro' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        headersProiecteMobilitatiMembru:[
          
          { text: 'Denumire proiect', 
          align: 'start',
          value: 'denumireProiect' },
          { text: 'Director de proiect', value: 'directorProiect' },
           { text: 'Valoarea proiectului (Euro)', value: 'valoareProiectEuro' },
           { text: 'Nr.membrilor echipei', value: 'nrMembriEchipa' },
          { text: 'Punctaj', value: 'punctaj' },
          {
          text: '',
          align: 'center',
          sortable: false,
          value: 'actions',
          }
          
        ],
        proiecteMobilitatiCoord:[],
        proiectMobilitatiMembru:[],
        membruComisiiUniversitate: [],
        membruComisiiConcurs : [],
        membruComisiiDoctoratStrainatate: [],
        membruComisiiDoctoratTara: [],
        responsabilitatiUniversitate: [],
        responsabilitatiSenat : [],
        organizariInternationaleCoord : [],
        organizariInternationaleMembru : [],
        organizariNationaleCoord : [],
        organizariNationaleMembru : [],
        contributiiOrganizare: [],
        activitatiPromovareInTara: [],
        activitatiPromovareInStrainatate: [],
        responsabilEvaluari: [],
        viewOrganizari : false,
        viewActivities: false,
        viewResponsabilities : false,
        viewCommissions: false,
        viewProjects: false
        }
      },
      methods:{
      addInstitutionalActivity(){
        this.$router.push({
        name: 'addInstitutionalActivity',
      });
      },
      addOrganization(){
        this.$router.push({
        name: 'addOrganization',
      });
      },
      addCommission(){
        this.$router.push({
        name: 'addCommission',
      });
      },
      addProject(){
        this.$router.push({
        name: 'addProject',
      });
      },
      editActivity(item){
        console.log(item)
      },
      deleteActivity(item){
        console.log(item)
      },
      addResponsability(tipResponsabilitate){
        if(tipResponsabilitate == 'univ')
          this.$router.push({
          name: 'addResponsabilityUniv',
        });
      else
        this.$router.push({
          name: 'addResponsabilitySenat',
        });
      },
      refreshInstitutionalActivities(){
        ResponsabilitiesService.getResponsabilities("responsabilitatiUniversitate",this.idUser).then(res => {
            this.responsabilitatiUniversitate = res.data;
         });
         ResponsabilitiesService.getResponsabilities("responsabilitatiSenat",this.idUser).then(res => {
            this.responsabilitatiSenat = res.data;
         });
        InstitutionalActivityService.getInstitutionalActivities("contributiiOrganizareActivitati",this.idUser).then(res => {
            this.contributiiOrganizare = res.data;
         });
         InstitutionalActivityService.getInstitutionalActivities("activitatiPromovareUAICStrainatate",this.idUser).then(res => {
            this.activitatiPromovareInStrainatate = res.data;
         });
         InstitutionalActivityService.getInstitutionalActivities("activitatiPromovareUAICInTara",this.idUser).then(res => {
            this.activitatiPromovareInTara = res.data;
         });
         InstitutionalActivityService.getInstitutionalActivities("responsabilEvaluari",this.idUser).then(res => {
            this.responsabilEvaluari = res.data;
         });
         InstitutionalActivityService.getInstitutionalActivities("organizariManiferstariNationaleCoord",this.idUser).then(res => {
            this.organizariNationaleCoord = res.data;
         });
         InstitutionalActivityService.getInstitutionalActivities("organizariManiferstariNationaleMembru",this.idUser).then(res => {
            this.organizariNationaleMembru = res.data;
         });
         InstitutionalActivityService.getInstitutionalActivities("organizariManiferstariInternationaleCoord",this.idUser).then(res => {
            this.organizariInternationaleCoord = res.data;
         });
         InstitutionalActivityService.getInstitutionalActivities("organizariManiferstariInternationaleMembru",this.idUser).then(res => {
            this.organizariInternationaleMembru = res.data;
         });
         CommissionsService.getSCommissionsByTipComisieAndUserId("membruComisiiUniversitateAvizateSenat",this.idUser).then(res => {
            this.membruComisiiUniversitate= res.data;
         });
         CommissionsService.getSCommissionsByTipComisieAndUserId("membruComisiiConcursPostDidactic",this.idUser).then(res => {
            this.membruComisiiConcurs = res.data;
         });
         CommissionsService.getSCommissionsByTipComisieAndUserId("membruComisiiDoctoratStrainatate",this.idUser).then(res => {
            this.membruComisiiDoctoratStrainatate = res.data;
         });
         CommissionsService.getSCommissionsByTipComisieAndUserId("membruComisiiDoctoratTara",this.idUser).then(res => {
            this.membruComisiiDoctoratTara = res.data;
         });
         MobilitiesProjectsService.getMobilities("coordonatorProiecteMobilitati",this.idUser).then(res => {
            this.proiecteMobilitatiCoord = res.data;
         });
          MobilitiesProjectsService.getMobilities("membruProiecteMobilitati",this.idUser).then(res => {
            this.proiectMobilitatiMembru = res.data;
         });
        
        
         
      },
           sumField(key,data) {
        // sum data in give key (property)
        return data.reduce((a, b) => a + (b[key] || 0), 0)
        }
       

      },
      
      created() {
        this.refreshInstitutionalActivities();
      
      
     },
      mounted(){
        this.refreshInstitutionalActivities();
      }
    }
</script>