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

var capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

var lowerFirstLetter = (string) =>
  string.charAt(0).toLowerCase() + string.slice(1);

var clearExtraSpaces = (string) => {
  let cleanedBetweenWords = string.replace(/\s+/g, " "),
    cleanedAtAll = cleanedBetweenWords.trim(),
    cleanedString = cleanedAtAll;

  return cleanedString;
};

//It deletes repeated classes (what starts with similar text)
function clearClasses(classNameBeginning) {
  let classes = document.querySelectorAll(
      "[class*=" + classNameBeginning + "]"
    ),
    classesLength = classes.length;

  for (let i = 0; i < classesLength; i++) {
    let classElement = classes[i],
      className = () => classes[i].className,
      namesInClass = () => className().split(" "),
      lastNamesInClass = namesInClass();

    classElement.className = clearExtraSpaces(className());

    let length = classNameBeginning.length;
    let classesAmount = 0,
      classesIndexes = [],
      k = 0;

    for (let j = 0; j <= lastNamesInClass.length - 1; j++) {
      if (lastNamesInClass[j].substring(0, length) == classNameBeginning) {
        classesIndexes[k] = j;
        classesAmount++;
        k++;
      }
    }
    console.log(classesAmount);
    if (classesAmount == 1) {
    } else {
      for (let j = 0; j < classesAmount; j++) {
        lastNamesInClass.splice(classesIndexes[j], 1);
        classesAmount--;
      }
    }

    classElement.className = lastNamesInClass.join(" ");
  }
}

