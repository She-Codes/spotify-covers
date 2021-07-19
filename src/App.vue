<template>
  <div v-if="!loggedIn">
    <a href="login">Log In</a>
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
        refreshToken: undefined,
        user: undefined
      }
    },

    computed: {
      spotifyHeaders () {
        return {'Authorization': `Bearer ${this.accessToken}`};
      }
    },

    async created () {
      const queryString = window.location.search;
      const searchParamsObj = new URLSearchParams(queryString); 
      this.accessToken = searchParamsObj.get('access_token');
      this.refreshToken = searchParamsObj.get('refresh_token');
  
      if (this.accessToken && this.refreshToken) {
        // try {
        //   // maybe here try first to get user
        //   // if all good then do user stuff
        //   // if error then check for keys and do refresh stuff
        //   await this.getNewAccessToken();
        //   await this.getUser();
        //   // get user
        //   // if successful
        //     // check to see if user saved in firestore?
        //     // if not add to firestore?
        //   // if not successful
        //     // then we need to get new access token
        //   this.loggedIn = true;
        // } catch (error) {
        //   this.loggedIn = false;
        // }

        try {
          await this.getUser();
          this.loggedIn = true;
          // if user already saved in firestore
            // get albums
          // if not saved 
            // save user in firestore
        } catch (error) {
          try {
            await this.getNewAccessToken();
            await this.getUser();
            // Additional error handling here for if getUser doesn't work or 
            // will that trigger catch block?
          } catch (error) {
            this.loggedIn = false;
            // is it right that if either action fails, loggedIn == false?
            // Could this whole nested try/catch block have been done better?
          }
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
      async getNewAccessToken() {
        try {
          const { data } = await axios.post('/login/refresh-token', {
            refreshToken: this.refreshToken
          });
          console.log(data);
          this.accessToken = data.access_token;
          console.log('access token after refresh:');
          console.log(this.accessToken);
        } catch (error) {
          this.accessToken = undefined;
          console.error(error);
          throw error;
        }
      },

      async getNewReleases() {
        try {
          const { data } = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
            headers: this.spotifyHeaders
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },

      async getUser() {
        try {
          console.log('Getting User');
          const { data } = await axios.get('https://api.spotify.com/v1/me', {
            headers: this.spotifyHeaders
          });
          console.log('User:');
          console.log(data);
          this.user = data.id;
          console.log(this.user);
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
    }
  }
</script>

<style>

</style>
