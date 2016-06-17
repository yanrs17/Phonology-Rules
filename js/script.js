// Haven't checked yet
var arrayVowel = [
    "i", "y", "ɨ", "ʉ", "ɯ", "u", "ɪ",
    "ʏ", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ",
    "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ",
    "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"]
var arrayConsonant = [
    "p", "b", "t", "d", "ʈ", "ɖ", "c", "ɟ", "k", "g", "q", "ɢ", "ʔ",
    "m", "ɱ", "n", "ɳ", "ɲ", "ŋ", "ɴ",
    "ʙ", "r", "ʀ",
    "ⱱ", "ɾ", "ɽ",
    "ɸ", "β", "f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "ʂ", "ʐ", "ç", "ʝ", "x", "ɣ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ",
    "ɬ", "ɮ",
    "ʋ", "ɹ", "ɻ", "j", "ɰ",
    "l", "ɭ", "ʎ", "ʟ"];
var arrayATRPlus = [];
var arrayATRMinus = [];
var arrayAnteriorPlus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "n", "l", "r", "ɹ"];
var arrayAnteriorMinus = ["ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "ɳ"];
var arrayBackPlus = ["k", "g", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ŋ", "ɴ", "ʀ",
"w", "ɰ", "ɯ",
"u", "ʊ", "ɤ", "o", "ə", "ʌ", "ɔ", "ɑ", "ɒ"];
var arrayBackMinus = ["c", "ɟ", "ç", "ʝ", "ɳ", "ɲ", "ʎ", "j", "ɥ", "i", "ɪ", "e", "ɛ", "a", "æ",
"y", "ʏ", "∅", "œ"];
var arrayConsonantalPlus = [];
var arrayConsonantalMinus = [];
var arrayCGPlus = [];
var arrayCGMinus = [];
var arrayContinuantPlus = [
"s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ",
"ç", "ʝ", "f", "v", "ɸ", "β", "x", "ɣ",
"χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "l", "ʎ",
"r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i",
"y", "ɨ", "ʉ", "ɯ", "u", "ɪ", "ʏ", "ʊ",
"e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ",
"œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a",
"ɶ", "ɑ", "ɒ"];
var arrayContinuantMinus = [];
var arrayCoronalPlus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "n", "ɳ", "l", "r", "ɹ"];
var arrayCoronalMinus = [];
var arrayDelayed = [];
var arrayReleasePlus = [];
var arrayDelayed = [];
var arrayReleaseMinus = [];
var arrayDistributedPlus = [];
var arrayDistributedMinus = [];
var arrayDorsalPlus = ["c", "ɟ", "ç", "ʝ", "k", "g", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ŋ", "ɳ", "ɲ", "ʎ", "ʀ", "j", "w", "ɥ", "ɰ",
"i", "y", "ɨ", "ʉ", "ɯ", "u", "ɪ",
"ʏ", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ",
"o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ",
"ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
var arrayDorsalMinus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "p", "b",
"f", "v", "ɸ", "β", "ħ", "ʕ", "h", "ɦ", "ʔ", "m", "n", "l", "r", "ɹ"];
var arrayHighPlus = ["c", "ɟ", "ç", "ʝ", "k", "g", "x", "ɣ", 'j', 'w', 'ɥ', 'ɰ', 'i', 'ɪ', 'u',
'ʊ', 'ŋ', 'ɲ', 'ʎ', 'y', 'ʏ', 'ɯ'];
var arrayHighMinus = [];
var arrayLabialPlus = [];
var arrayLabialMinus = [];
var arrayLateralPlus = [];
var arrayLateralMinus = [];
var arrayLowPlus = ['æ', 'ɐ', 'a', 'ɶ', 'ɑ', 'ɒ'];
var arrayLowMinus = ["c", "ɟ", "ç", "ʝ", "k", "g", "x", "ɣ", "q", "ɢ", "χ",
"ʁ", "ŋ", "ɳ", "ɲ" , 'ɴ', 'ʎ', 'ʀ', 'j', 'w', 'ɥ', 'ɰ', 'i', 'ɪ', 'u',
'ʊ', 'e', 'ɛ', 'o', 'ɔ', 'y', 'ʏ', '∅', 'œ', 'ə', 'ɯ'];
var arrayNasalPlus = ["m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "ɱ"];
var arrayNasalMinus = [];
var arrayPharyngealPlus = [];
var arrayPharyngealMinus = [];
var arrayRoundPlus = ["y", "ʏ", "ø", "œ", "ɶ", "ʉ", "ɵ", "ɞ", "u", "ʊ", "o", "ɔ", "ɒ"];
var arrayRoundMinus = ["i", "ɪ", "e", "ɛ", "æ", "a", "ɨ", "ɘ", "ə", "ɜ", "ɐ", "ɯ", "ɤ", "ʌ", "ɑ"];
var arraySonorantPlus = ["i", "ɪ", "u", "ʊ", "e", "ɛ", "o", "ɔ", "a", "æ", "y", "ʏ", "ə", "ø", "œ", "ɯ",
"m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "ɱ",
"l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ"];
var arraySonorantMinus = [];
var arraySGPlus = ["ɬ", "h", "ɦ"];
var arraySGMinus = [];
var arrayStridentPlus = [];
var arrayStridentMinus = [];
var arraySyllabicPlus = [];
var arraySyllabicMinus = [];
var arrayTensePlus = [];
var arrayTenseMinus = [];
var arrayVoicePlus = ["t", "s", "ɬ", "θ", "ʃ", "c", "ç", "p", "f", "ɸ", "k", "x", "q", "χ", "ħ"];
var arrayVoiceMinus = [];

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

window.onload = function () {
    testCases();
}

function testCases() {

    function testCorrect(A, B, C, D, before, after) {
        if (applyRule(A, B, C, D, before) != after) console.log("Something is wrong!");
    }

    function testIllFormed(A, B, C, D, TF) {
        if (isIllFormed(A, B, C, D) != TF) console.log("Something is wrong!");
    }

    console.log("Test cases start:");
    // Check ill-formed
    // testIllFormed('&nbsp;', 'a', 'd', 'f', true);
    // testIllFormed('a', '&nbsp;', 'd', 'f', false);
    // testIllFormed('&nbsp;', '&nbsp;', 'd', 'f', true);
    // testIllFormed('∅', 'w', 'd', 'f', true);
    // testIllFormed('q', '∅', 'd', 'f', false);
    // testIllFormed('d', 'w', '∅', 'f', true);
    // testIllFormed('d', 'w', 'v', '∅', true);
    // testIllFormed('#', 'w', 'v', 'b', true);
    // testIllFormed('g', '#', 'v', 'b', true);
    // testIllFormed('g', 'w', '#', 'b', false);
    // testIllFormed('g', 'w', 'v', '#', false);
    // testIllFormed('#', '#', 'v', 'f', true);
    // testIllFormed('g', '#', 'v', '#', true);
    // testIllFormed('#', 'w', '#', 'd', true);
    // testIllFormed('d', 'w', '#', '#', true);

    // No special characters
    // Without empty added in C or D:
    // Random test cases
    testCorrect('A', 'B', 'A', 'A' ,'AAAAA', 'ABBBA');
    testCorrect('p', 'k', 't', 's', 'tpsa', 'tksa');
    testCorrect('p', 'k', 't', 's', 'tppsa', 'tppsa');
    // Neither init nor final with B is not none
    testCorrect('a', 'b', 'c', 'd', 'cadac', 'cbdac');
    testCorrect('d', 'f', 'k', 'j', 'kdj', 'kfj');
    testCorrect('d', 'f', 'k', 'j', 'kda', 'kda');
    // Neither init nor final with B is none
    testCorrect('a', '∅', 'b', 's', 'tppsa', 'tppsa');
    testCorrect('a', '∅', 'b', 's', 'bas', 'bs');
    testCorrect('a', '∅', 'b', 's', 'basa', 'bsa');
    testCorrect('a', ' ', 'b', 's', 'tppsa', 'tppsa');
    testCorrect('a', ' ', 'b', 's', 'bas', 'bs');
    testCorrect('a', ' ', 'b', 's', 'basa', 'bsa');
    // Word initial with B is not none
    testCorrect('a', 'b', '#', 'c', 'ac', 'bc');
    testCorrect('a', 'b', '#', 'c', 'ca', 'ca');
    testCorrect('a', 'b', '#', 'c', 'aca', 'bca');
    // Word initial with B is none
    testCorrect('a', '∅', '#', 'c', 'ac', 'c');
    testCorrect('a', '∅', '#', 'c', 'ca', 'ca');
    testCorrect('a', '∅', '#', 'c', 'aca', 'ca');
    testCorrect('a', ' ', '#', 'c', 'ac', 'c');
    testCorrect('a', ' ', '#', 'c', 'ca', 'ca');
    testCorrect('a', ' ', '#', 'c', 'aca', 'ca');
    // Word final with B is not none
    testCorrect('a', 'b', 'd', '#', 'da', 'db');
    testCorrect('a', 'b', 'd', '#', 'ad', 'ad');
    testCorrect('a', 'b', 'd', '#', 'ada', 'adb');
    // Word final with B is none
    testCorrect('a', '∅', 'd', '#', 'da', 'd');
    testCorrect('a', '∅', 'd', '#', 'ad', 'ad');
    testCorrect('a', '∅', 'd', '#', 'ada', 'ad');
    testCorrect('a', ' ', 'd', '#', 'da', 'd');
    testCorrect('a', ' ', 'd', '#', 'ad', 'ad');
    testCorrect('a', ' ', 'd', '#', 'ada', 'ad');

    // With empty added in C or D:
    // Check this especially after integrating w/ buttons!!
    // Random test cases
    testCorrect('A', 'B', 'A', ' ' ,'AAAAA', 'ABBBB');
    testCorrect('p', 'k', ' ', 's', 'tpsa', 'tksa');
    testCorrect('p', 'k', ' ', ' ', 'tppsa', 'tkksa');
    testCorrect('p', 'k', ' ', ' ', 'thhsa', 'thhsa');
    // Neither init nor final with B is not none
    testCorrect('a', 'b', ' ', 'd', 'cadqad', 'cbdqbd');
    testCorrect('d', 'f', 'k', ' ', 'kdj', 'kfj');
    testCorrect('d', 'f', ' ', ' ', 'fdda', 'fffa');
    // Neither init nor final with B is none
    testCorrect('a', '∅', ' ', 's', 'tppsa', 'tppsa');
    testCorrect('a', '∅', 'b', ' ', 'bas', 'bs');
    testCorrect('a', '∅', ' ', ' ', 'basa', 'bs');
    testCorrect('a', ' ', ' ', 's', 'tppsa', 'tppsa');
    testCorrect('a', ' ', 'b', ' ', 'bas', 'bs');
    testCorrect('a', ' ', ' ', ' ', 'basa', 'bs');
    // Word initial with B is not none
    testCorrect('a', 'b', '#', ' ', 'ac', 'bc');
    testCorrect('a', 'b', '#', ' ', 'ba', 'ba');
    testCorrect('a', 'b', '#', ' ', 'aba', 'bba');
    // Word initial with B is none
    testCorrect('a', '∅', '#', ' ', 'ac', 'c');
    testCorrect('a', '∅', '#', ' ', 'ba', 'ba');
    testCorrect('a', '∅', '#', ' ', 'aba', 'ba');
    testCorrect('a', ' ', '#', ' ', 'ac', 'c');
    testCorrect('a', ' ', '#', ' ', 'ca', 'ca');
    testCorrect('a', ' ', '#', ' ', 'aca', 'ca');
    // Word final with B is not none
    testCorrect('a', 'b', ' ', '#', 'da', 'db');
    testCorrect('a', 'b', ' ', '#', 'ad', 'ad');
    testCorrect('a', 'b', ' ', '#', 'ada', 'adb');
    // Word final with B is none
    testCorrect('a', '∅', ' ', '#', 'da', 'd');
    testCorrect('a', '∅', ' ', '#', 'ad', 'ad');
    testCorrect('a', '∅', ' ', '#', 'ada', 'ad');
    testCorrect('a', ' ', ' ', '#', 'da', 'd');
    testCorrect('a', ' ', ' ', '#', 'ad', 'ad');
    testCorrect('a', ' ', ' ', '#', 'ada', 'ad');

    // With special characters
    // Special char in A
    testCorrect('V', 'a', ' ', ' ' ,'taiueot', 'taaaaat'); //
    testCorrect('C', 'g', ' ', ' ' ,'attqifoepq', 'agggigoegg'); //
    // Special char in C
    testCorrect('t', 'd', 'V', ' ' ,'ftatjtaot', 'ftadjtaod');
    testCorrect('t', 'd', 'C', ' ' ,'ftatjta', 'fdatjda');
    // Special char in D
    testCorrect('t', 'd', ' ', 'V' ,'ftatjtaot', 'fdatjdaot');
    testCorrect('t', 'd', ' ', 'C' ,'ftatjta', 'ftadjta');
    // Special char in multiple places
    testCorrect('V', 'a', 'C', ' ' ,'tiueot', 'taueot'); //
    testCorrect('k', 'g', 'V', 'C' ,'akttktaka', 'agttktaka');
    // Special char with #
    testCorrect('V', 'a', ' ', '#' ,'taiueo', 'taiuea');
    testCorrect('V', 'a', ' ', '#' ,'taiueot', 'taiueot');
    testCorrect('C', 'g', '#', ' ' ,'qa', 'ga');
    testCorrect('C', 'g', '#', ' ' ,'aq', 'aq');
    testCorrect('i', 'a', 'C', '#' ,'ti', 'ta');
    testCorrect('i', 'a', 'C', '#' ,'ai', 'ai');
    testCorrect('k', 'g', '#', 'V' ,'ka', 'ga');
    testCorrect('k', 'g', '#', 'V' ,'kk', 'kk');

    console.log("Test cases end.")

}

function has(letter, feature) {

    var array;
    switch(feature) {

        case 'Vowel':
            array = arrayVowel;
            break;
        case 'Consonant':
            array = arrayConsonant;
            break;
        case 'ATRPlus':
            array = arrayATRPlus;
            break;
        case 'ATRMinus':
            array = arrayATRMinus;
            break;
        case 'AnteriorPlus':
            array = arrayAnteriorPlus;
            break;
        case 'AnteriorMinus':
            array = arrayAnteriorMinus;
            break;
        case 'BackPlus':
            array = arrayBackPlus;
            break;
        case 'BackMinus':
            array = arrayBackMinus;
            break;
        case 'ConsonantalPlus':
            array = arrayConsonantalPlus;
            break;
        case 'ConsonantalMinus':
            array = arrayConsonantalMinus;
            break;
        case 'CGPlus':
            array = arrayCGPlus;
            break;
        case 'CGMinus':
            array = arrayCGMinus;
            break;
        case 'ContinuantPlus':
            array = arrayContinuantPlus;
            break;
        case 'ContinuantMinus':
            array = arrayContinuantMinus;
            break;
        case 'CoronalPlus':
            array = arrayCoronalPlus;
            break;
        case 'CoronalMinus':
            array = arrayCoronalMinus;
            break;
        case 'DelayedReleasePlus':
            array = arrayDelayedReleasePlus;
            break;
        case 'DelayedReleaseMinus':
            array = arrayDelayedReleaseMinus;
            break;
        case 'DistributedPlus':
            array = arrayDistributedPlus;
            break;
        case 'DistributedMinus':
            array = arrayDistributedMinus;
            break;
        case 'DorsalPlus':
            array = arrayDorsalPlus;
            break;
        case 'DorsalMinus':
            array = arrayDorsalMinus;
            break;
        case 'HighPlus':
            array = arrayHighPlus;
            break;
        case 'HighMinus':
            array = arrayHighMinus;
            break;
        case 'LabialPlus':
            array = arrayLabialPlus;
            break;
        case 'LabialMinus':
            array = arrayLabialMinus;
            break;
        case 'LateralPlus':
            array = arrayLateralPlus;
            break;
        case 'LateralMinus':
            array = arrayLateralMinus;
            break;
        case 'LowPlus':
            array = arrayLowPlus;
            break;
        case 'LowMinus':
            array = arrayLowMinus;
            break;
        case 'NasalPlus':
            array = arrayNasalPlus;
            break;
        case 'NasalMinus':
            array = arrayNasalMinus;
            break;
        case 'PharyngealPlus':
            array = arrayPharyngealPlus;
            break;
        case 'PharyngealMinus':
            array = arrayPharyngealMinus;
            break;
        case 'RoundPlus':
            array = arrayRoundPlus;
            break;
        case 'RoundMinus':
            array = arrayRoundMinus;
            break;
        case 'SonorantPlus':
            array = arraySonorantPlus;
            break;
        case 'SonorantMinus':
            array = arraySonorantMinus;
            break;
        case 'SGPlus':
            array = arraySGPlus;
            break;
        case 'SGMinus':
            array = arraySGMinus;
            break;
        case 'StridentPlus':
            array = arrayStridentPlus;
            break;
        case 'StridentMinus':
            array = arrayStridentMinus;
            break;
        case 'SyllabicPlus':
            array = arraySyllabicPlus;
            break;
        case 'SyllabicMinus':
            array = arraySyllabicMinus;
            break;
        case 'TensePlus':
            array = arrayTensePlus;
            break;
        case 'TenseMinus':
            array = arrayTenseMinus;
            break;
        case 'VoicePlus':
            array = arrayVoicePlus;
            break;
        case 'VoiceMinus':
            array = arrayVoiceMinus;
            break;
    }

    // > -1 means "IPA" is in "array"
    return array.indexOf(letter) > -1;
}

// function notHighOrLow(char) {
//     var symb = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "p", "b", "f", "v",
//     "ɸ", "β", "k", "ħ", "ʕ", "h", "ɦ", "ʔ", "m", "n", "l", "r", "ɹ"];
//
//     for (var i=0; i < symb.length; i++) {
//         if (symb[i] === char) {
//             return true;
//         }
//     }
//     return false;
// }

// function isSubscript(char){
//     var subscript = ["ʰ","ʲ", "ⁿ", "ˠ", "ˢ", "ˣ", "ʷ", "ʱ", "ᵑ", "ᵐ"];
//
//     for (var i=0; i < rounds.length; i++) {
//         if (rounds[i] === char) {
//             return true;
//         }
//     }
//     return false;
// }

function createUniqueTag(elmt) {

    // Search for the old tag
    var taggables = document.querySelectorAll(".taggable");
    for (var i = 0, max = taggables.length; i < max; i++) {
        if (taggables[i].hasAttribute("id")) {
            // Remove the old tag
            taggables[i].removeAttribute("id");
        }
    }

    // Add tag for the current element
    elmt.setAttribute("id", "id_tag");
    elmt.innerHTML = "&nbsp;";
}

function addRow(tableID) {

    // Create a new row
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount - 1);
    row.className = "tablerow";

    // Add a new cell with checkbox
    var cellchk = row.insertCell(0);
    var chkbox = document.createElement("input");
    cellchk.className = "cell";
    chkbox.type = "checkbox";
    chkbox.name="chkbox[]";
    cellchk.appendChild(chkbox);

    // Add a new cell with rules
    var lstRules = row.insertCell(1);
    lstRules.className = "cell";

    // Add button with textnode "A"
    var select1 = document.createElement("button"); // Create a <button> element
    select1.setAttribute("type", "button");
    select1.setAttribute("onclick", "createUniqueTag(this);");
    select1.setAttribute("class", "taggable");
    select1.setAttribute("contenteditable", "true");
    var select1lighter = document.createElement("div");
    select1lighter.setAttribute('class', 'lighter');
    select1lighter.appendChild(document.createTextNode("A"));   // Append the text to <button>
    select1.appendChild(select1lighter);
    lstRules.appendChild(select1);

    // Add textnode " -> "
    var select2 = document.createTextNode(" -> ");
    lstRules.appendChild(select2);

    // Add button with textnode "A"
    var select3 = document.createElement("button"); // Create a <button> element
    select3.setAttribute("type", "button");
    select3.setAttribute("onclick", "createUniqueTag(this);");
    select3.setAttribute("class", "taggable");
    select3.setAttribute("contenteditable", "true");
    var select3lighter = document.createElement("div");
    select3lighter.setAttribute('class', 'lighter');
    select3lighter.appendChild(document.createTextNode("B"));   // Append the text to <button>
    select3.appendChild(select3lighter);
    lstRules.appendChild(select3);

    // Add textnode " / "
    var select4 = document.createTextNode(" / ");
    lstRules.appendChild(select4);

    // Add button with textnode "C"
    var select5 = document.createElement("button"); // Create a <button> element
    select5.setAttribute("type", "button");
    select5.setAttribute("onclick", "createUniqueTag(this);");
    select5.setAttribute("class", "taggable");
    select5.setAttribute("contenteditable", "true");
    var select5lighter = document.createElement("div");
    select5lighter.setAttribute('class', 'lighter');
    select5lighter.appendChild(document.createTextNode("C"));   // Append the text to <button>
    select5.appendChild(select5lighter);
    lstRules.appendChild(select5);

    // Add textnode " _ "
    var select6 = document.createTextNode(" _ ");
    lstRules.appendChild(select6);

    // Add button with textnode "D"
    var select7 = document.createElement("button"); // Create a <button> element
    select7.setAttribute("type", "button");
    select7.setAttribute("onclick", "createUniqueTag(this);");
    select7.setAttribute("class", "taggable");
    select7.setAttribute("contenteditable", "true");
    var select7lighter = document.createElement("div");
    select7lighter.setAttribute('class', 'lighter');
    select7lighter.appendChild(document.createTextNode("D"));   // Append the text to <button>
    select7.appendChild(select7lighter);
    lstRules.appendChild(select7);

    // Add cell for the first UR in each rule
    var cellChange = row.insertCell(2);
    cellChange.className = "cell";
    cellChange.innerHTML = "";

    // Add cell for the remaining UR in each rule
    for (var k=3; k < table.rows[0].cells.length; k++) {
        var newCell = row.insertCell(k);
        newCell.className = "cell";
        newCell.innerHTML = "";
    }
}