//Toggle class to selected text
function addColor(color, type, number) {
  color = capitalizeFirstLetter(color);
  type = capitalizeFirstLetter(type);
  ColorAppliers[color][type][number].toggleSelection();

  let sign = "-",
    classNameBeginning = lowerFirstLetter(type) + sign;

  clearClasses(classNameBeginning);
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

//Tags
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

//It adds tag with (tagName) to selected text.
//If it passes url then it makes anchor tag with (url)
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

let FontAppliers = {
  Sofia: rangy.createClassApplier("sofia"),
  Slabo13px: rangy.createClassApplier("slabo-13px"),
  RobotoSlab: rangy.createClassApplier("roboto-slab"),
  Inconsolata: rangy.createClassApplier("inconsolata"),
  UbuntuMono: rangy.createClassApplier("ubuntu-mono"),
};

//It adds font class (sofia, ubuntu-mono, etc.) to selected text
function addFont(fontName) {
  // console.time();

  let signIndex = fontName.indexOf("-");
  fontName = capitalizeFirstLetter(fontName);

  if (signIndex > 0) {
    fontName =
      fontName.substring(0, signIndex) +
      capitalizeFirstLetter(fontName.substring(signIndex + 1, fontName.length));
  }
  FontAppliers[fontName].toggleSelection();

  if (signIndex > 0) {
    fontName =
      lowerFirstLetter(fontName.substring(0, signIndex)) +
      "-" +
      lowerFirstLetter(fontName.substring(signIndex, fontName.length));
  } else {
    fontName = lowerFirstLetter(fontName);
  }

  let elements = document.querySelectorAll("[class*=" + fontName + "]"),
    length = elements.length;

  if (fontName == "sofia") {
    var i = 2;
  } else {
    var i = 1;
  }

  if (length > 1) {
    var names = [
        "sofia",
        "slabo-13px",
        "roboto-slab",
        "inconsolata",
        "ubuntu-mono",
      ],
      namesLength = names.length;

    for (i; i < length; i++) {
      if (elements[i].className.split(" ").length > 1) {
        var classNamesList = elements[i].className.split(" "),
          classNamesListLength = classNamesList.length;

        for (let k = 0; k < classNamesListLength; k++) {
          for (let j = 0; j < namesLength; j++) {
            if (
              classNamesList[k] == names[j] &&
              classNamesList[k] != fontName
            ) {
              classNamesList.splice(k, 1);
              classNamesListLength--;
            }
          }
        }
        elements[i].className = classNamesList.join(" ");
      }
    }
  }

  // console.timeEnd();
}

let SizeAppliers = {
  small: rangy.createClassApplier("small"),
  normal: rangy.createClassApplier("normal"),
  large: rangy.createClassApplier("large"),
  huge: rangy.createClassApplier("huge"),
};

//It adds size class (normal, small, etc.) to selected text
function addSize(sizeName) {
  SizeAppliers[sizeName].toggleSelection();

  let elements = document.querySelectorAll("[class*=" + sizeName + "]"),
    length = elements.length;

  if (sizeName == "normal") {
    var i = 2;
  } else {
    var i = 1;
  }

  if (length > 1) {
    var names = ["small", "normal", "large", "huge"],
      namesLength = names.length;

    for (i; i < length; i++) {
      var classNamesList = elements[i].className.split(" "),
        classNamesListLength = classNamesList.length;

      if (classNamesListLength > 1) {
        for (let k = 0; k < classNamesListLength; k++) {
          for (let j = 0; j < namesLength; j++) {
            if (
              classNamesList[k] == names[j] &&
              classNamesList[k] != sizeName
            ) {
              classNamesList.splice(k, 1);
              classNamesListLength--;
            }
          }
        }
        elements[i].className = classNamesList.join(" ");
      }
    }
  }
}

//It finds child of (parent) element from some (element)
function findChild(element, parent) {
  while (element.parentElement != parent) {
    element = element.parentElement;
  }

  child = element;

  return child;
}

//It replaces any tag with new tag
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

//It replaces child tag of <div class="work-area"> with (tag)
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
    var firstSelectedElement = firstNode,
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

    debugger;

    lastSelectedElement = findChild(lastSelectedElement, mainContainer);
    firstSelectedElement = findChild(firstSelectedElement, mainContainer);

    console.log(firstSelectedElement, lastSelectedElement);

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
      if (firstSelectedElement.nextElementSibling == lastSelectedElement.nextElementSibling){
        break;
      }
      firstSelectedElement = firstSelectedElement.nextElementSibling;
    } while (
      firstSelectedElement.nextElementSibling !=
      lastSelectedElement.nextElementSibling
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

//It highlights specific words + all numbers in <pre>
function highlightPre() {
  let savedSelection = rangy.saveSelection();
  console.time();
  highlightKeywords();
  highlightNumbers();
  rangy.restoreSelection(savedSelection);
  localStorage.clear();
  console.timeEnd();
}

//It toggles class with (className) to selected first childs of <div class="work-area">
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

    if (className.substring(0, 6) == "indent") {
      let sign = className.substring(6, 7),
        classBeginning = "indent";

      do {
        if (firstSelectedElement.nodeName != "#text") {
          let firstSelectedElementClassName = firstSelectedElement.className,
            dataValue = firstSelectedElement.attributes["data-value"];

          if (dataValue != undefined) {
            let value = parseInt(
              firstSelectedElement.attributes["data-value"].nodeValue
            );
            if (sign == "+") {
              if (value <= 7) {
                let cleanElement = clearExtraSpaces(
                    firstSelectedElement.className
                  ),
                  classes = cleanElement.split(" "),
                  length = classes.length;
                for (let j = 0; j < length; j++) {
                  let classBeginning = classes[j].substring(0, 6);
                  if (classBeginning == "indent") {
                    classes.splice(j, 1);
                    j--;
                    length--;
                  }
                }
                classes = classes.join(" ");

                value++;

                firstSelectedElement.attributes["data-value"].nodeValue = value;

                firstSelectedElement.className = clearExtraSpaces(
                  classes + " " + classBeginning + "-" + value
                );
              }
            } else {
              if (value >= 1) {
                if (value == 1) {
                  let clearElement = clearExtraSpaces(
                      firstSelectedElement.className
                    ),
                    classes = clearElement.split(" "),
                    length = classes.length;

                  firstSelectedElement.removeAttribute("data-value");

                  if (length == 1) {
                    firstSelectedElement.removeAttribute("class");
                  } else {
                    for (let j = 0; j < length; j++) {
                      let classBeginning = classes[j].substring(0, 6);

                      if (classBeginning == "indent") {
                        classes.splice(j, 1);

                        j--;
                        length--;
                      }
                    }
                    if (length == 0) {
                      firstSelectedElement.removeAttribute("class");
                    }
                    classes = classes.join(" ");
                    firstSelectedElement.className = clearExtraSpaces(classes);
                  }
                } else {
                  // repeated code too
                  //
                  let classes = firstSelectedElement.className.split(" "),
                    length = classes.length;

                  for (let j = 0; j < length; j++) {
                    let classBeginning = classes[j].substring(0, 6);

                    if (classBeginning == "indent") {
                      classes.splice(j, 1);

                      j--;
                      length--;
                    }
                  }

                  classes = classes.join(" ");
                  value--;

                  firstSelectedElement.attributes[
                    "data-value"
                  ].nodeValue = value;

                  firstSelectedElement.className = clearExtraSpaces(
                    classes + " " + classBeginning + "-" + value
                  );
                  //
                  //
                }
              }
            }
          } else if (className == "indent+") {
            firstSelectedElement.setAttribute("data-value", 1);

            let value = firstSelectedElement.attributes["data-value"].value;

            firstSelectedElement.className = clearExtraSpaces(
              firstSelectedElementClassName + " " + classBeginning + "-" + value
            );
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
          firstSelectedElement.removeAttribute("class");
        } else if (firstSelectedElement.className != undefined) {
          if (firstSelectedElement.className == "") {
            firstSelectedElement.className = className;
          } else {
            let classes = firstSelectedElement.className.split(" "),
              length = classes.length;

            if (length == 1) {
              let classNameIndex = className.indexOf("-"),
                classNameBeginning = className.substring(0, classNameIndex),
                classIndex = firstSelectedElement.className.indexOf("-"),
                classBeginning = firstSelectedElement.className.substring(
                  0,
                  classIndex
                );

              if (classNameBeginning == classBeginning) {
                firstSelectedElement.className = className;
              } else {
                firstSelectedElement.className =
                  firstSelectedElement.className + " " + className;
              }
            } else {
              // repeated code
              //
              let classNameIndex = className.indexOf("-"),
                classNameBeginning = className.substring(0, classNameIndex);

              // classes.push(className);
              // classes = classes.join(" ");
              // firstSelectedElement.className = clearExtraSpaces(
              //   classes + " " + className
              // );

              for (let j = 0; j < length; j++) {
                let classIndex = classes[j].indexOf("-"),
                  classBeginning = classes[j].substring(0, classIndex);

                if (classBeginning == classNameBeginning) {
                  classes.splice(j, 1);
                  j--;
                  length--;
                }
              }
              classes = classes.join(" ");
              console.log(classes);
              firstSelectedElement.className = clearExtraSpaces(
                classes + " " + className
              );
              //
              //
            }
          }
        }
        firstSelectedElement = firstSelectedElement.nextSibling;
      } while (
        firstSelectedElement.nextSibling !=
        lastSelectedElement.nextElementSibling
      );
    }
  }
}

