const about =
  "Hack to the Future is a community of teen innovators working on exciting projects. We collaborate to code, build, and create cool hardware and software. With a strong focus on open-source projects, we invite everyone to dive in, contribute, and learn together.";
  const about2 =
  "We also support your cool projects through microgrants, type %hackfund% for more details.";
  const about3 =
  "Type %join% to become a member of our community and connect with fellow innovators!";

  const timeUnit = 10; // useful for development, set to 10 to run faster, set to 1000 for production
let killed = false;

const club = "https://discord.gg/KYBBbEtR9h";

const commands = {
  help: function () {
    const maxCmdLength = Math.max(...Object.keys(help).map((x) => x.length));
    Object.entries(help).forEach(function (kv) {
      const cmd = kv[0];
      const desc = kv[1];
      if (term.cols >= 80) {
        const rightPad = maxCmdLength - cmd.length + 7;
        const sep = " ".repeat(rightPad);
        term.stylePrint(`${cmd}${sep}${desc}`);
      } else {
        if (cmd != "help") {
          // skip second leading newline
          term.writeln("");
        }
        term.stylePrint(cmd);
        term.stylePrint(desc);
      }
    });
  },

  social: function () {
    term.stylePrint("Connect with us online!\r\n");

    for (s of Object.values(social)) {
      term.stylePrint(`${s["name"]} - ${s["link"]}`);
    }
  },

  whois: function () {
    term.stylePrint(about);
    term.stylePrint("\r\n");
    term.stylePrint(about2);
    term.stylePrint("\r\n");
    term.stylePrint(about3);
  },

  hackfund: function () {
    term.stylePrint(
      "Hack Fund supports young innovators with microgrants of $100 to $1000 as non-dilutive capital to fuel your exciting projects."
    );
    term.stylePrint("\r\n");
    term.displayURL("https://hackersfund.netlify.app/");
  },

  email: function () {
    term.openURL("mailto:hack2tfuture@gmail.com");
  },

  twitter: function () {
    term.displayURL("https://twitter.com/_hackspace");
  },

  banner: function () {
    window.open("public/hacktothefuture.png");
  },

  github: function () {
    term.displayURL("https://github.com/hack2tfuture");
  },

  instagram: function () {
    term.displayURL("https://instagram.com/hack2tfuture");
  },

  youtube: function () {
    term.displayURL("https://www.youtube.com/@hack2tfuture");
  },

  discord: function () {
    term.openURL(club);
  },

  community: function () {
    term.openURL(club);
  },

  club: function () {
    term.openURL(club);
  },

  hackathon: function () {
    term.stylePrint("hackathons comming soon!");
  },

  locate: function () {
    term.stylePrint("Earth Dimension C-137");
    term.stylePrint("just kidding, we're on the internet, lol!");
  },

  secret: function () {
    term.stylePrint("you can learn anything!");
    term.openURL("https://youtu.be/JC82Il2cjqA");
  },

  join: function () {
    term.openURL(club);
  },

  hack: function () {
    term.stylePrint(
      "Yeah, I didn't literally mean %hack%. I meant to encourage you to try out some Linux commands, as this site operates like a real terminal!"
    );
  },

  // terminal commands (don't touch them!)
  test: function () {
    term.openURL(club);
  },

  echo: function (args) {
    const message = args.join(" ");
    term.stylePrint(message);
  },

  say: function (args) {
    const message = args.join(" ");
    term.stylePrint(`(Robot voice): ${message}`);
  },

  pwd: function () {
    term.stylePrint("/" + term.cwd.replaceAll("~", `home/${term.user}`));
  },

  ls: function () {
    term.stylePrint(_filesHere().join("   "));
  },

  cd: function (args) {
    let dir = args[0] || "~";
    if (dir != "/") {
      // strip trailing slash
      dir = dir.replace(/\/$/, "");
    }

    switch (dir) {
      case "~":
        term.cwd = "~";
        break;
      case "..":
        if (term.cwd == "~") {
          term.command("cd /home");
        } else if (["home", "bin"].includes(term.cwd)) {
          term.command("cd /");
        }
        break;
      case "../..":
      case "../../..":
      case "../../../..":
      case "/":
        term.cwd = "/";
        break;
      case "home":
        if (term.cwd == "/") {
          term.command("cd /home");
        } else {
          term.stylePrint(
            `You do not have permission to access this directory`
          );
        }
        break;
      case "/home":
        term.cwd = "home";
        break;
      case "/bin":
        term.cwd = "bin";
        break;
      case "bin":
        if (term.cwd == "/") {
          term.cwd = "bin";
        } else {
          term.stylePrint(`No such directory: ${dir}`);
        }
        break;
      case ".":
        break;
      default:
        term.stylePrint(`No such directory: ${dir}`);
        break;
    }
  },

  zsh: function () {
    term.init(term.user);
  },

  cat: function (args) {
    const filename = args[0];

    if (_filesHere().includes(filename)) {
      term.writeln(getFileContents(filename));
    } else {
      term.stylePrint(`No such file: ${filename}`);
    }
    if (filename == "time_machine") {
      term.openURL("https://youtu.be/KEdS_tzGstI");
    }
  },

  grep: function (args) {
    const q = args[0];
    const filename = args[1];

    if (filename == "time_machine") {
      term.openURL("https://youtu.be/27Rn_Mqpxd8");
    }

    if (!q || !filename) {
      term.stylePrint("usage: %grep% [pattern] [filename]");
      return;
    }

    if (_filesHere().includes(filename)) {
      var file = getFileContents(filename);
      const matches = file.matchAll(q);
      for (match of matches) {
        file = file.replaceAll(match[0], colorText(match[0], "files"));
      }
      term.writeln(file);
    } else {
      term.stylePrint(`No such file or directory: ${filename}`);
    }
  },

  gzip: function () {
    term.stylePrint(
      "What are you going to do with a zip file on a fake terminal, seriously?"
    );
  },

  free: function () {
    term.stylePrint("Honestly, our memory isn't what it used to be.");
  },

  tail: function (args) {
    term.command(`cat ${args.join(" ")}`);
  },

  less: function (args) {
    term.command(`cat ${args.join(" ")}`);
  },

  head: function (args) {
    term.command(`cat ${args.join(" ")}`);
  },

  open: function (args) {
    if (!args.length) {
      term.stylePrint("%open%: open a file - usage:\r\n");
      term.stylePrint("%open% test.htm");
    } else if (
      args[0].split(".")[0] == "test" &&
      args[0].split(".")[1] == "htm"
    ) {
      term.openURL(club);
    } else if (args[0].split(".")[1] == "htm") {
      term.openURL(`./${args[0]}`, false);
    } else if (args.join(" ") == "the pod bay doors") {
      term.stylePrint("I'm sorry Dave, I'm afraid I can't do that.");
    } else {
      term.command(`cat ${args.join(" ")}`);
    }
  },

  more: function (args) {
    term.command(`cat ${args.join(" ")}`);
  },

  emacs: function () {
    term.stylePrint("%emacs% not installed. try: %vi%");
  },

  vim: function () {
    term.stylePrint("%vim% not installed. try: %emacs%");
  },

  vi: function () {
    term.stylePrint("%vi% not installed. try: %emacs%");
  },

  pico: function () {
    term.stylePrint("%pico% not installed. try: %vi% or %emacs%");
  },

  nano: function () {
    term.stylePrint("%nano% not installed. try: %vi% or %emacs%");
  },

  pine: function () {
    term.command("email");
  },

  curl: function (args) {
    term.stylePrint(
      `Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource ${args[0]}.`
    );
  },

  ftp: function (args) {
    term.command(`curl ${args.join(" ")}`);
  },

  ssh: function (args) {
    term.command(`curl ${args.join(" ")}`);
  },

  sftp: function (args) {
    term.command(`curl ${args.join(" ")}`);
  },

  scp: function (args) {
    term.stylePrint(
      `████████████ Request Blocked: The ███████████ Policy disallows reading the ██████ resource ${args[0]}.`
    );
  },

  rm: function () {
    term.stylePrint("I'm sorry Dev, I'm afraid I can't do that.");
  },

  mkdir: function () {
    term.stylePrint("Come on, don't mess with our immaculate file system.");
  },

  alias: function () {
    term.stylePrint("Just call me HAL.");
  },

  kill: function (args) {
    term.stylePrint("You can't kill me!");
  },

  killall: function (args) {
    term.command(`kill ${args.join(" ")}`);
  },

  history: function () {
    term.history.forEach((element, index) => {
      term.stylePrint(`${1000 + index}  ${element}`);
    });
  },

  find: function (args) {
    const file = args[0];
    if (Object.keys(_FILES).includes(file)) {
      term.stylePrint(_FULL_PATHS[file]);
    } else {
      term.stylePrint(`%find%: ${file}: No such file or directory`);
    }
  },

  fdisk: function () {
    term.command("rm");
  },

  chown: function () {
    term.stylePrint("You do not have permission to %chown%");
  },

  chmod: function () {
    term.stylePrint("You do not have permission to %chmod%");
  },

  mv: function (args) {
    const src = args[0];

    if (_filesHere().includes(src)) {
      term.stylePrint(`You do not have permission to move file ${src}`);
    } else {
      term.stylePrint(`%mv%: ${src}: No such file or directory`);
    }
  },

  cp: function (args) {
    const src = args[0];

    if (_filesHere().includes(src)) {
      term.stylePrint(`You do not have permission to copy file ${src}`);
    } else {
      term.stylePrint(`%cp%: ${src}: No such file or directory`);
    }
  },

  touch: function () {
    term.stylePrint("You can't %touch% this");
  },

  sudo: function (args) {
    if (term.user == "hackerspace") {
      term.command(args.join(" "));
    } else {
      term.stylePrint(
        `${colorText(
          term.user,
          "user"
        )} is not in the sudoers file. This incident will be reported`
      );
    }
  },

  su: function (args) {
    user = args[0] || "hacker";

    if (user == "hacker" || user == "rick") {
      term.user = user;
      term.command("cd ~");
    } else {
      term.stylePrint("su: Sorry");
    }
  },

  quit: function () {
    term.command("exit");
  },

  stop: function () {
    term.command("exit");
  },

  whoami: function () {
    term.stylePrint(term.user);
  },

  passwd: function () {
    term.stylePrint(
      "Wow. Maybe don't enter your password into a sketchy web-based term.command prompt?"
    );
  },

  ps: function () {
    term.stylePrint("PID TTY       TIME CMD");
    term.stylePrint("424 ttys00 0:00.33 %-zsh%");
    term.stylePrint("158 ttys01 0:09.70 %/bin/npm start%");
    term.stylePrint("767 ttys02 0:00.02 %/bin/sh%");
    if (!killed) {
      term.stylePrint("337 ttys03 0:13.37 %/bin/cgminer -o pwn.d%");
    }
  },

  uname: function (args) {
    switch (args[0]) {
      case "-a":
        term.stylePrint(
          "HackToTheFuture cnvctn 0.0.1 HackToTheFuture Kernel Version 0.0.1 root:xnu-31415.926.5~3/RELEASE_X86_64 x86_64"
        );
        break;
      case "-mrs":
        term.stylePrint("Hack To The Future 0.0.1 x86_64");
        break;
      default:
        term.stylePrint("HackToTheFuture");
    }
  },

  top: function () {
    term.command("ps");
  },

  exit: function () {
    term.openURL(club);
  },

  clear: function () {
    term.init();
  },

  ln: function () {
    term.command("alan");
  },

  eval: function (args) {
    term.stylePrint(
      "please instead build a webstore with macros. in the meantime, the result is: " +
        eval(args.join(" "))
    );
  },
};

function _filesHere() {
  return _DIRS[term.cwd].filter(
    (e) => e != "README.md" || term.user == "hackspace"
  );
}
