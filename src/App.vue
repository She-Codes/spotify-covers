<template>
  <button v-if="!loggedIn">Log In</button>
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

    // on page load check to see if there is a token and refresh token
    // hasTokens?
    // should I check to see if the token needs to be refreshed or just refresh token on page load
    // if there is one?

    // check url if params there then hasTokens is true, if true then refresh and set loggedIn to true.
    // if both params are not there then loggedIn is false
    created () {
      // authToken && refreshToken in url?
      // getNewAccessToken valid response?
        // then loggedIn === true
      const queryString = window.location.search;
      const searchParamsObj = new URLSearchParams(queryString); 
      this.accessToken = searchParamsObj.get('access_token');
      this.refreshToken = searchParamsObj.get('refresh_token');
  
      // Check here to see if you can refresh token, if so then logged in is true
      if (this.accessToken && this.refreshToken) {
        try {
          this.getNewAccessToken();
          this.loggedIn = true;
        } catch (error) {
          this.loggedIn = false;
        }
      }
    },
    methods: {
      /**
       * Get a new access token and saves it to this.accessToken if request successful,
       * If not, set this.accessToken to undefined and throw an error.
      */
      async getNewAccessToken () {
        const vm = this;

        try {
          const { data } = await axios.post('/login/refresh-token', {
            refreshToken: vm.refreshToken
          });
          console.log(data);
          vm.accessToken = data.access_token;
        } catch (error) {
          vm.accessToken = undefined;
          console.error(error);
          throw error;
        }
      }
    }
  }
</script>

<style>

</style>
