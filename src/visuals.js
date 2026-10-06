// Purpose-built system illustrations, not simulated product screenshots.
const frame = (content) => `<svg viewBox="0 0 640 340" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${content}</svg>`;
const text = (x, y, label, size = 12, color = 'currentColor') => `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-family="DM Mono, monospace" text-anchor="middle">${label}</text>`;

export const visuals = {
  prodigy: frame(`
    <path d="M123 124H225M123 216H225M321 170H403M489 170H551" stroke="#778177" stroke-width="1.5"/>
    <path d="M123 124H185V170H225M123 216H185V170" stroke="#778177" stroke-width="1.5"/>
    <rect x="49" y="100" width="100" height="48" rx="5" fill="#333e33" stroke="#65725f"/>
    <rect x="49" y="192" width="100" height="48" rx="5" fill="#333e33" stroke="#65725f"/>
    ${text(99,129,'documents',11,'#d5ddd0')}${text(99,221,'context',11,'#d5ddd0')}
    <rect x="225" y="122" width="96" height="96" rx="12" fill="#dbeab5"/>
    <path d="M273 142V198M245 170H301M253 150L293 190M293 150L253 190" stroke="#344132" stroke-width="1.5"/>
    <circle cx="273" cy="170" r="16" fill="#dbeab5" stroke="#344132" stroke-width="1.5"/>
    ${text(273,248,'semantic retrieval',11,'#b8c4af')}
    <rect x="403" y="146" width="86" height="48" rx="5" fill="#333e33" stroke="#65725f"/>
    ${text(446,175,'reasoning',11,'#d5ddd0')}
    <circle cx="566" cy="170" r="20" stroke="#dbeab5" stroke-width="1.5"/>
    <path d="M558 170L564 176L575 164" stroke="#dbeab5" stroke-width="1.5"/>
    ${text(566,219,'action',11,'#b8c4af')}
    <circle cx="185" cy="170" r="3" fill="#dbeab5"/>
  `),
  lifelens: frame(`
    <rect x="79" y="81" width="178" height="178" rx="2" stroke="#899b97"/>
    <path d="M79 125H257M79 170H257M79 214H257M123 81V259M168 81V259M212 81V259" stroke="#b6c4bd" stroke-width=".7"/>
    <circle cx="169" cy="170" r="67" fill="#b1c2ad"/>
    <circle cx="174" cy="167" r="49" fill="#819b80"/>
    <circle cx="181" cy="160" r="30" fill="#547856"/>
    <circle cx="181" cy="160" r="12" fill="#dceab7"/>
    <path d="M70 107V72H105M231 72H266V107M70 233V268H105M231 268H266V233" stroke="#345442" stroke-width="2"/>
    <path d="M284 170H352" stroke="#6d8778" stroke-dasharray="4 5"/>
    <rect x="373" y="103" width="179" height="134" rx="5" fill="#e6ebe2" stroke="#a9b8aa"/>
    ${text(462,135,'MODEL EXPLAINABILITY',10,'#466451')}
    <path d="M398 161H523M398 184H488M398 207H458" stroke="#a7b9a3" stroke-width="7"/>
    <path d="M398 161H510M398 184H454M398 207H425" stroke="#547856" stroke-width="7"/>
    ${text(168,300,'Grad-CAM activation map',11,'#466451')}
  `),
  benefit: frame(`
    <circle cx="238" cy="170" r="106" stroke="#614442" stroke-width="20"/>
    <circle cx="238" cy="170" r="106" stroke="#efbfa4" stroke-width="20" stroke-dasharray="490 667" transform="rotate(-90 238 170)"/>
    <circle cx="238" cy="170" r="74" stroke="#614442" stroke-width="15"/>
    <circle cx="238" cy="170" r="74" stroke="#cfd99d" stroke-width="15" stroke-dasharray="310 465" transform="rotate(-90 238 170)"/>
    <circle cx="238" cy="170" r="46" stroke="#614442" stroke-width="11"/>
    <circle cx="238" cy="170" r="46" stroke="#baa1bb" stroke-width="11" stroke-dasharray="224 290" transform="rotate(-90 238 170)"/>
    <path d="M226 170L235 179L252 160" stroke="#f4e8df" stroke-width="2"/>
    <circle cx="415" cy="121" r="4" fill="#efbfa4"/>${text(475,125,'NUTRITION',11,'#edd7cb')}
    <circle cx="415" cy="170" r="4" fill="#cfd99d"/>${text(473,174,'MOVEMENT',11,'#edd7cb')}
    <circle cx="415" cy="219" r="4" fill="#baa1bb"/>${text(473,223,'PROGRESS',11,'#edd7cb')}
  `),
  caesar: frame(`
    <path d="M320 169L153 94M320 169L490 94M320 169L153 248M320 169L490 248" stroke="#84919c" stroke-width="1.5" stroke-dasharray="5 6"/>
    <rect x="104" y="70" width="98" height="48" rx="5" fill="#2f3e4a" stroke="#6a7d8c"/>
    <rect x="439" y="70" width="102" height="48" rx="5" fill="#2f3e4a" stroke="#6a7d8c"/>
    <rect x="104" y="224" width="98" height="48" rx="5" fill="#2f3e4a" stroke="#6a7d8c"/>
    <rect x="439" y="224" width="102" height="48" rx="5" fill="#2f3e4a" stroke="#6a7d8c"/>
    ${text(153,99,'knowledge',11,'#d6dfe4')}${text(490,99,'workspace',11,'#d6dfe4')}
    ${text(153,253,'Discord',11,'#d6dfe4')}${text(490,253,'automation',11,'#d6dfe4')}
    <circle cx="320" cy="169" r="48" fill="#cfdbdf"/>
    <circle cx="320" cy="169" r="33" stroke="#344858" stroke-width="1.5"/>
    <path d="M302 169H338M320 151V187" stroke="#344858" stroke-width="1.5"/>
    ${text(320,249,'shared workflow state',11,'#bdcbd3')}
  `),
  system: frame(`<rect x="90" y="135" width="120" height="70" rx="6" stroke="currentColor"/><path d="M210 170H430" stroke="currentColor" stroke-dasharray="5 5"/><rect x="430" y="135" width="120" height="70" rx="6" stroke="currentColor"/>${text(150,176,'input',14)}${text(490,176,'output',14)}`),
};
