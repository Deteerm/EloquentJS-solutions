const textarea = document.querySelector("textarea");
const form = document.querySelector("form");
const select = document.querySelector("select");
const add = document.getElementById("add");

let files = new Array();

window.onload = async function () {
  files = await fetch("/?")
    .then((res) => res.text())
    .then((txt) => (files = txt.split("\n")))
    .catch((e) => alert(e));

  files.forEach((file) => {
    let option = document.createElement("option");
    option.value = file;
    option.innerText = file;
    select.appendChild(option);
  });

  getFile(select.value);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(select.value, { method: "PUT", body: textarea.value })
    .then(async (r) => {
      if (r.status >= 400) {
        let mssg = await r.text();
        alert(mssg);
      }
    })
    .then(() => location.reload())
    .catch((e) => alert(e));
});

select.addEventListener("change", () => {
  getFile(select.value);
});

add.addEventListener("click", async (e) => {
  e.preventDefault();
  let fileName = await prompt("Filename: ");
  fetch(fileName, { method: "PUT" })
    .then(location.reload())
    .catch((e) => alert(e));
});

async function getFile(fileName) {
  let response = await fetch(fileName)
    .then(async (r) => {
      if (r.status >= 400) {
        let msg = await r.text();
        alert(msg);
        return msg;
      }
      return r.text();
    })
    .then((txt) => (textarea.value = txt))
    .catch((err) => alert(err));
  return response;
}
