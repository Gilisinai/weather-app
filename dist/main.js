const tempManager = new TempManager()
const renderer = new Renderer()

const loadPage = async function() {
     await tempManager.getDataFromDB()
    
    renderer.renderData(tempManager.cityData)
    
}

const handleSearch = async function() {
    let input = $('input').val()
    await tempManager.getCityData(input)
}

$('#search').on('click', async function() {
    await handleSearch()
    renderer.renderData(tempManager.cityData)
})

$('.cities-container').on('click', '.save',  function() {
    let cityName = $(this).closest(".city").find("span").text()
     tempManager.saveCity(cityName)
    renderer.renderData(tempManager.cityData)
})

$('.cities-container').on('click', '.remove', function() {
    let cityName = $(this).closest(".city").find(".cityName").text()
    tempManager.removeCity(cityName)
    renderer.renderData(tempManager.cityData)
})

loadPage()

