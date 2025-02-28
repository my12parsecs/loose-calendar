


export const EditorTryObject = {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "This is an editable tutorial. Don't worry if you erase stuff, refreshing the page would show the original again."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Also, there is a cheat sheet on the top right corner you can click open."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Timestamps"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "The most useful feature is making "
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "bold"
              }
            ],
            "text": "timestamps"
          },
          {
            "type": "text",
            "text": ". Entering numbers following an @ sign, and pressing space after will convert it to a timestamp."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@3-5"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@3:00~5:00"
            }
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "As you can see, connect numbers with \"-\"."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "If you have a period in between numbers, it will convert it to hours and minutes."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@7.3-14.25"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@7:30~14:25"
            }
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "The neat thing is that single digit minutes will be multiplied by 10, so 7.3 becomes 7:30. If you want 7:03, type 7.03."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "For typing full hours and minutes, four digits - four digits will simply convert it as so. No need for a period here."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@1230-1435"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@12:30~14:35"
            }
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "All of these work with start/end time only as well. For example,"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@3-"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@3:00~"
            }
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@-7.3"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@~7:30"
            }
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@1230-"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@12:30~"
            }
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "There are a few "
          },
          {
            "type": "text",
            "marks": [
              {
                "type": "italic"
              }
            ],
            "text": "non-number"
          },
          {
            "type": "text",
            "text": " time stamps as well."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@all"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@AllDay"
            }
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@am"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@AM"
            }
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@pm"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@PM"
            }
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "@dl"
          },
          {
            "type": "timeRange",
            "attrs": {
              "timeRange": "@Deadline"
            }
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Links"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "You can write/paste URLs."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://google.com",
                  "target": "_blank",
                  "rel": "noopener noreferrer nofollow",
                  "class": null
                }
              }
            ],
            "text": "https://google.com"
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Other Stuff"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "These are some other stuff that you can do. If you know markdown syntax, it should be easy."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "##{space}Heading"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "###{space}Subheading"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "-{space}List"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "1.{space}Numbered List"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "---Line"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "*{text}* Italic"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "**{text}** Bold"
          }
        ]
      },
      {
        "type": "paragraph"
      }
    ]
  }