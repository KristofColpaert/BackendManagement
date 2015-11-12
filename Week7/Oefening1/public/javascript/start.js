/**
 * CLIENT AJAX CALL met jQuery 
 * 
 * 
 */

$(document).ready(function () {
    console.log("jQuery loaded");
    $('input[type="submit"]').on('click', function () {
        $.ajax({
            dataType: "json",
            beforeSend: function () { $('#progress').show(); },
            complete: function () { $('#progress').hide(); },
            url: location.protocol + "//" + location.host + "/apiData", //universeel
            data: $("#myForm").serialize(),
            success: function (json) {
                //TO DO: node resultaat verwerken in searchResults  
                console.log(json);
                $('#searchResults').empty();
                try {
                    $("div").html("Resultaat: " + JSON.parse(json).title + "<br />").appendTo("#searchResults");
                                       
                    $.each(JSON.parse(json).items, function (index, item) {                        
                        $('#searchResults')
                        .append($('<div style="float:left">')
                            .append($('<img />').attr('src', item.media.m).attr('height', '170px'))
                            .append('<div style="font-size:10px">' + item.title + '</div></div>')
                        )                                     
                    });
                } 
                catch (e) {
                    alert(e);
                    console.log(e);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + ":\n" + thrownError.message);
                console.log("error bij ajax call: " + thrownError);
            }
        });        
        return false; // default submit verhinderen of preventDefault
    });
});