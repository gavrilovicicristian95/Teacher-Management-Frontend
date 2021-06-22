<template>
    <v-app>
        <div>
            <h3 >Adauga Contract</h3>
            <form @submit="saveContract">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                 <h6 v-if="contractType=='finantareInternationalaDirector'" style="color:grey;">Contracte de cercetare ştiinţifică obtinute prin competitie derulate prin Universitate - finanţare internationalaa: director</h6>
          
                <h6 v-if="contractType=='finantareInternationalaMembru'" style="color:grey;">Contracte de cercetare ştiinţifică obtinute prin competitie derulate prin Universitate - finanţare internationala: membru</h6>
              
                <h6 v-if="contractType=='finantareNationalaDirector'" style="color:grey;">Contracte de cercetare ştiinţifică obtinute prin competitie derulate prin Universitate - finanţare nationala: director</h6>
           
                <h6 v-if="contractType=='finantareNationalaMembru'" style="color:grey;">Contracte de cercetare ştiinţifică obtinute prin competitie derulate prin Universitate - finanţare nationala: membru </h6>
                <br>
                  <v-select
                    v-model="contractType"
                    :items="contractTypes"
                    :label="contractSelect"
                    outlined
                    class="my-2"
                    ></v-select>
                <fieldset class="form-group">
                    <label>Anul obtinerii/derularii</label>
                    <input type="text" class="form-control" required v-model="anulObtinerii">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.Contract</label>
                    <input type="text" class="form-control" required v-model="nrContract">
                </fieldset>
                <fieldset class="form-group">
                    <label>Denumire Contract</label>
                    <input type="text" class="form-control" required v-model="denumireContract">
                </fieldset>
                <fieldset class="form-group">
                    <label>Director</label>
                    <input type="text" class="form-control" required v-model="director">
                </fieldset>
                <fieldset class="form-group" v-if="contractType == 'finantareNationalaMembru' || contractType == 'finantareInternationalaMembru'">
                    <label>Nr. membrilor echipei de cercetare</label>
                    <input type="text" class="form-control" required v-model="nrMembrilor">
                </fieldset>
                <fieldset class="form-group">
                    <label>Valoare lei contract anual</label>
                    <input type="text" class="form-control" required v-model="valoareLeiContract">
                </fieldset>
              
                
                  
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import ContractService from '../services/contract.service'

export default {
    data () {
      return {
        anulObtinerii: "",
        nrContract:"",
        denumireContract: "",
        director: "",
        nrMembrilor:"",
        valoareLeiContract:"",
        idUser: this.$store.state.auth.user.id,
        contractTypes: ['finantareInternationalaDirector','finantareInternationalaMembru',
        'finantareNationalaDirector','finantareNationalaMembru'],
        contractType: 'none',
        contractSelect: 'Selecteaza tipul contractului',
        punctaj: ""
      };
    },

    methods:{
      saveContract(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var contractObject={
              idUser: this.idUser,
              anulObtinerii: this.anulObtinerii,
              nrContract: this.nrContract,
              denumireContract: this.denumireContract,
              director: this.director,
              nrMembrilor: this.nrMembrilor,
              valoareLeiContract: this.valoareLeiContract,
              punctaj: this.punctaj,
              tipContract: this.contractType
          }

          ContractService.addContract(contractObject)
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
