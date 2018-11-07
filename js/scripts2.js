const $gallery = $('#gallery');
fetch('https://randomuser.me/api/?results=12&nat=us,nz,gb,au')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let selIndex = 0;
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

    function checkSelIndex(selIndex) {
      if (selIndex === 0) {
        $('#modal-prev').hide();
      }
      if (selIndex === 11) {
        $('#modal-next').hide();
      }
    }

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

    $('#gallery .card').click(function(){
      selIndex = parseInt($(this).find('h3').attr('id').substring(5));
      $gallery.append(createModalHTML(selIndex));
      checkSelIndex(selIndex);
    }); // end click

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

    $('.search-container').append(`
      <form action="#" method="get">
          <input type="search" id="search-input" class="search-input" placeholder="Search...">
          <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
      </form>`
    );

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
