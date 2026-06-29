const fs = require('fs');
const path = require('path');

const targetDirs = [
    'app',
    'components',
    'hooks',
    'packages/shared/ui/ARC_modal',
    'packages/shared/ui/ARC_button',
    'packages/shared/ui/ARC_select'
];

function walkDir(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(walkDir(fullPath));
        } else if (fullPath.endsWith('.tsx')) {
            files.push(fullPath);
        }
    }
    return files;
}

const allFiles = targetDirs.flatMap(dir => {
    const fullDir = path.join('/Users/teaz/Documents/Code/theInsightArcNextJS', dir);
    return fs.existsSync(fullDir) ? walkDir(fullDir) : [];
});

let updatedFiles = 0;

allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    const componentRegex = /<(Button|FAB|Chip|SegmentedButton)([\s\S]*?)>/g;

    content = content.replace(componentRegex, (match, compName, attrs) => {
        if (!/\blabel=/.test(attrs)) return match;

        const iconModeRegex = /variantMode=['"]Icon['"]/;
        const isStrictIcon = iconModeRegex.test(attrs) || compName === 'FAB' || compName === 'SegmentedButton';
        const hasChildren = /\bchildren=/.test(attrs) || />[\s\S]*<\//.test(match);

        const labelRegex = /\blabel=({[^}]+}|"[^"]+"|'[^']+')/g;
        
        const newAttrs = attrs.replace(labelRegex, (labelMatch, labelVal) => {
            if (isStrictIcon) {
                return `ariaLabel=${labelVal}`;
            } else if (hasChildren) {
                return ``; // remove completely
            } else {
                return `children=${labelVal}`;
            }
        });

        return `<${compName}${newAttrs}>`;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
        updatedFiles++;
    }
});

console.log(`Migration complete. Updated ${updatedFiles} files.`);
