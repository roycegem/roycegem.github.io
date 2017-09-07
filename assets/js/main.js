var calculator = (function() {

    var allcalculators = {
        "ENGLISH_GEMATRIA": {
            "A": 1,
            "B": 2,
            "C": 3,
            "D": 4,
            "E": 5,
            "F": 6,
            "G": 7,
            "H": 6,
            "I": 5,
            "J": 4,
            "K": 3,
            "L": 2,
            "M": 1,
            "N": 1,
            "O": 2,
            "P": 3,
            "Q": 4,
            "R": 5,
            "S": 6,
            "T": 7,
            "U": 6,
            "V": 5,
            "W": 4,
            "X": 3,
            "Y": 2,
            "Z": 1
        }

    };

    var getGematriaVal = function(word, dictionary) {
        if (!word)
            return;
        var json = allcalculators[dictionary];
        var chars = word.toUpperCase().split('');
        var numbers = chars.map(function(character) {
            return json[character] || 0;
        });
        
        return numbers.reduce(function(sum, value) {
            return sum + value;
        }, 0);
    
    };

    var getGematriaObject = function(paragraph, dictionary) {
        paragraph = $.trim(paragraph);
        var gemObject = {};
        gemObject.stringVals = [];
        var strings = (paragraph) ? paragraph.split(" ") : "";
        var sum = 0;
        $.each(strings, function(index, string) {
            var currGemVal = calculator.getGematriaVal(string, dictionary);
            var stringObj = { string: string, value: currGemVal };
            gemObject.stringVals.push(stringObj);
            sum += currGemVal;
        });
        gemObject.total = sum;
        return gemObject;

    };

    return {

        getGematriaVal: getGematriaVal,

        getGematriaObject: getGematriaObject
    };

})();

$(document).ready(function() {

    $("input#words").on('keyup', function() {
        var gematriaObj = calculator.getGematriaObject($(this).val(), "ENGLISH_GEMATRIA");
        $("div#output").empty();
        //$("div#sum").empty();
        $.each(gematriaObj.stringVals, function(index, stringObj) {
            $currentBadge = $("<li role='presentation' class='active'><a href='#'>" + stringObj.string + "<span class='badge'>" + stringObj.value + "</span></a></li>");
            $("#wordlist").add($currentBadge);
        });
        var $totalSpan = $("<span id='totalSpan'></span>");
        $("div#sum").append($totalSpan);
        //$("span#totalSpan").text("Read the Bible!");

    });

});