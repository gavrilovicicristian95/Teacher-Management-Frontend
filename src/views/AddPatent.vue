<template>
    <v-app>
        <div>
            <h3 >Adauga Brevet</h3>
            <form @submit="savePatent">
                <div v-if="errors.length">
                    <div class="alert alert-warning" v-bind:key="index" v-for="(error, index) in errors">{{error}}</div>
                </div>
                 <h6 v-if="patentType=='breveteInternationale'" style="color:grey;">Brevete internationale</h6>
          
                <h6 v-if="patentType=='breveteNationale'" style="color:grey;">Brevete nationale</h6>
                <br>
                  <v-select
                    v-model="patentType"
                    :items="patentTypes"
                    :label="patentSelect"
                    outlined
                    class="my-2"
                    ></v-select>
                <fieldset class="form-group">
                    <label>Anul obtinere brevet</label>
                    <input type="text" class="form-control" required v-model="anObtinere">
                </fieldset>
                <fieldset class="form-group">
                    <label>Titlu brevet</label>
                    <input type="text" class="form-control" required v-model="titlu">
                </fieldset>
                <fieldset class="form-group">
                    <label>Autor brevet</label>
                    <input type="text" class="form-control" required v-model="autor">
                </fieldset>
                <fieldset class="form-group">
                    <label>Nr.autori</label>
                    <input type="text" class="form-control" required v-model="nrAutori">
                </fieldset>
               
                <button class="btn btn-success" type="submit">Save</button>
            </form>
        </div>
    </v-app>
</template>

<script>
import PatentService from '../services/patent.service'

export default {
    data () {
      return {
        anObtinere: "",
        titlu:"",
        autor: "",
        nrAutori: "",
        idUser: this.$store.state.auth.user.id,
        patentTypes: ['breveteInternationale','breveteNationale'],
        patentType: 'none',
        patentSelect: 'Selecteaza tipul brevetului',
        punctaj: ""
      };
    },

    methods:{
      savePatent(){
          console.log("AM INTRAT IN SAVE ARTICLE");
          var patentObject={
              idUser: this.idUser,
              anObtinere: this.anObtinere,
              titlu: this.titlu,
              autor: this.autor,
              nrAutori: this.nrAutori,
              punctaj: this.punctaj,
              tipBrevet: this.patentType
          }

          PatentService.addPatent(patentObject)
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
