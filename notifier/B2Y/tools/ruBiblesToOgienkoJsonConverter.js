const ru = require('../../../jsonBible/ru.json');
let ogienko = {};

ru[2].data.map((row) => {if(row.ver === '2') {
    let book = ogienko[row.book] ? {...ogienko[row.book]} : [row.book];
    let chapter = ogienko[row.book] ? ogienko[row.book][row.chapter] ? {...ogienko[row.book][row.chapter]} : [row.chapter] : [row.chapter];

    ogienko[row.book] = {
        ...book,
        [row.chapter]: {
            ...chapter,
            [row.verse]: row.text
        }
    };

} });

    console.log(JSON.stringify(ogienko));
