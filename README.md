Lupus Diagnosis (Frontend)
---

![CI Build Android](https://github.com/sutanlab/lupus-diagnosis--frontend/workflows/CI%20Build%20Android/badge.svg)

(TA) Aplikasi Frontend untuk diagnosa Penyakit Lupus.

Related with backend: [Lupus Diagnosis (Backend)](https://github.com/sutanlab/lupus-diagnosis--backend).

### Cara Menginstall Project
1. Download dan Install [NodeJS](https://www.nodejs.org) dan [GitBash](https://gitforwindows.org/)
2. Jalankan Gitbash dan ketikkan `git clone https://github.com/sutanlab/lupus-diagnosis--frontend.git`
3. Setelah selesai kloning, masuk ke dalam folder project yang sudah di clone tadi. Lalu ketikkan `npm install` atau `yarn install`.
4. Lalu ikuti konfigurasi [disini](https://www.techfor.id/cara-install-react-native-di-sistem-operasi-windows/) (HANYA PERLU MENGIKUTI LANGKAH 1 & 2 SAJA).
5. Setelah semua nya aman, tinggal rename file `env.example.ts` di folder `src/configs` menjadi `env.ts`, dan ubah value `APP_API_BASEURL` nya dari `'http://localhost:3000'` menjadi `'http://api.lupus-diagnosis.sutanlab.id/api'`
6. Terakhir, sambungkan HP android yang sudah disetting `USB DEBUGGING` ke laptop, atau jika tidak, siapkan Android Emulator dari Android Studio, lalu langsung ketik di GitBash tadi `npm run android` (Memulai aplikasi dengan Android Emulator di Android Studio).

---

2020 Sutan Gading Fadhillah Nasution.
