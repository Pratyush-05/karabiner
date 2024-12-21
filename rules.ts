import fs from "fs";
import { KarabinerRules } from "./types";
import { app, createHyperSubLayers, open, rectangle } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //   {
      //     type: "basic",
      //     description: "Disable CMD + Tab to force Hyper Key usage",
      //     from: {
      //       key_code: "tab",
      //       modifiers: {
      //         mandatory: ["left_command"],
      //       },
      //     },
      //     to: [
      //       {
      //         key_code: "tab",
      //       },
      //     ],
      //   },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open(
      "raycast://extensions/stellate/mxstbr-commands/create-notion-todo"
    ),
    // b = "B"rowse
    b: {
      t: open("https://twitter.com"),
      r: open("https://reddit.com"),
      g: open("https://maps.google.com/maps"),
      l: open("https://linkedin.com"),
      o: open(
        "https://docs.google.com/spreadsheets/d/1gMXdxxK_eYl-ybl16Vg3euAdQz_jKqfI-iMLOgXo_Kg/edit?pli=1&gid=908160810#gid=908160810"
      ),
      p: open(
        "https://docs.google.com/spreadsheets/d/1KtKigalWTAk6HKon0aKDogO_l8uySfSE2WeHfpFLdMw/edit?gid=0#gid=0"
      ),
      y: open("https://www.youtube.com/"),
      a: open("https://mail.google.com/mail/u/0"), //profiesta98
      s: open("https://mail.google.com/mail/u/1"), //purohit.pratyush05@gmail.com
      d: open("https://mail.google.com/mail/u/2"), //we.theoddball@gmail.com
      f: open("https://mail.google.com/mail/u/3"), //profiesta9801@gmail.com
    },
    // o = "Open" applications
    o: {
      b: app("Brave Browser"),
      v: app("Visual Studio Code"),
      g: app("Claude"),
      r: app("Reminders"),
      n: app("Notes"),
      t: app("Warp"),
      w: app("WhatsApp"),
      f: app("finder"),
      p: app("iPhone Mirroring"),
      m: app("Youtube Music"),
      c: {
        description: "Create a Calendar Event",
        to: [
          {
            key_code: "4",
            modifiers: ["option", "command"],
          },
        ],
      },
      a: {
        description: "Open Reminders Menubar",
        to: [
          {
            key_code: "r",
            modifiers: ["option", "command"],
          },
        ],
      },
      y: {
        description: "Open Today App in Menubar",
        to: [
          {
            key_code: "3",
            modifiers: ["option", "command"],
          },
        ],
      },
      d: {
        description: "Open Dato Window",
        to: [
          {
            key_code: "l",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
    },

    // TODO: This doesn't quite work yet.
    // l = "Layouts" via Raycast's custom window management
    // l: {
    //   // Coding layout
    //   c: shell`
    //     open -a "Visual Studio Code.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

    //     open -a "Terminal.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
    //   `,
    // },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      u: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      // "D"o not disturb toggle
      d: open(
        `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
      ),
      // "T"heme
      c: open("raycast://extensions/raycast/system/open-camera"),
      // Toggle the big clock
      t: {
        to: [
          {
            key_code: "0",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    h: {
      to: [{ key_code: "left_arrow" }],
    },
    j: {
      to: [{ key_code: "down_arrow" }],
    },
    k: {
      to: [{ key_code: "up_arrow" }],
    },
    l: {
      to: [{ key_code: "right_arrow" }],
    },
    f: {
      // Magicmove via homerow.app
      to: [{ key_code: "1", modifiers: ["option", "command"] }],
      // TODO: Trigger Vim Easymotion when VSCode is focused
    },
    // Scroll mode via homerow.app
    g: {
      to: [{ key_code: "2", modifiers: ["option", "command"] }],
    },
    // activate whisprflow
    v: {
      to: [{ key_code: "fn" }],
    },
    d: {
      to: [{ key_code: "page_down" }],
    },
    u: {
      to: [{ key_code: "page_up" }],
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      c: open("raycast://extensions/thomas/color-picker/pick-color"),
      n: open("raycast://extensions/raycast/raycast-notes/raycast-notes"),
      l: open(
        "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
      ),
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      i: {
        to: [{ key_code: "d", modifiers: ["shift", "option", "control"] }],
      },
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),
    },
    m: {},
  }),
  {
    description: "Change Backspace to Spacebar when Minecraft is focused",
    manipulators: [
      {
        type: "basic",
        from: {
          key_code: "delete_or_backspace",
        },
        to: [
          {
            key_code: "spacebar",
          },
        ],
        conditions: [
          {
            type: "frontmost_application_if",
            file_paths: [
              "^/Users/mxstbr/Library/Application Support/minecraft/runtime/java-runtime-gamma/mac-os-arm64/java-runtime-gamma/jre.bundle/Contents/Home/bin/java$",
            ],
          },
        ],
      },
    ],
  },
  // Additional rule for custom deletion and navigation mappings
  {
    description:
      "Custom Ctrl and Cmd Keybindings for Word and Line Deletion/Navigation",
    manipulators: [
      // Cmd + Backspace for word deletion
      {
        type: "basic",
        from: {
          key_code: "delete_or_backspace",
          modifiers: {
            mandatory: ["command"],
          },
        },
        to: [
          {
            key_code: "delete_or_backspace",
            modifiers: ["option"],
          },
        ],
      },
      // Cmd + Arrow for word navigation
      {
        type: "basic",
        from: {
          key_code: "left_arrow",
          modifiers: {
            mandatory: ["command"],
          },
        },
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["option"],
          },
        ],
      },
      {
        type: "basic",
        from: {
          key_code: "right_arrow",
          modifiers: {
            mandatory: ["command"],
          },
        },
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["option"],
          },
        ],
      },
      // Option + Backspace for deleting the entire line
      {
        type: "basic",
        from: {
          key_code: "delete_or_backspace",
          modifiers: {
            mandatory: ["option"],
          },
        },
        to: [
          {
            key_code: "delete_or_backspace",
            modifiers: ["command"],
          },
        ],
      },
      // Option + Arrow for moving to the beginning/end of the line
      {
        type: "basic",
        from: {
          key_code: "left_arrow",
          modifiers: {
            mandatory: ["option"],
          },
        },
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["command"],
          },
        ],
      },
      {
        type: "basic",
        from: {
          key_code: "right_arrow",
          modifiers: {
            mandatory: ["option"],
          },
        },
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["command"],
          },
        ],
      },
    ],
  },
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
          devices: [
            {
                "identifiers": {
                    "is_keyboard": true,
                    "product_id": 35111,
                    "vendor_id": 10874
                },
                "simple_modifications": [
                    {
                        "from": { "key_code": "left_option" },
                        "to": [{ "key_code": "left_command" }]
                    },
                    {
                        "from": { "key_code": "left_command" },
                        "to": [{ "key_code": "left_option" }]
                    }
                ]
            }
         ],
        },
        
      ],
    },
    null,
    2
  )
);
