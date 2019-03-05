function deleteReview(id){
    $.ajax({
        url: '/reviews/' + id,
        type: 'DELETE',
        success: function(result){
            if(result.responseText != undefined) {
                alert(result.responseText);
            } else {
                window.location.assign('/reviews');
            }
        }
    })
};