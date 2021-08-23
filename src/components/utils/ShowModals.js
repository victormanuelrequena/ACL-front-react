const ShowModal = (reference, limit) => {

if(reference.current.style.display === 'none') {
		reference.current.style.display="flex";
	}else {
		reference.current.style.display="none";
	}
	if(limit === 'limit') {
	setTimeout(() => {
		reference.current.style.display="none";
	}, 20000)
	}
};

export default ShowModal;