class TempManager {
    constructor() {
        this.cityData = []
    }

    async getDataFromDB() {
      let cities=  await $.get('/cities')
            this.cityData = cities
            // console.log(this.cityData)
        
    }

    async getCityData(cityName)  {
       
        let city = await $.get(`city/${cityName}`)
        this.cityData.push(city)
        console.log(this.cityData)
    }

     saveCity (cityName) {
        let cityToSave = this.cityData.find(c => c.name === cityName)
        console.log(cityToSave)
         $.post('/city', cityToSave)

    }

    removeCity(cityName) {
        let cityToDelete = this.cityData.findIndex(c => c.name === cityName)
        this.cityData.splice(cityToDelete,1)
        $.ajax({
             url: `/city`,
              method: "delete" ,
               data: {city: cityName},
               success: () => console.log(`removed ${cityName}`),
               error: (e) => console.log(e)
            })
        
    }
}

