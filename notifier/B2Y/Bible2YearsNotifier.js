const moment = require('moment');
const utf8 = require('utf8');
const request = require('request');
const CHAT_ID = '356584956'; //my personal chat with bot
// const CHAT_ID = '-1001160020446'; //https://t.me/ChurchRevival
// const CHAT_ID = '-1001295262074';
// const CHAT_ID = '-1001099154943'; //https://t.me/joinchat/DwQgSUGDxf_tgC4TcmdeNQ ІБЦ Група Церковної родини
// const CHANNEL_ID = '-1001160845615'; //https://t.me/NTyearUKR telegram channel
const requestURL = 'https://api.telegram.org/bot487404455:AAFhJLu40DnzAElC7zXfM1hHG1e-14VpsDM/sendMessage?chat_id=' + CHAT_ID + '&text=';
const B2YPlan = require('./B2YPlan.json');
const ogienko = require('./ogienko.json');

let readingPlan =  B2YPlan[2].days[0][(moment().dayOfYear() - 1)];
let chapters = readingPlan.chapter.split('-');
let chaptersRequestList = chapters.map((chapter) => {
        return Object.keys(ogienko[readingPlan.book][chapter]).reduce((chapterText, verse) => {
            if(verse === '0') {return}
            if(verse === '1') {chapterText = 'Розділ ' + chapter + '\n'}

            return chapterText += verse + ' ' +  ogienko[readingPlan.book][chapter][verse] + '\n';
        });
    });

let textMessage = utf8.encode(
        'Прочитай, подумай, помолись' + '\n' +
        moment().format("D/M/YYYY") + '\n\n' +
        readingPlan.title + '\n'
    );

request(requestURL + textMessage)
.on('response', function() {
    (function loop(i, chaptersRequestListLength, chaptersRequestList, requestURL) {
        if (i < chaptersRequestListLength) new Promise(resolve => {
            request(requestURL + utf8.encode(chaptersRequestList[i]));
            setTimeout(resolve, 3000);
        }).then(loop.bind(null, i+1, chaptersRequestListLength, chaptersRequestList, requestURL));
    })(0, chaptersRequestList.length, chaptersRequestList, requestURL);
});
