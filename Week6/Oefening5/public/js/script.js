$(document).ready(function() {
    $('input[type="submit"]').on('click', function () {
        $.ajax({
            dataType: 'json',
            url: location.protocol + '//' + location.host + '/apiData',
            data: $('#myForm').serialize(),
            success: function(json) {
                console.log(json);
            }
        });
        return false;
    });
});