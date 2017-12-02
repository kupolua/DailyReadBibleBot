var BibleAbbreviation = function () {
  var BibleAbbreviationJSON = { "1": "Быт.",
        "2": "Исх.",
        "3": "Лев.",
        "4": "Чис.",
        "5": "Втор.",
        "6": "Нав.",
        "7": "Суд.",
        "8": "Руф.",
        "9": "1Цар.",
        "10": "2Цар.",
        "11": "3Цар.",
        "12": "4Цар.",
        "13": "1Пар.",
        "14": "2Пар.",
        "15": "Езд.",
        "16": "Неем.",
        "17": "Есф.",
        "18": "Иов.",
        "19": "Пс.",
        "20": "Прит.",
        "21": "Еккл.",
        "22": "Песн.",
        "23": "Ис.",
        "24": "Иер.",
        "25": "Плач.",
        "26": "Иез.",
        "27": "Дан.",
        "28": "Ос.",
        "29": "Иоил.",
        "30": "Ам.",
        "31": "Авд.",
        "32": "Ион.",
        "33": "Мих.",
        "34": "Наум.",
        "35": "Авв.",
        "36": "Соф.",
        "37": "Агг.",
        "38": "Зах.",
        "39": "Мал.",
        "40": "Мф.",
        "41": "Мк.",
        "42": "Лк.",
        "43": "Ин.",
        "44": "Деян.",
        "45": "Рим.",
        "46": "1Кор.",
        "47": "2Кор.",
        "48": "Гал.",
        "49": "Еф.",
        "50": "Флп.",
        "51": "Кол.",
        "52": "1Фес.",
        "53": "2Фес.",
        "54": "1Тим.",
        "55": "2Тим.",
        "56": "Тит.",
        "57": "Флм.",
        "58": "Евр.",
        "59": "Иак.",
        "60": "1Пет.",
        "61": "2Пет.",
        "62": "1Ин.",
        "63": "2Ин.",
        "64": "3Ин.",
        "65": "Иуд.",
        "66": "Отк." };
  var BibleAbbreviationMap = new Map;

  for(var bookID in BibleAbbreviationJSON) {
    BibleAbbreviationMap.set(bookID, BibleAbbreviationJSON[bookID])
  }
  
  return BibleAbbreviationMap;
};

module.exports = BibleAbbreviation();

