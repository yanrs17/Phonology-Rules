/* Prototypes */

String.prototype.replaceAt = function(index, character) {

    /* Replace At */
    /* e.g. "abcde".replaceAt(1, z) returns "azcde"*/
    return this.substr(0, index) + character + this.substr(index+character.length);
}

String.prototype.replaceAll = function(search, replacement) {

    /* Replace All */
    var target = this;
    return target.split(search).join(replacement);
};

if (typeof(String.prototype.trim) === "undefined"){
    String.prototype.trim = function() {
        /* Trim */
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

function arraysEqual(arr1, arr2) {

    /* Check if 2 arrays are equal */
    if (arr1.length != arr2.length)
        return false;
    for (var i = arr1.length; i--;)
        if (arr1[i] != arr2[i])
            return false;
    return true;
}
