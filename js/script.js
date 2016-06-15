$(document).ready(function(){
    $("#hide").click(function(){
        $("#ruleslist").hide();
    });
    $("#show").click(function(){
        $("#ruleslist").show();
    });
});

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
        if(null !== chkbox && true === chkbox.checked) {
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

function testCorrect(A, B, C, D, before, after) {
    if (applyRule(A, B, C, D, before) != after) console.log("Something is wrong!");
}

function testIllFormed(A, B, C, D, TF) {
    if (isIllFormed(A, B, C, D) != TF) console.log("Something is wrong!");
}

function testCases() {

    console.log("Test cases start:");
    // Check ill-formed
    testIllFormed('&nbsp;', 'a', 'd', 'f', true);
    testIllFormed('a', '&nbsp;', 'd', 'f', false);
    testIllFormed('&nbsp;', '&nbsp;', 'd', 'f', true);
    testIllFormed('∅', 'w', 'd', 'f', true);
    testIllFormed('q', '∅', 'd', 'f', false);
    testIllFormed('d', 'w', '∅', 'f', true);
    testIllFormed('d', 'w', 'v', '∅', true);
    testIllFormed('#', 'w', 'v', 'b', true);
    testIllFormed('g', '#', 'v', 'b', true);
    testIllFormed('g', 'w', '#', 'b', false);
    testIllFormed('g', 'w', 'v', '#', false);
    testIllFormed('#', '#', 'v', 'f', true);
    testIllFormed('g', '#', 'v', '#', true);
    testIllFormed('#', 'w', '#', 'd', true);
    testIllFormed('d', 'w', '#', '#', true);

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

    console.log("Test cases end.")

}

window.onload = function () {
    testCases();
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function isSpecialChar(ABCD) {

}

function applyRule(A, B, C, D, word) {

    // Also need to consider when A/B is general
    // e.g. C, V, etc.

    var pattern;
    var i, j;
    var indice = [];

    if (B == "&nbsp;") B = " ";
    if (C == "&nbsp;") C = " ";
    if (D == "&nbsp;") D = " ";
    if (B == "∅") B = " ";

    // If at word init
    if (C == "#") {
        if ((D == " " || word.charAt(1) == D || isSpecialChar(D)) &&
            (word.charAt(0) == A || isSpecialChar(A))) {
            word = word.replaceAt(0, B);
        }
    }
    // If at word final
    else if (D == "#") {
        if ((C == " " || word.charAt(word.length - 2) == C || isSpecialChar(C)) &&
            (word.charAt(word.length - 1) == A || isSpecialChar(A))) {
            word = word.replaceAt(word.length - 1, B);
        }
    }
    // If neither at word init nor word end
    // Push indices that match into a list
    else {
        for (i = 0; i < word.length; i ++) {
            pattern = C + word.charAt(i) + D;
            if ((C == " " || word.charAt(i-1) == C) &&
                word.charAt(i) == A &&
                (D == " " || word.charAt(i+1) == D)) {
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

function clearUR() {

    var i;
    var elems = document.getElementsByClassName("userInput") ;
    for(i = 0, c = elems.length; i < c; i++){
       elems[i].value = "";
    }
}

function isVowel(symbol) {
    var arrayVowels = ["V",
        "i", "y", "ɨ", "ʉ", "ɯ", "u", "ɪ",
        "ʏ", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ",
        "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ",
        "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];

    // > -1 means "symbol" is in "arrayVowel"
    return arrayVowels.indexOf(symbol) > -1;
}

function isConsonant(symbol) {
    var arrayConsonants = ["C",
    "p", "b", "t", "d", "ʈ", "ɖ", "c", "ɟ", "k", "g", "q", "ɢ", "ʔ",
    "m", "ɱ", "n", "ɳ", "ɲ", "ŋ", "ɴ",
    "ʙ", "r", "ʀ",
    "ⱱ", "ɾ", "ɽ",
    "ɸ", "β", "f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "ʂ", "ʐ", "ç", "ʝ", "x", "ɣ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ",
    "ɬ", "ɮ",
    "ʋ", "ɹ", "ɻ", "j", "ɰ",
    "l", "ɭ", "ʎ", "ʟ"];

    // > -1 means "symbol" is in "arrayConsonants"
    return arrayConsonants.indexOf(symbol) > -1;
}
