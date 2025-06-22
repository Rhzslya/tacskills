# 🎮 TacSkills

**TacSkills** adalah game Tic Tac Toe interaktif dengan twist modern: pemain dapat menggunakan skill spesial seperti **Delete**, **Convert**, dan **Sweep** untuk mengubah jalannya permainan. Game ini dibangun menggunakan teknologi web modern seperti **React**, **TypeScript**, **Vite**, dan **Framer Motion**, serta dijalankan dengan kecepatan tinggi berkat **Bun**.

---

## 🚀 Tech Stack

| Tool                                            | Keterangan                                         |
| ----------------------------------------------- | -------------------------------------------------- |
| [Vite](https://vitejs.dev/)                     | Build tool ringan & cepat untuk React              |
| [React](https://reactjs.org/)                   | Library utama untuk membangun UI                   |
| [TypeScript](https://www.typescriptlang.org/)   | Superset dari JavaScript dengan type safety        |
| [Bun](https://bun.sh/)                          | Runtime JavaScript super cepat (pengganti Node.js) |
| [Framer Motion](https://www.framer.com/motion/) | Animasi React modern dan powerful                  |
| [Tailwind CSS](https://tailwindcss.com/)        | Utility-first CSS framework untuk styling cepat    |

---

## 🧠 Fitur Utama

- ✅ **Mode permainan:**
  - 1P vs Bot (dengan 3 tingkat kesulitan: Easy, Medium, Hard)
  - 2P (Player vs Player)
- ⚡ **Skill spesial:**
  - **Delete**: hapus simbol lawan
  - **Convert**: ubah simbol lawan jadi milikmu
  - **Sweep**: tukar simbol lawan dengan simbolmu
- 🎨 **Grid Variatif**: dukungan untuk 3x3, 4x4, 5x5, dan 6x6
- 🎯 **AI Bot** dengan logika langkah berbasis heuristic

---

## 📦 Instalasi & Menjalankan

### 1. Clone repositori

```bash
git clone https://github.com/username/tacskills.git
cd tacskills
```

### 2. Instal dependensi (gunakan Bun)

```bash
bun install
```

### 3. Jalankan proyek

```bash
bun run dev
```

Akses aplikasi di: [http://localhost:5173](http://localhost:5173)

---

## 📂 Struktur Folder

```
src/
├── components/      // Komponen reusable
├── pages/           // Halaman utama
├── utils/           // Helper, hooks, dan config
├── assets/          // Gambar dan ikon
├── styles/          // Global CSS
├── lib/             // Motion variants, class helpers
└── App.tsx          // Root komponen
```

---

## 💡 Catatan

- Game ini adalah bagian dari proyek sertifikasi **IBM Granite**, dibantu oleh AI language model **Granite 3.3 8B Instruct** melalui platform [Replicate](https://replicate.com/ibm-granite/granite-3.3-8b-instruct).
- Penggunaan AI sangat membantu dalam eksplorasi ide, debugging, dan optimisasi struktur proyek.

---

## 📜 Lisensi

MIT License

