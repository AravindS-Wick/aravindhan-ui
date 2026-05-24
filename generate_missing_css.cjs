const fs = require('fs');
const path = require('path');

const components = [
  { name: 'chip', classes: ['.av-chip', '.av-chip-group'] }, // already written properly but let script register it
  { name: 'file-upload', classes: ['.av-file-upload', '.av-file-upload-zone', '.av-file-upload-preview'] },
  { name: 'treeview', classes: ['.av-tree', '.av-tree-node', '.av-tree-children'] },
  { name: 'color-picker', classes: ['.av-color-picker', '.av-color-picker-swatch'] },
  { name: 'popover', classes: ['.av-popover', '.av-popover-content'] },
  { name: 'menu', classes: ['.av-menu', '.av-menu-item'] },
  { name: 'sidenav', classes: ['.av-sidenav', '.av-sidenav-item'] },
  { name: 'list', classes: ['.av-list', '.av-list-item'] },
  { name: 'paper', classes: ['.av-paper'] },
  { name: 'empty-state', classes: ['.av-empty-state', '.av-empty-state-icon'] },
  { name: 'kbd', classes: ['.av-kbd'] },
  { name: 'code', classes: ['.av-code', '.av-code-block'] },
  { name: 'toggle-button', classes: ['.av-toggle-button', '.av-toggle-button-group'] },
  { name: 'otp', classes: ['.av-otp', '.av-otp-input'] },
  { name: 'slider', classes: ['.av-slider', '.av-slider-track', '.av-slider-thumb'] },
  { name: 'rating', classes: ['.av-rating', '.av-rating-star'] },
  { name: 'combobox', classes: ['.av-combobox', '.av-combobox-list'] },
  { name: 'image', classes: ['.av-image', '.av-image-fallback'] },
];

let indexScss = fs.readFileSync(path.join(__dirname, 'src/index.scss'), 'utf-8');

components.forEach(comp => {
  const filePath = path.join(__dirname, `src/components/_${comp.name}.scss`);
  if (!fs.existsSync(filePath)) {
    const content = `@use '../tokens/variables' as *;\n\n` + 
      comp.classes.map(cls => `${cls} {\n  /* Auto-generated */\n  display: flex;\n  gap: var(--av-spacing-sm, 0.5rem);\n}\n`).join('\n');
    fs.writeFileSync(filePath, content);
    console.log(`Created ${comp.name}.scss`);
  }
  // Add to index.scss if not there
  if (!indexScss.includes(`@forward 'components/${comp.name}';`)) {
    indexScss += `@forward 'components/${comp.name}';\n`;
  }
});

fs.writeFileSync(path.join(__dirname, 'src/index.scss'), indexScss);
console.log('Updated index.scss');
