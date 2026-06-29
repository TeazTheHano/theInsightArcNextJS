const fs = require('fs');
const path = require('path');

const targetDirs = ['components', 'layouts'];

function walkDir(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(walkDir(fullPath));
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
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

    content = content.replace(/import\s+Button\s+from\s+['"][^'"]*Button\/Button['"];?/g, "import { ARC_Button as Button } from '@/packages/shared/ui/ARC_button';");
    content = content.replace(/import\s+FAB\s+from\s+['"][^'"]*Button\/FAB['"];?/g, "import { ARC_FAB as FAB } from '@/packages/shared/ui/ARC_button';");
    content = content.replace(/import\s+SegmentedButton\s+from\s+['"][^'"]*Button\/SegmentedButton['"];?/g, "import SegmentedButton from '@/packages/shared/ui/ARC_button/SegmentedButton';");
    content = content.replace(/import\s+Chip\s+from\s+['"][^'"]*Chip\/Chip['"];?/g, "import { ARC_Chip as Chip } from '@/packages/shared/ui/ARC_chip';");
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"][^'"]*LayoutDiv\/LayoutDiv['"];?/g, "import { $1 } from '@/packages/shared/ui/ARC_layout';");
    content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"][^'"]*TextBox\/textBox['"];?/g, "import { $1 } from '@/packages/shared/ui/ARC_typography';");
    content = content.replace(/import\s+TextField\s+from\s+['"][^'"]*TextInput\/TextField['"];?/g, "import TextField from '@/packages/shared/ui/ARC_text_input/TextField';");
    content = content.replace(/import\s+LazyImage\s+from\s+['"][^'"]*LazyImage\/lazyImage['"];?/g, "import { ARC_LazyImage as LazyImage } from '@/packages/shared/ui/ARC_image';");
    content = content.replace(/import\s+Divider\s+from\s+['"][^'"]*Divider\/Divider['"];?/g, "import { Divider } from '@/packages/shared/ui/ARC_layout';");
    content = content.replace(/import\s+Modal\s+from\s+['"][^'"]*Modal\/Modal['"];?/g, "import Modal from '@/packages/shared/ui/ARC_modal/Modal';");
    content = content.replace(/import\s+ShareModal\s+from\s+['"][^'"]*Modal\/ShareModal['"];?/g, "import ShareModal from '@/packages/shared/ui/ARC_modal/ShareModal';");

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated imports: ${filePath}`);
        updatedFiles++;
    }
});

console.log(`Import migration complete. Updated ${updatedFiles} files.`);
