const SYAHRIL_EMAIL = 'syahrilmaulana743@gmail.com';
const SYAHRIL_PERAN = [
  'Mahasiswa Informatika',
  'Web Learner',
  'AI Enthusiast'
];

function syahrilAmbil(id) {
  return document.getElementById(id);
}

function syahrilBaca(kunci) {
  try {
    return localStorage.getItem(kunci);
  } catch (e) {
    return null;
  }
}

function syahrilSimpan(kunci, nilai) {
  try {
    localStorage.setItem(kunci, nilai);
  } catch (e) {
  
  }
}

const syahrilKurangGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

(function () {
  const tombol = syahrilAmbil('syahril_tombol_menu');
  const menu = syahrilAmbil('syahril_menu');

  function tutup() {
    menu.classList.remove('syahril_terbuka');
    tombol.setAttribute('aria-expanded', 'false');
    tombol.setAttribute('aria-label', 'Buka menu');
  }

  tombol.addEventListener('click', function () {
    const terbuka = menu.classList.toggle('syahril_terbuka');
    tombol.setAttribute('aria-expanded', String(terbuka));
    tombol.setAttribute('aria-label', terbuka ? 'Tutup menu' : 'Buka menu');
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      tutup();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      tutup();
    }
  });
})();


(function () {
  const tombol = syahrilAmbil('syahril_tombol_tema');
  const root = document.documentElement;

  function terapkan(tema) {
    if (tema === 'dark') {
      root.setAttribute('data-theme', 'dark');
      tombol.textContent = '☀️'; 
    } else {
      root.removeAttribute('data-theme');
      tombol.textContent = '🌙'; 
    }
  }

  const tersimpan = syahrilBaca('syahril_tema');
  const sistemGelap = window.matchMedia('(prefers-color-scheme: dark)').matches;
  terapkan(tersimpan || (sistemGelap ? 'dark' : 'light'));

  tombol.addEventListener('click', function () {
    const sekarangGelap = root.getAttribute('data-theme') === 'dark';
    const baru = sekarangGelap ? 'light' : 'dark';
    terapkan(baru);
    syahrilSimpan('syahril_tema', baru);
  });
})();

(function () {
  const target = syahrilAmbil('syahril_ketik');
  if (!target || syahrilKurangGerak) {
    return; 
  }

  let indeksKata = 0;
  let indeksHuruf = SYAHRIL_PERAN[0].length;
  let menghapus = true;

  function jalan() {
    const kata = SYAHRIL_PERAN[indeksKata];
    let tunda = menghapus ? 45 : 90;

    if (menghapus) {
      indeksHuruf--;
    } else {
      indeksHuruf++;
    }
    target.textContent = kata.slice(0, indeksHuruf);

    if (!menghapus && indeksHuruf === kata.length) {
      menghapus = true;
      tunda = 1500; 
    } else if (menghapus && indeksHuruf === 0) {
      menghapus = false;
      indeksKata = (indeksKata + 1) % SYAHRIL_PERAN.length;
      tunda = 300;
    }
    setTimeout(jalan, tunda);
  }

  setTimeout(jalan, 1800);
})();

(function () {
  const link = document.querySelectorAll('.syahril_menu_link');
  const bagian = [];

  link.forEach(function (a) {
    const id = a.getAttribute('href').slice(1);
    const elemen = syahrilAmbil(id);
    if (elemen) {
      bagian.push({ a: a, elemen: elemen });
    }
  });

  function perbarui() {
    const garis = window.scrollY + window.innerHeight * 0.35;
    let aktif = bagian[0];
    bagian.forEach(function (b) {
      if (b.elemen.offsetTop <= garis) {
        aktif = b;
      }
    });
   
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
      aktif = bagian[bagian.length - 1];
    }
    bagian.forEach(function (b) {
      b.a.classList.toggle('syahril_aktif', b === aktif);
    });
  }

  window.addEventListener('scroll', perbarui, { passive: true });
  window.addEventListener('resize', perbarui);
  perbarui();
})();


