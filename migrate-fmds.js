const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const sizingRegex = /\b(p|m|px|py|pt|pr|pb|pl|mx|my|mt|mr|mb|ml|gap|space-x|space-y|top|bottom|left|right|w|h|min-w|max-w|min-h|max-h|rounded|ring|border|outline-offset)-([0-9]+(\.[0-9]+)?)\b/g;

// Tailwind text sizes maps roughly to pixel sizes
const textMap = {
    'xs': '12',
    'sm': '14',
    'base': '16',
    'lg': '18',
    'xl': '20',
    '2xl': '24',
    '3xl': '30',
    '4xl': '36',
    '5xl': '48',
    '6xl': '60',
    '7xl': '72',
    '8xl': '96',
    '9xl': '128'
};
const textRegex = /\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/g;

// Tailwind rounded sizes
const roundedMap = {
    'sm': '4',
    'md': '6',
    'lg': '8',
    'xl': '12',
    '2xl': '16',
    '3xl': '24'
};
const roundedRegex = /\brounded-(sm|md|lg|xl|2xl|3xl)\b/g;
const plainRounded = /\brounded\b(?![-\w])/g;

const shadowMap = {
    'sm': 'blur-s-4 shadow-black/5',
    'md': 'blur-s-6 shadow-black/10',
    'lg': 'blur-s-16 shadow-black/10',
    'xl': 'blur-s-24 shadow-black/10',
    '2xl': 'blur-s-48 shadow-black/25',
};
const shadowRegex = /\bshadow-(sm|md|lg|xl|2xl)\b/g;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // 1. Spacing and Sizing (multiply by 4)
    content = content.replace(sizingRegex, (match, prefix, val) => {
        let numVal = parseFloat(val);
        if (!isNaN(numVal)) {
            let pixels = Math.round(numVal * 4);
            return `${prefix}-s-${pixels}`;
        }
        return match;
    });

    // 2. Text Sizes
    content = content.replace(textRegex, (match, size) => {
        if (textMap[size]) {
            return `text-s-${textMap[size]}`;
        }
        return match;
    });

    // 3. Rounded Sizes
    content = content.replace(roundedRegex, (match, size) => {
        if (roundedMap[size]) {
            return `rounded-s-${roundedMap[size]}`;
        }
        return match;
    });
    content = content.replace(plainRounded, 'rounded-s-4');

    // 4. Shadows
    content = content.replace(shadowRegex, (match, size) => {
        if (shadowMap[size]) {
            return shadowMap[size];
        }
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

try {
    const files = getAllFiles(srcDir);
    files.forEach(processFile);
    console.log('FMDS Migration Complete!');
} catch (err) {
    console.error('Error during migration:', err);
}
