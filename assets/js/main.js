var topSquareDecrypt = [[],[]];
var bottomSquareDecrypt = [[],[]];

// Decrypt code
$(document).ready(function(){
  // find elements
  var button = $("button")

  // handle click and add class
  $(".decrypt-form button").on("click", function(){
    decryptPrep();
  });

});

/*
 * Function to fetch and parse data for decyption
 *
 */
function decryptPrep(){
  var key1 = parse($("input#decrypt-keyword1").val());
  var key2 = parse($("input#decrypt-keyword2").val());
  var text = parse($("input#decrypt-text").val());

  decrypt(key1, key2, text);
}

/*
 * Function to decrypt the data
 *
 */
function decrypt(key1, key2, text){
  var topSquare = $("#decrypt-container .top-grid")
  var bottomSquare = $("#decrypt-container .bottom-grid")

  key1 = buildKey(key1, topSquare, topSquareDecrypt);
  key2 = buildKey(key2, bottomSquare, bottomSquareDecrypt);

  console.log(topSquareDecrypt);
}

/*
 * Function to build a key based on cipher requirements
 *
 */
function buildKey(key, square, matrix){
  var finalKey = "";

  // Loop through the string we're given
  for(var i = 0; i < key.length; i++){
    var curLetter = key.charAt(i);

    // Ignore duplicates in the key
    if(finalKey.indexOf(curLetter) == -1){
      finalKey += curLetter;
    }
  }

  // Loop from lowecase a to z
  for(var i = 97; i < 123; i++){
    var curLetter = String.fromCharCode(i);

    // Check if the letter is already in the string
    // Also make sure we don't add q
    if(finalKey.indexOf(curLetter) == -1 && curLetter != 'q'){
      finalKey += curLetter;
    }
  }

  buildCharArray(finalKey, square, matrix)

  return finalKey;
}

/*
 * Function to build the char array used to decrypt
 *
 */
function buildCharArray(key, square, matrix){
  console.log(key);
  var counter = 0;

  // Loop through all 25 html elements
  square.find($(".letter")).each(function(i, obj) {
    // Put the letter in the html
    var curLetter = key.charAt(counter);
    $(this).html(curLetter);

    //build the array
    matrix[Math.floor(counter / 5)][counter % 5];
    counter++
  });
}

/*
 * Parse a single string
 * Remove all non-alpha characters and remove g
 */
 function parse(stringToParse){
  stringToParse = stringToParse.toLowerCase();
  return stringToParse.replace(/[^a-fh-zA-EH-Z]/g,"");
}
