setup('skew-input', 'deg', '--skew-angle', 'skew-value-span')
setup('degree-input', 'deg', '--rotate-angle', 'angle-value-span')

setup(
    'translate-x-input',
    'px',
    '--translate-x-value',
    'translate-x-value-span'
)

setup(
    'translate-y-input',
    'px',
    '--translate-y-value',
    'translate-y-value-span'
)

setupWithoutUnit('scale-input', '--scale-value', 'scale-value-span')

function setupWithoutUnit(inputId, customPropertyName, spanId) {
    setup(inputId, '', customPropertyName, spanId)
}

function setup(inputId, unit, customPropertyName, spanId) {
    let callback = getCallback(unit, customPropertyName, spanId)
    let inputElement = document.getElementById(inputId)
    addEventListenerToElement(inputId, 'input', callback)
    callback({ target: { value: inputElement.value } })
}

function getCallback(unit, customPropertyName, spanId) {
    return (e) => {
        let valueWithUnit = `${e.target.value}${unit}`
        setBodyStyleCustomProperty(customPropertyName, valueWithUnit)
        setElementInnerText(spanId, valueWithUnit)
    }
}