//It highlights specific words in <pre> tag
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

//It highlights all numbers in <pre> tag
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

//It deletes all tags in <pre> tag
function clearTagsAtPreContainer() {
  let preList = document.getElementsByTagName("PRE");
  for (let i = 0; i <= preList.length - 1; i++) {
    let preListTextContent = preList[i].textContent;
    preList[i].innerHTML = preListTextContent;
  }
}

//It sets spellcheck attribute to false (spellcheck=false) to selected <pre> tags
function removeSpellcheck() {
  let pres = document.querySelectorAll("pre:not([spellcheck])");
  for (let i = 0; i <= pres.length - 1; i++) {
    let pre = pres[i];
    pre.setAttribute("spellcheck", "false");
  }
}

function replaceDivs() {
  console.time();

  let element = document.getElementById("work-area"),
    children = element.children,
    childrenLength = children.length;

  for (let i = 0; i < childrenLength; i++) {
    if (children[i].nodeName == "DIV") {
      replaceElement(children[i], "p");
    }
  }

  console.timeEnd();
}

let element = document.getElementById("work-area");
element.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    let savedSelection = rangy.saveSelection();

    setTimeout(replaceDivs, 1);
    rangy.restoreSelection(savedSelection);
  }
});

tests = () => {
  let selection = document.getSelection(),
    range = selection.getRangeAt(0),
    fragment = range.cloneContents();

  console.log(selection);
  replaceContainerTag("ul");
};
