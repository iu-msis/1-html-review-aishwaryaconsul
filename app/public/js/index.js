const app = {
    data() {
      return {
        result: undefined,
        app: 0,
        book: [],
        bookForm: {},
        selectedBook: null
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

        postBook(evt) {
          if (this.selectedBook === null) 
          {
              console.log("POSTING NEW BOOK!!");
              this.postNewBook(evt);
          } else
          {
              console.log("POSTING EDITED!! BOOK!!");
              this.postEditBook(evt);
          }
        },

        postNewBook(evt) {
        //     this.bookForm.bookId = this.selectedBook.id;        
            
            console.log("Posting!", this.selectedBook);
    
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
          },
    postEditBook(evt) {
//       // this.offerForm.studentId = this.selectedStudent.id;
      this.bookForm.id = this.selectedBook.id;       
      
      console.log("Updating!", this.selectedBook);

      fetch('api/books/update.php', {
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
          
          this.resetBookForm();
        });
    },
    postDeleteBook(o) {
      if (!confirm("Are you sure you want to delete the book from")) {
          return;
      }
      
      fetch('api/books/delete.php', {
          method:'POST',
          body: JSON.stringify(o),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.book = json;
          
          this.resetBookForm();
        });
    },
    selectBook(o) {
      this.selectedBook = o;
      this.bookForm = Object.assign({}, this.selectedBook);
    },
   
    resetBookForm() {
      this.selectedBook = null;
      this.bookForm = {};
    }
  },

    created() {
        this.fetchUserData();
        this.fetchBookData();
    }

  }
  
  Vue.createApp(app).mount('#app');