const cipherMap = {
    "a": "qwszx", "b": "fghvn", "c": "sdfxv", "d": "wersfxcv", "e": "234wrsdf",
    "f": "ertdgcvb", "g": "rtyfhvbn", "h": "tyugjbnm", "i": "789uojkl", "j": "yuihknm,",
    "k": "uiojlm,.", "l": "iopk;,./", "m": "hjkn,", "n": "ghjbm", "o": "890ipkl;",
    "p": "90-o[l;’", "q": "12was", "r": "345etdfg", "s": "qweadzxc", "t": "456ryfgh",
    "u": "678yihjk", "v": "dfgcb", "w": "123qeasd", "x": "asdzc", "y": "567tughj",
    "z": "asx", ",": "kl;m.", ".": "l;’,/", "‘": "p[];", "“": "P{}:", 
    "-": "0=p[]", "–": ")+P{}", ":": "OP{L”", ";": "op[l’", "!": "2qw", 
    "?": ".;’", "(": "80iop", ")": "9-op[", "1": "1", "2": "2", "3": "3", 
    "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", " ": "-"
};

const decryptionMap = {};
for (const [key, value] of Object.entries(cipherMap)) {
    decryptionMap[value] = key;
}

let currentMode = 'encrypt';

function setMode(mode) {
    currentMode = mode;
    document.getElementById('btn-encrypt').classList.toggle('active', mode === 'encrypt');
    document.getElementById('btn-decrypt').classList.toggle('active', mode === 'decrypt');
    document.getElementById('input-label').innerText = mode === 'encrypt' ? 'Text to Encrypt:' : 'Text to Decrypt:';
    document.getElementById('input-text').placeholder = mode === 'encrypt' ? 'Type your text here...' : 'Paste your encrypted chunks here...';
    document.getElementById('input-text').value = '';
    document.getElementById('output-text').value = '';
    
    // Reset copy button visual state if changed
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.innerText = '📋 Copy';
    copyBtn.classList.remove('copied');
}

function processText() {
    const input = document.getElementById('input-text').value;
    let result = '';

    if (currentMode === 'encrypt') {
        const cleanInput = input.toLowerCase();
        const encryptedList = [];
        
        for (let char of cleanInput) {
            if (cipherMap[char]) {
                encryptedList.push(cipherMap[char]);
            } else {
                encryptedList.push(char);
            }
        }
        result = encryptedList.join(' ');
    } else {
        const chunks = input.trim().split(/\s+/); // Handles single spaces or multi-line spaces
        const decryptedList = [];
        
        for (let chunk of chunks) {
            if (decryptionMap[chunk]) {
                decryptedList.push(decryptionMap[chunk]);
            } else {
                decryptedList.push(chunk);
            }
        }
        result = decryptedList.join('');
    }

    document.getElementById('output-text').value = result;
    
    // Reset copy button state when new text is generated
    const copyBtn = document.getElementById('copy-btn');
    copyBtn.innerText = '📋 Copy';
    copyBtn.classList.remove('copied');
}

function copyToClipboard() {
    const outputText = document.getElementById('output-text');
    if (!outputText.value) return;

    navigator.clipboard.writeText(outputText.value).then(() => {
        const copyBtn = document.getElementById('copy-btn');
        copyBtn.innerText = '✅ Copied!';
        copyBtn.classList.add('copied');
        
        // Flash back to normal text after 2 seconds
        setTimeout(() => {
            copyBtn.innerText = '📋 Copy';
            copyBtn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
