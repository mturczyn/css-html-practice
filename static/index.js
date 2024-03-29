// When hosted in nginx (and probably in other servers),
// we don't need base directory, as we have base URL as
// base directory.

// Mian page for each directory.
const INDEX = 'index.html'

// Directories with particular sites.
const FLEXBOX = 'flexbox/'
const GRID = 'grid/'
const LAYOUT = 'layout/'
const MAIN_PAGE = ''
const TEST_AREA = 'test-area/'
const COLORS = 'colors/'
const SPACING = 'spacing/'
const INHERITANCE = 'inheritance/'
const LOGICAL_PROPERTIES = 'logical-properties/'
const PSEUDO_ELEMENTS = 'pseudo-elements/'
const PSEUDO_CLASSES = 'pseudo-classes/'
const BORDERS = 'borders/'
const SHADOWS = 'shadows/'
const SELECTORS_AND_CASCADE = 'selectors-and-cascade/'
const FOCUS = 'focus/'
const FUNCTIONS = 'functions/'
const GRADIENTS = 'gradients/'
const Z_INDEX = 'z-index/'
const ANIMATIONS = 'animations/'
const FILTERS = 'filters/'
const BLEND_MODES = 'blend-modes/'
const LISTS = 'lists/'
const TRANSITIONS = 'transitions/'
const OVERFLOW = 'overflow/'
const BACKGROUND = 'backgrounds/'
const TEXT_AND_TYPOGRAPHY = 'text-and-typography/'
const RESPONSIVE_DESIGN = 'responsive-design/'
const IMAGES = 'images/'
const STYLING_CHECKBOXES = 'styling-checkboxes'
const PWA = 'pwa/'

// Responsive design subdirectories
const MEDIA_QUERIES = 'media-queries/'
const MACRO_LAYOUTS = 'macro-layouts/'
const MICRO_LAYOUTS = 'micro-layouts/'
const RESPONSIVE_TYPOGRAPHY = 'typography/'
const THEMING = 'theming/'
const INTERACTION = 'interaction/'

// HTML directory and subdirectories
const HTML = 'html/'

// Forms directory and subdirectories
const FORMS = 'forms/'

function addEventListenerToElement(elementId, eventName, callback) {
    document.getElementById(elementId).addEventListener(eventName, callback)
}

function setBodyStyleCustomProperty(name, value) {
    document.body.style.setProperty(name, value)
}

function setElementInnerText(elementId, text) {
    document.getElementById(elementId).innerText = text
}

function goTo(path) {
    window.location = path
}

function goToPwa() {
    goTo(PWA)
}

function goToStylingCheckboxes() {
    goTo(STYLING_CHECKBOXES)
}

function goToForms() {
    goToPage(FORMS)
}

function getPagePath(whereTo) {
    return `${whereTo}${INDEX}`
}

function goToResponsiveDesignPage(pageDir) {
    goToPage(RESPONSIVE_DESIGN + pageDir)
}

function goToPage(pageDir) {
    let pagePath = getPagePath(pageDir)
    let targetPath = getRelativePath(window.location.href, pagePath)
    goTo(targetPath)
}

function goToHtml() {
    goToPage(HTML)
}

function goToInteraction() {
    goToResponsiveDesignPage(INTERACTION)
}

function goToTheming() {
    goToResponsiveDesignPage(THEMING)
}

function goToImages() {
    goToResponsiveDesignPage(IMAGES)
}

function goToResponsiveTypography() {
    goToResponsiveDesignPage(RESPONSIVE_TYPOGRAPHY)
}

function goToMicroLayouts() {
    goToResponsiveDesignPage(MICRO_LAYOUTS)
}

function goToMacroLayouts() {
    goToResponsiveDesignPage(MACRO_LAYOUTS)
}

function goToMediaQueries() {
    goToResponsiveDesignPage(MEDIA_QUERIES)
}