(function () {
  const daftar = document.querySelectorAll('.syahril_muncul');

  if (syahrilKurangGerak || !('IntersectionObserver' in window)) {
    return; 
  }

  const pengamat = new IntersectionObserver(function (entri) {
    entri.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('syahril_tampil');
        pengamat.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  daftar.forEach(function (el) {
    el.classList.add('syahril_siap');
    pengamat.observe(el);
  });
})();


(function () {
  const tombol = document.querySelectorAll('.syahril_filter_btn');
  const kartu = document.querySelectorAll('.syahril_project_kartu');
  const pesanKosong = syahrilAmbil('syahril_kosong');

  tombol.forEach(function (t) {
    t.addEventListener('click', function () {
      const filter = t.dataset.filter;
      let jumlah = 0;

      tombol.forEach(function (x) {
        x.classList.toggle('syahril_aktif', x === t);
      });

      kartu.forEach(function (k) {
        const kategori = k.dataset.kategori.split(' ');
        const tampil = filter === 'semua' || kategori.indexOf(filter) !== -1;
        k.hidden = !tampil;
        if (tampil) {
          jumlah++;
        }
      });

      pesanKosong.hidden = jumlah !== 0;
    });
  });
})();

(function () {
  const item = document.querySelectorAll('.syahril_faq_item');

  item.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        item.forEach(function (lain) {
          if (lain !== d) {
            lain.open = false;
          }
        });
      }
    });
  });
})();

(function () {
  const form = syahrilAmbil('syahril_form');
  const inputNama = syahrilAmbil('syahril_nama_input');
  const inputEmail = syahrilAmbil('syahril_email_input');
  const inputSubjek = syahrilAmbil('syahril_subjek_input');
  const inputPesan = syahrilAmbil('syahril_pesan_input');
  const hitung = syahrilAmbil('syahril_hitung_angka');
  const status = syahrilAmbil('syahril_status');

  function tampilError(input, idError, teks) {
    syahrilAmbil(idError).textContent = teks;
    input.classList.toggle('syahril_salah', teks !== '');
    input.setAttribute('aria-invalid', teks !== '' ? 'true' : 'false');
    return teks === '';
  }

  function cekNama() {
    const nilai = inputNama.value.trim();
    if (nilai.length < 3) {
      return tampilError(inputNama, 'syahril_error_nama', 'Nama minimal 3 karakter.');
    }
    return tampilError(inputNama, 'syahril_error_nama', '');
  }

  function cekEmail() {
    const nilai = inputEmail.value.trim();
    const pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pola.test(nilai)) {
      return tampilError(inputEmail, 'syahril_error_email', 'Masukkan alamat email yang valid.');
    }
    return tampilError(inputEmail, 'syahril_error_email', '');
  }

  function cekPesan() {
    const nilai = inputPesan.value.trim();
    if (nilai.length < 10) {
      return tampilError(inputPesan, 'syahril_error_pesan', 'Pesan minimal 10 karakter.');
    }
    return tampilError(inputPesan, 'syahril_error_pesan', '');
  }

  inputPesan.addEventListener('input', function () {
    hitung.textContent = String(inputPesan.value.length);
  });

  inputNama.addEventListener('blur', cekNama);
  inputEmail.addEventListener('blur', cekEmail);
  inputPesan.addEventListener('blur', cekPesan);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    status.style.color = '';

    const hasil = [cekNama(), cekEmail(), cekPesan()];
    if (hasil.indexOf(false) !== -1) {
      status.style.color = 'var(--syahril-salah)';
      status.textContent = 'Periksa kembali isian yang bertanda merah.';
      const salah = form.querySelector('.syahril_salah');
      if (salah) {
        salah.focus();
      }
      return;
    }

    const subjek = inputSubjek.value;
    const isi =
      'Nama: ' + inputNama.value.trim() + '\n' +
      'Email: ' + inputEmail.value.trim() + '\n\n' +
      inputPesan.value.trim();

    const isiPesan = encodeURIComponent(isi);
    const queryMailto = 'subject=' + encodeURIComponent(subjek) + '&body=' + isiPesan;
    // Gmail memakai parameter "su" untuk subjek (bukan "subject")
    const queryGmail = 'su=' + encodeURIComponent(subjek) + '&body=' + isiPesan;

    const tautanGmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' +
      encodeURIComponent(SYAHRIL_EMAIL) + '&' + queryGmail;
    const tautanMailto = 'mailto:' + SYAHRIL_EMAIL + '?' + queryMailto;

    window.open(tautanGmail, '_blank', 'noopener');

    // Simpan nama, lalu kosongkan form (reset juga menghapus pesan status)
    const namaPengirim = inputNama.value.trim();
    form.reset();

    status.textContent = 'Terima kasih, ' + namaPengirim +
      '! Gmail dibuka di tab baru, tinggal tekan Kirim di sana. ';
    const cadangan = document.createElement('a');
    cadangan.href = tautanMailto;
    cadangan.textContent = 'Tidak terbuka? Pakai aplikasi email.';
    status.appendChild(cadangan);
  });

  form.addEventListener('reset', function () {
    hitung.textContent = '0';
    status.textContent = '';
    [
      [inputNama, 'syahril_error_nama'],
      [inputEmail, 'syahril_error_email'],
      [inputPesan, 'syahril_error_pesan']
    ].forEach(function (p) {
      tampilError(p[0], p[1], '');
    });
  });
})();

