/*******************************
Global Variables
*******************************/
const $gallery = $('#gallery');

/*******************************
API Request & Page Display
*******************************/
/**
  * fetch request for random user information.
  * Response is parsed from JSON into data object
  * and given to main function for manipulation.
*/
fetch('https://randomuser.me/api/?results=12&nat=us,nz,gb,au')
  .then(response => response.json())
  .then(data => {
    let selIndex = 0;

/**
  * Creates the HTML markup for creation of modal window from a specific user.
  * @param number Index position for array of user objects retrieved from API
*/
    function createModalHTML(selIndex) {
      let selection = data.results[selIndex];
      let dob = selection.dob.date.split('-');
      let location = selection.location;
      let modelHTML = `
      <div class="modal-container">
          <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                  <img class="modal-img" src="${selection.picture.large}" alt="profile picture">
                  <h3 id="name" class="modal-name cap">${selection.name.first} ${selection.name.last}</h3>
                  <p class="modal-text">${selection.email}</p>
                  <p class="modal-text cap">${selection.location.city}</p>
                  <hr>
                  <p class="modal-text">${selection.cell}</p>
                  <p class="modal-text cap">${location.street}, ${location.city}, ${location.state} ${location.postcode}</p>
                  <p class="modal-text">Birthday: ${dob[1]}/${dob[2].slice(0, 2)}/${dob[0]}</p>
              </div>
          </div>
          <div class="modal-btn-container">
              <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
              <button type="button" id="modal-next" class="modal-next btn">Next</button>
          </div>
        </div>
      `;
      return modelHTML;
    }

/**
  * Checks the position of the user and hides modal window buttons if on beginning or end.
  * @param number Index position for array of dynamically appended user divs.
*/
    function checkSelIndex(selIndex) {
      if (selIndex === 0) {
        $('#modal-prev').hide();
      }
      if (selIndex === 11) {
        $('#modal-next').hide();
      }
    }

/**
 * Loops through data from API and creates/appends divs to display basic information.
*/
    $.each(data.results, function(index, person) {
      let contactHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${person.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name-${index}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                <p class="card-text">${person.email}</p>
                <p class="card-text cap">${person.location.city}</p>
            </div>
        </div>`;
      $gallery.append(contactHTML);
    }); // end $.each

/**
  * Uses index of data object embedded in user div to create a modal window
  * with additional information when a user card is clicked.
*/
    $('#gallery .card').click(function(){
      selIndex = parseInt($(this).find('h3').attr('id').substring(5));
      $gallery.append(createModalHTML(selIndex));
      checkSelIndex(selIndex);
    }); // end click

/**
  * "Global" click event handler to respond to modal button clicks.
  * 1. Closes the modal window.
  * 2 and 3. Creates new modal window for previous or next user.
*/
    $gallery.click(function(event){
      if (event.target.textContent === 'X') {
        $('.modal-container').remove();
      }
      if (event.target.textContent === 'Prev') {
        selIndex -= 1;
        $('.modal-container').replaceWith(createModalHTML(selIndex));
        checkSelIndex(selIndex);
      }
      if (event.target.textContent === 'Next') {
        selIndex += 1;
        $('.modal-container').replaceWith(createModalHTML(selIndex));
        checkSelIndex(selIndex);
      }
    }); // end click

/**
  * Creates and appends a search bar to DOM.
*/
    $('.search-container').append(`
      <form action="#" method="get">
          <input type="search" id="search-input" class="search-input" placeholder="Search...">
          <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
      </form>`
    );

/**
  * Sumbit event handler to search through the displayed users and hide those
  * that do not match.
  * Uses regexp test() method to check for match between name and input.
*/
    $('form').submit(function(event) {
      event.preventDefault();
      const $input = $('#search-input').val().toLowerCase();
      const input = new RegExp ($input);
      const query = document.querySelectorAll('h3[id^=name]');

      $.each(query, function(index, person) {
        let container = person.parentNode.parentNode;
        if ($input === '') {
          container.style.display = '';
        } else if (input.test(person.innerHTML)){
          container.style.display = '';
        } else {
          container.style.display = 'none';
        }
      }); // end $.each
    }); // end submit
  });
