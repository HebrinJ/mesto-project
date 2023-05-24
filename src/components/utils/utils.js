
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
    evt.preventDefault();

    const initialText = evt.submitter.textContent;
    setLoadingStateText(evt.submitter, loadingText, evt.target.textContent);

    request()
        .then(() => {
            evt.target.reset();
        })
        .catch((err) => console.error(`Ошибка: ${err}`))
        .finally(() => {
            removeLoadingText(evt.submitter, initialText);
        });
}

function setLoadingStateText(element, newText) {
    element.textContent = newText;
}

function removeLoadingText(element, oldText) {
    element.textContent = oldText;
}
