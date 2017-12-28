var BibleJson = require('./ukraine.json');
var BibleAbbreviationMap = require('./BibleAbbreviationMap');
var ChaptersMap = new Map();
var VersesMap = new Map();
var BibleMap = new Map();
var lastBookID = '1';
var lastChapterID = '1';
var bookID = '';

var _BibleMap = function () {
    var nextFirstVerse;
    BibleJson.forEach((row, i) => {
        if(lastBookID !== row.book || BibleJson.length == (i + 1)) {
            bookID = BibleAbbreviationMap.get(lastBookID)[1];

            if(lastChapterID == row.chapter) {
                ChaptersMap.get('1').set(nextFirstVerse.verse, nextFirstVerse.text);
                BibleMap.set(bookID, ChaptersMap);
            } else {
                if(bookID == 'Иона' || bookID == 'Откровение'){
                    ChaptersMap.get('1').set(nextFirstVerse.verse, nextFirstVerse.text);
                    BibleMap.set(bookID, ChaptersMap);
                }

                BibleMap.set(bookID, ChaptersMap);
            }

            nextFirstVerse = {
                verse: row.verse,
                text: row.text
            };

            VersesMap = new Map();
            ChaptersMap = new Map();
            lastBookID = row.book;
        } else {
            if(lastChapterID !== row.chapter) {
                VersesMap = new Map();
                
                if(nextFirstVerse) {
                    VersesMap.set(nextFirstVerse.verse, nextFirstVerse.text);
                }

                VersesMap.set(row.verse, row.text);
                lastChapterID = row.chapter;
            } else {
                VersesMap.set(row.verse, row.text);
                ChaptersMap.set(row.chapter, VersesMap);
            }
        }
    });

    return BibleMap;
};

module.exports = _BibleMap();


