export type Jurnal = {
  id: number;
  nidn: string;
  semesterAktif: number;
  judulArtikel: string;
  namaJurnal: string;
  tautanLamanJurnal: string;
  tanggalTerbit: string;
  volume: string;
  nomor: string;
  halaman: string;
  penerbitPenyelanggara: string;
  issn: string;
  upload_document: string;
};

export type JurnalRequest = {
  judulArtikel: string;
  namaJurnal: string;
  tautanLamanJurnal: string;
  tanggalTerbit: string;
  volume: string;
  nomor: string;
  halaman: string;
  penerbitPenyelanggara: string;
  issn: string;
};
