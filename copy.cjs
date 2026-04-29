const fs = require('fs');

const files = [
  {
    src: "C:\\Users\\yasht\\.gemini\\antigravity\\brain\\4d571303-792e-4c7d-8c86-5c681c780ba7\\aina_mahal_1777431354770.png",
    dest: "c:\\Users\\yasht\\OneDrive\\Desktop\\ktj\\public\\placeimges\\ainamahal.png"
  },
  {
    src: "C:\\Users\\yasht\\.gemini\\antigravity\\brain\\4d571303-792e-4c7d-8c86-5c681c780ba7\\vijay_vilas_palace_1777431368441.png",
    dest: "c:\\Users\\yasht\\OneDrive\\Desktop\\ktj\\public\\placeimges\\vijayvilas.png"
  },
  {
    src: "C:\\Users\\yasht\\.gemini\\antigravity\\brain\\4d571303-792e-4c7d-8c86-5c681c780ba7\\jesal_toral_1777431384002.png",
    dest: "c:\\Users\\yasht\\OneDrive\\Desktop\\ktj\\public\\placeimges\\jesaltoral.png"
  }
];

files.forEach(f => {
  if (fs.existsSync(f.src)) {
    fs.copyFileSync(f.src, f.dest);
    console.log("Copied", f.src, "to", f.dest);
  } else {
    console.log("File not found:", f.src);
  }
});
