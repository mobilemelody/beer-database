function deleteTap(id, beer) {
	$.ajax({
		url: '/venues/' + id + '/tap/' + beer,
		type: 'DELETE',
		success: function(result) {
			if(result.responseText != undefined) {
				alert(result.responseText);
			}
			else {
				window.location.reload(true);
			}
		}
	})
}