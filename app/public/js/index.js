const app = {
    data() {
      return {
          "user": {},
          "image": "",
          "firstname":"",
          "lastname":"",
          "dob":"",
          "age":"",
          "origin":"",
          "email":"",
          "cell":"",
          "snumber":"",
          "sname":"",
          "postcode":"",
        app: 0
      }
    },
  
     computed:{
       prettyBirthday(){
         return dayjs(this.dob.date).format('D MMM YYYY')
       }
     },

     methods:{
       fetchUserData(){

       }
     },

  created() {

  fetch('https://randomuser.me/api/')
  .then(response => response.json())
  .then(data => 
    {
        console.log(data);
        var x= data.results[0];
        this.image=x.picture.large;
        this.firstname=x.name.first;
        this.lastname=x.name.last;
        this.dob=x.dob.date;
        this.age=x.dob.age;
        this.origin=x.location.country;
        this.email=x.email;
        this.cell=x.cell;
        this.snumber=x.location.street.number;
        this.sname=x.location.street.name;
        this.postcode=x.location.postcode;
    }
    
    )
  

}
}
  Vue.createApp(app).mount('#app');