function goToResponsiveDesign() {
    goToPage(RESPONSIVE_DESIGN)
}

function goToTextAndTypography() {
    goToPage(TEXT_AND_TYPOGRAPHY)
}

function goToBackgrounds() {
    goToPage(BACKGROUND)
}

function goToOverflow() {
    goToPage(OVERFLOW)
}

function goToTransitions() {
    goToPage(TRANSITIONS)
}

function goToLists() {
    goToPage(LISTS)
}

function goToBlendModes() {
    goToPage(BLEND_MODES)
}

function goToFilters() {
    goToPage(FILTERS)
}

function goToGradients() {
    goToPage(GRADIENTS)
}

function goToAnimations() {
    goToPage(ANIMATIONS)
}

function goToFunctions() {
    goToPage(FUNCTIONS)
}

function goToZIndex() {
    goToPage(Z_INDEX)
}

function goToFocus() {
    goToPage(FOCUS)
}

function goToSelectorsAndCascade() {
    goToPage(SELECTORS_AND_CASCADE)
}

function goToShadows() {
    goToPage(SHADOWS)
}

function goToBorders() {
    goToPage(BORDERS)
}

function goToPseudoClasses() {
    goToPage(PSEUDO_CLASSES)
}

function goToPseudoElements() {
    goToPage(PSEUDO_ELEMENTS)
}

function goToTestArea() {
    goToPage(TEST_AREA)
}

function goToSpacing() {
    goToPage(SPACING)
}

function goToInheritance() {
    goToPage(INHERITANCE)
}

function goToLogicalProperties() {
    goToPage(LOGICAL_PROPERTIES)
}

function goToGrid() {
    goToPage(GRID)
}

function goToFlexBox() {
    goToPage(FLEXBOX)
}

function goToLayout() {
    goToPage(LAYOUT)
}

function goToMainPage() {
    goToPage(MAIN_PAGE)
}

function goToColors() {
    goToPage(COLORS)
}

function createElementAndAppend(tag, text, element, scrollToElement) {
    const newElement = createElement(tag, text)
    element.appendChild(newElement)
    scrollToElement && newElement.scrollIntoView()
}

function createElementAndAppendById(tag, text, id, scrollToElement) {
    const container = document.getElementById(id)
    const newElement = createElement(tag, text)
    container?.appendChild(newElement)
    scrollToElement && newElement.scrollIntoView()
}

function createElement(tag, text) {
    const newElement = document.createElement(tag)
    const innerText = document.createTextNode(text)
    newElement.appendChild(innerText)
    return newElement
}

function appendListItem(listId, scrollToElement) {
    const itemCount = document.getElementById(listId).children.length
    createElementAndAppendById(
        'li',
        `item ${itemCount + 1}`,
        listId,
        scrollToElement
    )
}

/**
 * Given a source directory and a target filename, return the relative
 * file path from source to target.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path (e.g. "../../style.css") as {String}
 */
function getRelativePath(source, target) {
    source = source.startsWith('file:///')
        ? source.replace('file:///', '')
        : source

    var sep = source.indexOf('/') !== -1 ? '/' : '\\',
        targetArr = target.split(sep),
        sourceArr = source.split(sep),
        filename = targetArr.pop(),
        targetPath = targetArr.join(sep),
        relativePath = ''

    // If source path was given with file at the end, we want to remove it.
    let lastItem = sourceArr[sourceArr.length - 1]
    if (lastItem && lastItem.includes('.')) {
        sourceArr.pop()
    }

    while (targetPath.indexOf(sourceArr.join(sep)) === -1) {
        sourceArr.pop()
        relativePath += '..' + sep
    }

    var relPathArr = targetArr.slice(sourceArr.length)
    relPathArr.length && (relativePath += relPathArr.join(sep) + sep)

    return relativePath + filename
}

function getRelativePathToRoot(target) {
    return getRelativePath('', target)
}
