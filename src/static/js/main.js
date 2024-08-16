const CHARACTER_WIDTH = 38
const CHARACTER_HEIGHT = 46

function fight()
{
    characterName = $('#characterName').val();

    if (characterName == null || characterName == undefined) {
        return
    } 

    $.ajax({
        url: '/fight',
        type: 'POST',
        data: {character: characterName},
        success: function(response) {
            console.log(response);
        }
    });
}

async function move()
{
    characterName = $('#characterName').val();

    if (characterName == null || characterName == undefined) {
        return
    }
    
    x = $('#x').val();
    y = $('#y').val();
    if (x < -5) x = -5;
    if (y < -5) y = -5;
    if (x > 11) x = 11;
    if (y > 15) y = 15;

    await $.ajax({
        url: './move',
        type: 'POST',
        data: {
            character: characterName,
            x: x,
            y: y
        },
        success: function(response) {
            console.log(response)
        }
    });

    let selectedCharacter = await getSelectedCharacter();
    drawSelectedCharacter(selectedCharacter);
}

function updateImages()
{
    $.ajax({
        url: './update/images',
        type: 'POST',
        success: function(response) {
            console.log(response)
        }
    });
}

async function getSelectedCharacter() {
    let characterName = $('#characterName').val();

    if (characterName == null || characterName == undefined) {
        return
    }

    let response = await $.ajax({
        url: './characters/' + characterName,
        type: 'get'
    });

    return response.data;
}

function drawSelectedCharacter(selectedCharacter) {
    $('#character').remove()
    let skinName = selectedCharacter.skin
    let mapTile = $(`#tile_${selectedCharacter.x}_${selectedCharacter.y}`);
    const CHARACTER_IMG = $(`<img id="character" style="width:${CHARACTER_WIDTH}px;height:${CHARACTER_HEIGHT}px;" 
        src="static/images/characters/skin_${skinName}.png">`);
    mapTile.append(CHARACTER_IMG)
}

$(document).ready(async function () {
    try {
        let selectedCharacter = await getSelectedCharacter();
        drawSelectedCharacter(selectedCharacter);
    } catch (error) {
        console.error("Error:", error);
    }
});