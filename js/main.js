window.addEventListener("load", function () {
  document.getElementById("work-area").setAttribute("contenteditable", "true");
});

function format(command, value) {
  document.execCommand(command, false, value);
}

function setUrl() {
  var url = document.getElementById("txtFormatUrl").value;
  var sText = document.getSelection();
  document.execCommand(
    "insertHTML",
    false,
    '<a href="' + url + '" target="_blank">' + sText + "</a>"
  );
  document.getElementById("txtFormatUrl").value = "";
}

function addDropdown(type) {
  var dropdown = document.getElementById(type);
  if (dropdown.className == "hidden") {
    dropdown.className = type;
  } else {
    dropdown.className = "hidden";
  }
}

rangy.init();
// rangy.undoToSelection();
var strongOptions = { elementTagName: "strong" },
  uOptions = { elementTagName: "u" },
  emOptions = { elementTagName: "em" },
  strikeOptions = { elementTagName: "strike" };

var TextBackground = {
  Text: {},
  Background: {},
};

var ColorAppliers = {
  Black: {
    Text: {},
    Background: {},
  },

  Red: {
    Text: {},
    Background: {},
  },

  Orange: {
    Text: {},
    Background: {},
  },

  Yellow: {
    Text: {},
    Background: {},
  },

  Green: {
    Text: {},
    Background: {},
  },

  Blue: {
    Text: {},
    Background: {},
  },

  Violet: {
    Text: {},
    Background: {},
  },
  // Tan,
  // Ran,
  // Pam: {
  //   TextBackground,
  // },
};
var colors = ["Black", "Red", "Orange", "Yellow", "Green", "Blue", "Violet"];

function makeColorAppliers(ColorObject, classesNumber, colorName) {
  var number = 0;
  while (number <= classesNumber) {
    className = "text-highlight-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Text[number] = rangy.createClassApplier(className);

    className = "background-highlight-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Background[number] = rangy.createClassApplier(
      className
    );
    number++;
  }
}

var classesNumber = 4;
for (var i = 0; i <= colors.length - 1; i++) {
  makeColorAppliers(ColorAppliers, classesNumber, colors[i]);
}
console.log(ColorAppliers);

var randomTest = Math.floor(Math.random() * classesNumber + 1);
console.log(ColorAppliers.Black.Text[0]);
console.log(ColorAppliers.Red.Background[0]);

