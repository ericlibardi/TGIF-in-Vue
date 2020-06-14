<template>
  <div>
    <div class="pageTop">
      <h3>Senators</h3>
      <p>First convened in 1789, the composition and powers of the Senate are established in Article 
      One of the U.S. Constitution. Each state is represented by two senators, regardless of population, 
      who serve staggered six-year terms. The Senate has several exclusive powers not granted to the 
      House, including consenting to treaties as a precondition to their ratification and consenting to 
      or confirming appointments of Cabinet secretaries, federal judges, other federal executive 
      officials, military officers, regulatory officials, ambassadors, and other federal uniformed 
      officers, as well as trial of federal officials impeached by the House.</p>
    </div>
    <div class="pageBottom">
      <div class="filterComp">
        <div class="filterComp">
          <h6>Filter by Party:</h6>
          <b-form-group >
            <b-form-checkbox-group
            id="checkbox-parties"
            class="ml-1"
            v-model="selectedParty"
            :options="options"
            name="Parties"
            ></b-form-checkbox-group>
          </b-form-group>
        </div>
        <div class="filterComp">
          <h6>Filter by State:</h6>
          <b-form-select v-model="selectedState" class="mb-3 ml-1" size="sm" id="dropdownState">
            <b-form-select-option :value="null">--</b-form-select-option>
              <b-form-select-option v-for="state in stateList" :key="state.id" :value="state.state">{{state.state}}</b-form-select-option>
          </b-form-select>
        </div>
      </div>
      <table class="table table-striped table-bordered">
        <thead class="thead-light text-center">
          <tr>
            <th>Senator</th>
            <th>Party</th>
            <th>State</th>
            <th>Years in Office</th>
            <th>% Votes w/ Party</th>
          </tr>
        </thead>
        <div v-if="this.members === null" class="text-center">
          <b-spinner label="Spinning"></b-spinner>
        </div>
        <tbody class="text-center">
          <tr v-for="member in this.filteredMembers===null ? members : filteredMembers" :key="member._id">
            <td v-if="member !== null && member.middle_name === null" ><a v-bind:href="member.url" >{{member.last_name + ', ' + member.first_name}}</a></td>
            <td v-else > <a v-bind:href="member.url" >{{member.last_name + ', ' + member.first_name + ' ' + member.middle_name}}</a></td>
            <td>{{member.party}}</td>
            <td>{{member.state}}</td>
            <td v-if="member.seniority == 1 || 0" >{{member.seniority + " year"}}</td>
            <td v-else>{{member.seniority + " years"}}</td>
            <td>{{member.votes_with_party_pct + "%"}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <go-top :size="50" bg-color="lightgray" :right="15" ></go-top>
  </div>
</template>

<script>
import axios from 'axios'
import GoTop from '@inotom/vue-go-top'
export default {
  name: "senate",
  components: {
    GoTop
  },
  data () {
    return {
      members: null,
      filteredMembers: null,
      selectedParty: [],
      options: [
        {text: 'Republican', value: 'R'},
        {text: 'Democrat', value: 'D'},
        {text: 'Independent', value: 'ID'}
      ],
      stateList: [],
      selectedState: null,
    }
  },
  created () {
    let config = {
      headers: {"X-API-Key": "p81O1eNhl3Vq1wXCM01cXtMqzJoLktDn8rtymMRi"},
      mode: 'cors',
      cache: 'default'
    }
    axios.get('https://api.propublica.org/congress/v1/116/senate/members.json', config)
    .then(resp=> resp.data)
    .then(result=> {
    const member = result.results[0].members
    this.members = member

    console.log(member)
    this.mountLists(member)})
    .catch(error => console.log(error))
  },
  watch: {
    selectedState: function () {
      this.updateMembers()
    },
    selectedParty: function () {
      this.updateMembers()
    }
  },
  methods: {
    mountLists(member) {

      const stateList = []
      member.forEach(member=>{
        if(stateList == "" || stateList.indexOf(member.state) < 0) {
          stateList.push(member.state) }
      })
      const mountedStateList = []
      stateList.sort().forEach((member, index)=>{
        mountedStateList.push({state: member, id: index})
      })
      this.stateList = mountedStateList
    },
    updateMembers () {
      const StateList = this.selectedState
      const PartyList = this.selectedParty
      var member = this.members
      function mountMemberList (member) {
        var test = []
        if (StateList === null && PartyList.length < 1) {
          test = member } 
        else if ( StateList !== null && PartyList.length < 1) {
          test = member.filter(member => {
            return member.state === StateList
          })
          }
        else if (StateList === null && PartyList.length > 0) {
          test = member.filter(member => {
            return (PartyList.indexOf(member.party) >= 0)
          })
        } else {
          test = member.filter(member => {
            return(PartyList.indexOf(member.party) >= 0 && member.state === StateList)
          })
        }
        return test
      }
      
      this.filteredMembers = mountMemberList(member)
  },
    
  }
}

</script>

<style scoped>
.pageTop {
  margin: 50px 20px 10px 20px;
  max-width: 800px;
}
p {
  text-indent: 30px;
  font-size: 15px
}
td {
  margin-left: 15px;
  margin-right: 15px;
  font-size: 14px
}
th {
  font-size: 15px
}
.pageBottom {
  margin: 10px 20px
}
h3 {
  font-size: 26px;
}
#dropdownState {
  width: 65px;
}
.filterComp {
  display: flex;
  justify-content: space-between;
}
</style>