function deleteRow(tableID) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    for(var i = 0; i < rowCount; i++) {
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        if (chkbox != null && chkbox.checked) {
            table.deleteRow(i);
            rowCount--;
            i--;
        }
    }
    if (table.rows.length === 3) {
        var row = table.rows[1];
        row.cells[0].innerHTML = "";
    }
}

function createCell(cell, text, style) {

    // Create DIV element and append to the table cell
    var div = document.createElement('div'), // create DIV element
        txt = document.createTextNode(text); // create text node
    div.className = "cell";
    div.appendChild(txt);                    // append text node to the DIV
    div.setAttribute('class', style);        // set DIV class attribute
    div.setAttribute('className', style);    // set DIV class attribute for IE (?!)
    cell.className = "cell";
    cell.appendChild(div);                   // append DIV to the table cell
}

function clearCells(tableID) {
    var table = document.getElementById(tableID);
    var rows = table.rows;
    var numCols = table.rows[0].cells.length - 2;

    var taggables = document.querySelectorAll(".taggable");
    for (var i = 0, max = taggables.length-numCols; i < max; i++) {
        if (i % 4 === 0) {
            taggables[i+numCols].innerHTML = "";
            var select1 = taggables[i+numCols];
            var select1lighter = document.createElement("div");
            select1lighter.setAttribute('class', 'lighter');
            select1lighter.innerHTML = "A";
            select1.appendChild(select1lighter);
        }
        else if (i % 4 === 1) {
            taggables[i+numCols].innerHTML = "";
            var select1 = taggables[i+numCols];
            var select1lighter = document.createElement("div");
            select1lighter.setAttribute('class', 'lighter');
            select1lighter.innerHTML = "B";
            select1.appendChild(select1lighter);
        }
        else if (i % 4 === 2) {
            taggables[i+numCols].innerHTML = "";
            var select1 = taggables[i+numCols];
            var select1lighter = document.createElement("div");
            select1lighter.setAttribute('class', 'lighter');
            select1lighter.innerHTML = "C";
            select1.appendChild(select1lighter);
        }
        else if (i % 4 === 3) {
            taggables[i+numCols].innerHTML = "";
            var select1 = taggables[i+numCols];
            var select1lighter = document.createElement("div");
            select1lighter.setAttribute('class', 'lighter');
            select1lighter.innerHTML = "D";
            select1.appendChild(select1lighter);
        }
    }
}

