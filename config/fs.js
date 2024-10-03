const _LOCAL_FILES = {
  "time_machine": "boom! you’ve finally hacked the site!",
};

const _FILES = {
  ..._LOCAL_FILES,
}

const _DIRS = {
  "~": ["time_machine"],
  "bin": ["zsh"],
  "home": ["hack_future"],
  "/": ["bin", "home"],
};

let _FULL_PATHS = {};
for (const [key, values] of Object.entries(_DIRS)) {
  for (const value of values) {
    switch (key) {
      case "~":
        _FULL_PATHS[value] = `${key}/${value}`;
        break;
      case "/":
        _FULL_PATHS[value] = `/${value}`;
        break;
      default:
        _FULL_PATHS[value] = `/${key}/${value}`;
    }
  }
}

function _insertFileToDOM(name, txt) {
  const parentDiv = document.getElementById("files-all");
  div = document.createElement("div");
  div.id = name;
  div.innerText = txt;
  parentDiv.appendChild(div);
}

function getFileContents(filename) {
  console.log(filename);
  return _LOCAL_FILES[filename];
}
