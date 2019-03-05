function deleteVenue(id) {
	$.ajax({
		url: '/venues/' + id,
		type: 'DELETE',
		success: function(result) {
			if(result.responseText != undefined) {
				alert(result.responseText);
			}
			else {
				window.location.assign('/venues');
			}
		}
	})
}