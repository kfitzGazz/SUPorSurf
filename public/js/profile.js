//js for format

//3 Scripts: SMOOTH SCROLL, GOOGLE MAPS, CHANGE CLASS

//SMOOTH SCROLLING
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathusername.replace(/^\//, '') == this.pathusername.replace(/^\//, '') 
      && 
      location.hostusername == this.hostusername
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[username=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

//CHANGE CSS CLASS IN HTML
	$(document).scroll(function() {
	var swap_class = document.getElementById("change_class");

	   if($(window).scrollTop() === 0) {
	     swap_class.classList.remove("menu_color_change");
	   } else {
	   		swap_class.classList.add("menu_color_change");
	   	}
	});

//end js for format


const newFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#surfboard-username').value.trim();
 
  const description = document.querySelector('#surfboard-desc').value.trim();

  if (username && description) {
    const response = await fetch(`/api/surfboards`, {
      method: 'POST',
      body: JSON.stringify({ username, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/surfboard');
    } else {
      alert('Failed to create surfboard');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/surfboards/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/surfboard');
    } else {
      alert('Failed to delete surfboard');
    }
  }
};

document
  .querySelector('.new-surfboard-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.surfboard-list')
  .addEventListener('click', delButtonHandler);
