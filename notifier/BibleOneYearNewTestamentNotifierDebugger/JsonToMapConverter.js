var BibleJson = require('./synodal.json');
var BibleAbbreviationMap = require('./BibleAbbreviationMap');
var ChaptersMap = new Map();
var VersesMap = new Map();
var BibleMap = new Map();
var lastBook = '1';
var lastChapter = '1';
var bookID = '';

var _BibleMap = function () {
    BibleJson.forEach((row, i) => {
        VersesMap.set(row.verse, row.text);

        if(lastChapter != row.chapter) {
            ChaptersMap.set(lastChapter, VersesMap);
            VersesMap = new Map();
            lastChapter = row.chapter;
        }
        if(lastBook != row.book) {
            if(ChaptersMap.size == 0) {
                ChaptersMap.set(lastChapter, VersesMap);
                VersesMap = new Map();
            }
            bookID = BibleAbbreviationMap.get(lastBook);
            BibleMap.set(bookID[1], ChaptersMap);
            ChaptersMap = new Map();
            lastBook = row.book;
        }
        if(++i == BibleJson.length) {
            bookID = BibleAbbreviationMap.get(lastBook);
            BibleMap.set(bookID[1], ChaptersMap);
        }
    });

    return BibleMap;
};

module.exports = _BibleMap();