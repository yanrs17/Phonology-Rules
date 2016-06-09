$(document).ready(function(){
    $("#hide").click(function(){
        $("#ruleslist").hide();
    });
    $("#show").click(function(){
        $("#ruleslist").show();
    });
});

var rules = [["Hiatus Resolution", "V → ∅ / V —"],
["Final Vowel Deletion", "V → ∅ / — #"],
["Postnasal Voicing", "C → [+voice] / [+nasal] —"],
["Nasal Place Assimilation", "[+nasal] → [αcoronal βlabial ɣdorsal] / - [−syllabic αcoronal βlabial ɣdorsal]"],
["Voicing Assimilation", "[-sonorant] → [αvoice] / — [αvoice -sonorant]"],
["Final Coronal Deletion", "[+coronal] → ∅ / — #"],
["Height Harmony", "V → [-high] / — (C)[-high -low]"],
["Rounding Harmony", "V → [αround] / — (C₀VC₀)[αround]"],
["L-Vocalization", "l → o / — {C, #}"],
["Dissimilation", "V → [−low] / — C₀ [+low]"],
["Initial Stress Assignment", "V → [+stress] / # C₀ —"],
["Final Devoicing", "[-sonorant] → [-voice] / — #"],
["Lenition", "[-sonorant +voice] → [+continuant] / V — V"],
["Intervocalic Voicing", "[-sonorant] → [+voice] / V — V"],
["Schwa Epenthesis", "∅ → ə / C — C"],
["High Vowel Epenthesis", "∅ → i / C — C"],
["Metathesis", "iC → Ci / - #"],
["Nasal Assimilation", "[-continuant] → [+nasal] / — [+nasal]"],
["Velar Palatalization", "[+dorsal] → [−dorsal +coronal −anterior] / — [−low −back]"],
["Aspiration", "[-continuant -sonorant] → [+spread glottis] / {#, C} — V"],
["Sibilant Harmony", "[+coronal +continuant -sonorant] → [αanterior] / — (C₀VC₀)[αanterior +coronal +continuant -sonorant]"],
["Vowel Reduction", "[-stress +syllabic] → [-low]"],
["Strengthening", "[−sonorant] → [−continuant] / {#, C} — V"],
["Word-Final Consonant Neutralization", "C → ʔ / — #"],
["Manner Assimilation", "[−sonorant] → [αcontinuant] / — C₀[αcontinuant −syllabic]"]];

