function generateUUID() {
  let uuid = '';
  for (let i = 0; i < 32; i++) {
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += Math.floor(Math.random() * 16).toString(16);
  }
  return uuid;
}

const uuid = generateUUID();
const uuid2 = generateUUID();
const uuid3 = generateUUID();
const uuid4 = generateUUID();

document.addEventListener('DOMContentLoaded', () => {
  let bModule = `
  "modules": [
      {
        "type": "data",
        "uuid": "${uuid2}",
        "version": [
          1,
          0,
          0
        ]
      }
    ]
  `;
  let scriptModule = `
  "modules": [
      {
          "type": "script",
          "language": "javascript",
          "uuid": "${uuid2}",
          "entry": "scripts/main.js",
          "version": [
              0,
              1,
              0
          ]
      }
    ],
    "capabilities": [
      "script_eval"
    ],
    "dependencies": [
      {
          "module_name": "@minecraft/server",
          "version": "1.1.0-beta"
      },
      {
          "module_name": "@minecraft/server-ui",
          "version": "1.0.0-beta"
      }
    ]
  `;
  let name_ = "";
  let desc_ = "";
  let isScriptModule = false;
  const namepackInput = document.querySelector("#namepack");
  const descriptionpackInput = document.querySelector("#descriptionpack");
  const toggle = document.querySelector("#toggle");

  const codeElement = document.querySelector("#bp");
  const codeElement2 = document.querySelector("#rp");

  codeElement.addEventListener("click", async () => {
    const codeText = codeElement.innerText.trim();
    await navigator.clipboard.writeText(codeText);
    alert("¡Código de behavior pack se ha copiado al portapapeles!");
  });

  codeElement2.addEventListener("click", async () => {
    const codeText2 = codeElement2.innerText.trim();
    await navigator.clipboard.writeText(codeText2);
    alert("¡Código de resource pack se ha copiado al portapapeles!");
  });


  namepackInput.addEventListener("input", () => {
    name_ = namepackInput.value;
    updateManifestB();
  });

  descriptionpackInput.addEventListener("input", () => {
    desc_ = descriptionpackInput.value;
    updateManifestB();
  });

  toggle.addEventListener("click", () => {
    isScriptModule = !isScriptModule;
    updateManifestB();
  });

  function updateManifestB() {
    let moduleSet = isScriptModule ? scriptModule : bModule;
    const manifestB = `
//Behavior
{
  "format_version": 2,
  "header": {
    "name": "${name_}",
    "description": "${desc_}",
    "uuid": "${uuid}",
    "version": [
      1,
      0,
      0
    ],
    "min_engine_version": [
      1,
      17,
      0
    ]
  },${moduleSet}}
    `;
    const manifestR = `
//Resource
{
  "format_version": 2,
  "header": {
    "name": "${name_}",
    "description": "${desc_}",
    "uuid": "${uuid3}",
    "version": [
      1,
      0,
      0
    ],
    "min_engine_version": [
      1,
      17,
      0
    ]
  },
  "modules": [
    {
      "type": "resources",
      "uuid": "${uuid4}",
      "version": [
        1,
        0,
        0
      ]
    }
  ]
}
    `;
    // Actualizar el código HTML correspondiente
    const manifestBElement = document.querySelector(".codes .box3:first-child code");
    manifestBElement.innerText = manifestB;
    const manifestRElement = document.querySelector(".codes .box3:nth-child(2) code");
    manifestRElement.innerText = manifestR;
  }
});
