/* Prototypes */
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
if (typeof(String.prototype.trim) === "undefined"){
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}
function arraysEqual(arr1, arr2) {
    if (arr1.length != arr2.length)
        return false;
    for (var i = arr1.length; i--;)
        if(arr1[i] != arr2[i])
            return false;
    return true;
}

/* Test Cases */
function testCases() {
    function testCorrect(A, B, C, D, before, after) {
        if (applyRule(A, B, C, D, before) != after)
            console.log(
                "A: ", A,
                "\nB: ", B,
                "\nC: ", C,
                "\nD: ", D,
                "\nBefore: ", before,
                "\nExpected: ", after,
                "\nActual: ", applyRule(A, B, C, D, before)
            );
    }
    function testIllFormed(A, B, C, D, TF) {
        if (isIllFormed(A, B, C, D) != TF) console.log("Something is wrong!");
    }
    function testChangeFeature(before, features, after) {
        if (changeFeature(before, features) != after)
            console.log(
                "Before: ", before,
                "\nFeatures: ", features,
                "\nExpected: ", after,
                "\nActual: ", changeFeature(before, features)
            );
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

    // testChangeFeature
    testChangeFeature("t", ["+continuant"], "θ");
    testChangeFeature("t", ["+voice"], "d");
    testChangeFeature("θ", ["-continuant"], "t");
    testChangeFeature("d", ["-voice"], "t");
    testChangeFeature("t", ["+continuant", "+voice"], "ð");
    // TODO: Add cases here

    console.log("Test cases end.")
}

function has(letter, feature) {

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

database_IPA = [["Name", "t", "d", "s", "z", "ɬ", "ɮ", "θ", "ð", "ʃ", "ʒ", "c", "ɟ", "ç", "ʝ", "p", "b", "f", "v", "ɸ", "β", "k", "ɡ", "x", "ɣ", "q", "ɢ", "χ", "ʁ", "ħ", "ʕ", "h", "ɦ", "ʔ", "t͡ʃ", "d͡ʒ", "ts", "dz", "kx", "pf", "m", "n", "ŋ", "ɳ", "ɲ", "ɴ", "l", "ʎ", "r", "ɹ", "ʀ", "j", "w", "ɥ", "ɰ", "i", "y", "ɪ", "ʏ", "ɨ", "ʉ", "ɯ", "u", "ʊ", "e", "ø", "ɘ", "ɵ", "ɤ", "o", "ə", "ɛ", "œ", "ɜ", "ɞ", "ʌ", "ɔ", "æ", "ɐ", "a", "ɶ", "ɑ", "ɒ"],
["ATR", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "-", "-", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "+", "+", "-", "-", "-", "+", "-", "+", "+", "+", "+", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "+", "-", "-", "-", "-", " ", " "],
["Anterior", "+", "+", "+", "+", "+", "+", "+", "+", "-", "-", "-", "-", "-", "-", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "-", "-", "+", "+", "0", "0", "0", "+", "0", "-", "0", "0", "+", "0", "+", "+", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
["Back", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "-", "-", "-", "-", "0", "0", "0", "0", "0", "0", "+", "+", "+", "+", "+", "+", "+", "+", "0", "0", "0", "0", "0", "-", "-", "0", "0", "+", "0", "0", "0", "+", "-", "-", "+", "0", "-", "0", "0", "+", "-", "+", "-", "+", "-", "-", "-", "-", "-", "-", "+", "+", "+", "-", "-", "-", "-", "+", "+", "+", "-", "-", "-", "-", "+", "+", "-", "-", "-", "-", "+", "+"],
["Consonantal", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "-", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
["Constricted Glottis (CG)", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
["Continuant", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "-", "-", "+", "+", "-", "-", "+", "+", "+", "+", "-", "-", "+", "+", "-", "-", "+", "+", "+", "+", "+", "+", "-", "+-", "+-", "+-", "+-", "+-", "+-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+"],
["Coronal", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "-", "-", "-", "+", "-", "+", "-", "-", "+", "-", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
["Delayed Release", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
["Distributed", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "+", "+", "-", "-", "0", "0", "0", "-", "0", "-", "0", "0", "-", "0", "-", "-", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
["Dorsal", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "-", "-", "-", "-", "-", "+", "+", "-", "-", "+", "-", "-", "-", "+", "+", "+", "+", "-", "+", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+"],
["High", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "+", "+", "+", "+", "0", "0", "0", "0", "0", "0", "+", "+", "+", "+", "-", "-", "-", "-", "0", "0", "0", "0", "0", "+", "+", "0", "0", "+", "0", "0", "0", "+", "-", "+", "-", "0", "+", "0", "0", "-", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
["Labial", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+"],
["Lateral", "-", "-", "-", "-", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
["Low", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "-", "-", "-", "-", "0", "0", "0", "0", "0", "0", "-", "-", "-", "-", "-", "-", "-", "-", "0", "0", "0", "0", "0", "-", "-", "0", "0", "-", "0", "0", "0", "-", "-", "-", "-", "0", "-", "0", "0", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+"],
["Nasal", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
["Pharyngeal", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+"],
["Round", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "-", "-", "-", "-", "-", "-", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "-", "-", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "-", "+", "+", "-", "-", "+", "-", "+", "-", "+", "+", "+", "+", "-", "+", "-", "+", "-", "+", "+", "-", "-", "-", "+", "-", "+", "-", "-", "-", "+", "-", "+"],
["Sonorant", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+"],
["Spread Glottis (SG)", "-", "-", "-", "-", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
["Strident", "-", "-", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "-", "+", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
["Syllabic", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+"],
["Tense", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "-", "-", "-", "-", "0", "0", "0", "0", "0", "0", "-", "-", "-", "-", "-", "-", "-", "-", "0", "0", "0", "0", "0", "-", "-", "0", "0", "-", "0", "0", "0", "-", "-", "-", "-", "0", "-", "0", "0", "-", "-", "-", "-", "-", "+", "+", "-", "-", "+", "+", "+", "+", "-", "+", "+", "-", "+", "+", "+", "-", "-", "-", "-", "-", "-", "-", "+", "+", "-", "+", "-", "-"],
["Voice", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "+", "-", "-", "-", "+", "-", "-", "+", "-", "+", "-", "-", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+", "+"]];

// Haven't checked yet
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

jQuery("#btnSeparate").on('click', function() {
    if (!separated) separated = true;
    else separated = false;
});

jQuery("#i").on('click', function() {
    appendIPA("i");
});

jQuery("#y").on('click', function() {
    appendIPA("y");
});

jQuery("#ɨ").on('click', function() {
    appendIPA("ɨ");
});

jQuery("#ʉ").on('click', function() {
    appendIPA("ʉ");
});

jQuery("#ɯ").on('click', function() {
    var txtToAdd = "ɯ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#u").on('click', function() {
    var txtToAdd = "u";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});


jQuery("#ɪ").on('click', function() {
    var txtToAdd = "ɪ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʏ").on('click', function() {
    var txtToAdd = "ʏ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʊ").on('click', function() {
    var txtToAdd = "ʊ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#e").on('click', function() {
    var txtToAdd = "e";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ø").on('click', function() {
    var txtToAdd = "ø";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɘ").on('click', function() {
    var txtToAdd = "ɘ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɵ").on('click', function() {
    var txtToAdd = "ɵ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɤ").on('click', function() {
    var txtToAdd = "ɤ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#o").on('click', function() {
    var txtToAdd = "o";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ə").on('click', function() {
    var txtToAdd = "ə";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɛ").on('click', function() {
    var txtToAdd = "ɛ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#œ").on('click', function() {
    var txtToAdd = "œ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɜ").on('click', function() {
    var txtToAdd = "ɜ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɞ").on('click', function() {
    var txtToAdd = "ɞ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});


jQuery("#ʌ").on('click', function() {
    var txtToAdd = "ʌ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɔ").on('click', function() {
    var txtToAdd = "ɔ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#æ").on('click', function() {
    var txtToAdd = "æ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɐ").on('click', function() {
    var txtToAdd = "ɐ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#a").on('click', function() {
    var txtToAdd = "a";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɶ").on('click', function() {
    var txtToAdd = "ɶ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɑ").on('click', function() {
    var txtToAdd = "ɑ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɒ").on('click', function() {
    var txtToAdd = "ɒ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#p").on('click', function() {
    var txtToAdd = "p";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#b").on('click', function() {
    var txtToAdd = "b";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#t").on('click', function() {
    var txtToAdd = "t";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#d").on('click', function() {
    var txtToAdd = "d";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#c").on('click', function() {
    var txtToAdd = "c";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#k").on('click', function() {
    var txtToAdd = "k";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});


jQuery("#g").on('click', function() {
    var txtToAdd = "g";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#q").on('click', function() {
    var txtToAdd = "q";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#m").on('click', function() {
    var txtToAdd = "m";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#n").on('click', function() {
    var txtToAdd = "n";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#r").on('click', function() {
    var txtToAdd = "r";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#f").on('click', function() {
    var txtToAdd = "f";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#v").on('click', function() {
    var txtToAdd = "v";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#s").on('click', function() {
    var txtToAdd = "s";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#z").on('click', function() {
    var txtToAdd = "z";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#x").on('click', function() {
    var txtToAdd = "x";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#h").on('click', function() {
    var txtToAdd = "h";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#l").on('click', function() {
    var txtToAdd = "l";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʈ").on('click', function() {
    var txtToAdd = "ʈ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɖ").on('click', function() {
    var txtToAdd = "ɖ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});


jQuery("#ɟ").on('click', function() {
    var txtToAdd = "ɟ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɢ").on('click', function() {
    var txtToAdd = "ɢ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʔ").on('click', function() {
    var txtToAdd = "ʔ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɱ").on('click', function() {
    var txtToAdd = "ɱ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɳ").on('click', function() {
    var txtToAdd = "ɳ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɲ").on('click', function() {
    var txtToAdd = "ɲ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ŋ").on('click', function() {
    var txtToAdd = "ŋ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɴ").on('click', function() {
    var txtToAdd = "ɴ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʙ").on('click', function() {
    var txtToAdd = "ʙ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#β").on('click', function() {
    var txtToAdd = "β";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});


jQuery("#ʀ").on('click', function() {
    var txtToAdd = "ʀ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ⱱ").on('click', function() {
    var txtToAdd = "ⱱ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɾ").on('click', function() {
    var txtToAdd = "ɾ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɽ").on('click', function() {
    var txtToAdd = "ɽ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɸ").on('click', function() {
    var txtToAdd = "ɸ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#θ").on('click', function() {
    var txtToAdd = "θ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ð").on('click', function() {
    var txtToAdd = "ð";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʃ").on('click', function() {
    var txtToAdd = "ʃ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʒ").on('click', function() {
    var txtToAdd = "ʒ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʂ").on('click', function() {
    var txtToAdd = "ʂ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʐ").on('click', function() {
    var txtToAdd = "ʐ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ç").on('click', function() {
    var txtToAdd = "ç";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʝ").on('click', function() {
    var txtToAdd = "ʝ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɣ").on('click', function() {
    var txtToAdd = "ɣ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#χ").on('click', function() {
    var txtToAdd = "χ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʁ").on('click', function() {
    var txtToAdd = "ʁ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ħ").on('click', function() {
    var txtToAdd = "ħ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʕ").on('click', function() {
    var txtToAdd = "ʕ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɦ").on('click', function() {
    var txtToAdd = "ɦ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɬ").on('click', function() {
    var txtToAdd = "ɬ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɮ").on('click', function() {
    var txtToAdd = "ɮ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʋ").on('click', function() {
    var txtToAdd = "ʋ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɹ").on('click', function() {
    var txtToAdd = "ɹ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɻ").on('click', function() {
    var txtToAdd = "ɻ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#j").on('click', function() {
    var txtToAdd = "j";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɰ").on('click', function() {
    var txtToAdd = "ɰ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ɭ").on('click', function() {
    var txtToAdd = "ɭ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#ʟ").on('click', function() {
    var txtToAdd = "ʟ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#btnStress").on('click', function() {
    var txtToAdd = '"';
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#btnAspiration").on('click', function() {
    var txtToAdd = "ʰ";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#btnNumberSign").on('click', function() {
    var txtToAdd = "#";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#btnEmpty").on('click', function() {
    var txtToAdd = "&nbsp;";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#btnNone").on('click', function() {
    var txtToAdd = "∅";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#btnConsonant").on('click', function() {
    var txtToAdd = "C"; // Might get confused with same C?
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#btnVowel").on('click', function() {
    var txtToAdd = "V";
    var original_value = $("#id_tag").attr("value");
	if (original_value == null) original_value = "";
	$("#id_tag").attr("value", original_value + txtToAdd);
	$("#id_tag").html(original_value + txtToAdd);
});

jQuery("#btnATR").on('click', function() {
    appendFeature("ATR");
});

jQuery("#btnAnterior").on('click', function() {
    appendFeature("Anterior");
});

jQuery("#btnBack").on('click', function() {
    appendFeature("Back");
});

jQuery("#btnConsonantal").on('click', function() {
    appendFeature("Consonantal");
});

jQuery("#btnConstrictedGlottis").on('click', function() {
    appendFeature("ConstrictedGlottis");
});

jQuery("#btnContinuant").on('click', function() {
    appendFeature("Continuant");
});

jQuery("#btnCoronal").on('click', function() {
    appendFeature("Coronal");
});

jQuery("#btnDelayedRelease").on('click', function() {
    appendFeature("DelayedRelease");
});

jQuery("#btnDistributed").on('click', function() {
    appendFeature("Distributed");
});

jQuery("#btnDorsal").on('click', function() {
    appendFeature("Dorsal");
});

jQuery("#btnHigh").on('click', function() {
    appendFeature("High");
});

jQuery("#btnLabial").on('click', function() {
    appendFeature("Labial");
});

jQuery("#btnLateral").on('click', function() {
    appendFeature("Lateral");
});

jQuery("#btnLow").on('click', function() {
    appendFeature("Low");
});

jQuery("#btnNasal").on('click', function() {
    appendFeature("Nasal");
});

jQuery("#btnPharyngeal").on('click', function() {
    appendFeature("Pharyngeal");
});

jQuery("#btnRound").on('click', function() {
    appendFeature("Round");
});

jQuery("#btnSonorant").on('click', function() {
    appendFeature("Sonorant");
});

jQuery("#btnSpreadGlottis").on('click', function() {
    appendFeature("SpreadGlottis");
});

jQuery("#btnStrident").on('click', function() {
    appendFeature("Strident");
});

jQuery("#btnSyllabic").on('click', function() {
    appendFeature("Syllabic");
});

jQuery("#btnTense").on('click', function() {
    appendFeature("Tense");
});

jQuery("#btnVoice").on('click', function() {
    appendFeature("Voice");
});
