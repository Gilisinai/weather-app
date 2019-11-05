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
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE',
            success: () => {
                let cityToDlete = this.cityData.find(c => c.name === cityName)
                console.log(cityToDlete)
               
            }
        });
    }
}

