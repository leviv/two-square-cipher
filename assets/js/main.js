var topSquareDecrypt = new Array(5);
var bottomSquareDecrypt = new Array(5);
var topSquareEncrypt = new Array(5);
var bottomSquareEncrypt = new Array(5);

// Add handlers for encrypt and decrypt buttons
$(document).ready(function(){
  // find elements
  var button = $("button")

  // handle click for decrypt button
  $(".decrypt-form button").on("click", function(){
    decryptPrep();


  });

  // handle click for encrypt button
  $(".encrypt-form button").on("click", function(){
    console.log("hello");
    encryptPrep();
  });

});

/*
 * Function to fetch and parse data for decyption
 *
 */
function decryptPrep(){
  // Initialize the 2d array
  for(var i = 0; i < 5; i++){
    topSquareDecrypt[i] = new Array(5);
    bottomSquareDecrypt[i] = new Array(5);
  }

  // Grab the user entered values
  var key1 = parse($("input#decrypt-keyword1").val());
  var key2 = parse($("input#decrypt-keyword2").val());
  var text = parse($("input#decrypt-text").val());

  // If the text entered is an odd number
  if (text.length % 2 == 1){
    text += 'z';
  }

  decrypt(key1, key2, text);
}

/*
 * Function to fetch and parse data for encryption
 *
 */
function encryptPrep(){
  // Initialize the 2d array
  for(var i = 0; i < 5; i++){
    topSquareEncrypt[i] = new Array(5);
    bottomSquareEncrypt[i] = new Array(5);
  }

  // Grab the user entered values
  var key1 = parse($("input#encrypt-keyword1").val());
  var key2 = parse($("input#encrypt-keyword2").val());
  var text = parse($("input#encrypt-text").val());

  // If the text entered is an odd number
  if (text.length % 2 == 1){
    text += 'z';
  }

  encrypt(key1, key2, text);
}

/*
 * Function to encrypt the data
 *
 */
function encrypt(key1, key2, text){
  var topSquare = $("#encrypt-container .top-grid")
  var bottomSquare = $("#encrypt-container .bottom-grid")

  key1 = buildKey(key1, topSquare, topSquareEncrypt);
  key2 = buildKey(key2, bottomSquare, bottomSquareEncrypt);

  var encryptedText = solveSquares(topSquareEncrypt, bottomSquareEncrypt, text);

  $('#encrypt-result span').html(encryptedText);
  return encryptedText;
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

  var decryptedText = solveSquares(topSquareDecrypt, bottomSquareDecrypt, text);

  $('#decrypt-result span').html(decryptedText);
  return decryptedText;
}

/*
 * Function to solve the decrypted text, given the two squares
 *
 */
function solveSquares(topSquare, bottomSquare, text){
  var resultText = "";

  // Loop through the given text
  for(var i = 0; i < text.length; i+=2){

    // Retrive and find the position of the next 2 characters
    var curLetter = text.charAt(i);
    var nextLetter = text.charAt(i+1);

    var firstLetterPos = findLetter(topSquare, curLetter);
    var secondLetterPos = findLetter(bottomSquare, nextLetter);

    // Find the letters that the text maps to
    var firstLetterMap = topSquare[firstLetterPos[0]][secondLetterPos[1]];
    var secondLetterMap = bottomSquare[secondLetterPos[0]][firstLetterPos[1]];

    resultText = resultText + firstLetterMap + secondLetterMap;
  }

  return resultText;
}

/*
 * Function to find the position of a letter in the matrix
 * return in the form [row,col], return [-1,-1] if not found
 */
function findLetter(matrix, letter){
  for(var r = 0; r < 5; r++){
    for(var c = 0; c < 5; c++){
      if(matrix[r][c] == letter){
        return [r,c];
      }
    }
  }
  return [-1,-1];
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
  var counter = 0;

  // Loop through all 25 html elements
  square.find($(".letter")).each(function(i, obj) {
    // Put the letter in the html
    var curLetter = key.charAt(counter);
    $(this).html(curLetter);

    //build the array
    matrix[Math.floor(counter / 5)][counter % 5] = curLetter;
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