function addUR(tableID) {

    var tbl = document.getElementById(tableID), // table reference
        i;
    //create text input UR: <input type="text" id="input1" name="input1" placeholder="Enter your word">

    var celltxtinput = tbl.rows[0].insertCell(tbl.rows[0].cells.length);
    var txtinput = document.createElement("input");
    var numCols = tbl.rows[0].cells.length;
    celltxtinput.className = "cell";
    txtinput.type = "text";
    txtinput.name ="txtinput";
    txtinput.setAttribute('onclick', "createUniqueTag(this);")
    txtinput.setAttribute('value', "")
    inputnum = countCols(tableID) - 2;
    txtinput.className = "userInput taggable input" + inputnum;
    txtinput.placeholder = "Enter a word";
    //txtinput.id = "input" + inputnum;
    celltxtinput.innerHTML = "UR: ";
    celltxtinput.appendChild(txtinput);

    // open loop for each row and append cell
    for (i = 1; i < tbl.rows.length; i++) {
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), '', 'col');
    }

    tbl.rows[tbl.rows.length - 1].cells[numCols - 1].innerHTML = "SF: ";
}

function clearUR() {

    var i;
    var elems = document.getElementsByClassName("userInput") ;
    for(i = 0, c = elems.length; i < c; i++){
       elems[i].value = "";
    }
}

