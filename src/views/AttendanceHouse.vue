<template>
    <div>
        <div id="pageTop">
            <div id="pageTopText">
                <h3>Attendance</h3>
                <p>The Constitution specifies that a majority of members constitutes a quorum to do 
                business in each house. Representatives and senators rarely force the presence of a 
                quorum by demanding quorum calls; thus, in most cases, debates continue even if a 
                majority is not present.</p>
                <p>The Senate uses roll-call votes; a clerk calls out the names of all the senators, 
                each senator stating "aye" or "no" when his or her name is announced. The House 
                reserves roll-call votes for the most formal matters, as a roll-call of all 435 
                representatives takes quite some time; normally, members vote by electronic device. 
                In the case of a tie, the motion in question fails. In the Senate, the Vice President 
                may (if present) cast the tiebreaking vote.</p>
            </div>
            <div id="pageTopTable">
                <h3 id="TitleSenateTable">House at a glance</h3>
                <table class="table table-striped table-bordered">
                    <thead class="thead-light text-center">
                        <tr>
                            <th>Party</th>
                            <th>Number of Reps</th>
                            <th>% Voted with Party</th>
                        </tr>
                    </thead>
                    <div v-if="this.tableTotal === null " class="text-center">
                        <b-spinner label="Spinning"></b-spinner>
                    </div>
                    <tbody v-else class="text-center">
                        <tr v-for="table in tableTotal" :key="table.id">
                            <td>{{table.data}}</td>
                            <td>{{table.party}}</td>
                            <td>{{table.votes + '%'}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="pageBottom">
            <div class="bottomTable">
                <h3>Least Engaged (Bottom 10% Attendance)</h3>
                <table class="table table-striped table-bordered">
                    <thead class="thead-light text-center">
                        <tr>
                            <th>Name</th>
                            <th>Number of Missed Votes</th>
                            <th>% Missed</th>
                        </tr>
                    </thead>
                    <div v-if="this.tableTotal === null " class="text-center">
                        <b-spinner label="Spinning"></b-spinner>
                    </div>
                    <tbody class="text-center">
                        <tr v-for="table in secTableTotal" :key="table.id">
                            <td v-if="table.middle_name === null" ><a v-bind:href="table.url" >{{table.last_name + ', ' + table.first_name}}</a></td>
                            <td v-else > <a v-bind:href="table.url" >{{table.last_name + ', ' + table.first_name + ' ' + table.middle_name}}</a></td>
                            <td>{{table.missed_votes}}</td> 
                            <td>{{table.missed_votes_pct.toFixed(2) + "%"}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="middle"></div>
            <div class="bottomTable">
                <h3>Most Engaged (Top 10% Attendance)</h3>
                <table class="table table-striped table-bordered">
                    <thead class="thead-light text-center">
                        <tr>
                            <th>Name</th>
                            <th>Number of Missed Votes</th>
                            <th>% Missed</th>
                        </tr>
                    </thead>
                    <div v-if="this.tableTotal === null " class="text-center">
                        <b-spinner label="Spinning"></b-spinner>
                    </div>
                    <tbody class="text-center">
                        <tr v-for="table in thiTableTotal" :key="table.id">
                            <td v-if="table.middle_name === null" ><a v-bind:href="table.url" >{{table.last_name + ', ' + table.first_name}}</a></td>
                            <td v-else > <a v-bind:href="table.url" >{{table.last_name + ', ' + table.first_name + ' ' + table.middle_name}}</a></td>
                            <td>{{table.missed_votes}}</td> 
                            <td>{{table.missed_votes_pct.toFixed(2) + "%"}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <go-top :size="50" bg-color="lightgray" :right="15" ></go-top>
    </div>
    
</template>

<script>
import axios from 'axios'
import GoTop from '@inotom/vue-go-top'
export default {
    name: 'attendancehouse',
    components: {
        GoTop
    },
    data () {
    return {
      tableTotal: null,
      secTableTotal: null,
      thiTableTotal: null
    }},
    created () {
    let config = {
      headers: {"X-API-Key": "p81O1eNhl3Vq1wXCM01cXtMqzJoLktDn8rtymMRi"},
      mode: 'cors',
      cache: 'default'
    }
    axios.get('https://api.propublica.org/congress/v1/116/house/members.json', config)
    .then(resp=> resp.data)
    .then( result => {
    const member = result.results[0].members
    this.firstTable(member)
    this.secondTable(member)
    })
    .catch(error => console.log(error))
  },
  methods: {
      firstTable (member) {
        function votesTotal (member) {
            var test = []
            member.forEach((member) => {
                if (member.votes_with_party_pct !== undefined) {
                test.push(member.votes_with_party_pct)}
            })
            return (test.reduce((a,b) => {return a+b})/ test.length).toFixed(2)
        }

        function votesPerParty (member, canParty) {
            var test = []
            member.forEach((member) => {
                if (member.party === canParty && member.votes_with_party_pct !== undefined) {
                    test.push(member.votes_with_party_pct)
                }
            });
            return (test.reduce((a,b) => {return a+b})/ test.length).toFixed(2)
        }

        function canPerParty (member, canParty) {
        return member.filter (senator=>senator.party===canParty).length}

        function mountTable () {
        const partyArr = ["R", "D", "I"]
        const firstColumn = ["Republican", "Democrat", "Independent"]
        const test = []
        partyArr.forEach((party, index) =>{
            test.push({id: index,data: firstColumn[index],party: canPerParty(member, party),votes: votesPerParty(member, party)})
        })
          test.push({id: 4,data: "Total",party: member.length,votes: votesTotal(member)})
          return test
        }
        this.tableTotal = mountTable()
      },

    secondTable(member) {
        const missedVotes = []
        member.forEach(member => {
        missedVotes.push(member.missed_votes_pct)
      })

      const percent = Math.floor(member.length/100*10)

      const maxVotesOrg = missedVotes.sort((a,b)=> b-a).slice(0, percent)
      const maxVote = Math.min.apply(Math, maxVotesOrg)

      function mountSecTable() {
          const test = []
          member.forEach(member=>{
              if(member.missed_votes_pct >= maxVote){
                  test.push(member)
              }
          })
          return test
      }
      this.secTableTotal = mountSecTable()

      const minVotesOrg = missedVotes.sort((a,b)=> a-b).slice(0, percent)
      const minVote = Math.max.apply(Math, minVotesOrg)

      function mountThiTable() {
          const test = []
          member.forEach(member => {
              if(member.missed_votes_pct <= minVote){
                  test.push(member)
              }
          })
          return test
      }
      this.thiTableTotal = mountThiTable()
    },
  }
}
</script>

<style scoped>
h3 {
  font-size: 26px;
}
p {
  font-size: 15px
}
#pageTop {
    margin: 50px 20px 10px 20px;
    display: flex;
}
#pageTopText {
    width: 53%;
    margin-right: 50px;
}
#pageTopTable {
    width: 47%;
}
#TitleSenateTable{
    text-align: end;
}
#pageBottom{
    margin: 10px 20px;
    display: flex;
}
td {
  margin-left: 15px;
  margin-right: 15px;
  font-size: 14px
}
th {
  font-size: 15px
}
#middle {
    width: 10%;
}
.bottomTable{
    width: 45%;
}
@media screen and (max-width: 840px) {
  #middle {
    width: 2%;
}
.bottomTable{
    width: 49%;
}
}
</style>