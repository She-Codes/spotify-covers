<template>
  <div v-if="!loggedIn">
    <button>Log In</button>
  </div>
  <div v-else>
    <p>Logged In!</p>
    <div id="newReleases">
      <button v-on:click="getNewReleases">Get New Releases</button>
    </div>
    <div id="myCovers"></div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data () {
      return {
        loggedIn: false,
        accessToken: undefined,
        refreshToken: undefined
      }
    },
    created () {
      const queryString = window.location.search;
      const searchParamsObj = new URLSearchParams(queryString); 
      this.accessToken = searchParamsObj.get('access_token');
      this.refreshToken = searchParamsObj.get('refresh_token');
  
      if (this.accessToken && this.refreshToken) {
        try {
          this.getNewAccessToken();
          this.loggedIn = true;
        } catch (error) {
          this.loggedIn = false;
        }
      }

      // if logged in show either new releases or saved myCovers
      // if you have saved covers show the covers tab
      // if you have no covers show the new releases tab
      // able to cache new releases?
    },
    methods: {
      /**
       * Get a new access token and saves it to this.accessToken if request successful,
       * If not, set this.accessToken to undefined and throw an error.
      */
      async getNewAccessToken () {
        try {
          const { data } = await axios.post('/login/refresh-token', {
            refreshToken: this.refreshToken
          });
          console.log(data);
          this.accessToken = data.access_token;
        } catch (error) {
          this.accessToken = undefined;
          console.error(error);
          throw error;
        }
      },

      async getNewReleases () {
        try {
          const { data } = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
            headers: {'Authorization': `Bearer ${this.accessToken}`}
          });
          console.log(data);
        } catch (error) {
          
        }
      }
    }
  }
</script>

<style>

</style>