function countCols(tableID) {
    var table = document.getElementById(tableID);
    var max = 0;

    for (var i = 0, iLen = table.rows.length; i < iLen; i++) {
      var temp = 0;
      var cells = table.rows[i].cells;

      for (var j = 0, jLen = cells.length; j < jLen; j++) {
        temp += cells[j].colSpan;
      }

      if (temp > max) {
        max = temp;
      }
    }
    return max;
}

function getFirstNonEmpty(input) {

    // Need to change!

    if (input.length == 0) {
        return "&nbsp;";
    }

    else if (input.length == 1) {
        return input;
    }

    else {
        if (input.charAt(0) === "&"){ // & for &nbsp;
            // What if the first two are both " "?

            if (input.length > 6) {
                return input[6];
            }

            else {
                return "&nbsp;";
            }
        }
        return input[0];
    }
}

function isIllFormed(A, B, C, D) {

    // Ill-formed conditions
    if (A === "&nbsp;" && B === "&nbsp;") {
        // If A and B are empty at the same time.
        alert("A and B cannot be empty at the same time.");
        return true;
    }

    if (A === "&nbsp;") {
        // If A is empty at the same time.
        alert("A cannot be empty.");
        return true;
    }

    if (A === "∅") {
        // If A is none
        alert("A cannot be none.");
        return true;
    }

    if (C === "∅") {
        // If C is none
        alert("C cannot be none.");
        return true;
    }

    if (D === "∅") {
        // If D is none
        alert("D cannot be none.");
        return true;
    }

    if (A === "#" || B === "#") {
        // If A or B is #
        alert("# cannot be in A or B");
        return true;
    }

    if (C === "#" && D === "#") {
        // If A or B is #
        alert("# cannot be both in C and D");
        return true;
    }
    return false;
}

