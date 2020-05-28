window.addEventListener("load", function () {
  document.getElementById("work-area").setAttribute("contenteditable", "true");
});

function format(command, value) {
  document.execCommand(command, false, value);
}

function addDropdown(dropdownId) {
  let dropdown = document.getElementById(dropdownId),
    dropdowns = document.querySelectorAll("[class*=dropdown]"),
    dropdownsLength = dropdowns.length,
    dropdownsLastElementIndex = dropdownsLength - 1;

  if (dropdownsLength > 0) {
    for (let i = 0; i <= dropdownsLastElementIndex; i++) {
      if (dropdowns[i] != dropdown) {
        dropdowns[i].className = "hidden";
      }
    }
  }

  if (dropdown.className == dropdownId) {
    dropdown.className = "hidden";
  } else {
    dropdown.className = dropdownId;
  }
}

rangy.init();

//Makes appliers with class name in ColorObject object
function makeColorAppliers(ColorObject, classesNumber, colorName) {
  let number = 0;

  while (number <= classesNumber) {
    let className = "text-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Text[number] = rangy.createClassApplier(className);

    className = "background-" + colorName.toLowerCase() + number;
    ColorObject[colorName].Background[number] = rangy.createClassApplier(
      className
    );
    number++;
  }
}

let classesNumber = 4,
  ColorAppliers = {},
  colors = ["Black", "Red", "Orange", "Yellow", "Green", "Blue", "Violet"],
  colorsLastElementIndex = colors.length - 1;

//Add Text and Background objects to all colors
for (let i = 0; i <= colorsLastElementIndex; i++) {
  ColorAppliers[colors[i]] = {};
  ColorAppliers[colors[i]]["Text"] = {};
  ColorAppliers[colors[i]]["Background"] = {};
}

//Make color appliers for colors in array
for (let i = 0; i <= colorsLastElementIndex; i++) {
  makeColorAppliers(ColorAppliers, classesNumber, colors[i]);
}

let capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

function clearExtraClasses() {
  let classes = document.querySelectorAll("[class*=text-]"),
    classesLength = classes.length;

  for (let i = 0; i < classesLength; i++) {
    let classElement = classes[i],
      className = () => classes[i].className,
      namesInClass = () => className().split(" "),
      lastNamesInClass = namesInClass();

    (function ClearText() {
      classElement.className = className().trim();
      classElement.className = clearExtraSpaces(className());
    })();

    let textClassesAmount = 0,
      backgroundClassesAmount = 0,
      textBeginning = "text-",
      textBeginningLength = textBeginning.length,
      backgroundBeginning = "background-",
      backgroundBeginningLength = backgroundBeginning.length;

    for (let j = 0; j <= lastNamesInClass.length - 1; j++) {
      if (
        lastNamesInClass[j].substring(0, textBeginningLength) == textBeginning
      ) {
        textClassesAmount++;
      } else if (
        lastNamesInClass[j].substring(0, backgroundBeginningLength) ==
        backgroundBeginning
      ) {
        backgroundClassesAmount++;
      }
    }

    function deleteExtraClasses(classesAmount, classBeginning) {
      let classesAmountMinus2 = classesAmount - 2;
      for (let j = 0; j <= classesAmountMinus2; j++) {
        let textBeginning = lastNamesInClass[j].substring(
          0,
          classBeginning.length
        );
        if (textBeginning == classBeginning) {
          lastNamesInClass.splice(j, 1);
          classesAmountMinus2--;
          j--;
        }
      }
    }

    deleteExtraClasses(textClassesAmount, "text-");
    deleteExtraClasses(backgroundClassesAmount, "background-");

    classElement.className = lastNamesInClass.join(" ");
  }
}

//Toggle class to selected text
function addColor(color, type, number) {
  color = capitalizeFirstLetter(color);
  type = capitalizeFirstLetter(type);
  ColorAppliers[color][type][number].toggleSelection();
  clearExtraClasses();
}

