const app = {
    data() {
      return {
        result: undefined,
        app: 0,
        book: [],
        bookForm: {}
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

        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
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
        },

        postNewBook(evt) {
        //     this.offerForm.studentId = this.selectedStudent.id;        
            
            // console.log("Posting!", this.bookForm);
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.book = json;
                
                // reset the form
                this.bookForm = {};
              });
          }
    },

    created() {
        this.fetchUserData();
        this.fetchBookData();
    }

  }
  
  Vue.createApp(app).mount('#app');