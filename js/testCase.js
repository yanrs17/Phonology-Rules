/* Test Cases */
function testCases() {

    function testCorrect(A, B, C, D, before, after) {
        total ++;
        if (applyRule(A, B, C, D, before) != after) {
            console.log(
                "A: ", A,
                "\nB: ", B,
                "\nC: ", C,
                "\nD: ", D,
                "\nBefore: ", before,
                "\nExpected: ", after,
                "\nActual: ", applyRule(A, B, C, D, before)
            );
            wrong ++;
        }
    }
    function testIllFormed(A, B, C, D, TF) {
        total ++;
        if (isIllFormed(A, B, C, D) != TF) {
            console.log("A: ", A,
                    "B: ", B,
                    "C: ", C,
                    "D: ", D,
                    "Expected: ", TF,
                    "Actual: ", isIllFormed(A, B, C, D));
            wrong ++;
        }
    }
    function testChangeFeature(before, features, after) {
        total ++;
        if (changeFeature(before, features) != after) {
            console.log(
                "Before: ", before,
                "\nFeatures: ", features,
                "\nExpected: ", after,
                "\nActual: ", changeFeature(before, features)
            );
            wrong ++;
        }
    }

    var total = 0;
    var wrong = 0;
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

    // Test Features
    // Change
    testCorrect('[-sonorant]', '[-voice]', ' ', '#', 'pakad', 'pakat');
    testCorrect('[-sonorant]', '[-voice]', '', '#', 'pakad', 'pakat');
    testCorrect('[-sonorant]', '[-voice]', ' ', '#', 'pagz', 'pags');
    testCorrect('[-sonorant]', '[-voice]', ' ', '#', 'pakar', 'pakar');
    testCorrect('[-sonorant]', '[-voice]', ' ', '#', 'asp', 'asp');
    testCorrect('[-sonorant]', '[-voice]', '#', ' ', 'dd', 'td');
    testCorrect('[-sonorant]', '[-voice]', '#', '', 'dd', 'td');

    testCorrect('[+continuant]', '[+voice]', 'V', 'V', 'asata', 'azata');
    testCorrect('[+continuant]', '[+voice]', 'V', 'V', 'axasa', 'aɣaza');
    testCorrect('[+continuant]', '[+voice]', 'V', 'V', 'iʃaθi', 'iʒaði');
    testCorrect('[+continuant]', '[+voice]', 'V', 'V', 'syrota', 'syrota');

    // Split
    testCorrect('k', 'tu', '#', 'C', 'kta', 'tuta');
    testCorrect('k', 'tu', '#', 'C', 'kaokta', 'kaokta');
    testCorrect('k', 'tu', '#', 'C', 'klara', 'tulara');
    testCorrect('k', 'tu', '#', 'C', 'kpart', 'tupart');

    // Fusion
    testCorrect('CV', 'ə', 'C', 'C', 'slap', 'səp');
    testCorrect('CV', 'ə', 'C', 'C', 'selypa', 'selypa');
    testCorrect('CV', 'ə', 'C', 'C', 'selypam', 'selypam');
    testCorrect('CV', 'ə', 'C', 'C', 'selytpam', 'selytəm');

    // Deletion
    testCorrect('[+round +syllabic]', '∅', ' ', '[+labial -sonorant]', 'tupr', 'tpr');
    // testCorrect('[+round +syllabic]', '', ' ', '[+labial -sonorant]', 'tupr', 'tpr');
    // testCorrect('[+round +syllabic]', ' ', ' ', '[+labial -sonorant]', 'tupr', 'tpr');
    // testCorrect('[+round +syllabic]', '∅', ' ', '[+labial -sonorant]', 'obra', 'bra');
    // testCorrect('[+round +syllabic]', '∅', ' ', '[+labial -sonorant]', 'tyma', 'tyma');
    // testCorrect('[+round +syllabic]', '∅', ' ', '[+labial -sonorant]', 'ipta', 'ipta');

    // Insertion
    // testCorrect('∅', 'ʔ', '[+low]', '[+round]', 'paut', 'paʔut');
    // testCorrect(' ', 'ʔ', '[+low]', '[+round]', 'paut', 'paʔut');
    // testCorrect('', 'ʔ', '[+low]', '[+round]', 'paut', 'paʔut');
    // testCorrect('∅', 'ʔ', '[+low]', '[+round]', 'aopɒutaa', 'aʔopɒʔutaa');
    // testCorrect('∅', 'ʔ', '[+low]', '[+round]', 'tkɑɔpaet', 'tkɑʔɔpaet');
    // testCorrect('∅', 'ʔ', '[+low]', '[+round]', 'peoaayr', 'peoaaʔyr');
    // testCorrect('∅', 'ʔ', '[+low]', '[+round]', 'peoaɒyr', 'peoaʔɒʔyr');

    // console.log("Total Cases: ", total);
    console.log("Wrong Cases: ", wrong);
    // console.log("Percentage: ", Math.round(wrong * 10000 / total) / 100, "%");
    console.log("Test cases end.")
}
