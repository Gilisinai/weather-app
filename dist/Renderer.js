class Renderer {
    renderData(cities) {
        const source = $('#first-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template( {cities} );
        $(".cities-container").empty().append(newHTML);
    
    }
}