function parseABCD(ABCD, i) {

    var parsed = ruleOrder[numCols + i * 4 + ABCD].innerHTML;

    /* If it is a special char (e.g. ABCD):
        Don't change anything */
    if (parsed.indexOf("lighter") == -1) return parsed;
    /* If it is not: parse it */
    parsed = parsed.substring(parsed.indexOf(">") + 1, parsed.length);
    parsed = parsed.substring(0, parsed.indexOf("<"));
    return parsed;
}

function derive() {

    /* Initialize */
    // var change = [];
    var wordList = [];
    window.ruleOrder = document.getElementsByClassName("taggable");
    window.table = document.getElementById('dataTable');
    window.numCols = table.rows[0].cells.length - 2;
    var rows = table.rows;
    var A, B, C, D, ruleName, x, w, i;

    /* Push each UR to the wordList */
    for (x = 1; x < numCols + 1; x++) {
        wordList.push((document.getElementsByClassName("input" + x))[0].value);
    }
    // console.log(wordList);

    for (i = 0; i < (ruleOrder.length - numCols) / 4; i++) {
        A = parseABCD(0, i);
        B = parseABCD(1, i);
        C = parseABCD(2, i);
        D = parseABCD(3, i);

        // Need to optimize later
        A = getFirstNonEmpty(A);
        B = getFirstNonEmpty(B);
        C = getFirstNonEmpty(C);
        D = getFirstNonEmpty(D);

        /* Check if ill-formed */
        if (isIllFormed(A, B, C, D)) {
            console.log("This column is skipped.");
        }
        else {
            for (w = 0; w < wordList.length; w++) {
                wordList[w] = applyRule(A, B, C, D, wordList[w]);
                rows[i + 1].cells[w + 2].innerHTML = wordList[w];

                rows[rows.length - 1].cells[2 + w].innerHTML = "SF: " + wordList[w];
            }
        }
    }
}

