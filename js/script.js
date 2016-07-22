window.onload = function () {

    testCases();
    window.table = document.getElementById('dataTable');
    window.ruleOrder = document.getElementsByClassName("taggable");
    window.separated = false;
    window.original_value;
    addRow();
}

function checkFeature(IPA, feature) {
    /* Check the type of the feature:
    One of +, -, +-, 0, (empty), -1 (does not exist) */
    for (var i = 0; i < database_IPA.length; i ++)
        if (database_IPA[i][0] == feature)
            return database_IPA[i]
            [database_IPA[0].indexOf(IPA)];
    return -1;
}

function changeFeature(IPA, features) {

    /* IPA: a single IPA e.g. "a" */
    /* features: a list of features in a segment */
    /* Need to be all lowercase! */

    /* Init */
    var array_diffs, feature_IPA, feature_compared, segments_in_array, i, j, k, l;
    features = features.sort();

    /* Start Checking */
    for (i = 1; i < database_IPA[0].length; i ++) {

        /* Check for all differences & Push onto "array_diffs" */
        array_diffs = [];
        for (j = 1; j < database_IPA.length; j ++) {
            feature_IPA = checkFeature(IPA, database_IPA[j][0]);
            feature_compared = checkFeature(database_IPA[0][i], database_IPA[j][0]);
            if (feature_IPA != feature_compared)
                array_diffs.push([database_IPA[0][i], feature_compared + database_IPA[j][0].toLowerCase()]);
        }

        /* Check if all diffs match "features" exactly */
        segments_in_array = [];
        for (k = 0; k < array_diffs.length; k ++)
            segments_in_array.push(array_diffs[k][1]);
        segments_in_array = segments_in_array.sort();
        if (arraysEqual(segments_in_array, features))
            for (l = 0; l < array_diffs.length; l++)
                if (array_diffs[l][1] == features[l])
                    return array_diffs[l][0];
    }
    /* If not found: Return the origin IPA */
    return IPA;
}

function createUniqueTag(elmt) {

    separated = false;
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
    original_value = "";
    $("#id_tag").attr("value", "");
    elmt.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
}

function addRow() {

    // Create a new row
    // var table = document.getElementById(tableID);
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
    for (var k = 3; k < table.rows[0].cells.length; k++) {
        var newCell = row.insertCell(k);
        newCell.className = "cell";
        newCell.innerHTML = "";
    }

    // Able to remove the first rule if there is more than 1 rule
    if (table.rows.length == 3) {
        table.rows[1].cells[0].style.visibility = 'hidden';
    }
    else {
        table.rows[1].cells[0].style.visibility = 'visible';
    }
}