//Options to surround text with specific tag
let Options = {
  Strong: { elementTagName: "strong" },
  U: { elementTagName: "u" },
  Em: { elementTagName: "em" },
  Strike: { elementTagName: "strike" },
  A: { elementTagName: "a" },
  Sup: { elementTagName: "sup" },
  Sub: { elementTagName: "sub" },
};

let TagAppliers = {
  Strong: rangy.createClassApplier("strong", Options["Strong"]),
  U: rangy.createClassApplier("underlined", Options["U"]),
  Em: rangy.createClassApplier("emphasized", Options["Em"]),
  Strike: rangy.createClassApplier("strike", Options["Strike"]),
  A: rangy.createClassApplier("anchor", Options["A"]),
  Sup: rangy.createClassApplier("superscript", Options["Sup"]),
  Sub: rangy.createClassApplier("subscript", Options["Sub"]),
};

//Add tag to selected text
let time = 0;
function addTag(tagName, url) {
  tagName = capitalizeFirstLetter(tagName);
  TagAppliers[tagName].toggleSelection();
  if (url) {
    let anchors = document.querySelectorAll("[class=anchor]"),
      anchorsLength = anchors.length,
      url = document.getElementById("url");
    for (let i = 0; i < anchorsLength; i++) {
      anchors[i].href = url.value;
      anchors[i].className = anchors[i].className + time;
    }
    time++;
    url.value = "";
  }
}

function findChild(element, parent) {
  while (element.parentElement != parent) {
    element = element.parentElement;
  }

  child = element;

  return child;
}

function replaceElement(source, newType) {
  let attributes = [];

  // Create the document fragment
  const frag = document.createDocumentFragment();

  // Fill it with what's in the source element
  while (source.firstChild) {
    for (let i = 0; i < source.attributes.length; i++) {
      attributes.push(source.attributes[i]);
    }
    frag.appendChild(source.firstChild);
  }
  // Create the new element
  const newElem = document.createElement(newType);

  // Empty the document fragment into it
  newElem.appendChild(frag);
  let length = attributes.length;
  for (let i = 0; i <= length - 1; i++) {
    newElem.setAttribute(attributes[i].name, attributes[i].value);
  }

  // Replace the source element with the new element on the page
  let parentNode = source.parentNode;

  parentNode.replaceChild(newElem, source);
}

function replaceContainerTag(tag) {
  var tag = tag.toUpperCase();
  let selection = document.getSelection(),
    range = selection.getRangeAt(0),
    mainContainer = document.getElementById("work-area"),
    wrongContainer = document.getElementById("sample-toolbar"),
    firstNode = selection.anchorNode,
    lastNode = selection.focusNode;
  if (
    firstNode.nodeName == "#text" &&
    range.commonAncestorContainer != wrongContainer
    // && lastNode != mainContainer
  ) {
    let firstSelectedElement = firstNode,
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

    let p = [],
      pCounter = 0,
      tagData = {
        tagName: tag,
        tagCounter: 0,
        selectedTags: [],
      };

    do {
      if (firstSelectedElement.tagName == tagData.tagName) {
        p[pCounter] = firstSelectedElement;
        pCounter++;
      } else {
        tagData.selectedTags[tagData.tagCounter] = firstSelectedElement;
        tagData.tagCounter++;
      }
      firstSelectedElement = firstSelectedElement.nextSibling;
    } while (
      firstSelectedElement.nextSibling != lastSelectedElement.nextElementSibling
    );
    pCounterMinus1 = pCounter - 1;
    if (pCounter != 0) {
      for (let i = 0; i <= pCounterMinus1; i++) {
        replaceElement(p[i], "p");
      }
    }
    if (tagData.tagCounter != 0) {
      for (let i = 0; i <= tagData.tagCounter - 1; i++) {
        replaceElement(tagData.selectedTags[i], tagData.tagName);
      }
    }

    selection.empty();

    if (tag == "PRE") {
      clearTagsAtPreContainer();
      // init();
      removeSpellcheck();
      highlightNumbers();
      highlightKeywords();
    }
  }
}

