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

//Makes appliers with class name in ColorObject object
function makeColorAppliers(ColorObject, classesNumber, colorName) {
  var number = 0;
  while (number <= classesNumber) {
    className = "text-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Text[number] = rangy.createClassApplier(className);

    className = "background-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Background[number] = rangy.createClassApplier(
      className
    );
    number++;
  }
}
var classesNumber = 4,
  ColorAppliers = {},
  colors = ["Black", "Red", "Orange", "Yellow", "Green", "Blue", "Violet"];
//Add Text and Background objects to all colors
for (var i = 0; i <= colors.length - 1; i++) {
  ColorAppliers[colors[i]] = {};
  ColorAppliers[colors[i]]["Text"] = {};
  ColorAppliers[colors[i]]["Background"] = {};
}

//Make color appliers for colors in array
for (var i = 0; i <= colors.length - 1; i++) {
  makeColorAppliers(ColorAppliers, classesNumber, colors[i]);
}

var capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

//Toggle class to selected text
function addColor(color, type, number) {
  color = capitalizeFirstLetter(color);
  type = capitalizeFirstLetter(type);

  // if (document.getSelection()) {
  //   ColorAppliers[color][type][number].toggleSelection();

  // }

  ColorAppliers[color][type][number].toggleSelection();
}

//Options to surround text with specific tag
var Options = {
  Strong: { elementTagName: "strong" },
  U: { elementTagName: "u" },
  Em: { elementTagName: "em" },
  Strike: { elementTagName: "strike" },
};

var TagAppliers = {
  Strong: rangy.createClassApplier("strong", Options["Strong"]),
  U: rangy.createClassApplier("u", Options["U"]),
  Em: rangy.createClassApplier("em", Options["Em"]),
  Strike: rangy.createClassApplier("strike", Options["Strike"]),
};

var backgroundHighlightApplier = rangy.createClassApplier("background-yellow0");

//Add tag to selected text
function addTag(tagName) {
  tagName = capitalizeFirstLetter(tagName);
  TagAppliers[tagName].toggleSelection();
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

tests = () => {
  // console.log(document.getSelection());
  // console.log(document.getSelection().getRangeAt(0));
  // console.log(document.getSelection().getRangeAt(0).cloneContents());
};

clearExtraSpaces = (string) => string.replace(/\s+/g, " ");

// turn it into function
var classes = document.querySelectorAll("[class*=text-]");
for (var i = 0; i < classes.length; i++) {
  var classElement = classes[i],
    className = () => classes[i].className,
    namesInClass = () => className().split(" "),
    lastNamesInClass = namesInClass();
  classElement.className = className().trim();
  classElement.className = clearExtraSpaces(className());

  var textClassesAmount = 0,
    backgroundClassesAmount = 0;
  console.log("before ", lastNamesInClass);
  for (var j = 0; j <= lastNamesInClass.length - 1; j++) {
    if (lastNamesInClass[j].substring(0, 5) == "text-") {
      textClassesAmount++;
      // console.log('text ', lastNamesInClass[j]);
    } else if (lastNamesInClass[j].substring(0, 11) == "background-") {
      backgroundClassesAmount++;
      console.log("background ", lastNamesInClass[j]);
    }
  }
  console.log(textClassesAmount);
  if (textClassesAmount > 1) {
    for (var j = 0; j <= textClassesAmount - 2; j++) {
      if (lastNamesInClass[j].substring(0, 5) == "text-") {
        lastClass = lastNamesInClass[j];
        lastNamesInClass.splice(j, 1);
        textClassesAmount--;
        j--;
      }
    }
  }
  console.log(backgroundClassesAmount);
  if (backgroundClassesAmount > 1) {
    for (var j = 0; j <= backgroundClassesAmount - 2; j++) {
      if (lastNamesInClass[j].substring(0, 11) == "background-") {
        lastClass = lastNamesInClass[j];
        lastNamesInClass.splice(j, 1);
        backgroundClassesAmount--;
        j--;
        console.log(lastNamesInClass);
      }
    }
  }
  console.log("after: ", lastNamesInClass);
  classElement.className = lastNamesInClass.join(" ");
  console.log(classElement);
}
//