function deleteRow(tableID) {
    var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    for (var i = 0; i < rowCount; i++) {
        var row = table.rows[i];
        var chkbox = row.cells[0].childNodes[0];
        if (chkbox != null && chkbox.checked) {
            table.deleteRow(i);
            rowCount--;
            i--;
        }
    }

    // Able to remove the first rule if there is more than 1 rule
    if (table.rows.length == 3) {
        table.rows[1].cells[0].style.visibility = 'hidden';
    }
    else {
        table.rows[1].cells[0].style.visibility = 'visible';
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

    function addABCD(ABCD) {
        taggables[i+numCols].innerHTML = "";
        var select1 = taggables[i+numCols];
        var select1lighter = document.createElement("div");
        select1lighter.setAttribute('class', 'lighter');
        select1lighter.innerHTML = ABCD;
        select1.appendChild(select1lighter);
    }
    var table = document.getElementById(tableID);
    var rows = table.rows;
    var numCols = table.rows[0].cells.length - 2;
    var taggables = document.querySelectorAll(".taggable");
    for (var i = 0, max = taggables.length - numCols; i < max; i++) {
        if (i % 4 === 0) addABCD("A");
        else if (i % 4 === 1) addABCD("B");
        else if (i % 4 === 2) addABCD("C");
        else if (i % 4 === 3) addABCD("D");
    }
}

function addUR(tableID) {

    function countCols(tableID) {
        var table = document.getElementById(tableID);
        var max = 0;
        for (var i = 0, iLen = table.rows.length; i < iLen; i++) {
          var temp = 0;
          var cells = table.rows[i].cells;
          for (var j = 0, jLen = cells.length; j < jLen; j ++)
            temp += cells[j].colSpan;
          if (temp > max) max = temp;
        }
        return max;
    }
    var tbl = document.getElementById(tableID), // table reference
        i;
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
    celltxtinput.innerHTML = "UR: ";
    celltxtinput.appendChild(txtinput);

    // open loop for each row and append cell
    for (i = 1; i < tbl.rows.length; i++)
        createCell(tbl.rows[i].insertCell(tbl.rows[i].cells.length), '', 'col');

    tbl.rows[tbl.rows.length - 1].cells[numCols - 1].innerHTML = "SF: ";
}

function clearUR() {

    var elems = document.getElementsByClassName("userInput");
    for (var i = 0, c = elems.length; i < c; i++)
       elems[i].value = "";
}

function isIllFormed(A, B, C, D) {

    // Ill-formed conditions
    if (A.indexOf("&nbsp;") != -1  && B.indexOf("&nbsp;") != -1) {
        // If A and B are empty at the same time.
        alert("A and B cannot be empty at the same time.");
        return true;
    }

    // if (A.indexOf("&nbsp;") != -1) {
    //     // If A is empty at the same time.
    //     alert("A cannot be empty.");
    //     return true;
    // }
    //
    // if (A.indexOf("∅") != -1) {
    //     // If A is none
    //     alert("A cannot be none.");
    //     return true;
    // }

    if (C.indexOf("∅") != -1) {
        // If C is none
        alert("C cannot be none.");
        return true;
    }

    if (D.indexOf("∅") != -1) {
        // If D is none
        alert("D cannot be none.");
        return true;
    }

    if (A.indexOf("#") != -1 || B.indexOf("#") != -1) {
        // If A or B is #
        alert("# cannot be in A or B");
        return true;
    }

    if (C.indexOf("#") != -1 && D.indexOf("#") != -1) {
        // If A or B is #
        alert("# cannot be both in C and D");
        return true;
    }
    return false;
}

function derive() {

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

    /* Initialize */;
    var wordList = [];
    window.numCols = table.rows[0].cells.length - 2;
    var rows = table.rows;
    var A, B, C, D, ruleName, x, w, i, j, k, l, currentCell;
    var indexOfDuplicates, currentContent, prevContent;

    /* Push each UR to the wordList */
    for (x = 1; x < numCols + 1; x ++) {
        wordList.push((document.getElementsByClassName("input" + x))[0].value);
    }

    for (i = 0; i < (ruleOrder.length - numCols) / 4; i++) {

        /* Remove whitespaces */
        A = parseABCD(0, i).split("&nbsp;").join("").replace(/\s/g, '');
        B = parseABCD(1, i).split("&nbsp;").join("").replace(/\s/g, '');
        C = parseABCD(2, i).split("&nbsp;").join("").replace(/\s/g, '');
        D = parseABCD(3, i).split("&nbsp;").join("").replace(/\s/g, '');

        /* Check if ill-formed */
        if (isIllFormed(A, B, C, D)) console.log("Debug: This column is skipped.");
        else {
            for (w = 0; w < wordList.length; w ++) {
                wordList[w] = applyRule(A, B, C, D, wordList[w]);
                currentCell = rows[i + 1].cells[w + 2];
                currentCell.innerHTML = wordList[w];
                rows[rows.length - 1].cells[w + 2].innerHTML = "SF: " + wordList[w];
            }
        }
    }

    // Remove intermediate step if there is no change
    for (l = 1; l < numCols + 1; l ++) {
        indexOfDuplicates = [];
        if (document.getElementsByClassName("input" + l)[0].value == rows[1].cells[l + 1].innerHTML)
            indexOfDuplicates.push(1);
        for (j = 0; j < (ruleOrder.length - numCols) / 4; j ++) {
            prevContent = rows[j+1].cells[l + 1].innerHTML;
            currentContent = rows[j+2].cells[l + 1].innerHTML;
            if (prevContent == currentContent)
                indexOfDuplicates.push(j+2);
        }
        for (k = 0; k < indexOfDuplicates.length; k ++)
            rows[indexOfDuplicates[k]].cells[l + 1].innerHTML = "";
    }
}

function applyRule(A, B, C, D, word) {

    function isMatchedSpecialChar(ABCD, letter) {

        var sign;
        /* If it is Vowel */
        if (ABCD == "V") return has(letter, 'vowel');
        /* If it is Consonant */
        if (ABCD == "C") return has(letter, 'consonant');
        /* If it is a Segment */
        if (ABCD.charAt(1) == "+" || ABCD.charAt(1) == "-") {
            var segments = getFeaturesInSegment(ABCD);
            for (var i = 0; i < segments.length; i ++) {

                /* Check if all matches */
                sign = segments[i][0];
                if (sign == "+") sign = "plus";
                else if (sign == "-") sign = "minus";
                else console.log("Debug: Should not get here.");
                if (!has(letter, segments[i].substring(1, segments[i].length) + sign))
                    return false;
            }
            return true;
        }
        return false;
    }
    function isMatchedSingleABCD(ABCD, i, isNotA) {

        // Multiple segments below
        // TODO
        var result;
        var ABCD_array = parseSegment(ABCD);
        for (var j = 0; j < ABCD_array.length; j ++)
            result = word.charAt(i + j) == ABCD_array[j] || isMatchedSpecialChar(ABCD_array[j], word.charAt(i + j));
        if (!isNotA) return result;
        else return result || ABCD == " ";
    }
    function isMatchedSingleSegment() {

        // Single segment
        // If at word init
        var before, middle, after, ASegments, BSegments, ASegment, BSegment, isContainedPlusMinus, i, j, k, l;
        if (C == "#") {
            if (isMatchedSingleABCD(D, 1, true) && isMatchedSingleABCD(A, 0, false)) {
                // TODO
                word = word.replaceAt(0, B);
            }

        }
        /* If at word final */
        else if (D == "#") {
            if (isMatchedSingleABCD(C, len - 2, true) && isMatchedSingleABCD(A, len - 1, false)) {
                // TODO
                word = word.replaceAt(len - 1, B);
            }
        }

        /* If neither at word init nor word end
        Push indices that match, into a list */
        else {
            for (i = 0; i < len; i ++)
                if (isMatchedSingleABCD(C, i - 1, true) && isMatchedSingleABCD(A, i, false) && isMatchedSingleABCD(D, i + parseSegment(A).length, true))
                    indice.push(i);
            /* Change A to B at each index that matches */
            for (j = 0; j < indice.length; j ++) {
                before = word.substring(0, indice[j]);
                middle = "";

                // TODO: NOT getFeaturesInSegment(), sth else instead to accommodate multiple segments.
                ASegments = [getFeaturesInSegment(A)];
                BSegments = [getFeaturesInSegment(B)];
                if (ASegments.length == BSegments.length) {
                    for (k = 0; k < ASegments.length; k ++) {
                        ASegment = ASegments[k];
                        BSegment = BSegments[k];

                        isContainedPlusMinus = false;
                        for (l = 0; l < BSegment.length; l ++) {
                            if (BSegment[l].indexOf('+') != -1 || BSegment[l].indexOf('-') != -1) {
                                isContainedPlusMinus = true;
                                break;
                            }
                        }
                        // If this segment in B is an IPA: Just change it
                        if (!isContainedPlusMinus) middle += BSegment;
                        // If this segment in B is a feature: Call changeFeature()
                        else middle += changeFeature(word[indice[j]], BSegment);
                    }
                }
                else console.log("DEBUG: THERE IS NO [ IN BOTH A AND B.")
                if (middle == "") middle = " ";

                after = word.substring(indice[j] + 1, word.length);
                // if (before != "") console.log("before:", before);
                // else console.log("before:", "EMPTY");
                // if (middle != "") console.log("middle:", middle);
                // else console.log("middle:", "EMPTY");
                // if (after != "") console.log("after:", after);
                // else console.log("after:", "EMPTY");
                // console.log("=======");
                word = before + middle + after;
            }
        }
        stripped = word.replace(/\s/g, '');
        return stripped;
    }
    function getFeaturesInSegment(segment) {
        /* Change segment into features */
        /* e.g. "[+ATR-low]" -> ["+ATR", "-low"] */
        var features = [];
        segment = segment.replace(/^\s+|\s+$/g, '');
        segment = segment.substring(1, segment.length - 1);
        var indexOfPlus, indexOfMinus, indexOfPlusMinus, subSegment;

        while (1) {

            indexOfPlus = segment.substring(1, segment.length).indexOf("+");
            indexOfMinus = segment.substring(1, segment.length).indexOf("-");

            if (indexOfPlus == -1) indexOfPlusMinus = indexOfMinus;
            else if (indexOfMinus == -1) indexOfPlusMinus = indexOfPlus;
            else if (indexOfPlus == -1 && indexOfMinus == -1) indexOfPlusMinus = segment.length;
            else indexOfPlusMinus = Math.min(indexOfPlus, indexOfMinus);

            subSegment = segment.substring(0, indexOfPlusMinus + 1);
            if (subSegment != "") features.push(subSegment);
            segment = segment.substring(indexOfPlusMinus + 1, segment.length);
            if (indexOfPlus == -1 && indexOfMinus == -1) break;
        }

        /* Push the last segment */
        features.push(segment);
        return features;
    }

    var i, j;
    var indice = [];
    var len = word.length;

    if (A == "&nbsp;" || A == "") A = " ";
    if (B == "&nbsp;" || B == "") B = " ";
    if (C == "&nbsp;" || C == "") C = " ";
    if (D == "&nbsp;" || D == "") D = " ";
    if (B == "∅") B = " ";

    // Need to change in order to accommodate individual IPA
    var segmentsOfA = parseSegment(A);
    var segmentsOfB = parseSegment(B);
    var segmentsOfC = parseSegment(C);
    var segmentsOfD = parseSegment(D);

    return isMatchedSingleSegment();
}

function appendIPA(IPA) {
    var txtToAdd = IPA;
    original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
    $("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
}

function appendFeature(feature) {

    function beautify(segments) {

        segments = segments.replaceAll("+", " + ");
        segments = segments.replaceAll("-", " - ");
        segments = segments.replaceAll("][", "] [");
        return segments;
    }

    /* Remove space from feature */
    feature = feature.replace(/\s/g, '');
    feature = feature.toLowerCase();
    /* The result */
    var result;
    /* Values that already on button, e.g. [+ ATR - low] */
    var original_value;
    original_value = $("#id_tag").attr("value");
    original_value = original_value.replace(/\s/g, '');
    /* Segments that are parsed from original_value */
    var listSegment = parseSegment(original_value);

    /* If there is nothing on button yet or separated */
    if (listSegment.length == 0 || separated) {
        result = original_value + "[+" + feature + "]";
        separated = false;
    } else {
        /* Last segment of listSegment e.g. [+low-nasal]*/
        var lastSegment = listSegment[listSegment.length - 1];
        /* Name of feature, e.g "low" in [+low] */
        /* Position of feature in lastSegment */
        var pos = lastSegment.search(feature);
        if (pos == -1) {
            /* If not found: New segment */
            result = original_value.substring(0, original_value.length - 1) + "+" + feature + "]";
        } else {
            /* If found */
            /* Get value of sign before name, + or - */
            var valueOfSign = lastSegment[pos - 1];
            /* Toggle sign */
            if (valueOfSign == "+") lastSegment = lastSegment.replaceAt(pos - 1, "-");
            else if (valueOfSign == "-") lastSegment = lastSegment.replaceAt(pos - 1, "+");
            else console.log("Debug: Should not get here.");

            listSegment.pop();
            result = listSegment.join("") + lastSegment;
        }
    }

    result = beautify(result);
    $("#id_tag").attr("value", result);
	$("#id_tag").html(result);
}

function parseSegment(segments) {

    /* Parse segments */
    /* e.g. "a[+atr+anterior]C[+back+consonantal]V" ->
    ["a", "[+atr+anterior]", "C", "[+back+consonantal]", "V"] */

    var results = [];
    do {

        /* Find index of [ */
        for (var i = 0; i < segments.length; i ++)
            if (segments[i] == "[")
                break;

        /* If there are other segments between ] and [ */
        if (i != 0)
            for (var k = 0; k < i; k ++)
                /* Push each SEPARATELY into the array */
                results.push(segments.charAt(k));

        /* Find index of ] */
        for (var j = i; j < segments.length; j ++)
            if (segments[j] == "]")
                break;

        /* push "[...]" into results */
        results.push(segments.substring(i, j + 1));
        segments = segments.substring(j + 1, segments.length);

    } while (i != 0 || j != 0);

    /* The do-while loop above will produce extra empty item(s) at the end, so remove it/them by pop() */
    while (results[results.length - 1] == "") results.pop();
    return results;
}

function has(letter, feature) {

    // Need to be simplified later
    var arrayvowel = [
        "i", "y", "ɨ", "ʉ", "ɯ", "u", "ɪ",
        "ʏ", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ",
        "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ",
        "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"]
    var arrayconsonant = [
        "p", "b", "t", "d", "ʈ", "ɖ", "c", "ɟ", "k", "g", "q", "ɢ", "ʔ",
        "m", "ɱ", "n", "ɳ", "ɲ", "ŋ", "ɴ",
        "ʙ", "r", "ʀ",
        "ⱱ", "ɾ", "ɽ",
        "ɸ", "β", "f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "ʂ", "ʐ", "ç", "ʝ", "x", "ɣ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ",
        "ɬ", "ɮ",
        "ʋ", "ɹ", "ɻ", "j", "ɰ",
        "l", "ɭ", "ʎ", "ʟ"];
    var arrayatrplus = ["i", "y", "ʉ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɔ"];
    var arrayatrminus = ["ħ", "ʕ", "ɪ", "ʏ", "ɨ", "ɯ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "æ", "ɐ", "a", "ɶ"];
    var arrayanteriorplus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "n", "l", "r", "ɹ"];
    var arrayanteriorminus = ["ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "ɳ"];
    var arraybackplus = ["k", "g", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ŋ", "ɴ", "ʀ",
    "w", "ɰ", "ɯ",
    "u", "ʊ", "ɤ", "o", "ə", "ʌ", "ɔ", "ɑ", "ɒ"];
    var arraybackminus = ["c", "ɟ", "ç", "ʝ", "ɳ", "ɲ", "ʎ", "j", "ɥ", "i", "ɪ", "e", "ɛ", "a", "æ",
    "y", "ʏ", "∅", "œ"];
    var arrayconsonantalplus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ"];
    var arrayconsonantalminus = ["h", "ɦ", "ʔj", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraycgplus = ["ʔ"];
    var arraycgminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraycontinuantplus = [
    "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ",
    "ç", "ʝ", "f", "v", "ɸ", "β", "x", "ɣ",
    "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "l", "ʎ",
    "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i",
    "y", "ɨ", "ʉ", "ɯ", "u", "ɪ", "ʏ", "ʊ",
    "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ",
    "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a",
    "ɶ", "ɑ", "ɒ"];
    var arraycontinuantminus = ["t", "d", "c", "ɟ", "p", "b", "k", "ɡ", "q", "ɢ", "ʔ", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ"];
    //arraycontinuantminus: "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf" are +-
    var arraycoronalplus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "n", "ɳ", "l", "r", "ɹ"];
    var arraycoronalminus = ["p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "ʔ", "kx", "pf", "m", "ŋ", "ɲ", "ɴ", "ʎ", "ʀ", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraydelayedreleaseplus = ["t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf"];
    var arraydelayedreleaseminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "ʔ", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraydistributedplus = ["ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "t͡ʃ", "d͡ʒ"];
    var arraydistributedminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ts", "dz", "n", "ɳ", "l", "r", "ɹ"];
    var arraydorsalplus = ["c", "ɟ", "ç", "ʝ", "k", "g", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ŋ", "ɳ", "ɲ", "ʎ", "ʀ", "j", "w", "ɥ", "ɰ",
    "i", "y", "ɨ", "ʉ", "ɯ", "u", "ɪ",
    "ʏ", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ",
    "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ",
    "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraydorsalminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "p", "b",
    "f", "v", "ɸ", "β", "ħ", "ʕ", "h", "ɦ", "ʔ", "m", "n", "l", "r", "ɹ"];
    var arrayhighplus = ["c", "ɟ", "ç", "ʝ", "k", "g", "x", "ɣ", 'j', 'w', 'ɥ', 'ɰ', 'i', 'ɪ', 'u',
    'ʊ', 'ŋ', 'ɲ', 'ʎ', 'y', 'ʏ', 'ɯ'];
    var arrayhighminus = ["q", "ɢ", "χ", "ʁ", "ɴ", "ʀ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraylabialplus = ["p", "b", "f", "v", "ɸ", "β", "pf", "m", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraylabialminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "ʔ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ"];
    var arraylateralplus = ["ʎ", "r"];
    var arraylateralminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "ʔ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraylowplus = ['æ', 'ɐ', 'a', 'ɶ', 'ɑ', 'ɒ'];
    var arraylowminus = ["c", "ɟ", "ç", "ʝ", "k", "g", "x", "ɣ", "q", "ɢ", "χ",
    "ʁ", "ŋ", "ɳ", "ɲ" , 'ɴ', 'ʎ', 'ʀ', 'j', 'w', 'ɥ', 'ɰ', 'i', 'ɪ', 'u',
    'ʊ', 'e', 'ɛ', 'o', 'ɔ', 'y', 'ʏ', '∅', 'œ', 'ə', 'ɯ'];
    var arraynasalplus = ["m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "ɱ"];
    var arraynasalminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "ʔ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf", "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraypharyngealplus = ["ħ", "ʕ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraypharyngealminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "h", "ɦ", "ʔ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ"];
    var arrayroundplus = ["y", "ʏ", "ø", "œ", "ɶ", "ʉ", "ɵ", "ɞ", "u", "ʊ", "o", "ɔ", "ɒ"];
    var arrayroundminus = ["i", "ɪ", "e", "ɛ", "æ", "a", "ɨ", "ɘ", "ə", "ɜ", "ɐ", "ɯ", "ɤ", "ʌ", "ɑ"];
    var arraysonorantplus = ["i", "ɪ", "u", "ʊ", "e", "ɛ", "o", "ɔ", "a", "æ", "y", "ʏ", "ə", "ø", "œ", "ɯ",
    "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "ɱ",
    "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ"];
    var arraysonorantminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "ʔ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf"];
    var arraysgplus = ["ɬ", "h", "ɦ"];
    var arraysgminus = ["t", "d", "s", "z", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "ʔ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraystridentplus = ["s", "z", "f", "v", "t͡ʃ", "d͡ʒ", "ts", "dz", "pf"];
    var arraystridentminus = ["t", "d", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "ʔ", "kx", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraysyllabicplus = ["i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arraysyllabicminus = ["t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "ʔ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ"];
    var arraytenseplus = ["i", "y", "ɨ", "ʉ", "ɯ", "u", "e", "ø", "ɵ", "ɤ", "o", "æ", "ɐ", "ɶ"];
    var arraytenseminus = ["c", "ɟ", "ç", "ʝ", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "t͡ʃ", "d͡ʒ", "kx", "ŋ", "ɳ", "ɲ", "ɴ", "ʎ", "ʀ", "j", "w", "ɥ", "ɰ", "ɪ", "ʏ", "ʊ", "ɘ", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "a", "ɑ", "ɒ"];
    var arrayvoiceplus = ["d", "z", "ɮ", "ð", "ʒ", "ɟ", "ʝ", "b", "v", "β", "ɡ", "ɣ", "ɢ", "ʁ", "ɦ", "d͡ʒ", "dz", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"];
    var arrayvoiceminus = ["t", "s", "ɬ", "θ", "ʃ", "c", "ç", "p", "f", "ɸ", "k", "x", "q", "χ", "ħ"];

    var array;
    feature = feature.toLowerCase();
    switch (feature) {

        case 'vowel':
            array = arrayvowel;
            break;
        case 'consonant':
            array = arrayconsonant;
            break;
        case 'atrplus':
            array = arrayatrplus;
            break;
        case 'atrminus':
            array = arrayatrminus;
            break;
        case 'anteriorplus':
            array = arrayanteriorplus;
            break;
        case 'anteriorminus':
            array = arrayanteriorminus;
            break;
        case 'backplus':
            array = arraybackplus;
            break;
        case 'backminus':
            array = arraybackminus;
            break;
        case 'consonantalplus':
            array = arrayconsonantalplus;
            break;
        case 'consonantalminus':
            array = arrayconsonantalminus;
            break;
        case 'cgplus':
            array = arraycgplus;
            break;
        case 'cgminus':
            array = arraycgminus;
            break;
        case 'continuantplus':
            array = arraycontinuantplus;
            break;
        case 'continuantminus':
            array = arraycontinuantminus;
            break;
        case 'coronalplus':
            array = arraycoronalplus;
            break;
        case 'coronalminus':
            array = arraycoronalminus;
            break;
        case 'delayedreleaseplus':
            array = arraydelayedreleaseplus;
            break;
        case 'delayedreleaseminus':
            array = arraydelayedreleaseminus;
            break;
        case 'distributedplus':
            array = arraydistributedplus;
            break;
        case 'distributedminus':
            array = arraydistributedminus;
            break;
        case 'dorsalplus':
            array = arraydorsalplus;
            break;
        case 'dorsalminus':
            array = arraydorsalminus;
            break;
        case 'Highplus':
            array = arrayHighplus;
            break;
        case 'Highminus':
            array = arrayHighminus;
            break;
        case 'labialplus':
            array = arraylabialplus;
            break;
        case 'labialminus':
            array = arraylabialminus;
            break;
        case 'lateralplus':
            array = arraylateralplus;
            break;
        case 'lateralminus':
            array = arraylateralminus;
            break;
        case 'lowplus':
            array = arraylowplus;
            break;
        case 'lowminus':
            array = arraylowminus;
            break;
        case 'nasalplus':
            array = arraynasalplus;
            break;
        case 'nasalminus':
            array = arraynasalminus;
            break;
        case 'pharyngealplus':
            array = arraypharyngealplus;
            break;
        case 'pharyngealminus':
            array = arraypharyngealminus;
            break;
        case 'roundplus':
            array = arrayroundplus;
            break;
        case 'roundminus':
            array = arrayroundminus;
            break;
        case 'sonorantplus':
            array = arraysonorantplus;
            break;
        case 'sonorantminus':
            array = arraysonorantminus;
            break;
        case 'sgplus':
            array = arraysgplus;
            break;
        case 'sgminus':
            array = arraysgminus;
            break;
        case 'stridentplus':
            array = arraystridentplus;
            break;
        case 'stridentminus':
            array = arraystridentminus;
            break;
        case 'syllabicplus':
            array = arraysyllabicplus;
            break;
        case 'syllabicminus':
            array = arraysyllabicminus;
            break;
        case 'tenseplus':
            array = arraytenseplus;
            break;
        case 'tenseminus':
            array = arraytenseminus;
            break;
        case 'voiceplus':
            array = arrayvoiceplus;
            break;
        case 'voiceminus':
            array = arrayvoiceminus;
            break;
    }

    // > -1 means "IPA" is in "array"
    return array.indexOf(letter) > -1;
}
