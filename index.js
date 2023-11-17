let INDEX_PAGE = ''

function goTo(path) {
    window.location = path
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
