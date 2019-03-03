function deleteBeer(id) {
	$.ajax({
		url: '/beers/' + id,
		type: 'DELETE',
		success: function(result) {
			if(result.responseText != undefined) {
				alert(result.responseText);
			}
			else {
				window.location.assign('/beers');
			}
		}
	})
}