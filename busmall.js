'use strict';

var imgEl1 = document.getElementById('image1');
var imgEl2 = document.getElementById('image2');
var imgEl3 = document.getElementById('image3');
var sectionImages = document.getElementById('images');
var sectionTotal = document.getElementById('totals');
var elArray = [imgEl1, imgEl2, imgEl3];
var images = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var totalClicks = 0;

Item.allItems = [];
Item.lastDisplayed = [];
Item.totalVotes = [];

function Item(src, alt) {
  this.src = src;
  this.alt = alt;
  this.displayed = 0;
  this.selected = 0;
  Item.allItems.push(this);
}

// create objects by filepath concatenation
for (var i = 0; i < images.length; i++) {
  if (images[i] === 'usb') {
    new Item('img/' + images[i] + '.gif', images[i]);
  } else if (images[i] === 'sweep') {
    new Item('img/' + images[i] + '.png', images[i]);
  } else {
    new Item('img/' + images[i] + '.jpg', images[i]);
  }
}

imgEl1.addEventListener('click', randomizer);
imgEl2.addEventListener('click', randomizer);
imgEl3.addEventListener('click', randomizer);

// callback to event listener that records data for image clicked
// then either calls the setImages function to create a new set of images
// or if 25 images have been clicked, displays a list of data
function randomizer(e) {
  totalClicks += 1;
  console.log('Total clicks: ' + totalClicks);

  var target = e.target.alt;
  for (var x = 0; x < Item.allItems.length; x++) {
    if (Item.allItems[x].alt === target) {
      Item.allItems[x].selected += 1;
      console.log(Item.allItems[x].selected);
    }
  }
  console.log('Selected: ' + target);

  // set more images or display data
  if (totalClicks === 25) {
    imgEl1.removeEventListener('click', randomizer);
    imgEl2.removeEventListener('click', randomizer);
    imgEl3.removeEventListener('click', randomizer);

    displayTable();
    renderChart();
  } else {
    setImages();
  }
}

// selects a set of three random images
function setImages() {
  var randomNumbers = [];

  // generates random number that is unique in the current set, and also different from the last set
  for (var i = 0; i < elArray.length; i++) {
    var random = Math.floor(Math.random() * Item.allItems.length);
    if (randomNumbers.includes(random) || Item.lastDisplayed.includes(random)) {
      i -= 1;
    } else {
      randomNumbers.push(random);

      if (i === elArray.length - 1) {
        for (var x = 0; x < randomNumbers.length; x++) {
          Item.lastDisplayed[x] = randomNumbers[x];
        }
      }
      console.log(Item.lastDisplayed);
      Item.allItems[random].displayed += 1;
      console.log('Displayed: ' + Item.allItems[random].alt + '- ' + Item.allItems[random].displayed);
    }
  }

  imgEl1.setAttribute('src', Item.allItems[randomNumbers[0]].src);
  imgEl1.alt = Item.allItems[randomNumbers[0]].alt;

  imgEl2.setAttribute('src', Item.allItems[randomNumbers[1]].src);
  imgEl2.alt = Item.allItems[randomNumbers[1]].alt;

  imgEl3.setAttribute('src', Item.allItems[randomNumbers[2]].src);
  imgEl3.alt = Item.allItems[randomNumbers[2]].alt;
}

// called to display list of data
function displayTable() {
  totalClicks = 0;
  sectionImages.innerHTML = '';
  var h3 = document.createElement('h3');
  h3.textContent = 'Data';
  var ul = document.createElement('ul');

  for (var i = 0; i < Item.allItems.length; i++) {
    var selected = Item.allItems[i].selected;
    var displayed = Item.allItems[i].displayed;
    Item.totalVotes.push(Item.allItems[i].selected);
    var rate;

    // calculate rate
    if (displayed === 0) {
      rate = 0;
    } else {
      rate = Math.round((selected / displayed) * 100);
    }

    // display proper singular/plural
    var selectedTimes = '';
    var displayedTimes = '';
    var li = document.createElement('li');

    if (selected === 1) {
      selectedTimes = 'time';
    } else {
      selectedTimes = 'times';
    }

    if (displayed === 1) {
      displayedTimes = 'time';
    } else {
      displayedTimes = 'times';
    }

    // concatenate and display results
    li.innerHTML = Item.allItems[i].alt + ' was displayed ' + displayed + ' ' + displayedTimes + ' and selected ' + selected + ' ' + selectedTimes + '<br/>' + selected + '/' + displayed + ' is a ' + rate + '% selection rate.';
    ul.appendChild(li);

  }
  sectionTotal.setAttribute('style', 'border: 10px double black');
  sectionTotal.appendChild(h3);
  sectionTotal.appendChild(ul);
}

function renderChart() {
  var ctx = document.getElementById('chart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: images,
      datasets : [{
        label: 'Items',
        data: Item.totalVotes,
        backgroundColor: ['black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red','black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red']
      }]
    },
    options: {
      responsive: false,
      maintainAspectRation: true,
      title: {
        display: true,
        text: 'Your Most Selected Items',
        fontSize: 20
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          }
        }]
      }
    }
  });
}

setImages();