let currentQ = 1;
const nextBtn = '<button type="button" class="next animated bounceInLeft">Submit</button>';
const circle = new ProgressBar.Circle('#circle-container', {
	duration: 200,
	strokeWidth: 5,
	trailWidth: 5,
	trailColor: '#ddd',
	from: {
		color: '#218CCC',
	},
	to: {
		color: '#047E3C',
	},
	step(state, circle) {
		circle.path.setAttribute('stroke', state.color);
	},
});
const questionArray = $('.questiontion');
for (let cpt = 0; cpt <= questionArray.length; cpt++) {
	if (cpt >= 1) $(questionArray[cpt]).addClass('disabled');
}
$('.btnQ').on('click',function(e){
	if(!$('.question' + currentQ +' .button-space .next').length){
		$('.question' + currentQ +' .button-space').append(nextBtn);
		$('.next').on('click', changeQ);
	}
});
function changeQ() {
	circle.animate((currentQ) / questionArray.length);
	$('.question' + currentQ).addClass('animated fadeOutDown');
	setTimeout(() => {
		$('.question' + currentQ).removeClass('animated fadeOutDown');
		$('.question' + currentQ).addClass('disabled');
		currentQ = currentQ + 1;
		setNewQ();
	}, 1000);
}
function setNewQ() {
	if (currentQ > questionArray.length) {
		$('.quiz').append('<div class="end animated bounceInDown">Thanks for sharing...</div>');
	}
	else {
		$('.question' + currentQ).removeClass('disabled');
		$('.question' + currentQ).addClass('animated fadeInDown');
	}
}