function applyRule(A, B, C, D, word) {

    function isSpecialChar(ABCD, letter) {
        if (ABCD == "V") return has(letter, 'Vowel');
        if (ABCD == "C") return has(letter, 'Consonant');
        return false;
    }
    function isMatched(ABCD, i, isNotA) {

        result = word.charAt(i) == ABCD || isSpecialChar(ABCD, word.charAt(i));
        if (!isNotA) return result;
        return result || ABCD == " ";
    }

    var i, j;
    var indice = [];
    var len = word.length;

    if (B == "&nbsp;") B = " ";
    if (C == "&nbsp;") C = " ";
    if (D == "&nbsp;") D = " ";
    if (B == "∅") B = " ";

    // If at word init
    if (C == "#") {
        if (isMatched(D, 1, true) && isMatched(A, 0, false)) {
            word = word.replaceAt(0, B);
        }
    }
    // If at word final
    else if (D == "#") {
        // if (isMatched(C, len - 2, true)) {
        if (isMatched(C, len - 2, true) && isMatched(A, len - 1, false)) {
            word = word.replaceAt(len - 1, B);
        }
    }
    // If neither at word init nor word end
    // Push indices that match into a list
    else {
        for (i = 0; i < len; i ++) {
            if (isMatched(C, i - 1, true) && isMatched(A, i, false) && isMatched(D, i + 1, true)) {
                indice.push(i);
            }
        }
        // Change A to B at each index that matches
        for (j = 0; j < indice.length; j ++) {
            word = word.replaceAt(indice[j], B);
        }
    }
    stripped = word.replace(/\s/g, '');
    return stripped;
}
