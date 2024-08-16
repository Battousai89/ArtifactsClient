const map = $('#map');
const mapContainer = $('.map-container')
const rows = 11;
const columns = 15;
const tilesFolderPath = `static/images/maps/`


function print_r(o){
    return JSON.stringify(o,null,'\t').replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;'); 
}

    
function generateGrid() {
    for (let y = -5; y < columns; y++) {
        for (let x = -5; x < rows; x++) {
            const tile = $(`<div id="tile_${x}_${y}" class="tile">
                    <svg onclick="tileInfo(event)" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" width="24px" height="24px">
                        <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"/>
                    </svg>
                    <p class="coords">${x}:${y}</p>
                </div>`);
            map.append(tile);
        }
    }
}

function drawMapImages() {
    for (let y = -5; y < columns; y++) {
        for (let x = -5; x < rows; x++) {
            const imagePath = tilesFolderPath + `tile_${x}_${y}.png`; // Путь к изображению
            tile = $(`#tile_${x}_${y}`);
            tile.css('background-image', `url(${imagePath})`);
            map.append(tile);
        }
    }
}

async function getTileInfo(tile) {
    let tileId = tile.attr('id');
    let tileCoords = tileId.split("_");

    let response = await $.ajax({
        url: './maps/' + tileCoords[1] + '/' + tileCoords[2],
        type: 'get'
    });

    return response.data;
}

async function tileInfo(e) {
    let content = $('.popup-content')
    let targetName = e.target.tagName
    let tile
    tile = $(e.target).parent()
    if (targetName == 'path') {
        tile = tile.parent()
    }
    
    content.empty()
    let tileInfoContent = await getTileInfo(tile)
    const newContent = $(`<h2>Map information:</h2>
        <pre>` + print_r(tileInfoContent) + `</pre>`
    )
    content.append(newContent)
    $('#popupOverlay').css('display', 'flex').hide().fadeIn();
}

mapContainer.mousedown(function (e) {
    var startX = this.scrollLeft + e.pageX;
    var startY = this.scrollTop + e.pageY;
    mapContainer.mousemove(function (e) {
        this.scrollLeft = startX - e.pageX;
        this.scrollTop = startY - e.pageY;
        return false;
    });
});
$(window).mouseup(function () {
    mapContainer.off("mousemove"); 
});

$('#closePopup').click(function() {
    $('#popupOverlay').fadeOut();
});

$(document).ready(function() {
    generateGrid()
    drawMapImages()
});