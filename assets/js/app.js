$(document).ready(function () {
	if (!!window.IntersectionObserver) {

		/* Video play/stop on scroll into view */
		let video = document.querySelectorAll('video');
		let observeVideo = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (!entry.isIntersecting && !entry.target.paused) {
					entry.target.pause();
				} else if (entry.target.paused) {
					entry.target.play();
				}
			});
		}, {
			threshold: 0.6
		});
		video.forEach((element, index) => {
			observeVideo.observe(element);
		});

		/* Let elements fade into view (not out) */
		let fade = document.querySelectorAll('.fade');
		let observeFade = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in');
				}
			});
		}, {
			threshold: 0.4
		});
		fade.forEach((element, index) => {
			observeFade.observe(element);
		});

		/* Let elements zoom out */
		let zoom = document.querySelectorAll('.zoom-out');
		let observeZoom = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('in');
				}
			});
		}, {
			threshold: 1
		});
		zoom.forEach((element, index) => {
			observeZoom.observe(element);
		});

		/* Nat Story v1 */
		var elementObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {

				let storyLine = entry.target.parentNode;
				let targetId = parseInt(entry.target.dataset.storyControl);
				let prevId = targetId - 1;
				let nextId = targetId + 1;
				let targetObj = storyLine.querySelector(".story-background[data-story-id='" + targetId + "']");
				let targetState = targetObj.dataset.storyState;
				let prevObj = storyLine.querySelector(".story-background[data-story-id='" + prevId + "']");
				let nextObj = storyLine.querySelector(".story-background[data-story-id='" + nextId + "']");
				let currentPrevObj = storyLine.querySelector('.story-background[data-story-state="prev"]');
				let currentNextObj = storyLine.querySelector('.story-background[data-story-state="next"]');
				
				if (entry.isIntersecting) {
					if (prevObj !== null) prevObj.dataset.storyState = "prev";
					if (nextObj !== null) nextObj.dataset.storyState = "next";
					entry.target.dataset.storyState = "active";
					if (targetState == "next" && currentPrevObj !== null) currentPrevObj.removeAttribute("data-story-state");
					if (targetState == "prev" && currentNextObj !== null) currentNextObj.removeAttribute("data-story-state");
					targetObj.dataset.storyState = "active";
				}
				else {
					entry.target.removeAttribute("data-story-state");
				}
			});
		}, { 
			threshold: 0.7 
		});
		var storyElement = document.querySelectorAll('.story-text');
		storyElement.forEach((element) => {
			elementObserver.observe(element);
		});

	}


	/* Fact read more toggle */
	$('.nat-fact').click(function () {
		$(this).find('.facts-content').slideToggle();
		$(this).find('.facts-indicator').toggleClass("active");
	})


	/* Web Share API  */
	const shareButton = document.querySelector('#share-button');
	const shareButton2 = document.querySelector('#share-button2');
	const overlay = document.querySelector('.overlay');
	const share = document.querySelector('.share');

	const title = window.document.title;
	const url = window.document.location.href;

	function popupwindow(url, title, w, h) {
		var left = (screen.width / 2) - (w / 2);
		var top = (screen.height / 2) - (h / 2);
		return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
	};

	shareButton.addEventListener('click', () => {
		if (navigator.share) {
			navigator.share({
				title: `${title}`,
				url: `${url}`,
			}).then(() => {
				console.log('Thanks for sharing!');
			}).catch(console.error);
		} else {
			popupwindow('https://www.facebook.com/sharer/sharer.php?u=' + url, title, 500, 500);
			// overlay.classList.remove('share-hide');
			// share.classList.remove('share-hide');                
		}
	})

});

