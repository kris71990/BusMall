'use strict';

var imgEl1 = document.getElementById('image1');
var imgEl2 = document.getElementById('image2');
var imgEl3 = document.getElementById('image3');

var elArray = [imgEl1, imgEl2, imgEl3];
var images = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Item.allItems = [];

function Item(src, alt) {
  this.src = src;
  this.alt = alt;
  Item.allItems.push(this);
  this.displayed = 0;
  this.selected = 0;
}

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

function randomizer(e) {
  // keep track of image that was clicked
  var target = e.target.alt;
  for (var x = 0; x < Item.allItems.length; x++) {
    if (Item.allItems[x].alt === target) {
      Item.allItems[x].selected += 1;
      console.log(Item.allItems[x].selected);
    }
  }
  var randomNumberArray = [];
  console.log('Selected: ' + target);

  // generate new set of random images and count the ones displayed
  for (var i = 0; i < elArray.length; i++) {
    var random = Math.floor(Math.random() * Item.allItems.length);
    if (randomNumberArray.includes(random)) {
      i -= 1;
    } else {
      randomNumberArray.push(random);
      Item.allItems[random].displayed += 1;
      console.log('Displayed: ' + Item.allItems[random].alt + ' ' + Item.allItems[random].displayed);
    }
  }

  imgEl1.setAttribute('src', Item.allItems[randomNumberArray[0]].src);
  imgEl1.alt = Item.allItems[randomNumberArray[0]].alt;
  imgEl2.setAttribute('src', Item.allItems[randomNumberArray[1]].src);
  imgEl2.alt = Item.allItems[randomNumberArray[1]].alt;
  imgEl3.setAttribute('src', Item.allItems[randomNumberArray[2]].src);
  imgEl3.alt = Item.allItems[randomNumberArray[2]].alt;
}