(function () {
  const tombol = syahrilAmbil('syahril_ke_atas');

  window.addEventListener('scroll', function () {
    tombol.hidden = window.scrollY < 400;
  }, { passive: true });

  tombol.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: syahrilKurangGerak ? 'auto' : 'smooth' });
  });

  const foto = syahrilAmbil('syahril_foto_img');
  function sembunyikan() {
    foto.style.display = 'none';
  }
  foto.addEventListener('error', sembunyikan);
  if (foto.complete && foto.naturalWidth === 0) {
    sembunyikan();
  }

  syahrilAmbil('syahril_tahun').textContent = String(new Date().getFullYear());
})();

(function () {
  const dialog = syahrilAmbil('syahril_dialog');
  const judul = syahrilAmbil('syahril_dialog_judul');
  const tag = syahrilAmbil('syahril_dialog_tag');
  const isi = syahrilAmbil('syahril_dialog_isi');
  const tutup = syahrilAmbil('syahril_dialog_tutup');
  let pemicu = null;

  function buka(kartu, tombol) {
    pemicu = tombol;
    judul.textContent = kartu.querySelector('h3').textContent;
    tag.innerHTML = '';
    kartu.querySelectorAll('.syahril_tag').forEach(function (t) {
      tag.appendChild(t.cloneNode(true));
      tag.appendChild(document.createTextNode(' '));
    });
    isi.innerHTML = kartu.querySelector('.syahril_detail').innerHTML;
    dialog.showModal();
    document.body.classList.add('syahril_kunci');
    dialog.scrollTop = 0;
  }

  document.querySelectorAll('.syahril_project_kartu').forEach(function (kartu) {
    const tombol = kartu.querySelector('.syahril_detail_btn');
    tombol.addEventListener('click', function (e) {
      e.stopPropagation();
      buka(kartu, tombol);
    });
    kartu.addEventListener('click', function () {
      buka(kartu, tombol);
    });
  });

  tutup.addEventListener('click', function () {
    dialog.close();
  });

  // Klik di area gelap (di luar kotak) menutup popup
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', function () {
    document.body.classList.remove('syahril_kunci');
    if (pemicu) {
      pemicu.focus();
    }
  });
})();

(function () {
  const angka = document.querySelectorAll('.syahril_angka');

  angka.forEach(function (el) {
    const sumber = el.dataset.sumber;
    if (sumber === 'proyek') {
      el.dataset.target = String(document.querySelectorAll('.syahril_project_kartu').length);
    } else if (sumber === 'skill') {
      el.dataset.target = String(document.querySelectorAll('.syahril_skill_kartu').length);
    }
    el.textContent = el.dataset.target;
  });

  if (syahrilKurangGerak || !('IntersectionObserver' in window)) {
    return;
  }

  function hitungNaik(el) {
    const target = Number(el.dataset.target);
    const mulai = performance.now();
    function langkah(sekarang) {
      const p = Math.min((sekarang - mulai) / 900, 1);
      el.textContent = String(Math.round(target * p));
      if (p < 1) {
        requestAnimationFrame(langkah);
      }
    }
    requestAnimationFrame(langkah);
  }

  const pengamat = new IntersectionObserver(function (entri) {
    entri.forEach(function (e) {
      if (e.isIntersecting) {
        hitungNaik(e.target);
        pengamat.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  angka.forEach(function (el) {
    pengamat.observe(el);
  });
})();