function highlightPre() {
  let savedSelection = rangy.saveSelection();
  console.time();
  highlightKeywords();
  highlightNumbers();
  rangy.restoreSelection(savedSelection);
  localStorage.clear();
  console.timeEnd();
}

function addContainerClass(className) {
  let selection = document.getSelection(),
    range = selection.getRangeAt(0),
    wrongContainer = document.getElementById("sample-toolbar"),
    firstNode = selection.anchorNode,
    lastNode = selection.focusNode;
  if (
    firstNode.nodeName == "#text" &&
    range.commonAncestorContainer != wrongContainer
  ) {
    let mainContainer = document.getElementById("work-area"),
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

    // debugger;
    if (className.substring(0, 6) == "indent") {
      let sign = className.substring(6, 7),
        classBeginning = className.substring(0, 6);
      do {
        let firstSelectedElementClassName = firstSelectedElement.className;
        console.log(firstSelectedElementClassName);
        if (firstSelectedElementClassName != undefined) {
          firstSelectedElementClassName = clearExtraSpaces(
            firstSelectedElementClassName
          );
          let firstSelectedElementClassNameBeginning = firstSelectedElementClassName.substring(
            0,
            6
          );
          if (firstSelectedElementClassNameBeginning == classBeginning) {
            if (firstSelectedElement.attributes["data-value"] != undefined) {
              let value = parseInt(
                firstSelectedElement.attributes["data-value"].nodeValue
              );
              if (sign == "+") {
                if (value <= 7) {
                  value++;

                  firstSelectedElement.attributes[
                    "data-value"
                  ].nodeValue = value;

                  firstSelectedElement.className = classBeginning + "-" + value;
                }
              } else if (value >= 1) {
                if (value == 1) {
                  firstSelectedElement.removeAttribute("data-value");

                  firstSelectedElement.removeAttribute("class");
                } else {
                  value--;
                  firstSelectedElement.attributes[
                    "data-value"
                  ].nodeValue = value;
                  firstSelectedElement.className = classBeginning + "-" + value;
                }
              }
            }
          } else if (className == "indent+") {
            firstSelectedElement.setAttribute("data-value", 1);

            let value = firstSelectedElement.attributes["data-value"].value;

            firstSelectedElement.className = classBeginning + "-" + value;
          }
        }
        firstSelectedElement = firstSelectedElement.nextSibling;
      } while (
        firstSelectedElement.nextSibling !=
        lastSelectedElement.nextElementSibling
      );
    } else {
      do {
        if (firstSelectedElement.className == className) {
          firstSelectedElement.className = "";
        } else {
          firstSelectedElement.className = className;
        }
        firstSelectedElement = firstSelectedElement.nextSibling;
      } while (
        firstSelectedElement.nextSibling !=
        lastSelectedElement.nextElementSibling
      );
    }
  }
}

clearExtraSpaces = (string) => string.replace(/\s+/g, " ");

function highlightKeywords() {
  let words = ["for", "while", "var", "and", "is"],
    wordsLastElementIndex = words.length - 1;
  let preList = document.getElementsByTagName("PRE"),
    preListLastIndexElement = preList.length - 1;

  for (let i = 0; i <= preListLastIndexElement; i++) {
    let pre = preList[i];
    // preInner = pre.innerHTML;

    for (let j = 0; j <= wordsLastElementIndex; j++) {
      let word = words[j],
        regExp = new RegExp("\\b" + word + "\\b", "gi"),
        replacing = "<span class=pre-keyword>" + word + "</span>";
      replacedInner = pre.innerHTML.replace(regExp, replacing);
      pre.innerHTML = replacedInner;
    }
  }
  // }
}

