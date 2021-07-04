<template>
  <button v-if="!loggedIn">Log In</button>
  <p v-else>Logged In!</p>
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
