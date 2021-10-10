const app = {
    data() {
      return {
        result: undefined,
        app: 0,
        book: []
      }
    },
  
     computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },
    methods: {
        fetchUserData() {
            //Method 1:
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((json) => {
                console.log("Got json back:", json);
                this.result = json.results[0];
                console.log("C");
            })
            .catch( (error) => {
                console.error(error);
            });
        },

    fetchBookData() {
        fetch('/api/books')
        .then( response => response.json() )
        .then( (responseJson) => {
        console.log(responseJson);
        this.book = responseJson;
        })
        .catch( (err) => {
        console.error(err);
        })
        }
    },

    created() {
        this.fetchUserData();
        this.fetchBookData();
    }

  }
  
  Vue.createApp(app).mount('#app');