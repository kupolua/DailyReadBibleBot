# DailyReadBibleBot

Daily read Bible plan structure:

```
{
    "planShortName": {
        "currentDayNumber": [
            {
                "BibleBookName": [
                    "chapterNumber",
                    {
                        "chapterNumber": [
                            "verseNumber"
                        ]
                    }
                ]
            }
        ]
    }
}
```

Example:

```
{
    "chronology": {
        "200": [
            {
                "4Цар.": [
                    [
                        {
                            "18": [
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8"
                            ]
                        }
                    ]
                ]
            },
            {
                "2Пар.": [
                    [
                        "29",
                        "30",
                        "31"
                    ]
                ]
            },
            {
                "Пс.": [
                    [
                        "47"
                    ]
                ]
            }
        ]    
    }
}
```