function highlightNumbers() {
  let preList = document.getElementsByTagName("PRE"),
    selection = document.getSelection(),
    preElement = selection.anchorNode;

  if (selection.type == "Caret") {
    while (preElement.tagName != "PRE") {
      preElement = preElement.parentElement;
    }

    let regExp = new RegExp("\\b" + "\\d+" + "\\b", "gi"),
      matches = preElement.innerHTML.match(regExp),
      matchesLastElementIndex = matches.length - 1;

    if (matches != null) {
      for (let j = 0; j <= matchesLastElementIndex; j++) {
        let match = matches[j],
          replacing = "<span class=pre-number>" + match + "</span>",
          regExp = new RegExp("\\b" + match + "\\b", "gi");

        replacedInner = preElement.innerHTML.replace(regExp, replacing);
        preElement.innerHTML = replacedInner;
      }
    }
  } else {
    for (let i = 0; i <= preList.length - 1; i++) {
      let regExp = new RegExp("\\b" + "\\d+" + "\\b", "gi"),
        element = preList[i],
        matches = element.innerHTML.match(regExp);

      if (matches != null) {
        for (let j = 0; j <= matches.length - 1; j++) {
          let match = matches[j],
            replacing = "<span class=pre-number>" + match + "</span>",
            regExp = new RegExp("\\b" + match + "\\b", "gi");
          replacedInner = element.innerHTML.replace(regExp, replacing);
          element.innerHTML = replacedInner;
        }
      }
    }
  }
}

function clearTagsAtPreContainer() {
  let preList = document.getElementsByTagName("PRE");
  for (let i = 0; i <= preList.length - 1; i++) {
    let preListTextContent = preList[i].textContent;
    preList[i].innerHTML = preListTextContent;
  }
}

function removeSpellcheck() {
  let pres = document.querySelectorAll("pre:not([spellcheck])");
  for (let i = 0; i <= pres.length - 1; i++) {
    let pre = pres[i];
    pre.setAttribute("spellcheck", "false");
  }
}

tests = (className) => {
  let selection = document.getSelection(),
    range = selection.getRangeAt(0),
    wrongContainer = document.getElementById("sample-toolbar"),
    firstNode = selection.anchorNode,
    lastNode = selection.focusNode;
  if (
    firstNode.nodeName == "#text" &&
    range.commonAncestorContainer != wrongContainer
  ) {
    let mainContainer = document.getElementById("work-area"),
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

    if (className.substring(0, 6) == "indent") {
      // debugger;
      let sign = className.substring(6, 7),
        classBeginning = "indent";
      do {
        if (firstSelectedElement.nodeName != "#text") {
          console.log(firstSelectedElement);
          let firstSelectedElementClassName = firstSelectedElement.className,
            dataValue = firstSelectedElement.attributes["data-value"];
          console.log(firstSelectedElementClassName);

          if (dataValue != undefined) {
            let value = parseInt(
              firstSelectedElement.attributes["data-value"].nodeValue
            );
            if (sign == "+") {
              if (value <= 7) {
                let classes = firstSelectedElement.className.split(" "),
                  length = classes.length,
                  count = 0;
                  
                for (let j = 0; j < length - 1; j++) {
                  let firstMatch = classes.indexOf("indent"),
                    lastMatch = classes.lastIndexOf("indent");
                  console.log(firstMatch, lastMatch);
                  if (firstMatch != lastMatch) {
                    classes.splice(j, 1);
                    console.log("we spliced :hmm:");
                    j--;
                    length--;
                  }
                }
                console.log(classes);

                value++;

                firstSelectedElement.attributes["data-value"].nodeValue = value;

                firstSelectedElement.className =
                  firstSelectedElementClassName +
                  " " +
                  classBeginning +
                  "-" +
                  value;
              }
            }
          } else if (className == "indent+") {
            firstSelectedElement.setAttribute("data-value", 1);

            let value = firstSelectedElement.attributes["data-value"].value;

            firstSelectedElement.className =
              firstSelectedElementClassName +
              " " +
              classBeginning +
              "-" +
              value;
          }
        }
        firstSelectedElement = firstSelectedElement.nextSibling;
      } while (
        firstSelectedElement.nextSibling !=
        lastSelectedElement.nextElementSibling
      );
    }
  }
};
