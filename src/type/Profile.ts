export type Profile = {
    nidn: string;
    nama: string;
    programStudi: string;
    jenjangPendidikan: string;
    jenisKelamin: string;
    tanggalLahir: string;
    jabatanAkademik: string;
    noTelephone: string;
    alamatSurel: string;
    isAlreadyPresensi: boolean;
    statusThridarma: string;
    kerajinanDosen:string;
};

export type WorkTime = {
    totalTime: string;
    period:string;
    performance: string
}