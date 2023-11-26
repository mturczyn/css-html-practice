const FLEXBOX = '/layout/flexbox/'
const LAYOUT = '/layout/'
const MAIN_PAGE = '/'
const COLORS = '/colors/'
const INDEX = 'index.html'
const BASE_DIR = 'C:/Users/MT/source/repos/css-practice'

function goTo(path) {
    window.location = path
}

function getPagePath(whereTo) {
    return `${BASE_DIR}${whereTo}${INDEX}`
}

function goToPage(pageDir) {
    let pagePath = getPagePath(pageDir)
    let targetPath = getRelativePath(window.location.href, pagePath)
    goTo(targetPath)
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
    return getRelativePath(BASE_DIR, target)
}