var strongApplier = rangy.createClassApplier("strong", strongOptions),
  uApplier = rangy.createClassApplier("u", uOptions),
  emApplier = rangy.createClassApplier("em", emOptions),
  strikeApplier = rangy.createClassApplier("strike", strikeOptions),
  backgroundHighlightApplier = rangy.createClassApplier("background-highlight");
  // textHighlightBlack0Applier = rangy.createClassApplier(
  //   "text-highlight-black0"
  // ),
  // textHighlightRed0Applier = rangy.createClassApplier("text-highlight-red0"),
  // textHighlightOrange0Applier = rangy.createClassApplier(
  //   "text-highlight-orange0"
  // ),
  // textHighlightYellow0Applier = rangy.createClassApplier(
  //   "text-highlight-yellow0"
  // ),
  // textHighlightGreen0Applier = rangy.createClassApplier(
  //   "text-highlight-green0"
  // ),
  // textHighlightBlue0Applier = rangy.createClassApplier("text-highlight-blue0"),
  // textHighlightViolet0Applier = rangy.createClassApplier(
  //   "text-highlight-violet0"
  // ),
  // textHighlightBlack1Applier = rangy.createClassApplier(
  //   "text-highlight-black1"
  // ),
  // textHighlightRed1Applier = rangy.createClassApplier("text-highlight-red1"),
  // textHighlightOrange1Applier = rangy.createClassApplier(
  //   "text-highlight-orange1"
  // ),
  // textHighlightYellow1Applier = rangy.createClassApplier(
  //   "text-highlight-yellow1"
  // ),
  // textHighlightGreen1Applier = rangy.createClassApplier(
  //   "text-highlight-green1"
  // ),
  // textHighlightBlue1Applier = rangy.createClassApplier("text-highlight-blue1"),
  // textHighlightViolet1Applier = rangy.createClassApplier(
  //   "text-highlight-violet1"
  // ),
  // textHighlightBlack2Applier = rangy.createClassApplier(
  //   "text-highlight-black2"
  // ),
  // textHighlightRed2Applier = rangy.createClassApplier("text-highlight-red2"),
  // textHighlightOrange2Applier = rangy.createClassApplier(
  //   "text-highlight-orange2"
  // ),
  // textHighlightYellow2Applier = rangy.createClassApplier(
  //   "text-highlight-yellow2"
  // ),
  // textHighlightGreen2Applier = rangy.createClassApplier(
  //   "text-highlight-green2"
  // ),
  // textHighlightBlue2Applier = rangy.createClassApplier("text-highlight-blue2"),
  // textHighlightViolet2Applier = rangy.createClassApplier(
  //   "text-highlight-violet2"
  // ),
  // textHighlightBlack3Applier = rangy.createClassApplier(
  //   "text-highlight-black3"
  // ),
  // textHighlightRed3Applier = rangy.createClassApplier("text-highlight-red3"),
  // textHighlightOrange3Applier = rangy.createClassApplier(
  //   "text-highlight-orange3"
  // ),
  // textHighlightYellow3Applier = rangy.createClassApplier(
  //   "text-highlight-yellow3"
  // ),
  // textHighlightGreen3Applier = rangy.createClassApplier(
  //   "text-highlight-green3"
  // ),
  // textHighlightBlue3Applier = rangy.createClassApplier("text-highlight-blue3"),
  // textHighlightViolet3Applier = rangy.createClassApplier(
  //   "text-highlight-violet3"
  // ),
  // textHighlightBlack4Applier = rangy.createClassApplier(
  //   "text-highlight-black4"
  // ),
  // textHighlightRed4Applier = rangy.createClassApplier("text-highlight-red4"),
  // textHighlightOrange4Applier = rangy.createClassApplier(
  //   "text-highlight-orange4"
  // ),
  // textHighlightYellow4Applier = rangy.createClassApplier(
  //   "text-highlight-yellow4"
  // ),
  // textHighlightGreen4Applier = rangy.createClassApplier(
  //   "text-highlight-green4"
  // ),
  // textHighlightBlue4Applier = rangy.createClassApplier("text-highlight-blue4"),
  // textHighlightViolet4Applier = rangy.createClassApplier(
  //   "text-highlight-violet4"
  // );

