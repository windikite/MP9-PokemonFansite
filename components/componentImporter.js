async function addHeader() {
    const resp = await fetch("/components/header.html");
    const html = await resp.text();
    document.body.insertAdjacentHTML("afterbegin", html);
}
async function addFooter() {
    const resp = await fetch("/components/footer.html");
    const html = await resp.text();
    document.body.insertAdjacentHTML("beforeend", html);
}

addHeader()
addFooter()