const bagianForm = document.getElementById("bagianForm");
const formBooking = document.getElementById("formBooking");
const bagianInvoice = document.getElementById("bagianInvoice");     

const inputName = document.getElementById("nama");
const inputPaket = document.getElementById("paket");
const inputJumblah = document.getElementById("jumlah");
const inputBerangkat = document.getElementById("berangkat");
const pesanError = document.getElementById("pesanError");

const dataPack = {
    "Bali Escape" : {
        durasi : "3 Hari, 2 Malam",
        malam : 2,
        harga : 2450000,
    },

    "Bromo Sunrise Trip" : {
        durasi : "2 Hari, 2 Malam",
        malam : 2,
        harga : 1450000,
    },

    "Raja Ampat" : {
        durasi : "4 Hari, 3 Malam",
        malam : 3,
        harga : 3450000,
    },
}

// Mengubah angka 2450000 menjadi "Rp 2.450.000"
function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}


// Mengubah tanggal (objek Date) menjadi teks "20 November 2026"
function formatTanggal(tanggal) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

formBooking.addEventListener("submit", function(event){
    event.preventDefault();

    const nama = inputName.value.trim();
    const paket = inputPaket.value;
    const jumblah = Number(inputJumblah.value);
    const berangkat = inputBerangkat.value;

    const daftarError = [];

    const tglBerangkat = new Date(berangkat);

    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);

    if (nama === "") {
        daftarError.push("Nama pemesan wajib diisi!")
    } else if (nama.length < 3) {
        daftarError.push("Nama Pemesan Minimal 3!")
    }

    if (paket === "") {
        daftarError.push("Paket harus diisi!")
    }

    if (inputJumblah.value === "") {
        daftarError.push("Jumlah Orang harus diisi!")
    } else if (jumblah < 1) {
        daftarError.push("Jumlah Orang harus bilangan bulat, minimal 1")
    } else if (jumblah > 20) {
        daftarError.push("Jumlah Orang maksimal 20!")
    }

    if (berangkat === "") {
        daftarError.push("Tanggal, Bulan, dan Tahun Harus diisi!")
    } else if (tglBerangkat < hariIni) {
        daftarError.push("Tanggal, Bulan, dan Tahun harus valid")
    }

    if (daftarError.length > 0) {
        pesanError.innerHTML = daftarError.join("<br>");
        pesanError.classList.remove("d-none");
        return;
    }

    const detail = dataPack[paket];

    const total = jumblah * detail.harga

    document.getElementById("outNama").textContent = nama;
    document.getElementById("outPaker").textContent = paket;
    document.getElementById("outBerangkat").textContent = formatTanggal (berangkat);

    document.getElementById("outDurasi").textContent = detail.durasi;

    bagianForm.classList.add("d-none");
    bagianInvoice.classList.add("d=none");
});