function addClass(className) {
  // var selection = document.getSelection();
  // console.log(selection.anchorNode.parentElement.className.length != 0);
  // if (selection.anchorNode.parentElement.className.length != 0){
  //   selection.anchorNode.parentElement.className = "";
  // }
  switch (className) {
    case "strong":
      strongApplier.toggleSelection();
      break;
    case "u":
      uApplier.toggleSelection();
      break;
    case "em":
      emApplier.toggleSelection();
      break;
    case "strike":
      strikeApplier.toggleSelection();
      break;

    case "background-highlight":
      backgroundHighlightApplier.toggleSelection();
      break;

    case "text-highlight-black0":
      ColorAppliers.Black.Text[0].toggleSelection();
      break;
    case "text-highlight-red0":
      ColorAppliers.Red.Text[0].toggleSelection();
      break;
    case "text-highlight-orange0":
      ColorAppliers.Orange.Text[0].toggleSelection();
      break;
    case "text-highlight-yellow0":
      ColorAppliers.Yellow.Text[0].toggleSelection();
      break;
    case "text-highlight-green0":
      ColorAppliers.Green.Text[0].toggleSelection();
      break;
    case "text-highlight-blue0":
      ColorAppliers.Blue.Text[0].toggleSelection();
      break;
    case "text-highlight-violet0":
      ColorAppliers.Violet.Text[0].toggleSelection();
      break;

    case "text-highlight-black1":
      ColorAppliers.Black.Text[1].toggleSelection();
      break;
    case "text-highlight-red1":
      ColorAppliers.Red.Text[1].toggleSelection();
      break;
    case "text-highlight-orange1":
      ColorAppliers.Orange.Text[1].toggleSelection();
      break;
    case "text-highlight-yellow1":
      ColorAppliers.Yellow.Text[1].toggleSelection();
      break;
    case "text-highlight-green1":
      ColorAppliers.Green.Text[1].toggleSelection();
      break;
    case "text-highlight-blue1":
      ColorAppliers.Blue.Text[1].toggleSelection();
      break;
    case "text-highlight-violet1":
      ColorAppliers.Violet.Text[1].toggleSelection();
      break;

    case "text-highlight-black2":
      ColorAppliers.Black.Text[2].toggleSelection();
      break;
    case "text-highlight-red2":
      ColorAppliers.Red.Text[2].toggleSelection();
      break;
    case "text-highlight-orange2":
      ColorAppliers.Orange.Text[2].toggleSelection();
      break;
    case "text-highlight-yellow2":
      ColorAppliers.Yellow.Text[2].toggleSelection();
      break;
    case "text-highlight-green2":
      ColorAppliers.Green.Text[2].toggleSelection();
      break;
    case "text-highlight-blue2":
      ColorAppliers.Blue.Text[2].toggleSelection();
      break;
    case "text-highlight-violet2":
      ColorAppliers.Violet.Text[2].toggleSelection();
      break;

    case "text-highlight-black3":
      ColorAppliers.Black.Text[3].toggleSelection();
      break;
    case "text-highlight-red3":
      ColorAppliers.Red.Text[3].toggleSelection();
      break;
    case "text-highlight-orange3":
      ColorAppliers.Orange.Text[3].toggleSelection();
      break;
    case "text-highlight-yellow3":
      ColorAppliers.Yellow.Text[3].toggleSelection();
      break;
    case "text-highlight-green3":
      ColorAppliers.Green.Text[3].toggleSelection();
      break;
    case "text-highlight-blue3":
      ColorAppliers.Blue.Text[3].toggleSelection();
      break;
    case "text-highlight-violet3":
      ColorAppliers.Violet.Text[3].toggleSelection();
      break;

    case "text-highlight-black4":
      ColorAppliers.Black.Text[4].toggleSelection();
      break;
    case "text-highlight-red4":
      ColorAppliers.Red.Text[4].toggleSelection();
      break;
    case "text-highlight-orange4":
      ColorAppliers.Orange.Text[4].toggleSelection();
      break;
    case "text-highlight-yellow4":
      ColorAppliers.Yellow.Text[4].toggleSelection();
      break;
    case "text-highlight-green4":
      ColorAppliers.Green.Text[4].toggleSelection();
      break;
    case "text-highlight-blue4":
      ColorAppliers.Blue.Text[4].toggleSelection();
      break;
    case "text-highlight-violet4":
      ColorAppliers.Violet.Text[4].toggleSelection();
      break;
  }
}

function findChild(element, parent) {
  while (element.parentElement != parent) {
    element = element.parentElement;
  }
  child = element;
  return child;
}

function addContainerClass(className) {
  var selection = document.getSelection(),
    range = selection.getRangeAt(0),
    wrongContainer = document.getElementById("sample-toolbar"),
    firstNode = selection.anchorNode,
    lastNode = selection.focusNode;
  if (
    firstNode.nodeName == "#text" &&
    range.commonAncestorContainer != wrongContainer
  ) {
    var mainContainer = document.getElementById("work-area"),
      firstSelectedElement = firstNode,
      lastSelectedElement = lastNode,
      startElement = range.startContainer,
      endElement = range.endContainer;

    if (
      firstSelectedElement != startElement &&
      lastSelectedElement != endElement
    ) {
      firstSelectedElement = lastNode;
      lastSelectedElement = firstNode;
    }

    lastSelectedElement = findChild(lastSelectedElement, mainContainer);
    firstSelectedElement = findChild(firstSelectedElement, mainContainer);

    do {
      if (firstSelectedElement.className == className) {
        firstSelectedElement.className = "";
      } else {
        firstSelectedElement.className = className;
      }
      firstSelectedElement = firstSelectedElement.nextSibling;
    } while (
      firstSelectedElement.nextSibling != lastSelectedElement.nextElementSibling
    );
  }
}