function addRow(tableID) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount - 1);
    row.className = "tablerow";

    var cellchk = row.insertCell(0);
    var chkbox = document.createElement("input");
    cellchk.className = "cell";
    chkbox.type = "checkbox";
    chkbox.name="chkbox[]";
    cellchk.appendChild(chkbox);

    var lstRules = row.insertCell(1);
    lstRules.className = "cell";
    var select = document.createElement("select");
    select.className = "rule";
    lstRules.appendChild(select);

    //creating + appending options
    for (var i = 0; i < rules.length; i++) {
        var option = document.createElement("option");
        option.value = rules[i][0];
        option.text = rules[i][0];
        option.title = rules[i][1];
        select.appendChild(option);
    }

    var cellChange = row.insertCell(2);
    cellChange.className = "cell";
    cellChange.innerHTML = "";

    for (var k=3; k < table.rows[0].cells.length; k++) {
        var newCell = row.insertCell(k);
        newCell.className = "cell";
        newCell.innerHTML = "";
    }

    if (table.rows.length === 3 || table.rows.length > 3) {
        var rows = table.rows;
        if (rows[1].cells[0].innerHTML === "") {
            var cellchk = rows[1].cells[0];
            var chkbox = document.createElement("input");
            cellchk.className = "cell";
            chkbox.type = "checkbox";
            chkbox.name="chkbox[]";
            cellchk.appendChild(chkbox);
        }
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

// create DIV element and append to the table cell
function createCell(cell, text, style) {
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
    txtinput.className = "userInput";
    txtinput.placeholder = "Enter a word";
    inputnum = countCols(tableID) - 2;
    txtinput.id = "input" + inputnum;
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

function derive(tableID) {
    var table = document.getElementById(tableID);
    //var input = document.getElementById("input" + (table.rows[0].cells.length - 2)).value;
    var ruleOrder = document.getElementsByClassName("rule");
    var numCols = table.rows[0].cells.length - 2;
    var wordList = [];

    clearCells(tableID);
    wordList = applyRule(ruleOrder);
}

function applyRule(ruleOrder) {
    var change = [];
    var wordList = [];
    var table = document.getElementById('dataTable');
    var rows = table.rows;
    var numCols = table.rows[0].cells.length - 2;

    for (var x=1; x < numCols + 1; x++) {
        wordList.push((document.getElementById("input" + x)).value);
    }

    for (var w=0; w < wordList.length; w++) {
        for (var i = 0; i < ruleOrder.length; i++) {
            change = [];
            var rule = ruleOrder[i];
            if (rule[rule.selectedIndex].value === "Hiatus Resolution") {
                change = hiatusResolution(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Final Vowel Deletion") {
                change = finalVowelDeletion(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Voicing Assimilation") {
                change = voicingAssimilation(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Postnasal Voicing") {
                change = postnasalVoicing(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Nasal Place Assimilation") {
                change = nasalPlaceAssimilation(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Final Coronal Deletion") {
                change = finalCoronalDeletion(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Height Harmony") {
                change = heightHarmony(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Rounding Harmony") {
                change = roundingHarmony(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "L-Vocalization") {
                change = lVocalization(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Dissimilation") {
                change = dissimilation(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Initial Stress Assignment") {
                change = initialStressAssignment(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Schwa Epenthesis") {
                change = schwaEpenthesis(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "High Vowel Epenthesis") {
                change = highVowelEpenthesis(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Metathesis") {
                change = metathesis(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Final Devoicing") {
                change = finalDevoicing(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Lenition") {
                change = lenition(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Intervocalic Voicing") {
                change = intervocalicVoicing(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Nasal Assimilation") {
                change = nasalAssimilation(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Velar Palatalization") {
                change = velarPalatalization(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Aspiration") {
                change = aspiration(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Sibilant Harmony") {
                change = sibilantHarmony(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Vowel Reduction") {
                change = vowelReduction(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Strengthening") {
                change = strengthening(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Word-Final Consonant Neutralization") {
                change = wordfinalConsonantNeutralization(wordList[w]);
            }
            else if (rule[rule.selectedIndex].value === "Manner Assimilation") {
                change = mannerAssimilation(wordList[w]);
            }
            else {
                change = "";
            }
            //change[1] implies vacuous application of rule
            if ((change[0] != wordList[w]) || (change[1] === true)) {
                rows[i + 1].cells[2 + w].innerHTML = change[0];
                wordList[w] = change[0];
            }
        }
        rows[ruleOrder.length + 1].cells[2 + w].innerHTML = "SF: " + wordList[w];
    }
    return wordList;
}

function hiatusResolution(input) {
    //V → ∅ / V —

    if (input !== null) {

        var newWord = input;

        for (var i = 0; i < newWord.length - 1; i++) {
            while ((isConsonant(newWord[i]) === false) && (isConsonant(newWord[i + 1]) === false)) {
                var temp = newWord.slice(0, i + 1);
                newWord = temp + newWord.slice(i + 2, newWord.length);
            }
        }

        return [newWord, false];
    }
    else {
        return ['', false];
    }
}

function finalVowelDeletion(input) {
    //V → ∅ / — #

    if (isConsonant(input.slice(-1)) === false) {
        return [input.slice(0, -1), false];
    }

    if ((isConsonant(input.charAt(input.length - 2)) === false) && (input.slice(-1) === '"')) {
        return [input.slice(0, -2), false];
    }

    return [input, false];
}

function postnasalVoicing(input) {
    //C → [+voice] / [+nasal] —

    var newWord = input;
    var vacuous = false;

    for (var i = 0; i < newWord.length - 1; i++) {
        if (newWord.charAt(i) === "m" || newWord.charAt(i) === "ɱ" || newWord.charAt(i) === "n"
            || newWord.charAt(i) === "ɳ" || newWord.charAt(i) === "ɲ" || newWord.charAt(i) === "ŋ"
            || newWord.charAt(i) === "ɴ") {
            var temp = newWord.slice(0, i + 1);
            if (newWord.charAt(i + 1) === "p") {
                newWord = temp + "b" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "t") {
                newWord = temp + "d" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ʈ") {
                newWord = temp + "ɖ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "c") {
                newWord = temp + "ɟ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "k") {
                newWord = temp + "g" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "q") {
                newWord = temp + "ɢ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ɸ") {
                newWord = temp + "β" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "f") {
                newWord = temp + "v" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "θ") {
                newWord = temp + "ð" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "s") {
                newWord = temp + "z" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ʃ") {
                newWord = temp + "ʒ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ʂ") {
                newWord = temp + "ʐ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ç") {
                newWord = temp + "ʝ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "x") {
                newWord = temp + "ɣ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "χ") {
                newWord = temp + "ʁ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ħ") {
                newWord = temp + "ʕ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "h") {
                newWord = temp + "ɦ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "b" || newWord.charAt(i + 1) === "d" || newWord.charAt(i + 1) === "ɖ"
            || newWord.charAt(i + 1) === "ɟ" || newWord.charAt(i + 1) === "g" || newWord.charAt(i + 1) === "ɢ"
            || newWord.charAt(i + 1) === "β" || newWord.charAt(i + 1) === "v" || newWord.charAt(i + 1) === "ð"
            || newWord.charAt(i + 1) === "z" || newWord.charAt(i + 1) === "ʒ" || newWord.charAt(i + 1) === "ʐ"
            || newWord.charAt(i + 1) === "ʝ" || newWord.charAt(i + 1) === "ɣ" || newWord.charAt(i + 1) === "ʁ"
            || newWord.charAt(i + 1) === "ʕ" || newWord.charAt(i + 1) === "ɦ" || newWord.charAt(i + 1) === "m"
            || newWord.charAt(i + 1) === "ɱ" || newWord.charAt(i + 1) === "n" || newWord.charAt(i + 1) === "ɳ"
            || newWord.charAt(i + 1) === "ɲ" || newWord.charAt(i + 1) === "ŋ" || newWord.charAt(i + 1) === "ɴ"
            || newWord.charAt(i + 1) === "ʙ" || newWord.charAt(i + 1) === "r" || newWord.charAt(i + 1) === "ʀ"
            || newWord.charAt(i + 1) === "ɾ" || newWord.charAt(i + 1) === "ɽ" || newWord.charAt(i + 1) === "ɬ"
            || newWord.charAt(i + 1) === "ɮ" || newWord.charAt(i + 1) === "ʋ" || newWord.charAt(i + 1) === "ɹ"
            || newWord.charAt(i + 1) === "ɻ" || newWord.charAt(i + 1) === "j" || newWord.charAt(i + 1) === "ɰ"
            || newWord.charAt(i + 1) === "l" || newWord.charAt(i + 1) === "ɭ" || newWord.charAt(i + 1) === "ʎ"
            || newWord.charAt(i + 1) === "ʟ") {
                vacuous = true;
            }
        }
    }

    return [newWord, vacuous];
}

function nasalPlaceAssimilation(input) {
    var newWord = input;
    var vacuous = false;

    for (var i=0; i < newWord.length - 1; i++) {
        if (newWord.charAt(i) === "m" || newWord.charAt(i) === "ɱ" || newWord.charAt(i) === "n" ||
            newWord.charAt(i) === "ɳ" || newWord.charAt(i) === "ɲ" || newWord.charAt(i) === "ŋ" || newWord.charAt(i) === "ɴ") {
            if (newWord.charAt(i + 1) === "p" || newWord.charAt(i + 1) === "b" || newWord.charAt(i + 1) === "ɸ"
                 || newWord.charAt(i + 1) === "β" || newWord.charAt(i + 1) === "ʙ" || newWord.charAt(i + 1) === "m") {
                newWord = newWord.slice(0, i) + "m" + newWord.slice(i + 1, newWord.length);
                if (newWord.charAt(i) === "m") {
                    vacuous = true;
                }
                else {
                    vacuous = false;
                }
            }
            else if (newWord.charAt(i + 1) === "ɱ" || newWord.charAt(i + 1) === "f" || newWord.charAt(i + 1) === "v"
                 || newWord.charAt(i + 1) === "ʋ" || newWord.charAt(i + 1) === "ⱱ") {
                newWord = newWord.slice(0, i) + "ɱ" + newWord.slice(i + 1, newWord.length);
                if (newWord.charAt(i) === "ɱ") {
                    vacuous = true;
                }
                else {
                    vacuous = false;
                }
            }
            else if (newWord.charAt(i + 1) === "t" || newWord.charAt(i + 1) === "d" || newWord.charAt(i + 1) === "n"
                 || newWord.charAt(i + 1) === "r" || newWord.charAt(i + 1) === "ɾ" || newWord.charAt(i + 1) === "θ"
                 || newWord.charAt(i + 1) === "ð" || newWord.charAt(i + 1) === "s" || newWord.charAt(i + 1) === "z"
                 || newWord.charAt(i + 1) === "ʃ" || newWord.charAt(i + 1) === "ʒ" || newWord.charAt(i + 1) === "ɬ"
                 || newWord.charAt(i + 1) === "ɮ" || newWord.charAt(i + 1) === "ɹ" || newWord.charAt(i + 1) === "l") {
                newWord = newWord.slice(0, i) + "n" + newWord.slice(i + 1, newWord.length);
                if (newWord.charAt(i) === "n") {
                    vacuous = true;
                }
                else {
                    vacuous = false;
                }
            }
            else if (newWord.charAt(i + 1) === "ʈ" || newWord.charAt(i + 1) === "ɖ" || newWord.charAt(i + 1) === "ɳ"
                 || newWord.charAt(i + 1) === "ɽ" || newWord.charAt(i + 1) === "ʂ" || newWord.charAt(i + 1) === "ʐ"
                 || newWord.charAt(i + 1) === "ɻ" || newWord.charAt(i + 1) === "ɭ") {
                newWord = newWord.slice(0, i) + "ɳ" + newWord.slice(i + 1, newWord.length);
                if (newWord.charAt(i) === "ɳ") {
                    vacuous = true;
                }
                else {
                    vacuous = false;
                }
            }
            else if (newWord.charAt(i + 1) === "c" || newWord.charAt(i + 1) === "ɟ" || newWord.charAt(i + 1) === "ɲ"
                 || newWord.charAt(i + 1) === "ç" || newWord.charAt(i + 1) === "ʝ" || newWord.charAt(i + 1) === "j" || newWord.charAt(i + 1) === "ʎ") {
                newWord = newWord.slice(0, i) + "ɲ" + newWord.slice(i + 1, newWord.length);
                if (newWord.charAt(i) === "ɲ") {
                    vacuous = true;
                }
                else {
                    vacuous = false;
                }
            }
            else if (newWord.charAt(i + 1) === "q" || newWord.charAt(i + 1) === "ɢ" || newWord.charAt(i + 1) === "ɴ"
                 || newWord.charAt(i + 1) === "ʀ" || newWord.charAt(i + 1) === "χ" || newWord.charAt(i + 1) === "ʁ"
                 || newWord.charAt(i + 1) === "ħ" || newWord.charAt(i + 1) === "ʕ") {
                newWord = newWord.slice(0, i) + "ɴ" + newWord.slice(i + 1, newWord.length);
                if (newWord.charAt(i) === "ɴ") {
                    vacuous = true;
                }
                else {
                    vacuous = false;
                }
            }
            else if (newWord.charAt(i + 1) === "ʔ" || newWord.charAt(i + 1) === "h" || newWord.charAt(i + 1) === "ɦ"
                 || newWord.charAt(i + 1) === "k" || newWord.charAt(i + 1) === "g" || newWord.charAt(i + 1) === "n"
                 || newWord.charAt(i + 1) === "x" || newWord.charAt(i + 1) === "ɣ" || newWord.charAt(i + 1) === "ɰ"
                 || newWord.charAt(i + 1) === "ʟ") {
                newWord = newWord.slice(0, i) + "ŋ" + newWord.slice(i + 1, newWord.length);
                if (newWord.charAt(i) === "ŋ") {
                    vacuous = true;
                }
                else {
                    vacuous = false;
                }
            }
        }
    }
    return [newWord, vacuous];
}

function voicingAssimilation(input) {
    //[-sonorant] → [αvoice] / - [αvoice -sonorant]

    var newWord = input;
    var vacuous = false;

    for (var i=newWord.length - 1; i > 0; i--) {
        if (newWord.charAt(i) === "p" || newWord.charAt(i) === "t" || newWord.charAt(i) === "ʈ"
            || newWord.charAt(i) === "c" || newWord.charAt(i) === "k" || newWord.charAt(i) === "q"
            || newWord.charAt(i) === "ɸ" || newWord.charAt(i) === "f" || newWord.charAt(i) === "θ"
            || newWord.charAt(i) === "s" || newWord.charAt(i) === "ç" || newWord.charAt(i) === "ʃ"
            || newWord.charAt(i) === "ʂ" || newWord.charAt(i) === "x" || newWord.charAt(i) === "χ"
            || newWord.charAt(i) === "ħ") {
            var j = i - 1;
            var temp = newWord.slice(0, j);

            if (newWord.charAt(j) === "b") {
                newWord = temp + "p" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "d") {
                newWord = temp + "t" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ɖ") {
                newWord = temp + "ʈ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ɟ") {
                newWord = temp + "c" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "g") {
                newWord = temp + "k" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ɢ") {
                newWord = temp + "q" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "β") {
                newWord = temp + "ɸ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "v") {
                newWord = temp + "f" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ð") {
                newWord = temp + "θ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "z") {
                newWord = temp + "s" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ʒ") {
                newWord = temp + "ʃ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ʝ") {
                newWord = temp + "ç" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ʐ") {
                newWord = temp + "ʂ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ɣ") {
                newWord = temp + "x" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ʁ") {
                newWord = temp + "χ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ʕ") {
                newWord = temp + "ħ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "p" || newWord.charAt(j) === "t" || newWord.charAt(j) === "ʈ"
                || newWord.charAt(j) === "c" || newWord.charAt(j) === "k" || newWord.charAt(j) === "g"
                || newWord.charAt(j) === "q" || newWord.charAt(j) === "ɸ" || newWord.charAt(j) === "f"
                || newWord.charAt(j) === "θ" || newWord.charAt(j) === "s" || newWord.charAt(j) === "ʃ"
                || newWord.charAt(j) === "ʂ" || newWord.charAt(j) === "ç" || newWord.charAt(j) === "x"
                || newWord.charAt(j) === "χ" || newWord.charAt(j) === "ħ") {
                vacuous = true;
            }
        }
        else if (newWord.charAt(i) === "b" || newWord.charAt(i) === "d" || newWord.charAt(i) === "ɖ"
            || newWord.charAt(i) === "ɟ" || newWord.charAt(i) === "g" || newWord.charAt(i) === "ɢ"
            || newWord.charAt(i) === "β" || newWord.charAt(i) === "ð" || newWord.charAt(i) === "z"
            || newWord.charAt(i) === "ʒ" || newWord.charAt(i) === "ʐ" || newWord.charAt(i) === "ʝ"
            || newWord.charAt(i) === "ɣ" || newWord.charAt(i) === "ʁ" || newWord.charAt(i) === "ʕ"
            || newWord.charAt(i) === "v") {
            var j = i - 1;
            var temp = newWord.slice(0, j);

            if (newWord.charAt(j) === "p") {
                newWord = temp + "b" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "t") {
                newWord = temp + "d" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ʈ") {
                newWord = temp + "ɖ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "c") {
                newWord = temp + "ɟ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "k") {
                newWord = temp + "g" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "q") {
                newWord = temp + "ɢ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ɸ") {
                newWord = temp + "β" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "f") {
                newWord = temp + "v" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "θ") {
                newWord = temp + "ð" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "s") {
                newWord = temp + "z" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ʃ") {
                newWord = temp + "ʒ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ç") {
                newWord = temp + "ʝ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ʂ") {
                newWord = temp + "ʐ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "x") {
                newWord = temp + "ɣ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "χ") {
                newWord = temp + "ʁ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ħ") {
                newWord = temp + "ʕ" + newWord.slice(j + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(j) === "ɖ" || newWord.charAt(j) === "ɟ" || newWord.charAt(j) === "g"
                || newWord.charAt(j) === "ɢ" || newWord.charAt(j) === "β" || newWord.charAt(j) === "v"
                || newWord.charAt(j) === "q" || newWord.charAt(j) === "d" || newWord.charAt(j) === "d"
                || newWord.charAt(j) === "ð" || newWord.charAt(j) === "ʒ" || newWord.charAt(j) === "ʐ"
                || newWord.charAt(j) === "ʝ" || newWord.charAt(j) === "ɣ" || newWord.charAt(j) === "z"
                || newWord.charAt(j) === "ʁ" || newWord.charAt(j) === "ʕ" || newWord.charAt(j) === "b") {
                vacuous = true;
            }
        }
    }
    
    return [newWord, vacuous];
}

function finalCoronalDeletion(input) {
    //[+coronal] → ∅ / — #

    var newWord = input;

    if (isCoronal(newWord.slice(-1)) === true) {
        return [newWord.slice(0, -1), false];
    }

    if ((isCoronal(input.charAt(input.length - 2)) === true) && (input.slice(-1) === 'ʰ')) {
        return [input.slice(0, -2), false];
    }

    return [newWord, false];
}

function heightHarmony(input) {
    //V → [-high] / — (C)[-high -low]

    var newWord = input;
    var vacuous = false;

    for (var i=0; i < newWord.length; i++) {
        if (newWord.charAt(i) === "e" || newWord.charAt(i) === "ø" || newWord.charAt(i) === "ɘ"
            || newWord.charAt(i) === "ɵ" || newWord.charAt(i) === "ɤ" || newWord.charAt(i) === "o"
            || newWord.charAt(i) === "ə" || newWord.charAt(i) === "ɛ" || newWord.charAt(i) === "œ"
            || newWord.charAt(i) === "ɜ" || newWord.charAt(i) === "ɞ" || newWord.charAt(i) === "ʌ" ||
            newWord.charAt(i) === "ɔ") {

            var j = i;
            while ((j >= 0) && (isConsonant(newWord[j-1]) === true)) {
                j = j - 1;
            }
            if (j >= 0) {
                var temp = newWord.slice(0, j - 1);
                if (newWord.charAt(j-1) === "i") {
                    newWord = temp + "e" + newWord.slice(j, newWord.length);
                    vacuous = false;
                }
                else if(newWord.charAt(j-1) === "y") {
                    newWord = temp + "ø" + newWord.slice(j, newWord.length);
                    vacuous = false;
                }
                else if(newWord.charAt(j-1) === "ɨ") {
                    newWord = temp + "ə" + newWord.slice(j, newWord.length);
                    vacuous = false;
                }
                else if(newWord.charAt(j-1) === "ʉ") {
                    newWord = temp + "ɵ" + newWord.slice(j, newWord.length);
                    vacuous = false;
                }
                else if(newWord.charAt(j-1) === "ɯ") {
                    newWord = temp + "ɤ" + newWord.slice(j, newWord.length);
                    vacuous = false;
                }
                else if(newWord.charAt(j-1) === "u") {
                    newWord = temp + "o" + newWord.slice(j, newWord.length);
                    vacuous = false;
                }
                else if(newWord.charAt(j-1) === "ɪ") {
                    newWord = temp + "ɛ" + newWord.slice(j, newWord.length);
                    vacuous = false;
                }
                else if(newWord.charAt(j-1) === "ʏ") {
                    newWord = temp + "œ" + newWord.slice(j, newWord.length);
                    vacuous = false;
                }
                else if(newWord.charAt(j-1) === "ʊ") {
                    newWord = temp + "ɔ" + newWord.slice(j, newWord.length);
                    vacuous = false;
                }
                else if (newWord.charAt(j-1) === "e" || newWord.charAt(j-1) === "ø" || newWord.charAt(j-1) === "ɘ"
                || newWord.charAt(j-1) === "ɵ" || newWord.charAt(j-1) === "ɤ" || newWord.charAt(j-1) === "o"
                || newWord.charAt(j-1) === "ə" || newWord.charAt(j-1) === "ɛ" || newWord.charAt(j-1) === "œ"
                || newWord.charAt(j-1) === "ɜ" || newWord.charAt(j-1) === "ɞ" || newWord.charAt(j-1) === "ʌ" ||
                newWord.charAt(j-1) === "ɔ") {
                    vacuous = true;
                }
            }
        }
    }
    return [newWord, vacuous];
}

function roundingHarmony(input) {
    //V → [αround] / — ((C)V(C))[αround] 

    var newWord = input;
    var x = newWord.length - 1;
    var keepLooking = true;
    var rounded = 4;
    var vacuous = false;

    while ((x >= 0) && (keepLooking === true)) {
        if (isConsonant(newWord[x]) === false) {
            if (isRound(newWord[x]) === true) {
                rounded = 1;
            }
            else if (notRound(newWord[x]) === true) {
                rounded = 0;
            }
        }
        //1=rounded, 0=not rounded
        if ((rounded === 1) || (rounded === 0)) {
            keepLooking = false;
        }
        x--;
    }
    if (rounded === 1) {
        for (var i=0; i < newWord.length; i++) {
            var temp = newWord.slice(0, i);
            if (newWord[i] === "i") {
                newWord = temp + "y" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɪ") {
                newWord = temp + "ʏ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "e") {
                newWord = temp + "ø" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɛ") {
                newWord = temp + "œ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "æ") {
                newWord = temp + "ɶ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "a") {
                newWord = temp + "ɶ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɨ") {
                newWord = temp + "ʉ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɘ") {
                newWord = temp + "ɵ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ə") {
                newWord = temp + "ɞ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɜ") {
                newWord = temp + "ɞ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɯ") {
                newWord = temp + "u" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɤ") {
                newWord = temp + "o" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ʌ") {
                newWord = temp + "ɔ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɑ") {
                newWord = temp + "ɒ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i) === "y" || newWord.charAt(i) === "ʏ" || newWord.charAt(i) === "ø"
                || newWord.charAt(i) === "œ" || newWord.charAt(i) === "ɶ" || newWord.charAt(i) === "ʉ"
                || newWord.charAt(i) === "ɵ" || newWord.charAt(i) === "ɞ" || newWord.charAt(i) === "u"
                || newWord.charAt(i) === "ʊ" || newWord.charAt(i) === "o" || newWord.charAt(i) === "ɔ"
                || newWord.charAt(i) === "ɒ") {
                vacuous = true;
            }
        }
    }
    else if (rounded === 0) {
        for (var i = 0; i < newWord.length; i++) {
            var temp = newWord.slice(0, i);
            if (newWord[i] === "y") {
                newWord = temp + "i" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ʏ") {
                newWord = temp + "ɪ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ø") {
                newWord = temp + "e" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "œ") {
                newWord = temp + "ɛ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɶ") {
                newWord = temp + "æ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɶ") {
                newWord = temp + "a" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ʉ") {
                newWord = temp + "ɨ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɵ") {
                newWord = temp + "ɘ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɞ") {
                newWord = temp + "ə" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɞ") {
                newWord = temp + "ɜ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "u") {
                newWord = temp + "ɯ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "o") {
                newWord = temp + "ɤ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɔ") {
                newWord = temp + "ʌ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord[i] === "ɒ") {
                newWord = temp + "ɑ" + newWord.slice(i + 1, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i) === "i" || newWord.charAt(i) === "ɪ" || newWord.charAt(i) === "e"
                || newWord.charAt(i) === "ɛ" || newWord.charAt(i) === "æ" || newWord.charAt(i) === "a"
                || newWord.charAt(i) === "ɨ" || newWord.charAt(i) === "ɘ" || newWord.charAt(i) === "ə"
                || newWord.charAt(i) === "ɜ" || newWord.charAt(i) === "ɐ" || newWord.charAt(i) === "ɯ"
                || newWord.charAt(i) === "ɤ" || newWord.charAt(i) === "ʌ" || newWord.charAt(i) === "ɑ") {
                vacuous = true;
            }
        }
    }
    return [newWord, vacuous];
}

function lVocalization(input) {
    //l → o / — {C, #}

    var newWord = input;

    if (newWord.slice(-1) === "l") {
        newWord = newWord.slice(0, -1) + "o";
    }

    for (var i = 0; i < newWord.length - 1; i++) {
        if ((newWord[i] === "l") && (isConsonant(newWord[i + 1]))) {
            temp = newWord.slice(0, i);
            newWord = temp + "o" + newWord.slice(i + 1, newWord.length);
        }
    }

    return [newWord, false];
}

function dissimilation(input) {
    //V → [-low] / - C0 [+low]
    //make low a high between a nonlow and (any # of consonants +) a low

    var newWord = input;
    var exit = false;
    var j = 0;
    var tempIndex = 0;

    for (var i=0; i < newWord.length - 1; i++) {
        if (isNotLow(newWord[i]) === true) {
            if (isLow(newWord[i+1]) === true) {
                tempIndex = i + 1;
                var j = i + 2;
                while ((j <= newWord.length - 1) && (exit === false)) {
                    if (isLow(newWord[j]) === true) {
                        exit = true;
                        if (newWord[tempIndex] === 'ɑ') {
                            newWord = newWord.substring(0, tempIndex) + 'ɯ' + newWord.substring(tempIndex + 1, newWord.length);
                        }
                        else if (newWord[tempIndex] === 'æ') {
                            newWord = newWord.substring(0, tempIndex) + 'y' + newWord.substring(tempIndex + 1, newWord.length);
                        }
                    }
                    else if (isConsonant(newWord[j]) === false) {
                        exit = true;
                    }
                    j++;
                }
            }
        }
        exit = false;
    }

    return [newWord, false];
}

function initialStressAssignment(input) {
    //V → [+stress] / # (C) -
    //add " before stressed segment

    var newWord = input;
    
    if (newWord.search('"') !== -1) {
        return [newWord, false];
    }
    else {
        for (var i=0; i < newWord.length; i++) {
            if (isConsonant(newWord[i]) === false) {
                if (i === 0) {
                    return ['"' + newWord, false];
                }
                else {
                    newWord = newWord.slice(0, i) + '"' + newWord.slice(i, newWord.length);
                    return [newWord, false];
                }
            }
        }
    }

    return [newWord, false];
}

function schwaEpenthesis(input) {
    //∅ → ə / C — C

    var schwa = 'ə';
    var newWord = input;

    for (var i = 0; i < newWord.length - 1; i++) {
        if ((isConsonant(newWord[i]) === true) && (newWord.charAt(i) !== "ʰ") && (isConsonant(newWord[i + 1]) === true) && (newWord.charAt(i + 1) !== "ʰ")) {
            var temp = newWord.slice(0, i + 1) + schwa;
            newWord = temp + newWord.slice(i + 1, newWord.length);
        }
    }

    return [newWord, false];
}

function highVowelEpenthesis(input) {
    //∅ → ə / C — C

    var highVowel = 'i';
    var newWord = input;

    for (var i = 0; i < newWord.length - 1; i++) {
        if ((isConsonant(newWord[i]) === true) && (newWord.charAt(i) !== "ʰ") && (isConsonant(newWord[i + 1]) === true) && (newWord.charAt(i + 1) !== "ʰ")) {
            var temp = newWord.slice(0, i + 1) + highVowel;
            newWord = temp + newWord.slice(i + 1, newWord.length);
        }
    }

    return [newWord, false];
}

function metathesis(input) {
    //iC → Ci / - #

    var newWord = input;
    var lastTwoChars = newWord.slice(-2);


    if ((newWord.slice(-1) === "ʰ") && (isConsonant(newWord.charAt(newWord.length - 2)) === true)) {
        var cons = newWord.slice(-2);
        if ((newWord.charAt(newWord.length - 3) === '"') && (newWord.charAt(newWord.length - 4) === "i")) {
            var str = newWord.slice(newWord.length - 4, -2);
            newWord = newWord.slice(0, newWord.length - 4) + cons + str;
        }
        else if (newWord.charAt(newWord.length - 3) === 'i') {
             newWord = newWord.slice(0, newWord.length - 3) + cons + "i";
        }
    }
    else if (isConsonant(newWord.slice(-1)) === true) {
        if (newWord.charAt(newWord.length - 2) === "i") {
            var lastTwoChars = newWord.slice(-2);
            newWord = newWord.slice(0, -2) + lastTwoChars[1] + lastTwoChars[0];
        }
        else if ((newWord.charAt(newWord.length - 2) === '"') && (newWord.charAt(newWord.length - 3) === 'i')) {
            var cons = newWord.slice(-1);
            var str = newWord.slice(newWord.length - 3, -1);
            newWord = newWord.slice(0, newWord.length - 3) + cons + str;
        }
    }

    return [newWord, false];
}

function finalDevoicing(input) {
    //[-sonorant] → [-voice] / - #

    var newWord = input;

    if (isSonorant(newWord.slice(-1)) === false) {
        devoicedS = devoiceSonorant(newWord.slice(-1));
        if (devoicedS !== "") {
            newWord = newWord.slice(0, -1) + devoicedS;
        }
        return [newWord, false];
    }
    else if ((isSonorant(newWord.slice(-2)) === false) && (newWord.slice(-1) === "ʰ")) {
        devoicedS = devoiceSonorant(newWord.charAt(newWord.length - 2));
        if (devoicedS !== "") {
            newWord = newWord.slice(0, newWord.length - 2) + devoicedS + "ʰ";
        }
        return [newWord, false];
    }
}

function lenition(input) {
    //[-sonorant +voice] → [+continuant] / V - V

    var newWord = input;
    var vacuous = false;

    for (var i = 0; i < newWord.length - 2; i++) {
        if ((isConsonant(newWord[i]) === false) && (isConsonant(newWord[i + 2]) === false)) {
            var temp = newWord.slice(0, i + 1);
            if (newWord.charAt(i + 1) === "b") {
                newWord = temp + "β" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "d") {
                newWord = temp + "z" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ɖ") {
                newWord = temp + "ʐ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ɟ") {
                newWord = temp + "ʝ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ɡ") {
                newWord = temp + "ɣ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ɢ") {
                newWord = temp + "ʁ" + newWord.slice(i + 2, newWord.length);
                vacuous = false;
            }
            else if (newWord.charAt(i + 1) === "ʙ" || newWord.charAt(i + 1) === "v" || newWord.charAt(i + 1) === "ð"
                || newWord.charAt(i + 1) === "z" || newWord.charAt(i + 1) === "ʒ" || newWord.charAt(i + 1) === "ʐ"
                || newWord.charAt(i + 1) === "ʝ" || newWord.charAt(i + 1) === "ɣ" || newWord.charAt(i + 1) === "ʁ"
                || newWord.charAt(i + 1) === "ʕ" || newWord.charAt(i + 1) === "ɦ") {
                vacuous = true;
            }
        }
    }

    return [newWord, vacuous];
}

function intervocalicVoicing(input) {
    //[-sonorant] → [+voice] / V - V

    var newWord = input;

    for (var i = 0; i < newWord.length - 2; i++) {
        if ((isConsonant(newWord[i]) === false) && (isSonorant(newWord[i + 1]) === false) && (isConsonant(newWord[i + 2]) === false)) {
            change = voiceSonorant(newWord[i + 1]);
            if (change !== "") {
                var temp = newWord.slice(0, i + 1);
                newWord = temp + change + newWord.slice(i + 2, newWord.length);
            }
        }
    }

    return [newWord, false];
}

function nasalAssimilation(input) {
    //[-continuant] → [+nasal] / — [+nasal]

    var newWord = input;

    for (var i = 0; i < newWord.length - 1; i++) {
        if (isNasal(newWord[i + 1]) === true) {
            var temp = newWord.slice(0, i);
            if (newWord[i] === "p") {
                newWord = temp + "m" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "t") {
                newWord = temp + "n" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "k") {
                newWord = temp + "ŋ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "b") {
                newWord = temp + "m" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "d") {
                newWord = temp + "n" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "g") {
                newWord = temp + "ŋ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ʈ") {
                newWord = temp + "ɳ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ɖ") {
                newWord = temp + "ɳ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "c") {
                newWord = temp + "ɲ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ɟ") {
                newWord = temp + "ɲ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "q") {
                newWord = temp + "ɴ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ɢ") {
                newWord = temp + "ɴ" + newWord.slice(i + 1, newWord.length);
            }
        }
    }

    return [newWord, false];
}

function velarPalatalization(input) {
    //[+dorsal] → [−dorsal +coronal −anterior] / — [−low −back]

    var newWord = input;

    for (var i = 0; i < newWord.length - 1; i++) {
        if (newWord.charAt(i + 1) === "i" || newWord.charAt(i + 1) === "y" || newWord.charAt(i + 1) === "ɨ" || newWord.charAt(i + 1) === "ʉ"
            || newWord.charAt(i + 1) === "ɵ" || newWord.charAt(i + 1) === "ɘ" || newWord.charAt(i + 1) === "ø" || newWord.charAt(i + 1) === "ʏ"
            || newWord.charAt(i + 1) === "ɪ" || newWord.charAt(i + 1) === "e" || newWord.charAt(i + 1) === "ɛ" || newWord.charAt(i + 1) === "œ"
            || newWord.charAt(i + 1) === "ɜ" || newWord.charAt(i + 1) === "ɞ") {
            var temp = newWord.slice(0, i);
            if (newWord[i] === "k") {
                newWord = temp + "c" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "g") {
                newWord = temp + "ɟ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "x") {
                newWord = temp + "ç" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ɣ") {
                newWord = temp + "ʝ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ŋ") {
                newWord = temp + "ɲ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ɰ") {
                newWord = temp + "j" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ʟ") {
                newWord = temp + "ʎ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ɢ") {
                newWord = temp + "ɟ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "q") {
                newWord = temp + "c" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ɴ") {
                newWord = temp + "ɲ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ʁ") {
                newWord = temp + "ʝ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "χ") {
                newWord = temp + "ʝ" + newWord.slice(i + 1, newWord.length);
            }
        }
    }

    return [newWord, false];
}

function aspiration(input) {
	// [-continuant -sonorant] → [+spread glottis] / {#, C} _ V
	var newWord = input;

    for (var i = 0; i < newWord.length - 1; i++) {
        if (newWord.charAt(i) === "p" || newWord.charAt(i) === "b" || newWord.charAt(i) === "t"
            || newWord.charAt(i) === "d" || newWord.charAt(i) === "ʈ" || newWord.charAt(i) === "ɖ"
            || newWord.charAt(i) === "c" || newWord.charAt(i) === "ɟ" || newWord.charAt(i) === "k"
            || newWord.charAt(i) === "g" || newWord.charAt(i) === "q" || newWord.charAt(i) === "ɢ") {
            var temp = newWord.slice(0, i + 1) + "ʰ";
            newWord = temp + newWord.slice(i + 1, newWord.length);
        }
    }

    return [newWord, false];
}

function sibilantHarmony(input) {
    //[+coronal +continuant -sonorant] → [αanterior] / _ (C₀VC₀)[αanterior +coronal +continuant -sonorant]
    // s   ʃ
    // z   ʒ
    // If the rightmost sibilant is a ʃ or ʒ, change all other s, z to ʃ, ʒ. 
    // If the rightmost sibilant is a s or z, change all other ʃ, ʒ to s, z.
    // This applies across other consonants and all vowels (ie. at any distance).

    var newWord = input;
    var rightmostSib = "";
    var x = newWord.length - 1;
    var found = false;

    while ((x > 0) && (found === false)) {
        if ((newWord[x] === "s") || (newWord[x] === "z") || (newWord[x] === "ʃ")
        || (newWord[x] === "ʒ")) {
            rightmostSib = newWord[x];
            found = true;
        }
        x--;
    }

    if ((rightmostSib === "s") || (rightmostSib === "z")) {
        for (var i=0; i < newWord.length; i++) {
            if (newWord[i] === "ʃ") {
                newWord = newWord.slice(0, i) + "s" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "ʒ") {
                newWord = newWord.slice(0, i) + "z" + newWord.slice(i + 1, newWord.length);
            }
        }
    }
    else if ((rightmostSib === "ʃ") || (rightmostSib === "ʒ")) {
        for (var i=0; i < newWord.length; i++) {
            if (newWord[i] === "s") {
                newWord = newWord.slice(0, i) + "ʃ" + newWord.slice(i + 1, newWord.length);
            }
            else if (newWord[i] === "z") {
                newWord = newWord.slice(0, i) + "ʒ" + newWord.slice(i + 1, newWord.length);
            }
        }
    }

    return [newWord, false];

}

function vowelReduction(input) {
    //[-stress +syllabic] → [-low]

    var newWord = input;

    if (newWord.length === 1) {
        if (newWord.charAt(0) === "a") {
            newWord = "ə";
        }
        else if (newWord.charAt(0) === "ɶ") {
            newWord = "œ";
        }
        else if (newWord.charAt(0) === "ɑ") {
            newWord = "ʌ";
        }
        else if (newWord.charAt(0) === "ɒ") {
            newWord = "ɔ";
        }
        else if (newWord.charAt(0) === "æ") {
            newWord = "e";
        }
        else if (newWord.charAt(0) === "ɐ") {
            newWord = "ɘ";
        }
    }
    else {
        for (var i=0; i < newWord.length; i++) {
            if ((isConsonant(newWord[i]) === false) && (newWord.charAt(i - 1) !== '"')) {
                if (newWord.charAt(i) === "a") {
                    newWord = newWord.slice(0, i) + "ə" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord.charAt(i) === "ɶ") {
                    newWord = newWord.slice(0, i) + "œ" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord.charAt(i) === "ɑ") {
                    newWord = newWord.slice(0, i) + "ʌ" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord.charAt(i) === "ɒ") {
                    newWord = newWord.slice(0, i) + "ɔ" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord.charAt(i) === "æ") {
                    newWord = newWord.slice(0, i) + "e" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord.charAt(i) === "ɐ") {
                    newWord = newWord.slice(0, i) + "ɘ" + newWord.slice(i + 1, newWord.length);
                }
            }
        }
    }

    return [newWord, false];
}

function strengthening(input) {
    //[-sonorant +continuant] → [-continuant] / {#, C} _ V

    var newWord = input;

    for (var i = 0; i < newWord.length - 1; i++) {
        var temp = newWord.slice(0, i);
        if (isConsonant(newWord[i + 1]) === false) {
            if ((i === 0) || (isConsonant(newWord[i]) === true)) {
                if ((newWord[i] === "f") || (newWord[i] === "ɸ")) {
                newWord = temp + "p" + newWord.slice(i + 1, newWord.length);
                }
                else if ((newWord[i] === "β") || (newWord[i] === "v")) {
                    newWord = temp + "b" + newWord.slice(i + 1, newWord.length);
                }
                else if ((newWord[i] === "θ") || (newWord[i] === "s") || (newWord[i] === "ʃ")) {
                    newWord = temp + "t" + newWord.slice(i + 1, newWord.length);
                }
                else if ((newWord[i] === "ð") || (newWord[i] === "z") || (newWord[i] === "ʒ")) {
                    newWord = temp + "d" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord[i] === "ʂ") {
                    newWord = temp + "ʈ" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord[i] === "ʐ") {
                    newWord = temp + "ɖ" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord[i] === "ç") {
                    newWord = temp + "c" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord[i] === "ʝ") {
                    newWord = temp + "ɟ" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord[i] === "x") {
                    newWord = temp + "k" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord[i] === "ɣ") {
                    newWord = temp + "ɡ" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord[i] === "χ") {
                    newWord = temp + "q" + newWord.slice(i + 1, newWord.length);
                }
                else if (newWord[i] === "ʁ") {
                    newWord = temp + "ɢ" + newWord.slice(i + 1, newWord.length);
                }
            }
        }
    }

    return [newWord, false];
}

function wordfinalConsonantNeutralization(input) {
    //C → ʔ / _ #

    var newWord = input;

    if ((newWord.trim().length > 0) && (isConsonant(newWord.slice(-1)) === true)) {
        newWord = newWord.slice(0, newWord.length - 1) + "ʔ";
    }

    return [newWord, false];
}

function mannerAssimilation(input) {
	//[−sonorant] → [αcontinuant] / — C₀[αcontinuant −syllabic]
    // 	Search for sequences of more than one C.
    // For each sequence:
    //         if the final C is [+continuant], all Cs must be [+continuant]
    //         else all C must be [-continuant]
	// +C 
    // -C pbtdʈɖcɟkɡqɢʔmɱnɳɲŋɴ

	var newWord = input;

    for (var i=newWord.length - 1; i > 0; i--) {
        if (newWord.charAt(i) === "ʙ" || newWord.charAt(i) === "r" || newWord.charAt(i) === "ʀ"
            || newWord.charAt(i) === "ɾ" || newWord.charAt(i) === "ɽ" || newWord.charAt(i) === "ɸ"
            || newWord.charAt(i) === "β" || newWord.charAt(i) === "f" || newWord.charAt(i) === "v"
            || newWord.charAt(i) === "θ" || newWord.charAt(i) === "ð" || newWord.charAt(i) === "s"
            || newWord.charAt(i) === "z" || newWord.charAt(i) === "ʃ" || newWord.charAt(i) === "ʒ"
            || newWord.charAt(i) === "ʂ" || newWord.charAt(i) === "ʐ" || newWord.charAt(i) === "ç"
            || newWord.charAt(i) === "ʝ" || newWord.charAt(i) === "x" || newWord.charAt(i) === "ɣ"
            || newWord.charAt(i) === "χ" || newWord.charAt(i) === "ʁ" || newWord.charAt(i) === "ħ"
            || newWord.charAt(i) === "ʕ" || newWord.charAt(i) === "h" || newWord.charAt(i) === "ɦ"
            || newWord.charAt(i) === "ɬ" || newWord.charAt(i) === "ɮ" || newWord.charAt(i) === "ʋ"
            || newWord.charAt(i) === "ɹ" || newWord.charAt(i) === "ɻ" || newWord.charAt(i) === "j"
            || newWord.charAt(i) === "ɰ" || newWord.charAt(i) === "l" || newWord.charAt(i) === "ɭ"
            || newWord.charAt(i) === "ʎ" || newWord.charAt(i) === "ʟ") {
            var j = i - 1;

            while ((j >=0) && (isConsonant(newWord.charAt(j)) === true)) {
                var temp = newWord.slice(0, j);
                if (newWord[j] === "p") {
                newWord = temp + "ɸ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "b") {
                    newWord = temp + "β" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "t") {
                    newWord = temp + "s" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "d") {
                    newWord = temp + "z" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ʈ") {
                    newWord = temp + "ʂ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ɖ") {
                    newWord = temp + "ʐ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "c") {
                    newWord = temp + "ç" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ɟ") {
                    newWord = temp + "ʝ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "k") {
                    newWord = temp + "x" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "g") {
                    newWord = temp + "ɣ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "q") {
                    newWord = temp + "χ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ɢ") {
                    newWord = temp + "ʁ" + newWord.slice(j + 1, newWord.length);
                }
                j = j - 1;
            }
            i = j;
        }
        else if (newWord.charAt(i) === "p" || newWord.charAt(i) === "b" || newWord.charAt(i) === "t"
            || newWord.charAt(i) === "d" || newWord.charAt(i) === "ʈ" || newWord.charAt(i) === "ɖ"
            || newWord.charAt(i) === "c" || newWord.charAt(i) === "ɟ" || newWord.charAt(i) === "k"
            || newWord.charAt(i) === "g" || newWord.charAt(i) === "q" || newWord.charAt(i) === "ɢ"
            || newWord.charAt(i) === "ʔ" || newWord.charAt(i) === "m" || newWord.charAt(i) === "ɱ"
            || newWord.charAt(i) === "n" || newWord.charAt(i) === "ɳ" || newWord.charAt(i) === "ɲ"
            || newWord.charAt(i) === "ŋ" || newWord.charAt(i) === "ɴ") {
            var j = i - 1;

            while ((j >=0) && (isConsonant(newWord.charAt(j)) === true)) {
                var temp = newWord.slice(0, j);
                if (newWord[j] === "ɸ") {
                newWord = temp + "p" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "β") {
                    newWord = temp + "b" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "f") {
                    newWord = temp + "p" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "v") {
                    newWord = temp + "b" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "θ") {
                    newWord = temp + "t" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ð") {
                    newWord = temp + "d" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "s") {
                    newWord = temp + "t" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "z") {
                    newWord = temp + "d" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ʃ") {
                    newWord = temp + "t" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ʒ") {
                    newWord = temp + "d" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ʂ") {
                    newWord = temp + "ʈ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ʐ") {
                    newWord = temp + "ɖ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ç") {
                    newWord = temp + "c" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ʝ") {
                    newWord = temp + "ɟ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "x") {
                    newWord = temp + "k" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ɣ") {
                    newWord = temp + "g" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "χ") {
                    newWord = temp + "q" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ʁ") {
                    newWord = temp + "ɢ" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ħ") {
                    newWord = temp + "q" + newWord.slice(j + 1, newWord.length);
                }
                else if (newWord[j] === "ʕ") {
                    newWord = temp + "ɢ" + newWord.slice(j + 1, newWord.length);
                }
                j = j - 1;
            }
            i = j;
        }
    }

    return [newWord, false];
}

function isConsonant(symbol) {
    var vowels = ["i", "ɪ", "u", "ʊ", "e", "ɛ", "o", "ɔ", "a", "æ", "y", "ʏ", "ə", "ø", "œ", "ɯ",
    "ɶ", "ɑ", "ʌ", "ɒ", "æ", "ɐ", "ɘ", "ɨ", "ʉ", "ɐ", "ɞ", "ɜ", "ɶ", "ɵ", "ɤ"]; 

    for (var i = 0; i < vowels.length; i++) {
        if (vowels[i] === symbol) {
            return false;
        }
    }

    return true;
}

function isNasal(symbol) {
    var nasals = ["m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "ɱ"];

    for (var i = 0; i < nasals.length; i++) {
        if (nasals[i] === symbol) {
            return true;
        }
    }

    return false;
}

function isSonorant(symbol) {
    var sonorants = ["i", "ɪ", "u", "ʊ", "e", "ɛ", "o", "ɔ", "a", "æ", "y", "ʏ", "ə", "ø", "œ", "ɯ",
    "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "ɱ",
    "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ"];

    for (var i = 0; i < sonorants.length; i++) {
        if (sonorants[i] === symbol) {
            return true;
        }
    }

    return false;
}

function isCoronal(symbol) {
    var coronals = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "n", "ɳ", "l", "r", "ɹ"];

    for (var i = 0; i < coronals.length; i++) {
        if (coronals[i] === symbol) {
            return true;
        }
    }

    return false;
}

function isNotLow(symbol) {
    var notlow = ["c", "ɟ", "ç", "ʝ", "k", "g", "x", "ɣ", "q", "ɢ", "χ",
    "ʁ", "ŋ", "ɳ", "ɲ" , 'ɴ', 'ʎ', 'ʀ', 'j', 'w', 'ɥ', 'ɰ', 'i', 'ɪ', 'u',
    'ʊ', 'e', 'ɛ', 'o', 'ɔ', 'y', 'ʏ', '∅', 'œ', 'ə', 'ɯ'];

    for (var i=0; i < notlow.length; i++) {
        if (notlow[i] === symbol) {
            return true;
        }
    }

    return false;
}

function isLow(symbol) {
    var lows = ['a', 'æ'];

    for (var i=0; i < lows.length; i++) {
        if (lows[i] === symbol) {
            return true;
        }
    }

    return false;
}

function isHigh(symbol) {
    var highs = ["c", "ɟ", "ç", "ʝ", "k", "g", "x", "ɣ", 'j', 'w', 'ɥ', 'ɰ', 'i', 'ɪ', 'u',
    'ʊ', 'ŋ', 'ɲ', 'ʎ', 'y', 'ʏ', 'ɯ'];

    for (var i=0; i < highs.length; i++) {
        if (highs[i] === symbol) {
            return true;
        }
    }

    return false;
}

function voiced(symbol) {
    var vls = ["t", "s", "ɬ", "θ", "ʃ", "c", "ç", "p", "f", "ɸ", "k", "x", "q", "χ", "ħ"];

    for (var i=0; i < vls.length; i++) {
        if (vls[i] === symbol) {
            return false;
        }
    }
    return true;
}

function notHighOrLow(char) {
    var symb = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "p", "b", "f", "v",
    "ɸ", "β", "k", "ħ", "ʕ", "h", "ɦ", "ʔ", "m", "n", "l", "r", "ɹ"];

    for (var i=0; i < symb.length; i++) {
        if (symb[i] === char) {
            return true;
        }
    }
    return false;
}

function isSubscript(char){
    var subscript = ["ʰ","ʲ", "ⁿ", "ˠ", "ˢ", "ˣ", "ʷ", "ʱ", "ᵑ", "ᵐ"];

    for (var i=0; i < rounds.length; i++) {
        if (rounds[i] === char) {
            return true;
        }
    }
    return false;
}

function isRound(char) {
    var rounds = ["y", "ʏ", "ø", "œ", "ɶ", "ʉ", "ɵ", "ɞ", "u", "ʊ", "o", "ɔ", "ɒ"];

     for (var i=0; i < rounds.length; i++) {
        if (rounds[i] === char) {
            return true;
        }
    }
    return false;
}

function notRound(char) {
    var notRounds = ["i", "ɪ", "e", "ɛ", "æ", "a", "ɨ", "ɘ", "ə", "ɜ", "ɐ", "ɯ", "ɤ", "ʌ", "ɑ"];

     for (var i=0; i < notRounds.length; i++) {
        if (notRounds[i] === char) {
            return true;
        }
    }
    return false;
}

function notDorsal(char) {
    var nonDors = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "p", "b",
    "f", "v", "ɸ", "β", "ħ", "ʕ", "h", "ɦ", "ʔ", "m", "n", "l", "r", "ɹ"];

    for (var i=0; i < nonDors.length; i++) {
        if (nonDors[i] === char) {
            return true;
        }
    }
    return false;
}

function notAnterior(char) {
    var nonAnts = ["ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "ɳ"];

    for (var i=0; i < nonAnts.length; i++) {
        if (nonAnts[i] === char) {
            return true;
        }
    }
    return false;
}

function notBack(char) {
    var nonBacks = ["c", "ɟ", "ç", "ʝ", "ɳ", "ɲ", "ʎ", "j", "ɥ", "i", "ɪ", "e", "ɛ", "a", "æ",
    "y", "ʏ", "∅", "œ"];

    for (var i=0; i < nonBacks.length; i++) {
        if (nonBacks[i] === char) {
            return true;
        }
    }
    return false;
}

function voiceConsonant(char) {
    var voicedC = "";

    if (char === "t") {
        voicedC = "d";
    }
    else if (char === "s") {
        voicedC = "z";
    }
    else if (char === "θ") {
        voicedC = "ð";
    }
    else if (char === "p") {
        voicedC = "b";
    }
    else if (char === "f") {
        voicedC = "v";
    }
    else if (char === "ʈ") {
        voicedC = "ɖ";
    }
    else if (char === "k") {
        voicedC = "g";
    }
    else if (char === "c") {
        voicedC = "ɟ";
    }
    else if (char === "q") {
        voicedC = "ɢ";
    }
    else if (char === "ɸ") {
        voicedC = "β";
    }
    else if (char === "ʃ") {
        voicedC = "ʒ";
    }
    else if (char === "ʂ") {
        voicedC = "ʐ";
    }
    else if (char === "ç") {
        voicedC = "ʝ";
    }
    else if (char === "x") {
        voicedC = "ɣ";
    }
    else if (char === "χ") {
        voicedC = "ʁ";
    }
    else if (char === "ħ") {
        voicedC = "ʕ";
    }
    else if (char === "ɬ") {
        voicedC = "ɮ";
    }
    else {
        voicedC = "";
    }

    return voicedC;
}

function devoiceConsonant(char) {
    var voicedC = "";

    if (char === "d") {
        voicedC = "t";
    }
    else if (char === "z") {
        voicedC = "s";
    }
    else if (char === "ð") {
        voicedC = "θ";
    }
    else if (char === "b") {
        voicedC = "p";
    }
    else if (char === "v") {
        voicedC = "f";
    }
    else if (char === "ɖ") {
        voicedC = "ʈ";
    }
    else if (char === "g") {
        voicedC = "k";
    }
    else if (char === "c") {
        voicedC = "c";
    }
    else if (char === "ɢ") {
        voicedC = "q";
    }
    else if (char === "β") {
        voicedC = "ɸ";
    }
    else if (char === "ʒ") {
        voicedC = "ʃ";
    }
    else if (char === "ʐ") {
        voicedC = "ʂ";
    }
    else if (char === "ʝ") {
        voicedC = "ç";
    }
    else if (char === "ɣ") {
        voicedC = "x";
    }
    else if (char === "ʁ") {
        voicedC = "χ";
    }
    else if (char === "ʕ") {
        voicedC = "ħ";
    }
    else if (char === "ɮ") {
        voicedC = "ɬ";
    }
    else {
        voicedC = "";
    }

    return voicedC;
}

function voiceSonorant(char) {
    var voicedS = "";

    if (char === "t") {
        voicedS = "d";
    }
    else if (char === "s") {
        voicedS = "z";
    }
    else if (char === "θ") {
        voicedS = "ð";
    }
    else if (char === "p") {
        voicedS = "b";
    }
    else if (char === "f") {
        voicedS = "v";
    }
    else if (char === "ʈ") {
        voicedS = "ɖ";
    }
    else if (char === "k") {
        voicedS = "g";
    }
    else if (char === "c") {
        voicedS = "ɟ";
    }
    else if (char === "q") {
        voicedS = "ɢ";
    }
    else if (char === "ɸ") {
        voicedS = "β";
    }
    else if (char === "ʃ") {
        voicedS = "ʒ";
    }
    else if (char === "ʂ") {
        voicedS = "ʐ";
    }
    else if (char === "ç") {
        voicedS = "ʝ";
    }
    else if (char === "x") {
        voicedS = "ɣ";
    }
    else if (char === "χ") {
        voicedS = "ʁ";
    }
    else if (char === "ħ") {
        voicedS = "ʕ";
    }
    else if (char === "ɬ") {
        voicedS = "ɮ";
    }
    else {
        voicedS = "";
    }

    return voicedS;
}

function devoiceSonorant(char) {
    var devoicedS = "";

    if (char === "d") {
        devoicedS = "t";
    }
    else if (char === "z") {
        devoicedS = "s";
    }
    else if (char === "ð") {
        devoicedS = "θ";
    }
    else if (char === "b") {
        devoicedS = "p";
    }
    else if (char === "v") {
        devoicedS = "f";
    }
    else if (char === "ɖ") {
        devoicedS = "ʈ";
    }
    else if (char === "g") {
        devoicedS = "k";
    }
    else if (char === "ɟ") {
        devoicedS = "c";
    }
    else if (char === "ɢ") {
        devoicedS = "q";
    }
    else if (char === "β") {
        devoicedS = "ɸ";
    }
    else if (char === "ʒ") {
        devoicedS = "ʃ";
    }
    else if (char === "ʐ") {
        devoicedS = "ʂ";
    }
    else if (char === "ʝ") {
        devoicedS = "ç";
    }
    else if (char === "ɣ") {
        devoicedS = "x";
    }
    else if (char === "ʁ") {
        devoicedS = "χ";
    }
    else if (char === "ʕ") {
        devoicedS = "ħ";
    }
    else if (char === "ɮ") {
        devoicedS = "ɬ";
    }
    else {
        devoicedS = "";
    }

    return devoicedS;
}

function makeContinuant(char) {
    var cont = "";

    if (char === "b") {
        cont = "β";
    }
    else if (char === "d") {
        cont = "z";
    }
    else if (char === "ɖ") {
        cont = "ʐ";
    }
    else if (char === "ɟ") {
        cont = "ʝ";
    }
    else if (char === "ɡ") {
        cont = "ɣ";
    }
    else if (char === "ɢ") {
        cont = "ʁ";
    }
    else if (char === "ʙ") {
        cont = "ʙ";
    }
    else if (char === "v") {
        cont = "v";
    }
    else if (char === "ð") {
        cont = "ð";
    }
    else if (char === "z") {
        cont = "z";
    }
    else if (char === "ʒ") {
        cont = "ʒ";
    }
    else if (char === "ʐ") {
        cont = "ʐ";
    }
    else if (char === "ʝ") {
        cont = "ʝ";
    }
    else if (char === "ɣ") {
        cont = "ɣ";
    }
    else if (char === "ʁ") {
        cont = "ʁ";
    }
    else if (char === "ʕ") {
        cont = "ʕ";
    }
    else if (char === "ɦ") {
        cont = "ɦ";
    }
    else {
        cont = "";
    }

    return cont;
}

function roundVowel(char) {
    var rounded = "";

    if ((char === "i") || (char === "ɪ")) {
        rounded = "u";
    }
    else if (char === "e") {
        rounded = "o";
    }
    else if ((char === "ɛ") || (char === "œ")) {
        rounded = "ɔ";
    }
    else if ((char === "a") || (char === "æ")) {
        rounded = "y";
    }
    else {
        rounded = "";
    }

    return rounded;
}

function unroundVowel(char) {
    var unrounded = "";

    if ((char === "ɯ") || (char === "ə")) {
        unrounded = "œ";
    }
    else if ((char === "y") || (char === "ʏ") || (char === "∅")) {
        unrounded = "a";
    }
    else if (char === "o") {
        unrounded = "e";
    }
    else if ((char === "u") || (char === "ʊ")) {
        unrounded = "i";
    }
    else {
        unrounded = "";
    }

    return unrounded;
}

function clearCells(tableID) {
    var table = document.getElementById(tableID);
    var rows = table.rows;

    for (var col=2; col < table.rows[0].cells.length; col++)
        for (var i = 1; i < rows.length; i++) {
            rows[i].cells[col].innerHTML = '';
            rows[rows.length - 1].cells[col].innerHTML = "SF: ";
        }
}

function clearUR() {
    var elems = document.getElementsByClassName("userInput") ;

    for(var i=0,c=elems.length ; i<c ; i++){
       elems[i].value = "" ;
    }

} 