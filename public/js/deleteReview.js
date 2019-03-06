function deleteReview(rev_id, beer_id){
    $.ajax({
        url: '/reviews/' + rev_id,
        type: 'DELETE',
        success: function(result){
            if(result.responseText != undefined) {
                alert(result.responseText);
            } else {
                window.location.assign('/beers/' + beer_id);
            }
        }
    })
};